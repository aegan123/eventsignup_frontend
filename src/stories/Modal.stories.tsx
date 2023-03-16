import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { QuotaModal as Modal } from '../components/QuotaModal'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../translations/i18n'

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = () => (
  <Modal
    visible={true}
    onHide={() => console.log('hide')}
    onSubmit={(quotas) => console.log(quotas)}
  />
)

export const QuotaModal = Template.bind({})
