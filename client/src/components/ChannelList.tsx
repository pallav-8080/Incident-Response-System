import React, { Fragment, FunctionComponent } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Link,
  Divider,
} from '@material-ui/core'
import { NavigateNext as Arrow } from '@material-ui/icons'
import Loading from './Loading'
import IChannel from '../models/Channel'

export interface IChannelProps {
  channel: IChannel
}

export const Channel: FunctionComponent<IChannelProps> = ({
  channel: { _id, name }
}) => (
  <Link color="inherit" href={`/messages/${_id}?name=${name}`}>
    <ListItem>
      <ListItemText>{name}</ListItemText>

      <ListItemSecondaryAction>
        <IconButton edge="end">
          <Arrow />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </Link>
)

export interface IChannelListProps {
  channels?: IChannel[],
  loading: boolean
}

const ChannelList: FunctionComponent<IChannelListProps> = ({ channels, loading }) => {
  if (!channels || loading) return <Loading />

  return (
    <List>
      {channels.map((channel, index) => (
        <Fragment key={channel._id}>
          <Channel channel={channel} />
          {index !== channels.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  )
}

export default ChannelList
