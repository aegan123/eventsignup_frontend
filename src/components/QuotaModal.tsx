import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { Quota } from '../types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const QuotaModal = ({
  visible,
  onHide,
  onSubmit,
}: {
  visible: boolean
  onHide: () => void
  onSubmit: (quotas: Quota[]) => void
}) => {
  const [quotas, setQuotas] = useState<Quota[]>([{ group: '', quota: '' }])
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={visible}>
        <Modal.Header>
          <Modal.Title>Osallistujakiintiöt</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {quotas.map(({ group, quota }, index) => (
              <Form.Group style={{ marginBottom: '10px' }} key={index}>
                <Row>
                  <Col sm={6}>
                    <Form.Control
                      name={'group'}
                      value={group}
                      placeholder={'Käyttäjäryhmä'}
                      onChange={(e) =>
                        setQuotas(
                          quotas.map((quota, i) =>
                            index === i
                              ? { ...quota, group: e.target.value }
                              : quota
                          )
                        )
                      }
                    />
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      type={'number'}
                      name={'quota'}
                      value={quota}
                      placeholder={'Kiintiö'}
                      onChange={(e) =>
                        setQuotas(
                          quotas.map((quota, i) =>
                            index === i
                              ? { group, quota: e.target.value }
                              : quota
                          )
                        )
                      }
                    />
                  </Col>
                  <Col sm={2}>
                    <Button
                      variant="danger"
                      onClick={() =>
                        setQuotas(quotas.filter((_, i) => index !== i))
                      }
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </Col>{' '}
                </Row>
              </Form.Group>
            ))}
          </Form>
          <Button
            onClick={() => setQuotas(quotas.concat({ group: '', quota: '' }))}
          >
            <FontAwesomeIcon icon={faPlus} /> Lisää kiintiö
          </Button>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Peruuta
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onSubmit(quotas)
              onHide()
            }}
          >
            Tallenna
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
