/// <reference types="cypress" />

// Custom commands for auth and testing

Cypress.Commands.add('signIn', (email: string) => {
  cy.visit('/sign-in');
  // Clerk components may render in iframes or shadow DOM
  // This is a simplified version - adjust based on your Clerk setup
  cy.get('input[name="identifier"]', { timeout: 10000 }).type(email);
  cy.contains('button', 'Continue').click();
  // Handle verification code or dev mode
  cy.url({ timeout: 10000 }).should('include', '/dashboard');
});

Cypress.Commands.add('signOut', () => {
  cy.visit('/dashboard');
  cy.get('[data-testid="user-button"]').click();
  cy.contains('Sign out').click();
  cy.url().should('eq', Cypress.config('baseUrl') + '/');
});

// Command to wait for Stripe to load
Cypress.Commands.add('waitForStripe', () => {
  cy.window().its('Stripe').should('exist');
});

// TypeScript support for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      signIn(email: string): Chainable<void>;
      signOut(): Chainable<void>;
      waitForStripe(): Chainable<void>;
    }
  }
}

export {};