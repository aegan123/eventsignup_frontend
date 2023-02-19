import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { HeaderComponent } from '../components/HeaderComponent'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  title: 'Header',
  component: HeaderComponent,
  decorators: [withRouter],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HeaderComponent>

const Template: ComponentStory<typeof HeaderComponent> = (args) => (
  <HeaderComponent {...args} />
)

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  loggedIn: true,
  isAdmin: true,
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {
  loggedIn: false,
  isAdmin: false,
}
