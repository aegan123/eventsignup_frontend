/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderComponent } from '../components/HeaderComponent'
import { loggedIn, isAdmin } from '../auth/keycloak'

export default function Root() {
  return (
    <div>
      <div>
        <HeaderComponent loggedIn={loggedIn()} isAdmin={isAdmin()} />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
