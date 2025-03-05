import { formatMoney } from '../../../../../common/utils/formatMoney'
import { AllCompensationsState } from '../../state/AllCompensationsState'
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext'
import { ToolTipTable } from './ToolTipTable'

const initialData = {
  compensations: [
    {
      quantity: 2,
      amount: 100,
      comment: `milk`,
      compensationType: `Products`,
      compensationRequestedAtUtc: `2024-01-10T11:31:25Z`,
      id: 57,
    },
  ],
}

describe(`ToolTipTable`, () => {
  it(`
  GIVEN all compensations page 
  WHEN user hovers over the amount 
  THEN render tooltip table
  `, () => {
    mountComponent({
      compensations: initialData.compensations,
    })

    cy
      .getByData(`tooltip-table`)
      .should(`exist`)
  })

  it(`
  GIVEN all compensations page 
  WHEN user hovers over the amount 
  THEN render valid data for all elements
  `, () => {
    mountComponent({
      compensations: initialData.compensations,
    })

    cy
      .getByData(`tooltip-table-column-type`)
      .should(`have.text`, `Products`)

    cy
      .getByData(`tooltip-table-column-quantity`)
      .should(`have.text`, 2)

    cy
      .getByData(`tooltip-table-column-amount`)
      .should(`have.text`, formatMoney(100))

    cy
      .getByData(`tooltip-table-column-comment`)
      .should(`have.text`, `milk`)

    cy
      .getByData(`tooltip-table-column-total-amount`)
      .should(`have.text`, formatMoney(200))
  })
})

function mountComponent({
  compensations,
}: {
  compensations: EmployeeAllCompensationsItemType[],
}) {
  const allCompensationsState = new AllCompensationsState()

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <ToolTipTable compensations={compensations} />
    </AllCompensationsStateContext.Provider>,
  )
}
