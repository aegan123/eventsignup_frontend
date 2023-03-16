import React, { useState } from 'react'
import { BasicInformationForm } from './BasicInformationForm'
import { EventBasicInformation } from '../types/types'
import { FormBuilder } from './FormBuilder'
import { Accordion, Button } from 'react-bootstrap'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormBuilderPostData } from 'react-form-builder2'

const NewEvent = () => {
  const [eventBasicInformation, setEventBasicInformation] =
    useState<EventBasicInformation | null>(null)

  const [formData, setFormData] = useState<FormBuilderPostData | null>(null)

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="basic">
          <Accordion.Header>
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
          <Accordion.Header>
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
      >
        Luo tapahtuma
      </Button>
    </>
  )

  /*return status === 'basic' ? (
    <BasicInformationForm
      onSubmit={(e) => {
        setEventBasicInformation(e)
      }}
    />
  ) : status === 'form' ? (
    <FormBuilder />
  ) : null*/
}

export { NewEvent }
