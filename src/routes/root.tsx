/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar'

// Source: Bulma css documentation
function toggleNavBurgerEvents() {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  )

  // Add a click event on each of them
  $navbarBurgers.forEach((el: HTMLElement) => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target
      const $target = target ? document.getElementById(target) : null

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active')
      if ($target !== null) {
        $target.classList.toggle('is-active')
      }
    })
  })
}

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

  document.addEventListener('DOMContentLoaded', toggleNavBurgerEvents)

  return (
    <>
      <Navbar showAdminStatus={showAdmin} showLoginStatus={showLogin} />
      <div className="columns is-gapless is-8">
        {/* left column */}
        <div className="column is-desktop"></div>
        {/* center column */}
        <div className="column is-8">
          <Outlet />
        </div>
        {/* right column */}
        <div className="column is-2 is-desktop"></div>
      </div>
    </>
  )
}
