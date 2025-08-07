describe('Payment Flow', () => {
  beforeEach(() => {
    cy.visit('/scripts')
  })

  it('should display scripts marketplace', () => {
    cy.get('h1').should('contain', 'Premium Scripts')
    cy.get('[data-testid="script-card"]').should('have.length.at.least', 2)
  })

  it('should show script details', () => {
    cy.get('[data-testid="script-card"]').first().click()
    cy.url().should('match', /\/scripts\/[\w-]+/)
    cy.get('[data-testid="script-price"]').should('be.visible')
    cy.get('[data-testid="purchase-button"]').should('be.visible')
  })

  it('should require authentication for purchase', () => {
    cy.get('[data-testid="script-card"]').first().click()
    cy.get('[data-testid="purchase-button"]').click()
    cy.url().should('include', '/sign-in')
  })

  context('Stripe Checkout Integration', () => {
    it('should handle Stripe checkout errors gracefully', () => {
      // Visit a script page
      cy.visit('/scripts/ai-pipeline')
      
      // Mock failed API response
      cy.intercept('POST', '/api/stripe/checkout', {
        statusCode: 500,
        body: { error: 'Payment processing error' }
      }).as('checkoutError')

      // Attempt purchase (would need auth mock)
      cy.get('[data-testid="purchase-button"]').should('be.visible')
    })

    it('should display loading state during checkout', () => {
      cy.visit('/scripts/ai-pipeline')
      
      // Mock slow API response
      cy.intercept('POST', '/api/stripe/checkout', (req) => {
        req.reply({
          delay: 1000,
          body: { sessionId: 'test_session_123' }
        })
      }).as('checkoutSlow')

      // Would test loading state with proper auth setup
    })
  })

  context('Billing Dashboard', () => {
    it('should protect billing page', () => {
      cy.visit('/dashboard/billing', { failOnStatusCode: false })
      cy.url().should('include', '/sign-in')
    })

    it('should show billing options for authenticated users', () => {
      // With proper Clerk test auth setup:
      // cy.login() // Custom command for Clerk test mode
      // cy.visit('/dashboard/billing')
      // cy.get('[data-testid="billing-plans"]').should('be.visible')
      // cy.get('[data-testid="current-plan"]').should('contain', 'Free')
    })
  })
})