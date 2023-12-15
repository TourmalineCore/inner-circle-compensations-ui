/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import CompensationsAllState from '../../../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';

import MarkAsPaidButton from './MarkAsPaidButton';

describe('MarkAsPaidButton', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('mark-as-paid-button-submit')
      .should('exist');
  });

  it('SHOULD be in focus WHEN  click on it', () => {
    mountComponent();

    cy.getByData('mark-as-paid-button-submit')
      .last()
      .click();

    cy.getByData('mark-as-paid-button-submit')
      .last()
      .focused();
  });
});

function mountComponent() {
  const compensationsAllState = new CompensationsAllState();

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <MarkAsPaidButton />
    </CompensationsAllStateContext.Provider>,
  );
}
