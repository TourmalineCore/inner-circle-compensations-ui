import { CreateCompensationsContainer } from './CreateCompensationsContainer'
import { CreateCompensationsContent } from './CreateCompensationsContent'
import { CreateCompensationsState } from './state/CreateCompensationsState'
import { CreateCompensationsStateContext } from './state/CreateCompensationsStateContext'

describe(`CreateCompensationsContent`, () => {
  describe(`Disable Submit Button`, disableSubmitButtonTests)

})

function disableSubmitButtonTests() {
  it(`
  GIVEN compensations page 
  WHEN isSaving = false
  THEN submit button is not disabled
  `, () => {
    mountComponent()

    cy
      .getByData(`create-compensations-content-submit`)
      .should(`be.not.disabled`)

    cy
      .getByData(`button-loader`)
      .should(`not.exist`)

    cy.getByData(`create-compensations-content-submit`)
      .contains(`Send`)
  })

  it(`
  GIVEN compensations page 
  WHEN isSaving = true
  THEN submit button is disabled
  `, () => {
    mountComponent({
      isSaving: true,
    })

    cy
      .getByData(`create-compensations-content-submit`)
      .should(`be.disabled`)

    cy
      .getByData(`button-loader`)
      .should(`exist`)

    cy.getByData(`create-compensations-content-submit`)
      .contains(`Sending`)
  })
}

function mountComponent({
  isSaving = false,
}: {
  isSaving?: boolean,
} = {}) {
  const createCompensationsState = new CreateCompensationsState()

  if (isSaving) {
    createCompensationsState.setIsSaving()
  }

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <CreateCompensationsContent onSubmit={() => { }} />
    </CreateCompensationsStateContext.Provider>,
  )
}
