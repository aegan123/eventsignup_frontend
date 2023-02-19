import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

import './headerComponent.css'

import asteriskiLogo from '../assets/asteriski-logo.png'
import '../assets/rotating-logo.css'

const HeaderComponent = ({
  showLogin,
  showAdmin,
}: {
  showLogin: boolean
  showAdmin: boolean
}) => {
  return (
    <div className="header-container">
      <Navbar variant="dark" expand="md">
        <Navbar.Brand href="/">
          <img
            alt="navbar-brand"
            width="32"
            height="32"
            className="d-inline-block align-top rotating-logo"
            src={asteriskiLogo}
          />{' '}
          Ilmoittautumisjärjestelmä
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-center">
          <Nav>
            <Nav.Link href="/management">Omat tapahtumat</Nav.Link>
            <Nav.Link href="/newEvent">Luo uusi tapahtuma</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {showAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
            {showLogin ? (
              <Nav.Link href="/login">Kirjaudu sisään</Nav.Link>
            ) : (
              <Nav.Link href="/logout">Kirjaudu ulos</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export { HeaderComponent }
