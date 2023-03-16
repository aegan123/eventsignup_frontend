import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { LanguageSelector } from './LanguageSelector'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { RotatingLogo } from '../assets/assets'
import asteriskiLogo from '../assets/asteriski-logo.png'
import { KeycloakContext } from '../auth/keycloak'

const HeaderComponent = ({
  loggedIn,
  isAdmin,
}: {
  loggedIn: boolean
  isAdmin: boolean
}) => {
  const { t, i18n } = useTranslation()
  const keycloak = useContext(KeycloakContext)

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
            {t('header.title')}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {loggedIn && (
          <Navbar.Collapse className="justify-content-center">
            <Nav>
              <Nav.Item>
                <Link href="/management" label={t('header.ownEvents')} />
              </Nav.Item>
              <Nav.Item data-cypress="create-new-event">
                <Link href="/newEvent" label={t('header.newEvent')} />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        )}
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {loggedIn && isAdmin && (
              <Link href="/admin" label={t('header.admin')} />
            )}
            <Nav.Item>
              <LanguageSelector />
            </Nav.Item>
            <Nav.Item>
              {loggedIn ? (
                <StyledLink
                  href={keycloak?.createLogoutUrl()}
                  data-cypress="logout"
                >
                  {t('header.logout')}
                </StyledLink>
              ) : (
                <StyledLink
                  href={keycloak?.createLoginUrl({ locale: i18n.language })}
                  data-cypress="login"
                  disabled={!keycloak}
                >
                  {t('header.login')}
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
  padding: 0.5rem 1rem;
`

const StyledLink = styled(Nav.Link)`
  color: ${({ disabled }) => (disabled ? 'ORIGINAL COLOR' : '#fff !important')};
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
