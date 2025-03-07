import { AllCompensationsState } from '../../../../state/AllCompensationsState'
import { AllCompensationsStateContext } from '../../../../state/AllCompensationsStateContext'
import { MarkAsPaidButton } from './MarkAsPaidButton'

const initialData = [
  {
    id: 55,
    compensationType: `Massage`,
    quantity: 2,
    comment: `I bought milk`,
    amount: 760,
    compensationRequestedAtUtc: `2023-12-19T06:56:49Z`,
  },
  {
    id: 56,
    compensationType: `Massage`,
    quantity: 1,
    comment: `I bought this`,
    amount: 2760.45,
    compensationRequestedAtUtc: `2023-12-19T06:56:49Z`,
  },
]

describe(`MarkAsPaidButton`, () => {
  it(`
  GIVEN all compensations page 
  WHEN visit compensations page
  THEN render component
  `, () => {
    mountComponent()

    cy
      .getByData(`mark-as-paid-button`)
      .should(`exist`)
  })

  it(`
  GIVEN all compensations page 
  WHEN click on button
  THEN this button should be in focus
  `, () => {
    mountComponent()

    cy
      .getByData(`mark-as-paid-button`)
      .last()
      .click()

    cy
      .getByData(`mark-as-paid-button`)
      .last()
      .focused()
  })
})

function mountComponent() {
  const allCompensationsState = new AllCompensationsState()

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <MarkAsPaidButton compensations={initialData} />
    </AllCompensationsStateContext.Provider>,
  )
}
