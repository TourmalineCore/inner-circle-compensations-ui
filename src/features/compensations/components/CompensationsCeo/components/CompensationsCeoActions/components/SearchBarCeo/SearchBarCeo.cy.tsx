/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import CompensationsCeoState from '../../../../state/CompensationsCeoState';
import CompensationsCeoStateContext from '../../../../state/CompensationsCeoStateContext';

import SearchBarCeo from './SearchBarCeo';

describe('SearchBarCeo', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('search-bar')
      .should('exist');
  });
});

function mountComponent() {
  const compensationsCeoState = new CompensationsCeoState();

  cy.mount(
    <CompensationsCeoStateContext.Provider value={compensationsCeoState}>
      <SearchBarCeo />
    </CompensationsCeoStateContext.Provider>,
  );
}
