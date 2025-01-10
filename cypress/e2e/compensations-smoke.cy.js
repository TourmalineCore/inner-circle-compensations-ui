import { AllCompensationsPage } from './pages/AllCompensationsPage';
import { PersonalCompensationsPage } from './pages/PersonalCompensationsPage';

const E2E_SMOKE_COMMENT_PREFIX = '[E2E-SMOKE]';

describe('Compensations Smoke', () => {
  it(`
  GIVEN personal compensations page
  WHEN add a new compensation
  SHOULD see it as unpaid in the personal list
  GIVEN all compensations page
  WHEN click MarkAsPaid for a new compensation
  SHOULD see it as paid in the personal list at personal compensations page
  `, () => {
    PersonalCompensationsPage.visit();

    const newCompensationComment = `${E2E_SMOKE_COMMENT_PREFIX} ${new Date()}`;

    cy
      .getByData('compensations-table')
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

    PersonalCompensationsPage.checkStatus(newCompensationComment, 'Unpaid');

    AllCompensationsPage.visit();

    cy
      .contains(newCompensationComment)
      .parents('tr')
      .find('mark-as-paid-button')
      .click();

    PersonalCompensationsPage.visit();

    PersonalCompensationsPage.checkStatus(newCompensationComment, 'Paid');
  });
});
