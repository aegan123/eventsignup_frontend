import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://localhost:9090',
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
