import '../../../../../../../cypress/support/commands';

import CompensationsFilter from './CompensationsFilter';

describe('CompensationsTable', () => {
  it('SHOULD render compensations filter WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('compensations-filter-inner')
      .should('exist');
  });

  it('SHOULD render elements in component WHEN have data about filters', () => {
    mountComponent();

    cy.getByData('compensations-filter-inner')
      .children()
      .should('have.length', 2);
  });
});

function mountComponent() {
  cy.mount(
    <CompensationsFilter />,
  );
}
