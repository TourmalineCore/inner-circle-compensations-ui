import { AllCompensationsState } from '../../state/AllCompensationsState'
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext'
import { AllCompensationsActions } from './AllCompensationsActions'

describe(`AllCompensationsActions`, () => {
  it(`
  GIVEN all compensations page 
  WHEN visit compensations page
  THEN render actions
  `, () => {
    mountComponent()

    cy
      .getByData(`all-compensations-actions`)
      .should(`exist`)
  })
})

function mountComponent() {
  const allCompensationsState = new AllCompensationsState()

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsActions />
    </AllCompensationsStateContext.Provider>,
  )
}
