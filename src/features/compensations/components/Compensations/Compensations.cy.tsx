/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config';

import Compensations from './Compensations';

const GET_ROLES = `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}all`;

const mockData = {
  list: [
    {
      date: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isUnpaid: false,
    },
    {
      date: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk milk',
      amount: 760,
      isUnpaid: true,
    },
  ],
  totalUnpaidAmount: 1520,
};

describe('Compensations', () => {
  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_ROLES, mockData);

    mountComponent();

    cy.getByData('compensations')
      .should('exist');
  });

  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_ROLES, mockData);

    mountComponent();

    cy.getByData('compensations-table-row')
      .should('have.length', 1);
  });

  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_ROLES, mockData);

    mountComponent();

    cy.getByData('compensations-filter')
      .first()
      .click();

    cy.getByData('compensations-table-row')
      .should('have.length', 2);
  });
});

function mountComponent() {
  cy.mount(
    <Compensations />,
  );
}
