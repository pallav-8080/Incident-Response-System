import React, { ReactElement, Fragment, FunctionComponent } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Link,
  ListItemIcon,
  Divider,
} from '@material-ui/core'
import { Message, PermContactCalendar as Contact } from '@material-ui/icons'

interface ITab {
  text: string
  link: string
  icon: ReactElement
}

const tabs: ITab[] = [
  {
    text: 'Messages',
    link: '/messages',
    icon: <Message />,
  },
  {
    text: 'Contacts',
    link: '/contacts',
    icon: <Contact />,
  },
]

const Home: FunctionComponent = () => {
  return (
    <List>
      {tabs.map(({ text, link, icon }, index) => (
        <Fragment key={link}>
          <Link color="inherit" href={link}>
            <ListItem button>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItem>
          </Link>

          {index !== tabs.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  )
}

export default Home
