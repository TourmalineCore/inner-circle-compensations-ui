import { CreateCompensationsState } from '../../state/CreateCompensationsState'
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext'
import { CompensationsTypesTips } from './CompensationsTypesTips'

describe(`CompensationsTypesTips`, () => {
  it(`
    GIVEN compensations page 
    WHEN visit compensations page
    THEN render compensations types tips
    `, () => {
    mountComponent()

    cy
      .getByData(`compensations-types-tips-head`)
      .should(`exist`)
  })

  it(`
  GIVEN compensations page 
  WHEN open compensations types tips
  THEN render compensations types tips list
  `, () => {
    mountComponent()

    cy
      .getByData(`compensations-types-tips-head`)
      .click()

    cy
      .get(`details`)
      .should(`have.attr`, `open`)

    cy
      .getByData(`compensations-types-tips-head`)
      .click()

    cy
      .get(`details`)
      .should(`not.have.attr`, `open`)
  })
})

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState()

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <CompensationsTypesTips />
    </CreateCompensationsStateContext.Provider>,
  )
}
