import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Menu } from '@material-ui/core'

import NavigationBar from '../components/NavigationBar'

export default {
  title: 'NavigationBar',
  component: NavigationBar,
} as ComponentMeta<typeof NavigationBar>

const Template: ComponentStory<typeof NavigationBar> = args => (
  <NavigationBar {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Incident Response',
}
export const ShowBackButton = Template.bind({})
ShowBackButton.args = {
  title: 'Incident Response',
  onBack: action('back'),
  showBackButton: true,
}
export const ShowMenu = Template.bind({})
ShowMenu.args = {
  title: 'Incident Response',
  showMenu: true,
}
