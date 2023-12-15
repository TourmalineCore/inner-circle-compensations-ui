/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsAllState from '../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../state/CompensationsAllStateContext';

import CompensationsAllActions from './CompensationsAllActions';

describe('CompensationsAllActions', () => {
  it('SHOULD render actions WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('compensation-actions')
      .should('exist');
  });
});

function mountComponent() {
  const compensationsAllState = new CompensationsAllState();

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsAllActions />
    </CompensationsAllStateContext.Provider>,
  );
}
