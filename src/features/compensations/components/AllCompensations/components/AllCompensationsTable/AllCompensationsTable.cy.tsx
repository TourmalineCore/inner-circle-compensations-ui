/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import { AllCompensationsState } from '../../state/AllCompensationsState';
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext';
import { AllCompensationsTable } from './AllCompensationsTable';

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

describe('AllCompensationsTable', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page
  THEN render compensations table
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('all-compensations-table')
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

    cy.getByData('all-compensations-table-item')
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

    cy.getByData('all-compensations-table-total')
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

    cy.getByData('all-compensations-table-no-data')
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

    cy.getByData('all-compensations-table-row-employee')
      .should('have.text', 'Ceo Ceo Ceo');

    cy.getByData('all-compensations-table-row-status')
      .should('have.text', 'UNPAID');

    cy.getByData('all-compensations-table-row-action')
      .should('exist');

    cy.getByData('all-compensations-table-row-amount')
      .should('have.text', '3,520.45 ₽');
  });

  it(`
  GIVEN compensations all page 
  WHEN amount is hover 
  THEN render tooltip table 
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('compensations-tooltip').trigger('mouseover');

    cy.getByData('tooltip')
      .should('exist');
  });
});

function mountComponent({
  compensations,
}: {
  compensations: AllCompensationsType;
}) {
  const allCompensationsState = new AllCompensationsState();

  allCompensationsState.initialize({
    loadedCompensations: compensations,
  });

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsTable />
    </AllCompensationsStateContext.Provider>,
  );
}
