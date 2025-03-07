import { AllCompensationsState } from '../../../../state/AllCompensationsState'
import { AllCompensationsStateContext } from '../../../../state/AllCompensationsStateContext'
import { AllCompensationsFilter } from './AllCompensationsFilter'

describe(`AllCompensationsFilter`, () => {
  it(`
  GIVEN all compensations page 
  WHEN visit compensations page 
  THEN render compensations filter
  `, () => {
    mountComponent()

    cy
      .getByData(`all-compensations-filter`)
      .should(`exist`)
  })

  it(`
  GIVEN all compensations page 
  WHEN have data about filters 
  THEN render elements in component
  `, () => {
    mountComponent()

    cy
      .getByData(`all-compensations-filter`)
      .children()
      .should(`have.length`, 2)

    cy
      .getByData(`all-compensations-filter-button`)
      .first()
      .should(`have.text`, `All`)

    cy
      .getByData(`all-compensations-filter-button`)
      .last()
      .should(`have.text`, `Unpaid`)
  })

  it(`
  GIVEN all compensations page 
  WHEN click on it filter
  THEN filter have a focus
  `, () => {
    mountComponent()

    cy
      .getByData(`all-compensations-filter-button`)
      .last()
      .click()

    cy
      .getByData(`all-compensations-filter-button`)
      .last()
      .focused()
  })
})

function mountComponent() {
  const allCompensationsState = new AllCompensationsState()

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsFilter />
    </AllCompensationsStateContext.Provider>,
  )
}
