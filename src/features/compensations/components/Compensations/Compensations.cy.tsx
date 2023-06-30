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
  ],
  totalUnpaidAmount: 760,
};

describe('Compensations', () => {
  it('SHOULD render compensations WHEN visit compensations page', () => {
    cy.intercept('GET', GET_ROLES, mockData);

    mountComponent();

    cy.getByData('compensations')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <Compensations />,
  );
}
