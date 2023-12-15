/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsState from '../../state/CompensationsState';
import CompensationsStateContext from '../../state/CompensationsStateContext';

import CompensationsTable from './CompensationsTable';

const initialData = {
  list: [
    {
      dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
      dateCompensation: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isPaid: false,
      employeeId: 1,
    },
  ],
  totalUnpaidAmount: 760,
};

describe('CompensationsTable', () => {
  it('SHOULD render compensations table WHEN visit compensations page', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-table')
      .should('exist');
  });

  it('SHOULD render compensations table row WHEN there is data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-table-row')
      .should('exist');
  });

  it('SHOULD render compensations table row total WHEN there is data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-table-row-total')
      .should('exist');
  });

  it('SHOULD render compensations table with no data message WHEN there is no data', () => {
    mountComponent({
      compensations: {
        list: [],
        totalUnpaidAmount: 0,
      },
    });

    cy.getByData('compensations-table-no-data')
      .should('exist');
  });

  it('SHOULD render valid data for all elements in row WHEN there s data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-table-row-month')
      .should('have.text', 'June 2023');

    cy.getByData('compensations-table-row-date')
      .should('have.text', '08.06.2023');

    cy.getByData('compensations-table-row-comment')
      .should('have.text', 'I bought milk');

    cy.getByData('compensations-table-row-amount')
      .should('have.class', 'compensations-table__column-amount--unpaid');
  });

  it('SHOULD render valid amount in row WHEN element has unpaid amount', () => {
    mountComponent({
      compensations: {
        list: [
          {
            dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
            dateCompensation: '2023-06-08T11:42:04.467165Z',
            comment: 'I bought milk',
            amount: 760,
            isPaid: false,
            employeeId: 1,
          },
        ],
        totalUnpaidAmount: 760,
      },
    });

    cy.getByData('compensations-table-row-amount')
      .should('have.class', 'compensations-table__column-amount--unpaid');
  });
});

function mountComponent({
  compensations,
}: {
  compensations: CompensationsType;
}) {
  const compensationsState = new CompensationsState();

  compensationsState.initialize({
    loadedCompensations: compensations,
  });

  cy.mount(
    <CompensationsStateContext.Provider value={compensationsState}>
      <CompensationsTable />
    </CompensationsStateContext.Provider>,
  );
}
