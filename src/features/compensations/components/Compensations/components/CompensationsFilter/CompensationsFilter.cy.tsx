/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import { CompensationsState } from '../../state/CompensationsState';
import { CompensationsStateContext } from '../../state/CompensationsStateContext';
import { CompensationsFilter } from './CompensationsFilter';

describe('CompensationsFilter', () => {
  it(`
  GIVEN compensations personal page 
  WHEN visit compensations page 
  THEN render compensations filter
  `, () => {
    mountComponent();

    cy.getByData('compensations-filter')
      .should('exist');
  });

  it(`
  GIVEN compensations personal page 
  WHEN have data about filters 
  THEN render elements in component
  `, () => {
    mountComponent();

    cy.getByData('compensations-filter')
      .children()
      .should('have.length', 2);

    cy.getByData('compensations-filter-button')
      .first()
      .should('have.text', 'All');

    cy.getByData('compensations-filter-button')
      .last()
      .should('have.text', 'Unpaid');
  });

  it(`
  GIVEN compensations personal page 
  WHEN click on it filter
  THEN filter have a focus
  `, () => {
    mountComponent();

    cy.getByData('compensations-filter-button')
      .last()
      .click();

    cy.getByData('compensations-filter-button')
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
