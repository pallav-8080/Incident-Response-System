import React, { FunctionComponent } from 'react'
import { Home, Message, PermContactCalendar } from '@material-ui/icons'
import { AppBar, Tabs, Tab } from '@material-ui/core'

export interface IProps {
  currentTab: string
  onChange: (newRoute: string) => void
}

const TabBar: FunctionComponent<IProps> = ({ currentTab, onChange }) => {
  const routes = ['/', '/messages', '/contacts']
  const currentIndex = routes.findIndex(r => r === currentTab)

  return (
    <AppBar position="static">
      <Tabs
        value={currentIndex}
        onChange={(_, newValue) => onChange(routes[newValue])}
      >
        <Tab key="home" icon={<Home />} />
        <Tab key="msg" icon={<Message />} />
        <Tab key="contact" icon={<PermContactCalendar />} />
      </Tabs>
    </AppBar>
  )
}

export default TabBar
