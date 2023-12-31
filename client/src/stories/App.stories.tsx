import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import App from '../App'

export default {
  title: 'App',
  component: App,
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = args => <App {...args} />

export const Default = Template.bind({})
Default.args = {}
