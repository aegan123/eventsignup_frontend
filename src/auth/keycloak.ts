import Keycloak from 'keycloak-js'

const KEYCLOAK_URL = process.env.REACT_APP_KEYCLOAK_URL

const keycloak = new Keycloak({
  url: KEYCLOAK_URL,
  realm: 'asteriski',
  clientId: 'eventsignup_frontend',
})

const init = (cb: () => void) =>
  keycloak
    .init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
    })
    .then(() => {
      cb()
    })
    .catch((e) => console.error(e))

const login = () => keycloak.login()
const logout = () => keycloak.logout()
const loggedIn = () => (keycloak.authenticated ? true : false)
const isAdmin = () => loggedIn() && keycloak.hasRealmRole('ADMIN')
const loginUrl = ({ locale }: { locale: string }) =>
  keycloak.createLoginUrl({ locale })
const logoutUrl = () => keycloak.createLogoutUrl()

export { init, login, logout, loggedIn, isAdmin, loginUrl, logoutUrl, keycloak }
