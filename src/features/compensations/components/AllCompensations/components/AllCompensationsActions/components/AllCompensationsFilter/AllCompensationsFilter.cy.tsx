/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import AllCompensationsState from '../../../../state/AllCompensationsState';
import AllCompensationsStateContext from '../../../../state/AllCompensationsStateContext';

import AllCompensationsFilter from './AllCompensationsFilter';

describe('AllCompensationsFilter', () => {
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
  const allCompensationsState = new AllCompensationsState();

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsFilter />
    </AllCompensationsStateContext.Provider>,
  );
}
