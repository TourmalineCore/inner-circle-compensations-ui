/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import CompensationsAllState from '../../../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';

import SearchBarAll from './SearchBarAll';

describe('SearchBarAll', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('search-bar')
      .should('exist');
  });
});

function mountComponent() {
  const compensationsAllState = new CompensationsAllState();

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <SearchBarAll />
    </CompensationsAllStateContext.Provider>,
  );
}
