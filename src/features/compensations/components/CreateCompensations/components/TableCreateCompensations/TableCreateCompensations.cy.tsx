/* eslint-disable react/jsx-no-constructed-context-values */
import CreateCompensationsState from '../../state/CreateCompensationsState';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';
import TableCreateCompensations from './TableCreateCompensations';

describe('TableCreateCompensations', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations')
      .should('exist');
  });

  it('SHOULD render table header WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations-head')
      .children()
      .should('have.length', 4);
  });

  it('SHOULD render empty compensation item on table WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations-item')
      .children()
      .should('have.length', 4);

    cy.getByData('table-create-compensations-select')
      .should('have.value', null);

    cy.getByData('table-create-compensations-comment')
      .should('have.value', '');

    cy.getByData('table-create-compensations-amount')
      .should('have.value', 0);

    cy.getByData('table-create-compensations-remove-button')
      .should('exist');
  });

  it('SHOULD render add button WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations-add-button')
      .should('exist');
  });
});

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState();

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <TableCreateCompensations />
    </CreateCompensationsStateContext.Provider>,
  );
}
