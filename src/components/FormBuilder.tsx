import React, { useState } from 'react'
import {
  ReactFormBuilder,
  ReactFormGenerator,
  FormBuilderPostData,
} from 'react-form-builder2'
import 'legacy-bootstrap/dist/css/bootstrap.min.css' // :(
import 'legacy-fontawesome/css/all.min.css' // :`(
import 'react-form-builder2/dist/app.css'

const FormBuilder = () => {
  const [data, setData] = useState<FormBuilderPostData | null>(null)
  return (
    <>
      <ReactFormGenerator
        data={data?.task_data || []}
        form_action=""
        form_method="POST"
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

export { FormBuilder }
