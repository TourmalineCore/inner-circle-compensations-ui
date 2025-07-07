import { AllCompensationsContainer } from './AllCompensationsContainer'
import { AllCompensationsState, getSelectedDate } from './state/AllCompensationsState'
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext'

describe(`AllCompensationsContainer`, () => {
  const now = getSelectedDate(new Date())
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const firstCompensationId = 57
  const secondCompensationId = 66

  const firstMockCompensations: AllCompensationsType = {
    items: [
      {
        employeeId: 101,
        employeeFullName: `Ivan Ivanov`,
        compensationRequestedForYearAndMonth: `${year}-${month}`,
        totalAmount: 7200,
        unpaidAmount: 7200,
        compensations: [
          {
            quantity: 2,
            amount: 100,
            comment: `milk`,
            compensationType: `Products`,
            compensationRequestedAtUtc: now.toISOString(),
            id: firstCompensationId,
          },
          {
            quantity: 1,
            amount: 7000,
            comment: `meat`,
            compensationType: `Products`,
            compensationRequestedAtUtc: now.toISOString(),
            id: secondCompensationId,
          },
        ],
        isPaid: false,
      },
    ],
    totalAmount: 7200,
    totalUnpaidAmount: 7200,
  }

  const secondMockCompensations: AllCompensationsType = {
    items: [
      {
        employeeId: 101,
        employeeFullName: `Ivan Ivanov`,
        compensationRequestedForYearAndMonth: `${year}-${month}`,
        totalAmount: 7000,
        unpaidAmount: 7000,
        compensations: [
          {
            quantity: 1,
            amount: 7000,
            comment: `meat`,
            compensationType: `Products`,
            compensationRequestedAtUtc: now.toISOString(),
            id: secondCompensationId,
          },
        ],
        isPaid: false,
      },
    ],
    totalAmount: 7000,
    totalUnpaidAmount: 7000,
  }

  it(`
  GIVEN all compensations page 
  WHEN delete the first compensation
  SHOULD call DELETE endpoint
  AND call GET compensations endpoint
  `, () => {

    // get all compensations with first mock
    cy
      .intercept(
        `GET`,
        `*/admin/all?year=${year}&month=${month}`,
        {
          body: firstMockCompensations,
        })

    // soft delete compensation by id
    cy
      .intercept(
        `DELETE`,
        `*/${firstCompensationId}/soft-delete`,
        {
          statusCode: 204,
        })

    mountComponent()

    // get all compensations with second mock
    cy
      .intercept(
        `GET`,
        `*/admin/all?year=${year}&month=${month}`,
        {
          body: secondMockCompensations,
        })

    // trigger MouseOver on tooltip
    cy
      .getByData(`all-compensations-table-tooltip`)
      .trigger(`mouseover`)

    // check that compensations length is 2
    cy
      .getByData(`tooltip-table-item`)
      .should(`have.length`, 2)

    // click remove compensation button
    // Note: to click on a hidden element you need to use force: true
    // Cypress doesn't work well with hovering over elements, so we work with the hidden tooltip using force: true
    cy
      .getByData(`tooltip-table-remove-compensation-button`)
      .first()
      .click({
        force: true,
      })

    // check that compensations length is 1
    cy
      .getByData(`tooltip-table-item`)
      .should(`have.length`, 1)
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
