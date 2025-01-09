const E2E_SMOKE_COMMENT_PREFIX = '[E2E-SMOKE]';

describe('Compensations Smoke', () => {
  it(`
  GIVEN personal compensations page
  WHEN add a new compensation
  SHOULD see it in the personal list
  GIVEN all compensations page
  AND click MarkAsPaid for a new compensation
  SHOULD not see it in the personal list
  `, () => {
    cy.visit('/compensations/my');

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

    cy
      .getByData('compensations-table')
      .contains(newCompensationComment);

    cy.visit('/compensations/all');

    cy.visit('/compensations/my');
  });
});
