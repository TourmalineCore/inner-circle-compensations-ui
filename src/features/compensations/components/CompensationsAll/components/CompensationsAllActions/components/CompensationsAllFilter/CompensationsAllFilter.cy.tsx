/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import CompensationsAllState from '../../../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';

import CompensationsAllFilter from './CompensationsAllFilter';

describe('CompensationsAllFilter', () => {
  it('SHOULD render compensations filter WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('compensations-all-filter-inner')
      .should('exist');
  });

  it('SHOULD render elements in component WHEN have data about filters', () => {
    mountComponent();

    cy.getByData('compensations-all-filter-inner')
      .children()
      .should('have.length', 2);
  });

  it('SHOULD be in focus WHEN  click on it', () => {
    mountComponent();

    cy.getByData('compensations-all-filter')
      .last()
      .click();

    cy.getByData('compensations-all-filter')
      .last()
      .focused();
  });
});

function mountComponent() {
  const compensationsAllState = new CompensationsAllState();

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsAllFilter />
    </CompensationsAllStateContext.Provider>,
  );
}
