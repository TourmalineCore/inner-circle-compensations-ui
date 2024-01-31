/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import { CreateCompensationsState } from '../../state/CreateCompensationsState';
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext';
import { DatePickerCompensations } from './DatePickerCompensations';

describe('DatePickerCompensations', () => {
  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render data picker component
  `, () => {
    mountComponent();

    cy.getByData('date-picker-compensations')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN select next year
  THEN render correct date
  `, () => {
    mountComponent();

    cy.getByData('date-picker-compensations-select')
      .click();

    cy.get('[aria-label="Next Year"]')
      .click();

    cy.contains('Jan')
      .click();

    cy.getByData('date-picker-compensations-result')
      .should('have.text', 'January 2024');
  });

  it(`
  GIVEN compensations page 
  WHEN select next year
  THEN render correct date
  `, () => {
    mountComponent();

    cy.getByData('date-picker-compensations-select')
      .click();

    cy.get('[aria-label="Previous Year"]')
      .click();

    cy.contains('Feb')
      .click();

    cy.getByData('date-picker-compensations-result')
      .should('have.text', 'February 2022');
  });
});

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState();

  createCompensationsState.updateDate(new Date('2023-08-1'));

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <DatePickerCompensations />
    </CreateCompensationsStateContext.Provider>,
  );
}
