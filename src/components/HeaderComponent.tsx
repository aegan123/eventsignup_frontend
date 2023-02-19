import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'

import asteriskiLogo from '../assets/asteriski-logo.png'

const HeaderComponent = ({
  loggedIn,
  isAdmin,
}: {
  loggedIn: boolean
  isAdmin: boolean
}) => {
  return (
    <StyledHeaderContainer className="header-container">
      <StyledNavbar variant="dark" expand="md">
        <LinkContainer to="/">
          <Navbar.Brand>
            <RotatingLogo
              alt="navbar-brand"
              width="32"
              height="32"
              className="d-inline-block align-top"
              src={asteriskiLogo}
            />{' '}
            Ilmoittautumisjärjestelmä
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {loggedIn && (
          <Navbar.Collapse className="justify-content-center">
            <Nav>
              <Link href="/management" label="Omat tapahtumat" />
              <Link href="/newEvent" label="Luo uusi tapahtuma" />
            </Nav>
          </Navbar.Collapse>
        )}
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {loggedIn && isAdmin && <Link href="/admin" label="Admin" />}
            {loggedIn ? (
              <Link href="/logout" label="Kirjaudu ulos" />
            ) : (
              <Link href="/login" label="Kirjaudu sisään" />
            )}
          </Nav>
        </Navbar.Collapse>
      </StyledNavbar>
    </StyledHeaderContainer>
  )
}

const Link = ({ href, label }: { href: string; label: string }) => (
  <LinkContainer to={href}>
    <StyledLink>{label}</StyledLink>
  </LinkContainer>
)

const RotatingLogo = styled.img`
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;

  &:hover,
  &:focus,
  &:active {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
`

const StyledHeaderContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 15px;
`

const StyledNavbar = styled(Navbar)`
  background-color: #2b8c49;
  box-shadow: 0 0 0.7em #8e8d8d;
`

const StyledLink = styled(Nav.Link)`
  color: #fff !important;
  &:hover {
    color: #d6d6d6 !important;
    transition: all 0.3s ease-in-out;
    transition-delay: 0s;
    transition-duration: 0.3s;
    transition-property: all;
    transition-timing-function: ease-in-out;
  }
`

export { HeaderComponent }
