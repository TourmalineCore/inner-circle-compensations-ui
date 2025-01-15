/* test to launch locally */
import { AllCompensationsPage } from './pages/AllCompensationsPage';
import { PersonalCompensationsPage } from './pages/PersonalCompensationsPage';

const E2E_SMOKE_COMMENT_PREFIX = '[E2E-SMOKE]';

describe('Compensations Smoke', () => {
  beforeEach('Authorize', () => {
    cy.authByApi();
  });

  beforeEach('Cleanup', cy.removeCompensations);

  afterEach('Authorize', () => {
    cy.authByApi();
  });

  afterEach('Cleanup', cy.removeCompensations);

  it(`
  GIVEN compensations flow
  WHEN add a new compensation
  SHOULD see it as unpaid in the personal list 
  AND click MarkAsPaid for a new compensation
  SHOULD see it as paid in the personal list
  `, () => {
    cy.clearAuthToken();
    cy.authByUI();

    PersonalCompensationsPage.visit();

    const newCompensationComment = `${E2E_SMOKE_COMMENT_PREFIX} ${new Date()}`;

    cy
      .getByData('compensations-table')
      .should('be.visible')
      .should('not.contain', newCompensationComment);

    cy
      .getByData('table-create-compensations-select')
      .select('5');

    cy
      .getByData('table-create-compensations-comment')
      .type(newCompensationComment);

    cy
      .getByData('table-create-compensations-amount')
      .type('800');

    cy
      .getByData('create-compensations-container-submit')
      .click();

    PersonalCompensationsPage.checkStatus(newCompensationComment, 'unpaid');

    AllCompensationsPage.visit();
    AllCompensationsPage.findCompensation(newCompensationComment);

    cy
      .getByData('mark-as-paid-button')
      .should('be.visible')
      .click();

    PersonalCompensationsPage.visit();

    cy
      .get('#all')
      .should('be.visible')
      .click();

    PersonalCompensationsPage.checkStatus(newCompensationComment, 'paid');
  });
});
