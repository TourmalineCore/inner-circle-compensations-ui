import { formatMoney } from '../../../../../common/utils/formatMoney'
import { AllCompensationsState } from '../../state/AllCompensationsState'
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext'
import { AllCompensationsTable } from './AllCompensationsTable'

const initialData = {
  items: [
    {
      employeeFullName: `Ceo Ceo Ceo`,
      employeeId: 55,
      compensationRequestedForYearAndMonth: `2023-12-01T05:00:00Z`,
      totalAmount: 4280.45,
      unpaidAmount: 1520,
      isPaid: false,
      compensations: [
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
      ],
    },
  ],
  totalAmount: 4280.45,
  totalUnpaidAmount: 1520,
}

describe(`AllCompensationsTable`, () => {
  it(`
  GIVEN all compensations page 
  WHEN visit compensations page
  THEN render compensations table
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`all-compensations-table`)
      .should(`exist`)
  })

  it(`
  GIVEN all compensations page 
  WHEN there is data
  THEN render compensations table column 
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`all-compensations-table-item`)
      .should(`exist`)
  })

  it(`
  GIVEN all compensations page 
  WHEN there is data
  THEN render compensations table column total
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`all-compensations-table-sum`)
      .should(`exist`)
      .should(`have.text`, formatMoney(4280.45))

    cy
      .getByData(`all-compensations-table-unpaid-sum`)
      .should(`exist`)
      .should(`have.text`, formatMoney(1520))
  })

  it(`
  GIVEN all compensations page 
  WHEN there is no data
  THEN render compensations table with no data message
  `, () => {
    mountComponent({
      compensations: {
        items: [],
        totalAmount: 0,
        totalUnpaidAmount: 0,
      },
    })

    cy
      .getByData(`all-compensations-table-no-data`)
      .should(`exist`)
      .should(`have.text`, `No records in this month`)
  })

  it(`
  GIVEN all compensations page 
  WHEN there is data
  THEN render valid data for all elements in column
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`column-employee`)
      .should(`have.text`, `Ceo Ceo Ceo`)

    cy
      .getByData(`column-status`)
      .should(`have.text`, `UNPAID`)

    cy
      .getByData(`column-action`)
      .should(`exist`)

    cy
      .getByData(`column-unpaid`)
      .should(`have.text`, formatMoney(1520))

    cy
      .getByData(`column-amount`)
      .should(`have.text`, formatMoney(4280.45))
  })

  it(`
  GIVEN all compensations page 
  WHEN amount is hover 
  THEN render tooltip table 
  `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`all-compensations-table-tooltip`)
      .trigger(`mouseover`)

    cy
      .getByData(`all-compensations-table-tooltip-item`)
      .should(`exist`)
  })

  it(`
    GIVEN all compensations page 
    WHEN total unpaid amount is hover and it is 1,520
    THEN render the following nominals: 1000 * 1, 500 * 1, 100 * 1
    `, () => {
    mountComponent({
      compensations: initialData,
    })

    cy
      .getByData(`all-compensations-table-unpaid-sum`)
      .trigger(`mouseover`)

    cy
      .getByData(`all-compensations-table-unpaid-sum-nominals`)
      .contains(`1000 * 1, 500 * 1, 100 * 1`)
  })
})

function mountComponent({
  compensations,
}: {
  compensations: AllCompensationsType,
}) {
  const allCompensationsState = new AllCompensationsState()

  allCompensationsState.initialize({
    loadedCompensations: compensations,
  })

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsTable
        onDeleteClick={() => { }}
      />
    </AllCompensationsStateContext.Provider>,
  )
}
