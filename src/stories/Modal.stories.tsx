import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { QuotaModal } from '../components/QuotaModal'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../translations/i18n'

export default {
  title: 'Modal',
  component: QuotaModal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof QuotaModal>

const Template: ComponentStory<typeof QuotaModal> = (args) => (
  <QuotaModal
    visible={true}
    onHide={() => console.log('hide')}
    onSubmit={(quotas) => console.log(quotas)}
  />
)

export const Modal = Template.bind({})
