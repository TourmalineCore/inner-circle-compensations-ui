/* test to launch in isolation in pipeline with mock requests */
import { Mocks } from './mocks/Mocks';
import { AllCompensationsPage } from './pages/AllCompensationsPage';
import { PersonalCompensationsPage } from './pages/PersonalCompensationsPage';

const E2E_SMOKE_COMMENT_PREFIX = '[E2E-SMOKE]';

const date = new Date();
const newRequestDate = date.toISOString();

const newCompensationComment = `${E2E_SMOKE_COMMENT_PREFIX} ${newRequestDate}`;

const newRequestYearAndMonth = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');

describe('Compensations Smoke', () => {
  it(`
  GIVEN compensations flow
  WHEN add a new compensation
  SHOULD see it as unpaid in the personal list 
  AND click MarkAsPaid for a new compensation
  SHOULD see it as paid in the personal list
  `, () => {
    Mocks.mockAuth();
    Mocks.mockGetAllCompensations_1();
    Mocks.mockGetTypes();
    Mocks.mockCreateCompensation();

    // // visit personal page
    // PersonalCompensationsPage.visit();

    // // check that the table doesn`t contain new compensation
    // cy.wait('@getAllCompensations_1');

    cy.log('Visiting PersonalCompensationsPage...');
    PersonalCompensationsPage.visit();

    cy.log('Waiting for getAllCompensations_1...');
    cy.wait('@getAllCompensations_1', { timeout: 10000 }).then((interception) => {
      cy.log('getAllCompensations_1 intercepted:', interception);
    });

    cy
      .getByData('compensations-table')
      .should('be.visible')
      .should('not.contain', newCompensationComment);

    // fill out new compensation`s data
    cy.wait('@getCompensationTypes');

    cy
      .getByData('table-create-compensations-select')
      .select('5');

    cy
      .getByData('table-create-compensations-comment')
      .type(newCompensationComment);

    cy
      .getByData('table-create-compensations-amount')
      .type('800');

    Mocks.mockGetAllCompensations_2(newCompensationComment, newRequestDate, newRequestYearAndMonth);

    cy
      .getByData('create-compensations-container-submit')
      .click();

    cy.wait('@createCompensation');

    // check that the table contains new compensation with "unpaid" status
    cy.wait('@getAllCompensations_2');

    PersonalCompensationsPage.checkStatus(newCompensationComment, 'unpaid');

    Mocks.mockGetAllEmployeesCompensations(newCompensationComment, newRequestDate, newRequestYearAndMonth);

    // visit all compensations page
    AllCompensationsPage.visit();

    // find our new compensation
    AllCompensationsPage.findCompensation(newCompensationComment);

    cy.wait('@getAllEmployeesCompensations');

    // make our new compensation as paid
    cy
      .getByData('mark-as-paid-button')
      .should('be.visible')
      .click();

    Mocks.mockGetAllCompensations_3(newCompensationComment, newRequestDate, newRequestYearAndMonth);

    // visit personal page
    PersonalCompensationsPage.visit();

    // check that the table contains new compensation with "paid" status
    cy.wait('@getAllCompensations_3');

    cy
      .get('#all')
      .should('be.visible')
      .click();

    PersonalCompensationsPage.checkStatus(newCompensationComment, 'paid');
  });
});
