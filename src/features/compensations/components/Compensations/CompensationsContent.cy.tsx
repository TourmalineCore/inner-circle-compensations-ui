/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { Compensations } from './Compensations';
import { CompensationsState } from './state/CompensationsState';
import { CompensationsStateContext } from './state/CompensationsStateContext';

describe('CompensationsContent', () => {
  it(`
  GIVEN compensations personal page 
  WHEN visit compensations page 
  THEN render compensations table and filter
  `, () => {
    mountComponent();

    cy.getByData('compensations-table')
      .should('exist');
    cy.getByData('compensations-filter')
      .should('exist');
    cy.getByData('compensations-content')
      .should('exist');
  });

  it(`
  GIVEN compensations personal page 
  WHEN change filter item
  THEN change no data text
  `, () => {
    mountComponent();

    cy.getByData('compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No unpaid compensation in this month');

    cy.getByData('compensations-filter-button')
      .first()
      .click();

    cy.getByData('compensations-table-no-data')
      .should('exist')
      .should('have.text', 'No records in this month');
  });
});

function mountComponent() {
  const compensationsState = new CompensationsState();

  cy.mount(
    <CompensationsStateContext.Provider value={compensationsState}>
      <Compensations />
    </CompensationsStateContext.Provider>,
  );
}
