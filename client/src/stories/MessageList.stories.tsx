import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import MessageList from '../components/MessageList'
import IMessage from '../models/Message'

const message1: IMessage = {
  _id: 'message-1',
  sender: {
    _id: 'id-1',
    username: 'user-1',
    role: 'Citizen',
  },
  timestamp: '2 min ago',
  channelId: 'channel-1',
  content: 'hi',
}
const message2: IMessage = {
  _id: 'message-2',
  sender: {
    _id: 'id-2',
    username: 'user-2',
    role: 'Police',
  },
  timestamp: 'just now',
  channelId: 'channel-1',
  content: 'hi again',
}

export default {
  title: 'MessageList',
  component: MessageList,
} as ComponentMeta<typeof MessageList>

const Template: ComponentStory<typeof MessageList> = args => (
  <MessageList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  messages: [message1, message2],
}
