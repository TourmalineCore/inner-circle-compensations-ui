/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';
import { AllCompensationsState } from '../../../../state/AllCompensationsState';
import { AllCompensationsStateContext } from '../../../../state/AllCompensationsStateContext';
import { SearchBarAll } from './SearchBarAll';

describe('SearchBarAll', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page 
  THEN render component
  `, () => {
    mountComponent();

    cy.getByData('search-bar')
      .should('exist');
  });
});

function mountComponent() {
  const allCompensationsState = new AllCompensationsState();

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <SearchBarAll />
    </AllCompensationsStateContext.Provider>,
  );
}
