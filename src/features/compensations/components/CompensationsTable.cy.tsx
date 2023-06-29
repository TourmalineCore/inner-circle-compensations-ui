import '../../../../cypress/support/commands';

import CompensationsTable from './CompensationsTable';

describe('CompensationsTable', () => {
  it('SHOULD render roles table WHEN visit roles page', () => {
    mountComponent();

    cy.getByData('compensations-table')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <CompensationsTable />,
  );
}
