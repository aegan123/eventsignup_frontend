/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderComponent } from '../components/HeaderComponent'

export default function Root() {
  function getLoginStatus() {
    // TODO check auth cookie and set value
    return false
  }

  function getAdminStatus() {
    // TODO check if logged in user is admin
    return true
  }
  const showLogin = getLoginStatus()
  const showAdmin = getAdminStatus()

  return (
    <div>
      <div>
        <HeaderComponent showLogin={showLogin} showAdmin={showAdmin} />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
