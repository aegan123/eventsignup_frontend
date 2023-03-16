const KEYCLOAK_ORIGIN =
  (Cypress.env('KEYCLOAK_URL') as string) || 'http://localhost:9090'

describe('Create new event', () => {
  before(() => {
    cy.visit('/')

    cy.get('[data-cypress="login"]').should('not.be.disabled')
    cy.get('[data-cypress="login"]').click()
    cy.origin(KEYCLOAK_ORIGIN, () => {
      cy.get('#username').type('test_user')
      cy.get('#password').type('test_user')
      cy.get('#kc-login').click()
    })
  })

  it('can create and save new event', () => {
    cy.get('[data-cypress="create-new-event"]').click()

    cy.get('[data-cypress="event-form-basic-accordion"]').click()
    cy.get('[data-cypress="event-name"]').type('test name')
    cy.get('[data-cypress="event-place"]').type('test-place')
    cy.get('[data-cypress="event-description"]').type('test-description')
    cy.get('[data-cypress="event-price"]').type('69')
    cy.get('.event-startDate').click()
    cy.get('.react-datepicker__day--today').click()
    cy.get('[data-cypress="event-save-basic-button"]').click()
    cy.get('[data-cypress="event-form-basic-accordion"]').click()

    cy.get('[data-cypress="event-form-form-accordion"]').click()
    cy.get('li[draggable="true"]').eq(0).click()
    cy.get('[data-cypress="event-save-form-button"]').click()
    cy.get('[data-cypress="event-form-form-accordion"]').click()

    cy.get('[data-cypress="create-event-button"]').click()
    cy.get('[data-cypress="event-success-message"]')
  })
})
