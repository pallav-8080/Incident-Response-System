import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import LoginForm from '../components/LoginForm'

export default {
  title: 'LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = args => (
  <Router>
    <LoginForm {...args} />
  </Router>
)

export const Default = Template.bind({})
Default.args = {
  login: action('submit'),
}
