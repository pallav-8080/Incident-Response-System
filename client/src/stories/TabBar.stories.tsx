import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TabBar from '../components/TabBar'

export default {
  title: 'TabBar',
  component: TabBar,
} as ComponentMeta<typeof TabBar>

const Template: ComponentStory<typeof TabBar> = args => <TabBar {...args} />

export const Default = Template.bind({})
Default.args = {
  currentTab: '/',
  onChange: action('on tab change'),
}
