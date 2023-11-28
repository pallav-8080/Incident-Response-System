import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import IUser from '@/models/User'

import ContactList from '../components/ContactList'

const users: IUser[] = [
  {
    _id: 'id-A',
    username: 'UserA',
    role: 'Citizen',
    online: true,
  },
  {
    _id: 'id-B',
    username: 'UserB',
    role: 'Police',
    online: false,
  },
]

export default {
  title: 'ContactList',
  component: ContactList,
} as ComponentMeta<typeof ContactList>

const Template: ComponentStory<typeof ContactList> = args => (
  <ContactList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  users,
  onClick: action('chat with'),
}
export const Loading = Template.bind({})
Loading.args = {}
export const Empty = Template.bind({})
Empty.args = {
  users: [],
}
