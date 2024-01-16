/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';
import CompensationsAllState from '../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../state/CompensationsAllStateContext';

import ToolTipTable from './ToolTipTable';

const initialData = {
  compensations: [
    {
      amount: 100,
      comment: 'milk',
      compensationType: 'Products',
      dateCreateCompensation: '2024-01-10T11:31:25Z',
      id: 57,
    },
  ],
};

describe('ToolTipTable', () => {
  it(`
  GIVEN compensations all page 
  WHEN user hovers over the amount 
  THEN render tooltip table
  `, () => {
    mountComponent({
      compensations: initialData.compensations,
    });

    cy.getByData('compensations-tooltip-table')
      .should('exist');
  });

  it(`
  GIVEN compensations all page 
  WHEN user hovers over the amount 
  THEN render valid data for all elements
  `, () => {
    mountComponent({
      compensations: initialData.compensations,
    });

    cy.getByData('compensations-tooltip-table-row-type')
      .should('have.text', 'Products');

    cy.getByData('compensations-tooltip-table-row-comment')
      .should('have.text', 'milk');

    cy.getByData('compensations-tooltip-table-row-amount')
      .should('have.text', '100 ₽');
  });
});

function mountComponent({
  compensations,
}: {
  compensations: EmployeeCompensationsAllItemType[];
}) {
  const compensationsAllState = new CompensationsAllState();

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <ToolTipTable compensations={compensations} />
    </CompensationsAllStateContext.Provider>,
  );
}
