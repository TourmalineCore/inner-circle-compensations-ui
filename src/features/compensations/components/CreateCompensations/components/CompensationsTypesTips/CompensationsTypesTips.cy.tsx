import { CreateCompensationsState } from '../../state/CreateCompensationsState';
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext';
import { CompensationsTypesTips } from './CompensationsTypesTips';

describe('CompensationsTypesTips', () => {
  it(`
    GIVEN compensations page 
    WHEN visit compensations page
    THEN render compensations types tips
    `, () => {
    mountComponent();

    cy.getByData('compensations-types-tips')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN open compensations types tips
  THEN render compensations types tips
  `, () => {
    mountComponent();

    cy.getByData('compensations-types-tips')
      .click();

    cy.getByData('compensations-types-tips-list')
      .should('exist');
  });
});

function mountComponent() {
  /* eslint-disable react/jsx-no-constructed-context-values */
  const createCompensationsState = new CreateCompensationsState();

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <CompensationsTypesTips />
    </CreateCompensationsStateContext.Provider>,
  );
}
