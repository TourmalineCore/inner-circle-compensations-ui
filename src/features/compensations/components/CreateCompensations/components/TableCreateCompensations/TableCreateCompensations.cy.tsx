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
});

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState();

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <TableCreateCompensations />
    </CreateCompensationsStateContext.Provider>,
  );
}
