/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>,
    authByApi(): Chainable<any>,
    authByUI(): Chainable<any>,
    clearAuthToken(): Chainable<any>,
    removeCompensations(): Chainable<any>,
  }
}
