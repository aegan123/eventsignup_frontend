describe('Authentication', () => {
  before(() => {
    cy.visit('/')
  })
  it('can login and logout', () => {
    cy.get('[data-cypress="login"]').click()
    cy.get('#username').type('test_user')
    cy.get('#password').type('test_user')
    cy.get('#kc-login').click()
    cy.get('[data-cypress="logout"]')

    cy.get('[data-cypress="logout"]').click()
    cy.get('[data-cypress="login"]')
  })
})
