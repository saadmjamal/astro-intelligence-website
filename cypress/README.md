# Cypress E2E Tests

This directory contains end-to-end tests for the Astro Intelligence application.

## Test Structure

- `e2e/auth.cy.ts` - Authentication flow tests
- `e2e/payments.cy.ts` - Payment and subscription flow tests
- `e2e/app-flow.cy.ts` - General application navigation tests
- `support/commands.ts` - Custom Cypress commands

## Running Tests

```bash
# Run tests in headless mode
pnpm test:e2e

# Run tests with GUI
pnpm test:e2e:open

# Run tests in CI mode (starts server first)
pnpm test:e2e:ci
```

## Test Environment

Tests use placeholder environment variables by default. For testing with real Clerk authentication:

1. Set up Clerk test mode in your Clerk dashboard
2. Create test users and credentials
3. Update the test environment variables

## Writing Tests

When adding new tests:

1. Add appropriate `data-testid` attributes to components
2. Use semantic selectors when possible
3. Test both authenticated and unauthenticated flows
4. Mock external services (Stripe, Clerk) when appropriate

## Common Test IDs

- `nav-signin` - Sign in button in navigation
- `nav-signup` - Sign up button in navigation
- `theme-toggle` - Theme toggle button
- `script-card` - Script cards in marketplace
- `script-price` - Script price display
- `purchase-button` - Purchase/download button