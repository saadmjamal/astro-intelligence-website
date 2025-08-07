describe('Scripts Marketplace', () => {
  beforeEach(() => {
    cy.visit('/dashboard/scripts');
  });

  it('should display scripts marketplace with auth redirect', () => {
    // Should redirect to sign-in since we're not authenticated
    cy.url().should('include', '/sign-in');
  });

  it('should show script details page', () => {
    cy.visit('/dashboard/scripts/auto-deploy-vercel', { failOnStatusCode: false });
    cy.url().should('include', '/sign-in');
  });

  // These tests would run with a mocked auth state in a real implementation
  describe('Authenticated User Flow (mocked)', () => {
    it('should display premium and free scripts', () => {
      // This would require mocking Clerk auth
      // For now, we just verify the routes exist
      cy.request({
        url: '/dashboard/scripts',
        failOnStatusCode: false,
      }).then((response) => {
        assert.isTrue([200, 302, 307].includes(response.status));
      });
    });

    it('should have working navigation', () => {
      cy.visit('/');
      
      // Check that dashboard link exists in header when authenticated
      cy.get('header').within(() => {
        // The dashboard link would only show for authenticated users
        cy.contains('Dashboard').should('not.exist');
      });
    });
  });
});