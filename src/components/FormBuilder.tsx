import React, { useState } from 'react'
import {
  ReactFormBuilder,
  ReactFormGenerator,
  FormBuilderPostData,
} from 'react-form-builder2'
import { Modal, Button } from 'react-bootstrap'
import 'legacy-bootstrap/dist/css/bootstrap.min.css' // :(
import 'legacy-fontawesome/css/all.min.css' // :`(
import 'react-form-builder2/dist/app.css'

const FormBuilder = ({
  onSave,
}: {
  onSave: (data: FormBuilderPostData) => void
}) => {
  const [data, setData] = useState<FormBuilderPostData | null>(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Button
          variant="primary"
          onClick={() => {
            if (data) {
              onSave(data)
            }
          }}
          disabled={data === null}
          data-cypress="event-save-form-button"
        >
          Tallenna
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          variant="info"
          onClick={() => setPreviewVisible(true)}
          disabled={data === null}
        >
          Esikatselu
        </Button>
      </div>
      <PreviewModal
        visible={previewVisible}
        onHide={() => setPreviewVisible(false)}
        formData={data}
      />
      <ReactFormBuilder
        editMode
        onPost={(a) => {
          console.log(a)
          setData(a)
        }}
      />
    </>
  )
}

const PreviewModal = ({
  visible,
  onHide,
  formData,
}: {
  visible: boolean
  onHide: () => void
  formData: FormBuilderPostData | null
}) => (
  <Modal show={visible} onHide={onHide} size="xl">
    <Modal.Header closeButton />
    <Modal.Body>
      <ReactFormGenerator
        data={formData?.task_data || []}
        form_action=""
        form_method="POST"
        hide_actions
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>
        Sulje
      </Button>
    </Modal.Footer>
  </Modal>
)

export { FormBuilder }
