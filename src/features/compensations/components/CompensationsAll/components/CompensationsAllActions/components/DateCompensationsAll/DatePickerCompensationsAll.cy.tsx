/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import CompensationsAllState from '../../../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';

import DatePickerCompensationsAll from './DatePickerCompensationsAll';

describe('DatePickerCompensationsAll', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('date-picker-compensations-all')
      .should('exist');
  });

  it('SHOULD render correct date WHEN select next year', () => {
    mountComponent();

    cy.getByData('date-picker-compensations-all-select')
      .click();

    cy.get('[aria-label="Next Year"]')
      .click();

    cy.contains('Jan')
      .click();

    cy.getByData('date-picker-compensations-all-result')
      .should('have.text', 'Jan 2024');
  });

  it('SHOULD render correct date WHEN select next year', () => {
    mountComponent();

    cy.getByData('date-picker-compensations-all-select')
      .click();

    cy.get('[aria-label="Previous Year"]')
      .click();

    cy.contains('Feb')
      .click();

    cy.getByData('date-picker-compensations-all-result')
      .should('have.text', 'Feb 2022');
  });
});

function mountComponent() {
  const compensationsAllState = new CompensationsAllState();

  compensationsAllState.updateDate(new Date('2023-08-1'));

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <DatePickerCompensationsAll />
    </CompensationsAllStateContext.Provider>,
  );
}
