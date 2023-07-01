import '../../../../../../../cypress/support/commands';

import DatePickerCompensations from './DatePickerCompensations';

describe('ListTypesCompensations', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('date-picker-compensations')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <DatePickerCompensations />,
  );
}
