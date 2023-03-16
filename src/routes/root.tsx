/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { KeycloakContext } from '../auth/keycloak'
import { HeaderComponent } from '../components/HeaderComponent'

export default function Root() {
  const keycloak = useContext(KeycloakContext)
  return (
    <div>
      <div>
        <HeaderComponent
          loggedIn={keycloak?.authenticated ? true : false}
          isAdmin={false}
        />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
