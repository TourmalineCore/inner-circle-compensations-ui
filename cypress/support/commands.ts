/// <reference types="cypress" />
import { createAuthService } from '@tourmalinecore/react-tc-auth';
import { getFingerprint } from '../../src/common/utils/getFingerprint';

Cypress.on('uncaught:exception', () => false);

Cypress.on('uncaught:exception', (err) => {
  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  if (err.message.includes('Request failed with status code')) {
    return false;
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test

  return true;
});

Cypress.Commands.add('getByData', (selector) => cy.get(`[data-cy=${selector}]`));

export {};

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getByData', (selector) => cy.get(`[data-cy=${selector}]`));

Cypress.Commands.add('authByApi', () => {
  let accessToken: string;
  const authService = createAuthService({
    authApiRoot: Cypress.env('API_ROOT_AUTH'),
    authType: 'ls',
    tokenAccessor: 'accessToken',
    refreshTokenAccessor: 'refreshToken',
    tokenValueAccessor: 'value',
    tokenExpireAccessor: 'expiresInUtc',
  });

  cy.wrap(getFingerprint())
    .then((fingerprint) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_ROOT_AUTH')}/login`,
        body: {
          clientFingerPrint: fingerprint,
          login: Cypress.env('USER_LOGIN'),
          password: Cypress.env('USER_PASSWORD'),
        },
      }).then(({ body: loginResponseBody }) => {
        authService.setLoggedIn(loginResponseBody);

        accessToken = authService.getAuthToken();
        Cypress.env('accessToken', accessToken);
      });
    });
});

Cypress.Commands.add('authByUI', () => {
  cy.intercept('POST', '/api/auth/login').as('authRequest');
  cy.visit('/auth').then(() => {
    cy.url().then((url) => {
      if (url.includes('/auth')) {
        const INPUT_LOGIN = '#login';
        const INPUT_PASSWORD = '#password';
        const LOG_IN_BUTTON = 'Log In';

        cy.get(INPUT_LOGIN).type(Cypress.env('USER_LOGIN'));
        cy.get(INPUT_PASSWORD).type(Cypress.env('USER_PASSWORD'));

        cy.contains(LOG_IN_BUTTON).click();
      }
    });
  });
  cy.wait('@authRequest');
});

Cypress.Commands.add('removeCompensations', () => {
  type CompensationsItemType = {
    id?: number;
    compensationRequestedAtUtc: string;
    compensationRequestedForYearAndMonth: string;
    comment: string;
    amount: number;
    isPaid: boolean;
    compensationType: string;
    employeeId: number;
  };

  type CompensationsType = {
    list: CompensationsItemType[],
    totalUnpaidAmount: number;
  };

  cy.request<CompensationsType>({
    method: 'GET',
    url: `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/all`,
    headers: {
      Authorization: `Bearer ${Cypress.env('accessToken')}`,
    },
  }).then(({ body }) => {
    const compensations = body;

    const compensationsToDelete = compensations.list.filter(({ comment }) => comment.startsWith('[E2E-SMOKE]'));

    compensationsToDelete.forEach(({ id }) => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/${id}/hard-delete`,
        headers: {
          Authorization: `Bearer ${Cypress.env('accessToken')}`,
        },
      });
    });
  });
});

Cypress.Commands.add('clearAuthToken', () => {
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();

  Cypress.env('accessToken', null);
});
