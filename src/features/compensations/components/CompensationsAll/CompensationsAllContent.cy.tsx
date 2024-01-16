/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
// import { API_ROOT, LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

import CompensationsAllContent from './CompensationsAllContent';

// const GET_COMPENSATIONS = `${API_ROOT}${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}/admin/all?year=2023&month=12`;

const initialData = {
  items: [
    {
      compensations: [{
        amount: 100,
        comment: 'milk',
        compensationType: 'Products',
        dateCreateCompensation: '2024-01-10T11:31:25Z',
        id: 57,
      }],
      dateCompensation: '2024-01-09T09:35:22Z',
      employeeFullName: 'Ceo Ceo Ceo',
      employeeId: 57,
      isPaid: false,
      totalAmount: 100,
    },
  ],
  totalAmount: 100,
};

describe('CompensationsAll', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page 
  THEN render compensations
  `, () => {
    // cy.intercept('GET', GET_COMPENSATIONS, { items: [], totalAmount: 0 });

    mountComponent();

    cy.getByData('compensations-all')
      .should('exist');
  });

  it.skip('SHOULD render compensations with data WHEN have data', () => {
    // cy.intercept('GET', GET_COMPENSATIONS, {
    //   headers: 'Bearer',
    //   data: initialData,
    // });

    mountComponent();

    cy.getByData('compensations-all-table-item')
      .should('have.length', 1);
  });

  it.skip('SHOULD render compensations  with data WHEN update filter', () => {
    // cy.intercept('GET', GET_COMPENSATIONS, initialData);

    mountComponent();

    cy.getByData('compensations-all-filter')
      .first()
      .click();

    cy.getByData('compensations-all-table-item')
      .should('have.length', 2);
  });
});

function mountComponent() {
  cy.mount(
    <CompensationsAllContent />,
  );
}
