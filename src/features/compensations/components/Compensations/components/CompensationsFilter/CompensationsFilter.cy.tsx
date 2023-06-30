/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';

import CompensationsState from '../../state/CompensationsState';
import CompensationsStateContext from '../../state/CompensationsStateContext';

import CompensationsFilter from './CompensationsFilter';

describe('CompensationsFilter', () => {
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

  it('SHOULD be in focus WHEN  click on it', () => {
    mountComponent();

    cy.getByData('compensations-filter')
      .last()
      .click();

    cy.getByData('compensations-filter')
      .last()
      .focused();
  });
});

function mountComponent() {
  const compensationsState = new CompensationsState();

  cy.mount(
    <CompensationsStateContext.Provider value={compensationsState}>
      <CompensationsFilter />
    </CompensationsStateContext.Provider>,
  );
}
