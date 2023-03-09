describe('Authentication', () => {
  before(() => {
    cy.visit('/')
  })

  const KEYCLOAK_ORIGIN =
    (Cypress.env('KEYCLOAK_URL') as string) || 'http://localhost:9090'

  it('can login and logout', () => {
    cy.get('[data-cypress="login"]').should('not.be.disabled')
    cy.get('[data-cypress="login"]').click()
    cy.origin(KEYCLOAK_ORIGIN, () => {
      cy.get('#username').type('test_user')
      cy.get('#password').type('test_user')
      cy.get('#kc-login').click()
    })
    cy.get('[data-cypress="logout"]')
    cy.get('[data-cypress="logout"]').click()
    cy.get('[data-cypress="login"]').should('not.be.disabled')
  })
})
