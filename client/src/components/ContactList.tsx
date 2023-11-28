import React, { Fragment, FunctionComponent } from 'react'
import cx from 'classnames'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core'
import { NavigateNext as Arrow } from '@material-ui/icons'
import Loading from './Loading'
import IUser from '../models/User'

import styles from '../styles/ContactList.module.css'

export type ClickContactHandler = (id: string) => void

export interface IContactProps {
  user: IUser
  onClick?: ClickContactHandler
}

export const Contact: FunctionComponent<IContactProps> = ({
  user: { _id, username, online },
  onClick,
}) => (
  <ListItem button onClick={() => onClick && onClick(_id)}>
    <ListItemText style={{ flex: 1 }}>{username}</ListItemText>
    <Typography
      className={cx({
        [styles.online]: online,
      })}
      variant="caption"
    >
      {online ? 'online' : 'offline'}
    </Typography>
    {onClick && (
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <Arrow />
        </IconButton>
      </ListItemSecondaryAction>
    )}
  </ListItem>
)

export interface IContactListProps {
  users?: IUser[]
  onClick?: ClickContactHandler,
  loading: boolean
}

export const ContactList: FunctionComponent<IContactListProps> = ({
  users,
  onClick,
  loading
}) => {
  if (loading) return <Loading />

  if (users && users.length === 0) {
    return <Typography style={{ padding: 16 }}>No contacts</Typography>
  }

  return (
    <List>
      {users && users.map((user, index) => (
        <Fragment key={user._id}>
          <Contact user={user} onClick={onClick} />
          {index !== users.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  )
}
export default ContactList
