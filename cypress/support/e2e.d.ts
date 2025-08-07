/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login
     * @example cy.login()
     */
    login(): Chainable<void>;
  }
}

declare global {
  namespace Chai {
    interface Assertion {
      oneOf(values: any[]): Assertion;
    }
  }
}

export {};