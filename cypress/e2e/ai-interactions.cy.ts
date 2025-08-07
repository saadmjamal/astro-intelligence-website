/// <reference types="cypress" />

describe('AI Interactions E2E Tests', () => {
  const testUser = {
    email: 'qa.test@astrointelligence.com',
    password: 'TestPassword123!'
  };

  beforeEach(() => {
    // Mock AI API responses to ensure consistent testing
    cy.intercept('POST', '/api/ai/chat', {
      statusCode: 200,
      body: {
        message: 'Hello! How can I help you today?',
        conversationId: 'test-conv-123',
        usage: { totalTokens: 20 },
        metadata: { responseTime: 234, provider: 'openai' }
      }
    }).as('chatRequest');

    cy.intercept('GET', '/api/ai/recommendations', {
      statusCode: 200,
      body: {
        scripts: [
          {
            id: 'script-1',
            title: 'AI Model Training Pipeline',
            description: 'Complete MLOps pipeline for training AI models',
            confidence: 0.95,
            category: 'ml-ops'
          },
          {
            id: 'script-2',
            title: 'Vector Database Optimizer',
            description: 'High-performance vector search optimization',
            confidence: 0.87,
            category: 'database'
          }
        ]
      }
    }).as('recommendationsRequest');

    cy.intercept('POST', '/api/ai/vector-search', {
      statusCode: 200,
      body: {
        results: [
          {
            id: '1',
            text: 'Machine learning algorithms for predictive analytics',
            similarity: 0.92,
            metadata: { category: 'ML', date: '2024-01-15' }
          },
          {
            id: '2',
            text: 'Optimizing neural network training on GPU clusters',
            similarity: 0.87,
            metadata: { category: 'Deep Learning', date: '2024-01-10' }
          }
        ],
        searchTime: 234,
        vectorsSearched: 1000
      }
    }).as('vectorSearchRequest');

    // Visit the dashboard after authentication
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });

  describe('AI Chat Interface', () => {
    beforeEach(() => {
      cy.visit('/dashboard');
      // Assume chat interface is accessible from dashboard
      cy.get('[data-testid="ai-chat-toggle"]').click();
      cy.get('[data-testid="ai-chat-interface"]').should('be.visible');
    });

    it('displays chat interface correctly', () => {
      cy.get('[data-testid="chat-input"]').should('be.visible');
      cy.get('[data-testid="send-button"]').should('be.disabled');
      cy.get('[data-testid="chat-messages"]').should('be.visible');
    });

    it('enables send button when user types', () => {
      cy.get('[data-testid="chat-input"]').type('Hello AI');
      cy.get('[data-testid="send-button"]').should('not.be.disabled');
    });

    it('sends message and receives response', () => {
      cy.get('[data-testid="chat-input"]').type('Hello AI assistant!');
      cy.get('[data-testid="send-button"]').click();

      // Verify API call
      cy.wait('@chatRequest').then((interception) => {
        cy.wrap(interception.request.body).should('have.property', 'message');
      });

      // Verify response appears
      cy.get('[data-testid="chat-messages"]')
        .should('contain', 'Hello AI assistant!')
        .and('contain', 'Hello! How can I help you today?');

      // Verify input is cleared
      cy.get('[data-testid="chat-input"]').should('have.value', '');
    });

    it('sends message using Enter key', () => {
      cy.get('[data-testid="chat-input"]').type('Hello AI{enter}');
      
      cy.wait('@chatRequest');
      cy.get('[data-testid="chat-messages"]').should('contain', 'Hello AI');
    });

    it('allows multiline input with Shift+Enter', () => {
      cy.get('[data-testid="chat-input"]').type('Line 1{shift+enter}Line 2');
      
      cy.get('[data-testid="chat-input"]').should('contain.value', 'Line 1\nLine 2');
      
      // Send button should still work
      cy.get('[data-testid="send-button"]').click();
      cy.wait('@chatRequest');
    });

    it('shows typing indicator during response', () => {
      // Mock slow response
      cy.intercept('POST', '/api/ai/chat', {
        delay: 2000,
        statusCode: 200,
        body: {
          message: 'Delayed response',
          conversationId: 'test-conv-123'
        }
      }).as('slowChatRequest');

      cy.get('[data-testid="chat-input"]').type('Slow question');
      cy.get('[data-testid="send-button"]').click();

      cy.get('[data-testid="typing-indicator"]').should('be.visible');
      cy.get('[data-testid="typing-indicator"]').should('contain', 'AI is typing');

      cy.wait('@slowChatRequest');
      cy.get('[data-testid="typing-indicator"]').should('not.exist');
    });

    it('handles error responses gracefully', () => {
      cy.intercept('POST', '/api/ai/chat', {
        statusCode: 503,
        body: {
          error: 'Service temporarily unavailable',
          code: 'SERVICE_ERROR'
        }
      }).as('errorChatRequest');

      cy.get('[data-testid="chat-input"]').type('Error test');
      cy.get('[data-testid="send-button"]').click();

      cy.wait('@errorChatRequest');
      
      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'Service temporarily unavailable');
      
      cy.get('[data-testid="retry-button"]').should('be.visible');
    });

    it('retries failed requests', () => {
      // First request fails, second succeeds
      cy.intercept('POST', '/api/ai/chat', { forceNetworkError: true }).as('failedRequest');
      
      cy.get('[data-testid="chat-input"]').type('Retry test');
      cy.get('[data-testid="send-button"]').click();

      cy.wait('@failedRequest');
      cy.get('[data-testid="retry-button"]').should('be.visible').click();

      // Setup successful retry
      cy.intercept('POST', '/api/ai/chat', {
        statusCode: 200,
        body: { message: 'Retry successful!' }
      }).as('retryRequest');

      cy.wait('@retryRequest');
      cy.get('[data-testid="chat-messages"]').should('contain', 'Retry successful!');
    });

    it('clears conversation history', () => {
      // Send a few messages first
      cy.get('[data-testid="chat-input"]').type('Message 1{enter}');
      cy.wait('@chatRequest');
      
      cy.get('[data-testid="chat-input"]').type('Message 2{enter}');
      cy.wait('@chatRequest');

      cy.get('[data-testid="chat-messages"]')
        .should('contain', 'Message 1')
        .and('contain', 'Message 2');

      cy.get('[data-testid="clear-chat-button"]').click();
      cy.get('[data-testid="confirm-clear-button"]').click();

      cy.get('[data-testid="chat-messages"]')
        .should('not.contain', 'Message 1')
        .and('not.contain', 'Message 2');
    });
  });

  describe('AI Recommendations', () => {
    beforeEach(() => {
      cy.visit('/dashboard');
      cy.get('[data-testid="recommendations-section"]').should('be.visible');
    });

    it('displays personalized recommendations', () => {
      cy.wait('@recommendationsRequest');
      
      cy.get('[data-testid="recommendation-item"]').should('have.length', 2);
      
      cy.get('[data-testid="recommendation-item"]').first()
        .should('contain', 'AI Model Training Pipeline')
        .and('contain', '95%'); // Confidence score
    });

    it('tracks recommendation clicks', () => {
      cy.intercept('POST', '/api/ai/recommendations/track', {
        statusCode: 200,
        body: { success: true }
      }).as('trackInteraction');

      cy.wait('@recommendationsRequest');
      
      cy.get('[data-testid="recommendation-item"]').first().click();
      
      cy.wait('@trackInteraction').then((interception) => {
        cy.wrap(interception.request.body).should('have.property', 'action', 'click');
        cy.wrap(interception.request.body).should('have.property', 'itemId', 'script-1');
      });
    });

    it('allows dismissing recommendations', () => {
      cy.wait('@recommendationsRequest');
      
      cy.get('[data-testid="recommendation-item"]').first()
        .find('[data-testid="dismiss-button"]')
        .click();
      
      cy.get('[data-testid="recommendation-item"]').should('have.length', 1);
    });

    it('provides feedback on recommendations', () => {
      cy.intercept('POST', '/api/ai/recommendations/feedback', {
        statusCode: 200,
        body: { success: true }
      }).as('feedbackRequest');

      cy.wait('@recommendationsRequest');
      
      cy.get('[data-testid="recommendation-item"]').first()
        .find('[data-testid="thumbs-up-button"]')
        .click();
      
      cy.wait('@feedbackRequest').then((interception) => {
        cy.wrap(interception.request.body).should('have.property', 'rating', 'positive');
        cy.wrap(interception.request.body).should('have.property', 'itemId', 'script-1');
      });
    });

    it('refreshes recommendations on demand', () => {
      cy.wait('@recommendationsRequest');
      
      cy.get('[data-testid="refresh-recommendations"]').click();
      
      cy.wait('@recommendationsRequest');
      cy.get('[data-testid="recommendation-item"]').should('be.visible');
    });
  });

  describe('Vector Search Demo', () => {
    beforeEach(() => {
      cy.visit('/lab/demos/vector-search');
    });

    it('performs vector search with sample data', () => {
      cy.get('[data-testid="search-input"]').type('machine learning optimization');
      cy.get('[data-testid="search-button"]').click();

      cy.wait('@vectorSearchRequest').then((interception) => {
        cy.wrap(interception.request.body).should('have.property', 'query', 'machine learning optimization');
      });

      cy.get('[data-testid="search-results"]').should('be.visible');
      cy.get('[data-testid="result-item"]').should('have.length', 2);
      
      cy.get('[data-testid="performance-metrics"]').should('be.visible');
      cy.get('[data-testid="search-time"]').should('contain', '234ms');
    });

    it('switches between different dataset sizes', () => {
      cy.get('[data-testid="dataset-medium"]').click();
      
      cy.get('[data-testid="search-input"]').type('test query');
      cy.get('[data-testid="search-button"]').click();

      cy.wait('@vectorSearchRequest');
      cy.get('[data-testid="vectors-searched"]').should('contain', '100K');
    });

    it('displays search results with similarity scores', () => {
      cy.get('[data-testid="search-input"]').type('neural networks');
      cy.get('[data-testid="search-button"]').click();

      cy.wait('@vectorSearchRequest');
      
      cy.get('[data-testid="result-item"]').first()
        .should('contain', '92%') // Similarity score
        .and('contain', 'Machine learning algorithms');
    });

    it('handles search errors gracefully', () => {
      cy.intercept('POST', '/api/ai/vector-search', {
        statusCode: 500,
        body: { error: 'Search service unavailable' }
      }).as('searchError');

      cy.get('[data-testid="search-input"]').type('error test');
      cy.get('[data-testid="search-button"]').click();

      cy.wait('@searchError');
      
      cy.get('[data-testid="error-alert"]')
        .should('be.visible')
        .and('contain', 'Search service unavailable');
    });

    it('meets performance requirements', () => {
      const startTime = Date.now();
      
      cy.get('[data-testid="search-input"]').type('performance test');
      cy.get('[data-testid="search-button"]').click();

      cy.wait('@vectorSearchRequest').then(() => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        cy.wrap(responseTime).should('be.lessThan', 2000); // Sub-2s requirement
      });
    });
  });

  describe('AI Performance Benchmarks', () => {
    it('measures chat response times', () => {
      cy.visit('/dashboard');
      cy.get('[data-testid="ai-chat-toggle"]').click();

      const startTime = performance.now();
      
      cy.get('[data-testid="chat-input"]').type('Performance test');
      cy.get('[data-testid="send-button"]').click();

      cy.wait('@chatRequest').then(() => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        cy.wrap(responseTime).should('be.lessThan', 2000); // Sub-2s requirement
      });
    });

    it('validates recommendation loading times', () => {
      const startTime = performance.now();
      
      cy.visit('/dashboard');
      
      cy.wait('@recommendationsRequest').then(() => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        cy.wrap(loadTime).should('be.lessThan', 500); // Sub-500ms requirement
      });
    });

    it('tests concurrent AI operations', () => {
      cy.visit('/dashboard');
      
      // Trigger multiple AI operations simultaneously
      cy.get('[data-testid="ai-chat-toggle"]').click();
      cy.get('[data-testid="chat-input"]').type('Concurrent test 1');
      cy.get('[data-testid="send-button"]').click();
      
      cy.get('[data-testid="refresh-recommendations"]').click();
      
      // Both operations should complete successfully
      cy.wait('@chatRequest');
      cy.wait('@recommendationsRequest');
      
      cy.get('[data-testid="chat-messages"]').should('contain', 'Hello! How can I help you today?');
      cy.get('[data-testid="recommendation-item"]').should('be.visible');
    });
  });

  describe('Accessibility for AI Features', () => {
    beforeEach(() => {
      cy.visit('/dashboard');
      // cy.injectAxe(); // Inject axe-core for accessibility testing - DISABLED: cypress-axe not installed
    });

    it('chat interface is accessible', () => {
      cy.get('[data-testid="ai-chat-toggle"]').click();
      
      cy.get('[data-testid="chat-input"]').should('have.attr', 'aria-label');
      cy.get('[data-testid="send-button"]').should('have.attr', 'aria-label');
      cy.get('[data-testid="chat-messages"]').should('have.attr', 'role', 'log');
      
      // cy.checkA11y('[data-testid="ai-chat-interface"]');
    });

    it('recommendations are accessible', () => {
      cy.get('[data-testid="recommendations-section"]')
        .should('have.attr', 'role', 'region')
        .and('have.attr', 'aria-label');
      
      cy.get('[data-testid="recommendation-item"]').each(($item) => {
        cy.wrap($item).should('have.attr', 'tabindex', '0');
      });
      
      // cy.checkA11y('[data-testid="recommendations-section"]');
    });

    it('supports keyboard navigation in chat', () => {
      cy.get('[data-testid="ai-chat-toggle"]').click();
      
      cy.get('[data-testid="chat-input"]').focus();
      cy.focused().should('have.attr', 'data-testid', 'chat-input');
      
      cy.get('[data-testid="chat-input"]').type('{tab}');
      cy.focused().should('have.attr', 'data-testid', 'send-button');
    });

    it('announces AI responses to screen readers', () => {
      cy.get('[data-testid="ai-chat-toggle"]').click();
      
      cy.get('[data-testid="chat-input"]').type('Screen reader test');
      cy.get('[data-testid="send-button"]').click();
      
      cy.wait('@chatRequest');
      
      cy.get('[data-testid="chat-messages"]')
        .should('have.attr', 'aria-live', 'polite');
    });

    it('vector search demo is accessible', () => {
      cy.visit('/lab/demos/vector-search');
      
      cy.get('[data-testid="search-input"]').should('have.attr', 'aria-label');
      cy.get('[data-testid="search-button"]').should('have.attr', 'aria-label');
      
      // cy.checkA11y('[data-testid="vector-search-demo"]');
    });
  });

  describe('Error Recovery and Resilience', () => {
    it('recovers from network failures', () => {
      cy.visit('/dashboard');
      cy.get('[data-testid="ai-chat-toggle"]').click();
      
      // Simulate network failure
      cy.intercept('POST', '/api/ai/chat', { forceNetworkError: true }).as('networkError');
      
      cy.get('[data-testid="chat-input"]').type('Network error test');
      cy.get('[data-testid="send-button"]').click();
      
      cy.wait('@networkError');
      cy.get('[data-testid="error-message"]').should('be.visible');
      
      // Restore network and retry
      cy.intercept('POST', '/api/ai/chat', {
        statusCode: 200,
        body: { message: 'Network recovered!' }
      }).as('recoveredRequest');
      
      cy.get('[data-testid="retry-button"]').click();
      cy.wait('@recoveredRequest');
      
      cy.get('[data-testid="chat-messages"]').should('contain', 'Network recovered!');
    });

    it('handles service timeouts gracefully', () => {
      cy.visit('/dashboard');
      cy.get('[data-testid="ai-chat-toggle"]').click();
      
      // Mock timeout response
      cy.intercept('POST', '/api/ai/chat', {
        delay: 10000, // Simulate very slow response
        statusCode: 408,
        body: { error: 'Request timeout' }
      }).as('timeoutRequest');
      
      cy.get('[data-testid="chat-input"]').type('Timeout test');
      cy.get('[data-testid="send-button"]').click();
      
      // Should show timeout warning
      cy.get('[data-testid="timeout-warning"]', { timeout: 5000 })
        .should('be.visible')
        .and('contain', 'taking longer than usual');
    });

    it('maintains state during temporary failures', () => {
      cy.visit('/dashboard');
      cy.get('[data-testid="ai-chat-toggle"]').click();
      
      // Send successful message first
      cy.get('[data-testid="chat-input"]').type('First message');
      cy.get('[data-testid="send-button"]').click();
      cy.wait('@chatRequest');
      
      // Simulate failure for second message
      cy.intercept('POST', '/api/ai/chat', { statusCode: 503 }).as('serviceError');
      
      cy.get('[data-testid="chat-input"]').type('Failed message');
      cy.get('[data-testid="send-button"]').click();
      cy.wait('@serviceError');
      
      // First message should still be visible
      cy.get('[data-testid="chat-messages"]')
        .should('contain', 'First message')
        .and('contain', 'Hello! How can I help you today?');
    });
  });
});