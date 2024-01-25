/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { AllCompensationsContent } from './AllCompensationsContent';
import { AllCompensationsState } from './state/AllCompensationsState';
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext';

describe('AllCompensations', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page 
  THEN render compensations table and actions
  `, () => {
    mountComponent();

    cy.getByData('all-compensations-table')
      .should('exist');
    cy.getByData('compensation-actions')
      .should('exist');
    cy.getByData('all-compensations')
      .should('exist');
  });

  it(`
  GIVEN compensations all page 
  WHEN change filter item
  THEN change no data text
  `, () => {
    mountComponent();

    cy.getByData('all-compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No unpaid compensation in this month');

    cy.getByData('all-compensations-filter')
      .first()
      .click();

    cy.getByData('all-compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No records in this month');
  });
});

function mountComponent() {
  const allCompensationsState = new AllCompensationsState();

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsContent />
    </AllCompensationsStateContext.Provider>,
  );
}
