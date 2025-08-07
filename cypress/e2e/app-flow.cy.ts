describe('App Flow Integration', () => {
  it('should navigate through main pages', () => {
    // Homepage
    cy.visit('/')
    cy.get('h1').should('contain', 'AI-Enhanced')
    
    // Services
    cy.get('a[href="/services"]').first().click()
    cy.url().should('include', '/services')
    cy.get('h1').should('contain', 'Services')
    
    // Portfolio
    cy.get('a[href="/portfolio"]').first().click()
    cy.url().should('include', '/portfolio')
    cy.get('h1').should('contain', 'Portfolio')
    
    // Scripts
    cy.get('a[href="/scripts"]').first().click()
    cy.url().should('include', '/scripts')
    cy.get('h1').should('contain', 'Premium Scripts')
    
    // Blog
    cy.get('a[href="/blog"]').first().click()
    cy.url().should('include', '/blog')
    cy.get('h1').should('contain', 'Blog')
  })

  it('should handle theme switching', () => {
    cy.visit('/')
    
    // Check initial theme
    cy.get('html').should('have.class', 'light')
    
    // Toggle theme
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('have.class', 'dark')
    
    // Verify theme persists on navigation
    cy.get('a[href="/about"]').first().click()
    cy.get('html').should('have.class', 'dark')
    
    // Toggle back
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('have.class', 'light')
  })

  it('should show proper SEO metadata', () => {
    cy.visit('/')
    cy.title().should('contain', 'Astro Intelligence')
    cy.get('meta[name="description"]').should('exist')
    cy.get('meta[property="og:title"]').should('exist')
  })

  it('should handle mobile navigation', () => {
    // Test mobile viewport
    cy.viewport('iphone-x')
    cy.visit('/')
    
    // Mobile menu should be hidden initially
    cy.get('[aria-expanded="false"]').should('exist')
    
    // Open mobile menu
    cy.get('[aria-expanded="false"]').click()
    cy.get('[aria-expanded="true"]').should('exist')
    
    // Navigate via mobile menu
    cy.contains('Services').click()
    cy.url().should('include', '/services')
    
    // Menu should close after navigation
    cy.get('[aria-expanded="false"]').should('exist')
  })
})