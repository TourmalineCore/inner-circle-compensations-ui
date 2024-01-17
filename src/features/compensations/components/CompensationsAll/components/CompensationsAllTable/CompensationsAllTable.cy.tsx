/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsAllState from '../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../state/CompensationsAllStateContext';

import CompensationsAllTable from './CompensationsAllTable';

const initialData = {
  items: [
    {
      employeeFullName: 'Ceo Ceo Ceo',
      employeeId: 55,
      dateCompensation: '2023-12-01T05:00:00Z',
      totalAmount: 3520.45,
      isPaid: false,
      compensations: [
        {
          id: 55,
          compensationType: 'English',
          comment: 'I bought milk',
          amount: 760,
          dateCreateCompensation: '2023-12-19T06:56:49Z',
        },
        {
          id: 56,
          compensationType: 'German',
          comment: 'I bought this',
          amount: 2760.45,
          dateCreateCompensation: '2023-12-19T06:56:49Z',
        },
      ],
    },
  ],
  totalAmount: 3520.45,
};

describe('CompensationsAllTable', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page
  THEN render compensations table
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table')
      .should('exist');
  });

  it(`
  GIVEN compensations all page 
  WHEN there is data
  THEN render compensations table row 
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table-item')
      .should('exist');
  });

  it(`
  GIVEN compensations all page 
  WHEN there is data
  THEN render compensations table row total
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table-total')
      .should('exist');
  });

  it(`
  GIVEN compensations all page 
  WHEN there is no data
  THEN render compensations table with no data message
  `, () => {
    mountComponent({
      compensations: {
        items: [],
        totalAmount: 0,
      },
    });

    cy.getByData('compensations-all-table-no-data')
      .should('exist');
  });

  it(`
  GIVEN compensations all page 
  WHEN there is data
  THEN render valid data for all elements in row
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table-row-employee')
      .should('have.text', 'Ceo Ceo Ceo');

    cy.getByData('compensations-all-table-row-status')
      .should('have.text', 'UNPAID');

    cy.getByData('compensations-all-table-row-action')
      .should('exist');

    cy.getByData('compensations-all-table-row-amount')
      .should('have.text', '3,520.45 ₽');
  });
});

function mountComponent({
  compensations,
}: {
  compensations: CompensationsAllType;
}) {
  const compensationsAllState = new CompensationsAllState();

  compensationsAllState.initialize({
    loadedCompensations: compensations,
  });

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsAllTable />
    </CompensationsAllStateContext.Provider>,
  );
}
