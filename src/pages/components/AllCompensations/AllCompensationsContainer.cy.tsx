import { AllCompensationsContainer } from './AllCompensationsContainer'
import { AllCompensationsState, getSelectedDate } from './state/AllCompensationsState'
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext'

describe(`AllCompensationsContainer`, () => {
  // ToDo figure out how to mock Date in the app and in its tests
  const now = getSelectedDate(new Date())
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const firstCompensationId = 57
  const secondCompensationId = 66

  const firstMockCompensations = {
    items: [
      {
        compensations: [
          {
            comment: `first compensaion`,
            id: firstCompensationId,
          },
          {
            comment: `second compensaion`,
            id: secondCompensationId,
          },
        ],
      },
    ],
  } as AllCompensationsType

  const secondMockCompensations = {
    items: [
      {
        compensations: [
          {
            comment: `second compensaion`,
            id: secondCompensationId,
          },
        ],
      },
    ],
  } as AllCompensationsType

  it(`
  GIVEN all compensations page 
  WHEN delete the first compensation
  SHOULD call DELETE endpoint
  AND call GET compensations endpoint
  `, () => {

    // mocked compensations for initial loading
    cy
      .intercept(
        `GET`,
        `*/admin/all?year=${year}&month=${month}`,
        {
          body: firstMockCompensations,
        })

    // mocked delete of the first compensation
    cy
      .intercept(
        `DELETE`,
        `*/${firstCompensationId}/soft-delete`,
        {
          statusCode: 204,
        })

    mountComponent()

    // mocked compensations for their reload after delete
    cy
      .intercept(
        `GET`,
        `*/admin/all?year=${year}&month=${month}`,
        {
          body: secondMockCompensations,
        })

    // show compensations table after we hover over total amount
    cy
      .getByData(`all-compensations-table-item-tooltip`)
      .trigger(`mouseover`)

    // check that there are 2 compensations
    cy
      .getByData(`tooltip-table-item`)
      .should(`have.length`, 2)
      .should(`include.text`, `first compensaion`)

    // click remove compensation button
    // Note: to click on a hidden element you need to use force: true
    // Cypress doesn't work well with hovering over elements, so we work with the hidden tooltip using force: true
    cy
      .getByData(`tooltip-table-remove-compensation-button`)
      .first()
      .click({
        force: true,
      })

    // check that there is only one compensation left
    cy
      .getByData(`tooltip-table-item`)
      .should(`have.length`, 1)
      .should(`not.include.text`, `first compensaion`)

  })
})

function mountComponent() {
  const allCompensationsState = new AllCompensationsState()

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsContainer
        onCompensationDeleted={() => allCompensationsState.triggerCompensationsReload()}
      />
    </AllCompensationsStateContext.Provider>,
  )
}
