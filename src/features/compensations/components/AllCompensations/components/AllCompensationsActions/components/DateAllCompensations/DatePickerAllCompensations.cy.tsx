/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';
import { AllCompensationsState } from '../../../../state/AllCompensationsState';
import { AllCompensationsStateContext } from '../../../../state/AllCompensationsStateContext';
import { DatePickerAllCompensations } from './DatePickerAllCompensations';

describe('DatePickerAllCompensations', () => {
  it(`
  GIVEN all compensations page 
  WHEN visit compensations page
  THEN render data picker component
  `, () => {
    mountComponent();

    cy.getByData('date-picker-all-compensations')
      .should('exist');
  });

  it(`
  GIVEN all compensations page 
  WHEN select next year
  THEN render correct date
  `, () => {
    mountComponent();

    cy.getByData('date-picker-all-compensations-select')
      .click();

    cy.get('[aria-label="Next Year"]')
      .click();

    cy.contains('Jan')
      .click();

    cy.getByData('date-picker-all-compensations-result')
      .should('have.text', 'Jan 2024');
  });

  it(`
  GIVEN all compensations page 
  WHEN select next year
  THEN render correct date
  `, () => {
    mountComponent();

    cy.getByData('date-picker-all-compensations-select')
      .click();

    cy.get('[aria-label="Previous Year"]')
      .click();

    cy.contains('Feb')
      .click();

    cy.getByData('date-picker-all-compensations-result')
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
