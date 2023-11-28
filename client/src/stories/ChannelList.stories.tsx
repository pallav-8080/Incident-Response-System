import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import IChannel from '@/models/Channel'

import ChannelList from '../components/ChannelList'

const channels: IChannel[] = [
  {
    _id: 'id-1',
    name: 'Public',
    users: [],
  },
  {
    _id: 'id-2',
    name: 'UserB',
    users: [],
  },
]

export default {
  title: 'ChannelList',
  component: ChannelList,
} as ComponentMeta<typeof ChannelList>

const Template: ComponentStory<typeof ChannelList> = args => (
  <ChannelList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  channels,
}
export const Loading = Template.bind({})
Loading.args = {}
