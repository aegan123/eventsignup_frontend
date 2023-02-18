/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function IndexRoute() {
  const { t } = useTranslation()
  return (
    <section className={'section'}>
      <p>{t('index.welcome')}</p>
    </section>
  )
}
