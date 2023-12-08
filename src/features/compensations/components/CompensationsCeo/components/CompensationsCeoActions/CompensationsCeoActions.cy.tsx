/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsCeoState from '../../state/CompensationsCeoState';
import CompensationsCeoStateContext from '../../state/CompensationsCeoStateContext';

import CompensationsCeoActions from './CompensationsCeoActions';

describe('CompensationsCeoActions', () => {
  it('SHOULD render actions WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('compensation-actions')
      .should('exist');
  });
});

function mountComponent() {
  const compensationsCeoState = new CompensationsCeoState();

  cy.mount(
    <CompensationsCeoStateContext.Provider value={compensationsCeoState}>
      <CompensationsCeoActions />
    </CompensationsCeoStateContext.Provider>,
  );
}
