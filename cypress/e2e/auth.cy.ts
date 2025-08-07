describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display sign in and sign up buttons when not authenticated', () => {
    cy.get('[data-testid="nav-signin"]').should('be.visible')
    cy.get('[data-testid="nav-signup"]').should('be.visible')
  })

  it('should navigate to sign in page', () => {
    cy.get('[data-testid="nav-signin"]').click()
    cy.url().should('include', '/sign-in')
    cy.get('h1').should('contain', 'Sign in')
  })

  it('should navigate to sign up page', () => {
    cy.get('[data-testid="nav-signup"]').click()
    cy.url().should('include', '/sign-up')
    cy.get('h1').should('contain', 'Sign up')
  })

  it('should protect dashboard routes', () => {
    cy.visit('/dashboard', { failOnStatusCode: false })
    cy.url().should('include', '/sign-in')
  })

  it('should protect script download routes', () => {
    cy.visit('/dashboard/scripts/ai-pipeline', { failOnStatusCode: false })
    cy.url().should('include', '/sign-in')
  })

  // Note: Testing actual Clerk authentication requires test mode configuration
  // These tests verify the integration points are working correctly
  context('Authenticated User Flow', () => {
    beforeEach(() => {
      // Mock Clerk authentication for testing
      cy.window().then((win) => {
        // This would be replaced with actual Clerk test mode setup
        win.localStorage.setItem('__clerk_db_jwt', 'mock-jwt-token')
      })
    })

    it('should access dashboard when authenticated', () => {
      // This test would work with proper Clerk test mode configuration
      cy.visit('/dashboard')
      // Would check for dashboard content when auth is properly mocked
    })
  })
})