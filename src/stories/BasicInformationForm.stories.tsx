import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BasicInformationForm } from '../components/BasicInformationForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../translations/i18n'
import { EventBasicInformation } from '../types/types'

export default {
  title: 'BasicInformationForm',
  component: BasicInformationForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BasicInformationForm>

const Template: ComponentStory<typeof BasicInformationForm> = (args) => (
  <div className="container">
    <BasicInformationForm {...args} />
  </div>
)

export const Form = Template.bind({
  onSubmit: (data: EventBasicInformation) => console.log(data),
})
