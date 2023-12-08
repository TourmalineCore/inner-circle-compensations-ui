/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsCeoState from '../../state/CompensationsCeoState';
import CompensationsCeoStateContext from '../../state/CompensationsCeoStateContext';

import CompensationsCeoTable from './CompensationsCeoTable';

const initialData = {
  list: [
    {
      id: 1,
      employeeFullName: 'Ceo Ceo I',
      dateCompensation: '2023-06-08T11:42:04.467165Z',
      dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isPaid: false,
    },
  ],
  totalAmount: 760,
};

describe('CompensationsCeoTable', () => {
  it('SHOULD render compensations table WHEN visit compensations page', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-ceo-table')
      .should('exist');
  });

  it('SHOULD render compensations table row WHEN there is data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-ceo-table-row')
      .should('exist');
  });

  it('SHOULD render compensations table row total WHEN there is data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-ceo-table-row-total')
      .should('exist');
  });

  it('SHOULD render compensations table with no data message WHEN there is no data', () => {
    mountComponent({
      compensations: {
        list: [],
        totalAmount: 0,
      },
    });

    cy.getByData('compensations-ceo-table-no-data')
      .should('exist');
  });

  it('SHOULD render valid data for all elements in row WHEN there s data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-ceo-table-row-month')
      .should('have.text', 'June 2023');

    cy.getByData('compensations-ceo-table-row-date')
      .should('have.text', '08.06.2023');

    cy.getByData('compensations-ceo-table-row-comment')
      .should('have.text', 'I bought milk');

    cy.getByData('compensations-ceo-table-row-amount')
      .should('have.class', 'compensations-ceo-table__column-amount--unpaid');
  });

  it('SHOULD render valid amount in row WHEN element has unpaid amount', () => {
    mountComponent({
      compensations: {
        list: [
          {
            id: 1,
            employeeFullName: 'Ceo Ceo I',
            dateCompensation: '2023-06-08T11:42:04.467165Z',
            dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
            comment: 'I bought milk',
            amount: 760,
            isPaid: false,
          },
        ],
        totalAmount: 760,
      },
    });

    cy.getByData('compensations-ceo-table-row-amount')
      .should('have.class', 'compensations-ceo-table__column-amount--unpaid');
  });
});

function mountComponent({
  compensations,
}: {
  compensations: CompensationsCeoType;
}) {
  const compensationsCeoState = new CompensationsCeoState();

  compensationsCeoState.initialize({
    loadedCompensations: compensations,
  });

  cy.mount(
    <CompensationsCeoStateContext.Provider value={compensationsCeoState}>
      <CompensationsCeoTable />
    </CompensationsCeoStateContext.Provider>,
  );
}
