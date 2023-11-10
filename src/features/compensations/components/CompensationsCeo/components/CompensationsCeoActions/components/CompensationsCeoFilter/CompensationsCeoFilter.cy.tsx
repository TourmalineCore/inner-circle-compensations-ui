/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import CompensationsCeoState from '../../../../state/CompensationsCeoState';
import CompensationsCeoStateContext from '../../../../state/CompensationsCeoStateContext';

import CompensationsCeoFilter from './CompensationsCeoFilter';

describe('CompensationsCeoFilter', () => {
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
  const compensationsCeoState = new CompensationsCeoState();

  cy.mount(
    <CompensationsCeoStateContext.Provider value={compensationsCeoState}>
      <CompensationsCeoFilter />
    </CompensationsCeoStateContext.Provider>,
  );
}
