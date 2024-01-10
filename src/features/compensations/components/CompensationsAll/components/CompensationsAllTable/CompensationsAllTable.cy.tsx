/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsAllState from '../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../state/CompensationsAllStateContext';

import CompensationsAllTable from './CompensationsAllTable';

// const initialData = {
//   list: [
//     {
//       id: 1,
//       employeeFullName: 'Ceo Ceo I',
//       dateCompensation: '2023-06-08T11:42:04.467165Z',
//       dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
//       compensationType: 'English',
//       comment: 'I bought milk',
//       amount: 760,
//       isPaid: false,
//     },
//   ],
//   totalAmount: 760,
// };

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
  it('SHOULD render compensations table WHEN visit compensations page', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table')
      .should('exist');
  });

  it('SHOULD render compensations table row WHEN there is data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table-item')
      .should('exist');
  });

  it('SHOULD render compensations table row total WHEN there is data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table-total')
      .should('exist');
  });

  it('SHOULD render compensations table with no data message WHEN there is no data', () => {
    mountComponent({
      compensations: {
        items: [],
        totalAmount: 0,
      },
    });

    cy.getByData('compensations-all-table-no-data')
      .should('exist');
  });

  it('SHOULD render valid data for all elements in row WHEN there s data', () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-all-table-row-employee')
      .should('have.text', 'Ceo Ceo Ceo');

    // cy.getByData('compensations-all-table-row-month')
    //   .should('have.text', 'Dec 2023');

    // cy.getByData('compensations-all-table-row-date')
    //   .should('have.text', '08.06.2023');

    // cy.getByData('compensations-all-table-row-type')
    //   .should('have.text', 'English');

    // cy.getByData('compensations-all-table-row-comment')
    //   .should('have.text', 'I bought milk');

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
