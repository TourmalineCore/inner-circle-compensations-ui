import { formatMoney } from '../../../../../common/utils/formatMoney'
import { CompensationsState } from '../../state/CompensationsState'
import { CompensationsStateContext } from '../../state/CompensationsStateContext'
import { CompensationsTable } from './CompensationsTable'

const initialData = {
  list: [
    {
      compensationRequestedAtUtc: `2023-06-08T11:42:04.467165Z`,
      compensationRequestedForYearAndMonth: `2023-06-08T11:42:04.467165Z`,
      comment: `I bought milk`,
      compensationType: `Massage`,
      amount: 760,
      isPaid: false,
      employeeId: 1,
      quantity: 2,
    },
    {
      compensationRequestedAtUtc: `2023-06-09T11:42:04.467165Z`,
      compensationRequestedForYearAndMonth: `2023-06-08T11:42:04.467165Z`,
      comment: `I bought second`,
      compensationType: `Massage`,
      amount: 760,
      isPaid: false,
      employeeId: 1,
      quantity: 1,
    },
  ],
  totalUnpaidAmount: 2280,
}

describe(`CompensationsTable`, () => {
  it(`
  GIVEN compensations personal page 
  WHEN visit compensations page
  THEN render compensations table
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`compensations-table`)
      .should(`exist`)
  })

  it(`
  GIVEN compensations personal page 
  WHEN there is data
  THEN render compensations table column 
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`compensations-table-column`)
      .should(`exist`)
  })

  it(`
  GIVEN compensations all page 
  WHEN there is data
  THEN render compensations table column total
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`compensations-table-sum`)
      .should(`exist`)
      .should(`have.text`, formatMoney(2280))
  })

  it(`
  GIVEN compensations personal page 
  WHEN there is no data
  THEN render compensations table with no data message
  `, () => {
    mountComponent({
      compensations: {
        list: [],
        totalUnpaidAmount: 0,
      },
    })

    cy
      .getByData(`compensations-table-no-data`)
      .should(`exist`)
      .should(`have.text`, `No unpaid compensation`)
  })

  it(`
  GIVEN compensations personal page 
  WHEN there is data
  THEN render valid data for all elements in column
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`compensations-table-column-month`)
      .first()
      .should(`have.text`, `Jun 2023`)

    cy
      .getByData(`compensations-table-column-type`)
      .first()
      .should(`have.text`, `Massage`)

    cy
      .getByData(`compensations-table-column-comment`)
      .first()
      .should(`have.text`, `I bought second`)

    cy
      .getByData(`compensations-table-column-amount`)
      .first()
      .should(`have.text`, formatMoney(760))
  })

  it(`
  GIVEN compensations personal page 
  WHEN there is data
  THEN sort data by date creation compensation
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`compensations-table-column-comment`)
      .first()
      .should(`have.text`, `I bought second`)

    cy
      .getByData(`compensations-table-column-comment`)
      .last()
      .should(`have.text`, `I bought milk`)
  })
})

function mountComponent({
  compensations,
}: {
  compensations: CompensationsType,
}) {
  const compensationsState = new CompensationsState()

  compensationsState.initialize({
    loadedCompensations: compensations,
  })

  cy.mount(
    <CompensationsStateContext.Provider value={compensationsState}>
      <CompensationsTable />
    </CompensationsStateContext.Provider>,
  )
}
