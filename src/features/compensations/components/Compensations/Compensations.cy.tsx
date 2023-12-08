/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

import Compensations from './Compensations';
import CompensationsState from './state/CompensationsState';
import CompensationsStateContext from './state/CompensationsStateContext';

const GET_COMPENSATIONS = `${API_ROOT}${LINK_TO_SALARY_SERVICE}/compensations/all`;

const initialData = {
  list: [
    {
      dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
      dateCompensation: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isPaid: false,
      employeeId: 1,
    },
    {
      dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
      dateCompensation: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk milk',
      amount: 760,
      isPaid: true,
      employeeId: 1,
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

  it('SHOULD render compensations  with data WHEN update filter', () => {
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
  const compensationsState = new CompensationsState();

  cy.mount(
    <CompensationsStateContext.Provider value={compensationsState}>
      <Compensations />
    </CompensationsStateContext.Provider>,
  );
}
