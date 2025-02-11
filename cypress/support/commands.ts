/// <reference types="cypress" />
import { createAuthService } from '@tourmalinecore/react-tc-auth'

Cypress.on(`uncaught:exception`, () => false)

Cypress.on(`uncaught:exception`, (err) => {
  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  if (err.message.includes(`Request failed with status code`)) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test

  return true
})

Cypress.Commands.add(`getByData`, (selector) => cy.get(`[data-cy=${selector}]`))

export { }

Cypress.Commands.add(`authByApi`, () => {
  let accessToken: string

  const authService = createAuthService({
    authApiRoot: Cypress.env(`API_ROOT_AUTH`),
    authType: `ls`,
    tokenAccessor: `accessToken`,
    refreshTokenAccessor: `refreshToken`,
    tokenValueAccessor: `value`,
    tokenExpireAccessor: `expiresInUtc`,
  })

  cy
    .request({
      method: `POST`,
      url: `${Cypress.env(`API_ROOT_AUTH`)}/login`,
      body: {
        login: Cypress.env(`USER_LOGIN`),
        password: Cypress.env(`USER_PASSWORD`),
      },
    })
    .then(({
      body: loginResponseBody,
    }) => {
      authService.setLoggedIn(loginResponseBody)

      accessToken = authService.getAuthToken()

      cy
        .window()
        .then((window) => {
          window.localStorage.setItem(`accessToken`, accessToken)
        })

      cy
        .window()
        .then((window) => {
          window.sessionStorage.setItem(`accessToken`, accessToken)
        })

      Cypress.env(`accessToken`, accessToken)
    })
})

Cypress.Commands.add(`removeCompensations`, () => {
  type CompensationsItemType = {
    id?: number,
    compensationRequestedAtUtc: string,
    compensationRequestedForYearAndMonth: string,
    comment: string,
    amount: number,
    isPaid: boolean,
    compensationType: string,
    employeeId: number,
  };

  type CompensationsType = {
    list: CompensationsItemType[],
    totalUnpaidAmount: number,
  };

  cy.request<CompensationsType>({
    method: `GET`,
    url: `${Cypress.env(`API_ROOT`)}${Cypress.env(`LINK_TO_COMPENSATIONS_SERVICE`)}/all`,
    headers: {
      Authorization: `Bearer ${Cypress.env(`accessToken`)}`,
    },
  })
    .then(({
      body,
    }) => {
      const compensations = body

      const compensationsToDelete = compensations.list.filter(({
        comment,
      }) => comment.startsWith(`[E2E-SMOKE]`))

      compensationsToDelete.forEach(({
        id,
      }) => {
        cy.request({
          method: `DELETE`,
          url: `${Cypress.env(`API_ROOT`)}${Cypress.env(`LINK_TO_COMPENSATIONS_SERVICE`)}/${id}/hard-delete`,
          headers: {
            Authorization: `Bearer ${Cypress.env(`accessToken`)}`,
          },
        })
      })
    })
})
