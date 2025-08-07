describe('Public Pages', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.contains('h1', 'Build Intelligent Systems').should('be.visible');
    cy.contains('Ethical AI').should('be.visible');
  });

  it('should navigate to services page', () => {
    cy.visit('/');
    cy.contains('nav a', 'Services').click();
    cy.url().should('include', '/services');
    cy.contains('h1', 'Our Services').should('be.visible');
  });

  it('should navigate to individual service pages', () => {
    cy.visit('/services');
    cy.contains('AI Consulting').click();
    cy.url().should('include', '/services/ai-consulting');
    cy.contains('AI Consulting').should('be.visible');
  });

  it('should navigate to portfolio page', () => {
    cy.visit('/');
    cy.contains('nav a', 'Portfolio').click();
    cy.url().should('include', '/portfolio');
    cy.contains('h1', 'Our Work').should('be.visible');
  });

  it('should navigate to blog', () => {
    cy.visit('/');
    cy.contains('nav a', 'Blog').click();
    cy.url().should('include', '/blog');
    cy.contains('h1', 'Blog').should('be.visible');
    // Should have at least one blog post
    cy.get('article').should('have.length.greaterThan', 0);
  });

  it('should load blog post', () => {
    cy.visit('/blog');
    cy.get('article').first().find('a').click();
    cy.url().should('match', /\/blog\/.+/);
    cy.get('h1').should('be.visible');
  });

  it('should have working theme toggle', () => {
    cy.visit('/');
    
    // Check initial theme
    cy.get('html').then(($html) => {
      const initialTheme = $html.hasClass('dark') ? 'dark' : 'light';
      
      // Click theme toggle
      cy.get('[aria-label*="theme"]').click();
      
      // Verify theme changed
      if (initialTheme === 'dark') {
        cy.get('html').should('not.have.class', 'dark');
      } else {
        cy.get('html').should('have.class', 'dark');
      }
    });
  });

  it('should have responsive mobile menu', () => {
    // Set mobile viewport
    cy.viewport('iphone-x');
    cy.visit('/');
    
    // Mobile menu should be hidden initially
    cy.get('nav').within(() => {
      cy.contains('Services').should('not.be.visible');
    });
    
    // Open mobile menu
    cy.get('[aria-label*="menu"]').click();
    
    // Menu items should be visible
    cy.contains('Services').should('be.visible');
    cy.contains('Portfolio').should('be.visible');
    cy.contains('Blog').should('be.visible');
  });
});