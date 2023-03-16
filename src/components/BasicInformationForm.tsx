import React, { useState } from 'react'
import { Quota } from '../types/types'
import { Form, Row, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { QuotaModal } from './QuotaModal'
import { EventBasicInformation } from '../types/types'

export const BasicInformationForm = ({
  onSubmit,
}: {
  onSubmit: (data: EventBasicInformation) => void
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [quotas, setQuotas] = useState<Quota[]>([])
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [signupStarts, setSignupStarts] = useState<Date>()
  const [signupEnds, setSignupEnds] = useState<Date>()
  const [image, setImage] = useState<File | null>(null)
  const [maxParticipants, setMaxParticipants] = useState('')
  const [hasParticipantLimit, setHasParticipantLimit] = useState(false)
  const [hasQuotas, setHasQuotas] = useState(false)

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Tapahtuman nimi</Form.Label>
        <Form.Control
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tapahtuman paikka</Form.Label>
        <Form.Control
          required
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
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
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tapahtuman hinta</Form.Label>
        <Form.Control
          required
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
          <Col md={6}>
            <Form.Label>Tapahtuman aloituspäivä</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.M.yyyy HH:mm"
            />
          </Col>
          <Col md={6}>
            <Form.Label>Tapahtuman lopetuspäivä</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
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
            <DatePicker
              selected={signupStarts}
              onChange={(date: Date) => setSignupStarts(date)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.M.yyyy HH:mm"
            />
          </Col>
          <Col md={6}>
            <Form.Label>Ilmoittautumisen lopetuspäivä</Form.Label>
            <DatePicker
              selected={signupEnds}
              onChange={(date: Date) => setSignupEnds(date)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.M.yyyy HH:mm"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) setImage(e.target.files[0])
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
        onClick={() =>
          onSubmit({
            name,
            place,
            description,
            price: Number(price) || undefined,
            startDate: parseDate(startDate) || '',
            endDate: parseDate(endDate),
            signupStarts: parseDate(signupStarts),
            signupEnds: parseDate(signupEnds),
            bannerImg: image?.name || undefined,
            minParticipants: 0,
            maxParticipants: Number(maxParticipants) || undefined,
          })
        }
        style={{ marginRight: '10px' }}
      >
        Jatka
      </Button>
      <Button variant="secondary" onClick={(e) => e}>
        Tyhjennä
      </Button>
    </Form>
  )
}

const parseDate = (date?: Date) => date?.toDateString() || undefined
