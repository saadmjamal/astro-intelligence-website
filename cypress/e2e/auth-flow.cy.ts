describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show sign in and sign up buttons when not authenticated', () => {
    cy.contains('Sign in').should('be.visible');
    cy.contains('Get Started').should('be.visible');
  });

  it('should redirect to sign-in page when accessing protected route', () => {
    cy.visit('/dashboard', { failOnStatusCode: false });
    cy.url().should('include', '/sign-in');
  });

  it('should navigate to sign-up page', () => {
    cy.contains('Get Started').click();
    cy.url().should('include', '/sign-up');
    cy.contains('Create your account').should('be.visible');
  });

  it('should navigate to sign-in page', () => {
    cy.contains('Sign in').click();
    cy.url().should('include', '/sign-in');
    cy.contains('Sign in to your account').should('be.visible');
  });

  it('should protect dashboard routes', () => {
    // Try to access protected routes
    const protectedRoutes = [
      '/dashboard',
      '/dashboard/billing',
      '/dashboard/scripts',
    ];

    protectedRoutes.forEach((route) => {
      cy.visit(route, { failOnStatusCode: false });
      cy.url().should('include', '/sign-in');
    });
  });
});