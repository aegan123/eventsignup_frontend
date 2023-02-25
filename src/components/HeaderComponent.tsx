import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { LanguageSelector } from './LanguageSelector'
import styled from 'styled-components'
import { translate } from '../translations'
import { useTranslation } from 'react-i18next'
import { RotatingLogo } from '../assets/assets'
import { keycloak } from '../auth/keycloak'
import asteriskiLogo from '../assets/asteriski-logo.png'

const HeaderComponent = ({
  loggedIn,
  isAdmin,
}: {
  loggedIn: boolean
  isAdmin: boolean
}) => {
  const { i18n } = useTranslation()
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
            {translate('header.title')}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {loggedIn && (
          <Navbar.Collapse className="justify-content-center">
            <Nav>
              <Link href="/management" label={translate('header.ownEvents')} />
              <Link href="/newEvent" label={translate('header.newEvent')} />
            </Nav>
          </Navbar.Collapse>
        )}
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {loggedIn && isAdmin && (
              <Link href="/admin" label={translate('header.admin')} />
            )}
            <Nav.Item>
              <LanguageSelector />
            </Nav.Item>
            <Nav.Item>
              {loggedIn ? (
                <StyledLink href={keycloak?.createLogoutUrl()}>
                  {translate('header.logout')}
                </StyledLink>
              ) : (
                <StyledLink
                  href={keycloak?.createLoginUrl({ locale: i18n.language })}
                >
                  {translate('header.login')}
                </StyledLink>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </StyledNavbar>
    </StyledHeaderContainer>
  )
}

const Link = ({ href, label }: { href: string; label: string }) => (
  <Nav.Item>
    <LinkContainer to={href}>
      <StyledLink>{label}</StyledLink>
    </LinkContainer>
  </Nav.Item>
)

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
