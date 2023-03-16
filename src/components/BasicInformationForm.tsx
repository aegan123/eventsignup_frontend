import React, { useState } from 'react'
import { Quota } from '../types/types'
import { Form, Row, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { QuotaModal } from './QuotaModal'
import { EventBasicInformation } from '../types/types'
import { axiosInstance } from '../auth/client'
import '../assets/styles.css'
export const BasicInformationForm = ({
  onSubmit,
}: {
  onSubmit: (data: EventBasicInformation) => void
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [validated, setValidated] = useState(false)

  const [quotas, setQuotas] = useState<Quota[]>([])
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [signupStarts, setSignupStarts] = useState<Date>()
  const [signupEnds, setSignupEnds] = useState<Date>()
  const [image, setImage] = useState<string | null>(null)
  const [maxParticipants, setMaxParticipants] = useState('')
  const [hasParticipantLimit, setHasParticipantLimit] = useState(false)
  const [hasQuotas, setHasQuotas] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    console.log('submit')

    e.preventDefault()
    e.stopPropagation()
    const form = e?.currentTarget
    if (form.checkValidity() === true) {
      onSubmit({
        name,
        place,
        description,
        price: Number(price) || undefined,
        startDate: startDate?.toISOString() || '',
        endDate: endDate?.toISOString() || '',
        signupStarts: signupStarts?.toISOString() || '',
        signupEnds: signupEnds?.toISOString() || '',
        bannerImg: image || undefined,
        minParticipants: 0,
        maxParticipants: Number(maxParticipants) || undefined,
      })
    }
    setValidated(true)
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Tapahtuman nimi</Form.Label>
        <Form.Control
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-cypress="event-name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tapahtuman paikka</Form.Label>
        <Form.Control
          required
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          data-cypress="event-place"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tapahtuman kuvaus</Form.Label>
        <Form.Control
          required
          as="textarea"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-cypress="event-description"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tapahtuman hinta</Form.Label>
        <Form.Control
          required
          type="number"
          value={price}
          onChange={(e) => {
            console.log(e)
            setPrice(e.target.value)
          }}
          data-cypress="event-price"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
          <Col md={6}>
            <Form.Label>Tapahtuman aloituspäivä</Form.Label>
            <Form.Control
              required
              as={DatePicker}
              selected={startDate}
              onChange={(date) => {
                // eslint-disable-next-line
                //@ts-ignore
                setStartDate(date)
              }}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.M.yyyy HH:mm"
              className="event-startDate"
            />
          </Col>
          <Col md={6}>
            <Form.Label>Tapahtuman lopetuspäivä</Form.Label>
            <Form.Control
              as={DatePicker}
              selected={endDate}
              onChange={(date) => {
                // eslint-disable-next-line
                //@ts-ignore
                setEndDate(date)
              }}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.M.yyyy HH:mm"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
          <Col md={6}>
            <Form.Label>Ilmoittautumisen aloituspäivä</Form.Label>
            <Form.Control
              as={DatePicker}
              selected={signupStarts}
              onChange={(date) => {
                // eslint-disable-next-line
                //@ts-ignore
                setSignupStarts(date)
              }}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.M.yyyy HH:mm"
            />
          </Col>
          <Col md={6}>
            <Form.Label>Ilmoittautumisen lopetuspäivä</Form.Label>
            <Form.Control
              as={DatePicker}
              selected={signupEnds}
              onChange={(date) => {
                // eslint-disable-next-line
                //@ts-ignore
                setSignupEnds(date)
              }}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.M.yyyy HH:mm"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bannerikuva</Form.Label>
        <Form.Control
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              const image = e.target.files[0]

              axiosInstance<{ fileName: string }>({
                // could get from generated types if not Map type
                method: 'post',
                url: '/event/banner/add',
                data: image,
                headers: { 'Content-Type': image.type },
              })
                .then((res) => res.data)
                .then(({ fileName }) => setImage(fileName))
                .catch((error) => console.log('error', error))
            }
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
          <Col md={6}>
            <Form.Check
              label="Tapahtumalla on osallistujamäärärajoitus"
              type="checkbox"
              checked={hasParticipantLimit}
              onChange={(e) => setHasParticipantLimit(e.target.checked)}
            />
          </Col>
          {hasParticipantLimit && (
            <Col md={6}>
              <Form.Label>Maksimi osallistujamäärä</Form.Label>
              <Form.Control
                type={'number'}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
            </Col>
          )}
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col md={6}>
            <Form.Check
              label="Tapahtumalla on osallistujakiintiöitä"
              type="checkbox"
              checked={hasQuotas}
              onChange={(e) => setHasQuotas(e.target.checked)}
            />
          </Col>
          {hasQuotas && (
            <Col md={6}>
              <Form.Label>Osallistujakiintiöt</Form.Label>
              <Form.Control
                as="textarea"
                disabled
                value={quotas
                  .map(({ group, quota }) => `${group || ''}: ${quota || ''}`)
                  .join('\n')}
              />
              <Button
                size="sm"
                variant="info"
                onClick={() => setModalVisible(true)}
                style={{ marginTop: '10px' }}
              >
                {quotas.length ? 'Muokkaa kiintiöitä' : 'Lisää kiintiöitä'}
              </Button>
              <QuotaModal
                visible={modalVisible}
                onHide={() => setModalVisible(false)}
                onSubmit={(quotas) => setQuotas(quotas)}
              />
            </Col>
          )}
        </Row>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        data-cypress="event-save-basic-button"
      >
        Tallenna
      </Button>
    </Form>
  )
}
