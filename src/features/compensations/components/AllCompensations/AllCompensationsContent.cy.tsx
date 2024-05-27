/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { formatMoney } from '../../../../common/utils/formatMoney';
import { AllCompensationsContent } from './AllCompensationsContent';
import { AllCompensationsState, getSelectedDate } from './state/AllCompensationsState';
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext';

const initialData = {
  items: [
    {
      employeeFullName: 'Ceo Ceo Ceo',
      employeeId: 1,
      compensationRequestedForYearAndMonth: '2023-12-01T05:00:00Z',
      totalAmount: 2760.45,
      unpaidAmount: 0,
      isPaid: true,
      compensations: [
        {
          id: 56,
          compensationType: 'German',
          comment: 'I bought this',
          amount: 2760.45,
          compensationRequestedAtUtc: '2023-12-19T06:56:49Z',
        },
      ],
    },
    {
      employeeFullName: 'Admin Admin Admin',
      employeeId: 2,
      compensationRequestedForYearAndMonth: '2023-12-01T05:00:00Z',
      totalAmount: 760,
      unpaidAmount: 760,
      isPaid: false,
      compensations: [
        {
          id: 1,
          compensationType: 'English',
          comment: 'I bought milk',
          amount: 760,
          compensationRequestedAtUtc: '2023-12-19T06:56:49Z',
        },
      ],
    },
  ],
  totalAmount: 3520.45,
  totalUnpaidAmount: 760,
};

describe('AllCompensationsContent', () => {
  it(`
  GIVEN all compensations page 
  WHEN visit compensations page 
  THEN render compensations table and actions
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('all-compensations-table')
      .should('exist');
    cy.getByData('all-compensations-actions')
      .should('exist');
    cy.getByData('all-compensations-content')
      .should('exist');
  });

  it(`
  GIVEN all compensations page 
  WHEN change filter item
  THEN change data
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('all-compensations-table-column-amount')
      .should('have.length', 1);

    cy.getByData('all-compensations-table-sum')
      .should('have.text', formatMoney(3520.45));

    cy.getByData('all-compensations-table-unpaid-sum')
      .should('have.text', formatMoney(760));

    cy.getByData('all-compensations-filter-button')
      .first()
      .click();

    cy.getByData('all-compensations-table-column-amount')
      .should('have.length', 2);

    cy.getByData('all-compensations-table-sum')
      .should('have.text', formatMoney(3520.45));

    cy.getByData('all-compensations-table-unpaid-sum')
      .should('have.text', formatMoney(760));
  });

  it(`
  GIVEN all compensations page 
  WHEN change filter item
  THEN change no data text
  `, () => {
    mountComponent({
      compensations: {
        items: [],
        totalAmount: 0,
        totalUnpaidAmount: 0,
      },
    });

    cy.getByData('all-compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No records in this month');

    cy.getByData('all-compensations-filter-button')
      .last()
      .click();

    cy.getByData('all-compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No unpaid compensation in this month');
  });

  it(`
  GIVEN all compensations page 
  WHEN visit compensations page 
  THEN render previous month if today date < 15
  `, () => {
    mountComponent({
      compensations: initialData,
    });

    cy.getByData('date-picker-all-compensations-result')
      .should('have.text', 'Jul 2023');
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

  allCompensationsState.setFilterTerm();

  allCompensationsState.updateDate(getSelectedDate(new Date('2023-08-10')));

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsContent />
    </AllCompensationsStateContext.Provider>,
  );
}
