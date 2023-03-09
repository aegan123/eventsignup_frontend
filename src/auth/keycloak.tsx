import React, { useEffect, useState } from 'react'
import Keycloak from 'keycloak-js'

const KeycloakContext = React.createContext<Keycloak | undefined>(undefined)

const KeycloakProvider = ({ children }: { children: React.ReactNode }) => {
  const [kc, setKc] = useState<Keycloak | undefined>(undefined)

  useEffect(
    () =>
      void keycloak
        .init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/silent-check-sso.html',
        })
        .then(() => {
          console.log('kc init ok')
          setKc(keycloak)
        })
        .catch((e) => console.error(e)),
    []
  )

  return (
    <KeycloakContext.Provider value={kc}>{children}</KeycloakContext.Provider>
  )
}

const KEYCLOAK_URL = process.env.REACT_APP_KEYCLOAK_URL

const keycloak = new Keycloak({
  url: KEYCLOAK_URL,
  realm: 'asteriski',
  clientId: 'eventsignup_frontend',
})

export { KeycloakProvider, KeycloakContext }
