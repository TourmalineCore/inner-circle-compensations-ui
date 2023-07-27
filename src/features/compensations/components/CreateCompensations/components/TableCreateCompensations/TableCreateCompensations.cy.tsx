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
});

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState();

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <TableCreateCompensations />
    </CreateCompensationsStateContext.Provider>,
  );
}
