/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import AllCompensationsState from '../../../../state/AllCompensationsState';
import AllCompensationsStateContext from '../../../../state/AllCompensationsStateContext';

import AllCompensationsFilter from './AllCompensationsFilter';

describe('AllCompensationsFilter', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page 
  THEN render compensations filter
  `, () => {
    mountComponent();

    cy.getByData('compensations-all-filter-inner')
      .should('exist');
  });

  it(`
  GIVEN compensations all page 
  WHEN have data about filters 
  THEN render elements in component
  `, () => {
    mountComponent();

    cy.getByData('compensations-all-filter-inner')
      .children()
      .should('have.length', 2);

    cy.getByData('compensations-all-filter')
      .first()
      .should('have.text', 'All');

    cy.getByData('compensations-all-filter')
      .last()
      .should('have.text', 'Unpaid');
  });

  it(`
  GIVEN compensations all page 
  WHEN click on it filter
  THEN filter have a focus
  `, () => {
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
