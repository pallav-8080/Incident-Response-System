import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RegisterForm from '../components/RegisterForm'

export default {
  title: 'RegisterForm',
  component: RegisterForm,
} as ComponentMeta<typeof RegisterForm>

const Template: ComponentStory<typeof RegisterForm> = args => (
  <Router>
    <RegisterForm {...args} />
  </Router>
)

export const Default = Template.bind({})
Default.args = {
  onSubmit: action('submit'),
}
