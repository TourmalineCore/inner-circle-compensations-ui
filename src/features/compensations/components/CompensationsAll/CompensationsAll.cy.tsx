/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

import { CompensationsAll } from './CompensationsAll';

const GET_COMPENSATIONS = `${API_ROOT}${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}/admin/all?year=2023&month=06`;

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
    {
      id: 2,
      employeeFullName: 'Ceo Ceo 2',
      dateCompensation: '2023-06-08T11:42:04.467165Z',
      dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isPaid: true,
    },
  ],
  totalAmount: 1520,
};

describe('CompensationsAll', () => {
  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_COMPENSATIONS, { list: [], totalAmount: 0 });

    mountComponent();

    cy.getByData('compensations-all')
      .should('exist');
  });

  it.skip('SHOULD render compensations with data WHEN have data', () => {
    cy.intercept('GET', GET_COMPENSATIONS, {
      headers: 'Bearer',
      data: initialData,
    });

    mountComponent();

    cy.getByData('compensations-all-table-item')
      .should('have.length', 1);
  });

  it.skip('SHOULD render compensations  with data WHEN update filter', () => {
    cy.intercept('GET', GET_COMPENSATIONS, initialData);

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
    <CompensationsAll />,
  );
}
