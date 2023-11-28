import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Loading from '../components/Loading'

export default {
  title: 'loading',
  component: Loading,
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = args => <Loading {...args} />

export const Default = Template.bind({})
Default.args = {}
