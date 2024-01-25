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

    cy.getByData('compensations-filter-inner')
      .should('exist');
  });

  it(`
  GIVEN compensations personal page 
  WHEN have data about filters 
  THEN render elements in component
  `, () => {
    mountComponent();

    cy.getByData('compensations-filter-inner')
      .children()
      .should('have.length', 2);

    cy.getByData('compensations-filter')
      .first()
      .should('have.text', 'All');

    cy.getByData('compensations-filter')
      .last()
      .should('have.text', 'Unpaid');
  });

  it(`
  GIVEN compensations personal page 
  WHEN click on it filter
  THEN filter have a focus
  `, () => {
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
