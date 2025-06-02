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
      onDeleteClick: () => { },
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
      onDeleteClick: () => { },
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
      // to bypass newly introduced X button which affects this cell's text
      .contains(formatMoney(200))
  })

  it(`
  GIVEN all compensations page 
  WHEN user removes a compensation
  THEN should call onDelete callback with its id
  `, () => {
    mountComponent({
      compensations: [
        {
          quantity: 2,
          amount: 100,
          comment: `milk`,
          compensationType: `Products`,
          compensationRequestedAtUtc: `2024-01-10T11:31:25Z`,
          id: 57,
        },
        {
          quantity: 1,
          amount: 7000,
          comment: `meat`,
          compensationType: `Products`,
          compensationRequestedAtUtc: `2024-01-10T11:31:25Z`,
          id: 66,
        },
      ],
      onDeleteClick: cy
        .spy()
        .as(`onDeleteSpy`),
    })

    cy
      .getByData(`tooltip-table-remove-compensation-button`)
      .last()
      .click()

    cy
      .get(`@onDeleteSpy`)
      .should(`have.been.calledWith`, 66)
  })
})

function mountComponent({
  compensations,
  onDeleteClick,
}: {
  compensations: EmployeeAllCompensationsItemType[],
  onDeleteClick: (compensationId: number) => unknown,
}) {
  const allCompensationsState = new AllCompensationsState()

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <ToolTipTable
        compensations={compensations}
        onDeleteClick={onDeleteClick}
      />
    </AllCompensationsStateContext.Provider>,
  )
}
