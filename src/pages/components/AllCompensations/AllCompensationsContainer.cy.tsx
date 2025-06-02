import { AllCompensationsContainer } from './AllCompensationsContainer'
import { AllCompensationsState, getSelectedDate } from './state/AllCompensationsState'
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext'

describe(`AllCompensationsContainer`, () => {
  const now = getSelectedDate(new Date())
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const mockCompensations: AllCompensationsType = {
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
            id: 57,
          },
          {
            quantity: 1,
            amount: 7000,
            comment: `meat`,
            compensationType: `Products`,
            compensationRequestedAtUtc: now.toISOString(),
            id: 66,
          },
        ],
        isPaid: false,
      },
    ],
    totalAmount: 7200,
    totalUnpaidAmount: 7200,
  }

  it(`
  GIVEN all compensations page 
  WHEN delete the first compensation
  SHOULD call DELETE endpoint
  AND call GET compensations endpoint
  `, () => {

    cy
      .intercept(`GET`, `**/admin/all?year=${year}&month=${month}`, {
        body: mockCompensations,
      })
      .as(`getCompensations`)

    cy
      .intercept(`DELETE`, `**//soft-delete`, {
        statusCode: 204,
      })
      .as(`deleteCompensation`)

    mountComponent()

    cy
      .getByData(`all-compensations-filter-button`)
      .first()
      .click()

    cy
      .getByData(`all-compensations-table-tooltip`)
      .first()
      .trigger(`mouseover`, {
        force: true,
      })
      .getByData(`tooltip-table-remove-compensation-button`)
      .first()
      .click({
        force: true,
      })

    cy.wait(`@deleteCompensation`)
    cy.wait(`@getCompensations`)
  })
})

function mountComponent() {
  const allCompensationsState = new AllCompensationsState()

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsContainer />
    </AllCompensationsStateContext.Provider>,
  )
}
