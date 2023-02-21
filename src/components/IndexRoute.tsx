/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React from 'react'
import { translate } from '../translations'

export default function IndexRoute() {
  return (
    <section className={'section'}>
      <p>{translate('index.welcome')}</p>
    </section>
  )
}
