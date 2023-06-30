/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsState from '../../state/CompensationsState';
import CompensationsStateContext from '../../state/CompensationsStateContext';

import CompensationsTable from './CompensationsTable';

const initialData = {
  list: [
    {
      date: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isUnpaid: false,
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

  it('SHOULD render compensations table row WHEN have data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-table-row')
      .should('exist');
  });

  it('SHOULD render compensations table row total WHEN have data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-table-row-total')
      .should('exist');
  });

  it('SHOULD render compensations table with not message WHEN not have data', () => {
    mountComponent({
      compensations: {
        list: [],
        totalUnpaidAmount: 0,
      },
    });

    cy.getByData('compensations-table-no-data')
      .should('exist');
  });

  it('SHOULD render valid data for all elements in row WHEN have data', () => {
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
      .should('have.class', 'compensations-table__column-amount--paid');
  });

  it('SHOULD render valid amount in row WHEN element have unpaid amount', () => {
    mountComponent({
      compensations: {
        list: [
          {
            date: '2023-06-08T11:42:04.467165Z',
            comment: 'I bought milk',
            amount: 760,
            isUnpaid: true,
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
