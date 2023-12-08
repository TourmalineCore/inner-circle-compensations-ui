/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config';

import CompensationsCeo from './CompensationsCeo';

const GET_COMPENSATIONS = `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}all`;

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

describe('CompensationsCeo', () => {
  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_COMPENSATIONS, {});

    mountComponent();

    cy.getByData('compensations-ceo')
      .should('exist');
  });

  it('SHOULD render compensations with data WHEN have data', () => {
    cy.intercept('GET', GET_COMPENSATIONS, initialData);

    mountComponent();

    cy.getByData('compensations-ceo-table-row')
      .should('have.length', 1);
  });

  it('SHOULD render compensations  with data WHEN update filter', () => {
    cy.intercept('GET', GET_COMPENSATIONS, initialData);

    mountComponent();

    cy.getByData('compensations-ceo-filter')
      .first()
      .click();

    cy.getByData('compensations-ceo-table-row')
      .should('have.length', 2);
  });
});

function mountComponent() {
  cy.mount(
    <CompensationsCeo />,
  );
}
