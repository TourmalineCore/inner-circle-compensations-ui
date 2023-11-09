/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';

import CreateCompensationsState from '../../state/CreateCompensationsState';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

import DatePickerCompensations from './DatePickerCompensations';

describe('ListTypesCompensations', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('date-picker-compensations')
      .should('exist');
  });

  it('SHOULD render correct date WHEN select next year', () => {
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

  it('SHOULD render correct date WHEN select next year', () => {
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
