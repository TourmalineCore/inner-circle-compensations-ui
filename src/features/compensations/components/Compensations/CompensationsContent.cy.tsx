/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { Compensations } from './Compensations';
import { CompensationsState } from './state/CompensationsState';
import { CompensationsStateContext } from './state/CompensationsStateContext';

const initialData = {
  list: [
    {
      compensationRequestedAtUtc: '2023-06-08T11:42:04.467165Z',
      compensationRequestedForYearAndMonth: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isPaid: false,
      compensationType: 'Massage',
      employeeId: 1,
      quantity: 2,
    },
    {
      compensationRequestedAtUtc: '2023-07-08T11:42:04.467165Z',
      compensationRequestedForYearAndMonth: '2023-07-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 500,
      isPaid: true,
      compensationType: 'Massage',
      employeeId: 1,
      quantity: 1,
    },
  ],
  totalUnpaidAmount: 2280,
};

describe('CompensationsContent', () => {
  it(`
  GIVEN compensations personal page 
  WHEN visit compensations page 
  THEN render compensations table and filter
  `, () => {
    mountComponent({
      compensations: initialData,
    });
    cy.getByData('compensations-table')
      .should('exist');
    cy.getByData('compensations-filter')
      .should('exist');
    cy.getByData('compensations-content')
      .should('exist');
  });

  it(`
  GIVEN compensations personal page 
  WHEN change filter item
  THEN change data
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-table-column-amount')
      .should('have.length', 1);

    cy.getByData('compensations-table-column-amount')
      .should('have.text', '760 ₽');

    cy.getByData('compensations-table-sum')
      .should('have.text', '760 ₽');

    cy.getByData('compensations-filter-button')
      .first()
      .click();

    cy.getByData('compensations-table-column-amount')
      .should('have.length', 2);

    cy.getByData('compensations-table-sum')
      .should('have.text', '760 ₽');
  });

  it(`
  GIVEN compensations personal page 
  WHEN change filter item
  THEN change no data text
  `, () => {
    mountComponent({
      compensations: {
        list: [],
        totalUnpaidAmount: 0,
      },
    });
    cy.getByData('compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No unpaid compensation');

    cy.getByData('compensations-filter-button')
      .first()
      .click();

    cy.getByData('compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No records');
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
      <Compensations />
    </CompensationsStateContext.Provider>,
  );
}
