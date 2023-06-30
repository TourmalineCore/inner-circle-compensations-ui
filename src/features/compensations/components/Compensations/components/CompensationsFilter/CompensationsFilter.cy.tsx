import '../../../../../../../cypress/support/commands';

import CompensationsFilter from './CompensationsFilter';

describe('CompensationsTable', () => {
  it('SHOULD render compensations filter WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('compensations-filter-inner')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <CompensationsFilter />,
  );
}
