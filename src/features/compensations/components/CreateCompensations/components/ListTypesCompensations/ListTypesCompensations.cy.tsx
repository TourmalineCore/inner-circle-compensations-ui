import '../../../../../../../cypress/support/commands';

import ListTypesCompensations from './ListTypesCompensations';

describe('ListTypesCompensations', () => {
  it('SHOULD render list types compensations WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('list-types-compensations')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <ListTypesCompensations />,
  );
}
