import { AllCompensationsPage } from './pages/AllCompensationsPage'
import { PersonalCompensationsPage } from './pages/PersonalCompensationsPage'

const E2E_SMOKE_COMMENT_PREFIX = `[E2E-SMOKE]`

describe(`Compensations Smoke`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
    cy.removeCompensations()
  })

  afterEach(`Authorize and cleanup`, () => {
    cy.removeCompensations()
  })

  it(`
  GIVEN compensations flow
  WHEN add a new compensation
  SHOULD see it as unpaid in the personal list 
  AND click MarkAsPaid for a new compensation
  SHOULD see it as paid in the personal list
  `, () => {
    // visit personal page
    PersonalCompensationsPage.visit()

    const newCompensationComment = `${E2E_SMOKE_COMMENT_PREFIX} ${new Date()}`

    // check that the table doesn`t contain new compensation
    cy
      .getByData(`compensations-table`)
      .should(`be.visible`)
      .should(`not.contain`, newCompensationComment)

    // fill out new compensation`s data
    cy
      .getByData(`table-create-compensations-select`)
      .select(`5`)

    cy
      .getByData(`table-create-compensations-quantity`)
      .clear()
      .type(`2`)

    cy
      .getByData(`table-create-compensations-comment`)
      .type(newCompensationComment)

    cy
      .getByData(`table-create-compensations-amount`)
      .type(`800`)

    cy
      .getByData(`table-create-compensations-sum`)
      .should(`have.text`, `1 600 ₽`) // TODO use formatMoney util

    cy
      .getByData(`create-compensations-container-submit`)
      .click()

    // check that the table contains new compensation with "unpaid" status
    PersonalCompensationsPage.checkStatus(newCompensationComment, `unpaid`)

    // visit all compensations page
    AllCompensationsPage.visit()

    // find our new compensation
    AllCompensationsPage.findCompensation(newCompensationComment)

    // make our new compensation as paid
    cy
      .get(`.all-compensations-table__items-list`)
      .getByData(`all-compensations-table-item`)
      .contains(`[data-cy="column-employee"]`, /Account E2E Test|Ceo Ceo Ceo/)
      .parent()
      .within(() => {
        cy
          .getByData(`mark-as-paid-button`)
          .should(`be.visible`)
          .click()
      })

    // visit personal page
    PersonalCompensationsPage.visit()

    // check that the table contains new compensation with "paid" status
    cy
      .getByData(`compensations-filter-button`)
      .contains(`All`)
      .should(`be.visible`)
      .click()

    PersonalCompensationsPage.checkStatus(newCompensationComment, `paid`)
  })
})
