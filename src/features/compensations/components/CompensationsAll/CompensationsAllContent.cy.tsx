/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import CompensationsAllContent from './CompensationsAllContent';
import CompensationsAllState from './state/CompensationsAllState';
import CompensationsAllStateContext from './state/CompensationsAllStateContext';

const compensationsAllState = new CompensationsAllState();

describe('CompensationsAll', () => {
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
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsAllContent />
    </CompensationsAllStateContext.Provider>,
  );
}
