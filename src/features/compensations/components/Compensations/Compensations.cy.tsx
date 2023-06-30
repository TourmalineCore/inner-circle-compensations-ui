/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config';

import Compensations from './Compensations';

const GET_COMPENSATIONS = `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}all`;

const initialData = {
  list: [
    {
      dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
      dateCompensation: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isUnpaid: false,
    },
    {
      dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
      dateCompensation: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk milk',
      amount: 760,
      isUnpaid: true,
    },
  ],
  totalUnpaidAmount: 1520,
};

describe('Compensations', () => {
  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_COMPENSATIONS, {});

    mountComponent();

    cy.getByData('compensations')
      .should('exist');
  });

  it('SHOULD render compensations with data WHEN have data', () => {
    cy.intercept('GET', GET_COMPENSATIONS, initialData);

    mountComponent();

    cy.getByData('compensations-table-row')
      .should('have.length', 1);
  });

  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_COMPENSATIONS, initialData);

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
