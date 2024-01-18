/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { AllCompensationsContent } from './AllCompensationsContent';
import AllCompensationsState from './state/AllCompensationsState';
import AllCompensationsStateContext from './state/AllCompensationsStateContext';

const allCompensationsState = new AllCompensationsState();

describe('AllCompensations', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page 
  THEN render compensations table and actions
  `, () => {
    mountComponent();

    cy.getByData('compensations-all-table')
      .should('exist');
    cy.getByData('compensation-actions')
      .should('exist');
    cy.getByData('compensations-all')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsContent />
    </AllCompensationsStateContext.Provider>,
  );
}
