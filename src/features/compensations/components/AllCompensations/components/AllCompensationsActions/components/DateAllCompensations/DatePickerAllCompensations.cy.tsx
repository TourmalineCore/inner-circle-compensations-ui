/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import AllCompensationsState from '../../../../state/AllCompensationsState';
import AllCompensationsStateContext from '../../../../state/AllCompensationsStateContext';

import DatePickerAllCompensations from './DatePickerAllCompensations';

describe('DatePickerAllCompensations', () => {
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
  const allCompensationsState = new AllCompensationsState();

  allCompensationsState.updateDate(new Date('2023-08-1'));

  cy.mount(
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <DatePickerAllCompensations />
    </AllCompensationsStateContext.Provider>,
  );
}
