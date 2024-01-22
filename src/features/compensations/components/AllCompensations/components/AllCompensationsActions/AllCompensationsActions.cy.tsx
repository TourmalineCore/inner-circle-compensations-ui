/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import { AllCompensationsState } from '../../state/AllCompensationsState';
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext';
import { AllCompensationsActions } from './AllCompensationsActions';

describe('AllCompensationsActions', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page
  THEN render actions
  `, () => {
    mountComponent();

    cy.getByData('compensation-actions')
      .should('exist');
  });
});

function mountComponent() {
  const allCompensationsState = new AllCompensationsState();

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsActions />
    </AllCompensationsStateContext.Provider>,
  );
}
