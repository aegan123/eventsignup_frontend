import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BasicInformationForm } from '../components/BasicInformationForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../translations/i18n'

export default {
  title: 'BasicInformationForm',
  component: BasicInformationForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BasicInformationForm>

const Template: ComponentStory<typeof BasicInformationForm> = () => (
  <div className="container">
    <BasicInformationForm onSubmit={(e) => console.log(e)} />
  </div>
)

export const Form = Template.bind({})
