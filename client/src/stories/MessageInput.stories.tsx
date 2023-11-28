import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import MessageInput from '../components/MessageInput'

export default {
  title: 'MessageInput',
  component: MessageInput,
} as ComponentMeta<typeof MessageInput>

const Template: ComponentStory<typeof MessageInput> = args => (
  <MessageInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onSubmit: action('submit'),
}
