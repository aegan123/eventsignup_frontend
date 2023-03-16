import React, { useState } from 'react'
import { BasicInformationForm } from './BasicInformationForm'
import { EventBasicInformation } from '../types/types'
import { FormBuilder } from './FormBuilder'
import { Accordion, Button, Alert } from 'react-bootstrap'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormBuilderPostData } from 'react-form-builder2'
import { axiosInstance } from '../auth/client'

const NewEvent = () => {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [eventBasicInformation, setEventBasicInformation] =
    useState<EventBasicInformation | null>(null)
  const [formData, setFormData] = useState<FormBuilderPostData | null>(null)

  const sendToServer = () => {
    axiosInstance({
      method: 'post',
      url: '/event/create',
      data: { ...eventBasicInformation, form: { formData } },
    })
      .then(() => {
        setSuccess('Tapahtuman luonti onnistui')
        setTimeout(() => setSuccess(''), 3000)
      })
      .catch((e) => {
        console.error(e)
        setError('Tapahtuman luonti epäonnistui')
        setTimeout(() => setError(''), 3000)
      })
  }

  return (
    <>
      {success && (
        <Alert variant="success" data-cypress="event-success-message">
          {success}
        </Alert>
      )}
      {error && <Alert variant="error">{error}</Alert>}
      <Accordion>
        <Accordion.Item eventKey="basic">
          <Accordion.Header data-cypress="event-form-basic-accordion">
            Perustiedot
            {eventBasicInformation !== null && (
              <FontAwesomeIcon
                style={{ marginLeft: '10px' }}
                size="lg"
                icon={faCircleCheck}
              />
            )}
          </Accordion.Header>
          <Accordion.Body>
            {' '}
            <BasicInformationForm
              onSubmit={(e) => {
                setEventBasicInformation(e)
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="form">
          <Accordion.Header data-cypress="event-form-form-accordion">
            Rekisteröitymislomake
            {formData !== null && (
              <FontAwesomeIcon
                style={{ marginLeft: '10px' }}
                size="lg"
                icon={faCircleCheck}
              />
            )}
          </Accordion.Header>
          <Accordion.Body>
            <FormBuilder onSave={(e) => setFormData(e)} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button
        style={{ marginTop: '10px' }}
        variant="primary"
        disabled={eventBasicInformation === null || formData === null}
        onClick={sendToServer}
        data-cypress="create-event-button"
      >
        Luo tapahtuma
      </Button>
    </>
  )
}

export { NewEvent }
