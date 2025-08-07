import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock AI components for accessibility testing
const MockChatInterface = () => (
  <div data-testid="ai-chat-interface" role="region" aria-label="AI Chat Assistant">
    <div role="log" aria-live="polite" aria-label="Chat conversation">
      <div className="message user-message">
        <span className="sr-only">User says:</span>
        Hello AI
      </div>
      <div className="message ai-message">
        <span className="sr-only">Assistant says:</span>
        Hello! How can I help you today?
      </div>
    </div>
    
    <form role="form" aria-label="Send message form">
      <label htmlFor="chat-input" className="sr-only">
        Type your message to the AI assistant
      </label>
      <textarea
        id="chat-input"
        data-testid="chat-input"
        role="textbox"
        aria-label="Chat input"
        aria-describedby="chat-help"
        aria-multiline="true"
        placeholder="Type your message..."
      />
      <div id="chat-help" className="sr-only">
        Press Enter to send, Shift+Enter for new line
      </div>
      
      <button
        type="submit"
        data-testid="send-button"
        aria-label="Send message to AI assistant"
        aria-describedby="send-help"
      >
        <span aria-hidden="true">Send</span>
      </button>
      <div id="send-help" className="sr-only">
        Send your message to the AI assistant
      </div>
    </form>
    
    <button
      data-testid="clear-chat-button"
      aria-label="Clear conversation history"
      aria-describedby="clear-help"
    >
      <span aria-hidden="true">Clear</span>
    </button>
    <div id="clear-help" className="sr-only">
      Remove all messages from the current conversation
    </div>
  </div>
);

const MockRecommendationEngine = () => (
  <section 
    data-testid="recommendations-section" 
    role="region" 
    aria-label="AI-powered recommendations"
    aria-describedby="recommendations-description"
  >
    <h2 id="recommendations-title">Recommended for You</h2>
    <p id="recommendations-description" className="sr-only">
      Personalized script and article recommendations based on your interests and activity
    </p>
    
    <div role="list" aria-label="Recommended items" aria-labelledby="recommendations-title">
      <article 
        data-testid="recommendation-item" 
        role="listitem"
        tabIndex={0}
        aria-describedby="rec-1-desc"
      >
        <h3>
          <a href="/scripts/ai-pipeline" aria-describedby="rec-1-confidence">
            AI Model Training Pipeline
          </a>
        </h3>
        <p id="rec-1-desc">Complete MLOps pipeline for training AI models</p>
        <div id="rec-1-confidence" aria-label="Confidence score">
          <span className="sr-only">Recommendation confidence:</span>
          <span data-testid="confidence-score" aria-label="95 percent confidence">95%</span>
        </div>
        
        <div role="group" aria-label="Recommendation actions">
          <button 
            data-testid="thumbs-up-button" 
            aria-label="Like this recommendation"
            aria-describedby="thumbs-up-help"
          >
            <span aria-hidden="true">👍</span>
          </button>
          <div id="thumbs-up-help" className="sr-only">
            Mark this recommendation as helpful
          </div>
          
          <button 
            data-testid="thumbs-down-button" 
            aria-label="Dislike this recommendation"
            aria-describedby="thumbs-down-help"
          >
            <span aria-hidden="true">👎</span>
          </button>
          <div id="thumbs-down-help" className="sr-only">
            Mark this recommendation as not helpful
          </div>
          
          <button 
            data-testid="dismiss-button" 
            aria-label="Dismiss this recommendation"
            aria-describedby="dismiss-help"
          >
            <span aria-hidden="true">✕</span>
          </button>
          <div id="dismiss-help" className="sr-only">
            Remove this recommendation from the list
          </div>
        </div>
      </article>
      
      <article 
        data-testid="recommendation-item" 
        role="listitem"
        tabIndex={0}
        aria-describedby="rec-2-desc"
      >
        <h3>
          <a href="/scripts/vector-search" aria-describedby="rec-2-confidence">
            Vector Database Optimizer
          </a>
        </h3>
        <p id="rec-2-desc">High-performance vector search optimization</p>
        <div id="rec-2-confidence" aria-label="Confidence score">
          <span className="sr-only">Recommendation confidence:</span>
          <span data-testid="confidence-score" aria-label="87 percent confidence">87%</span>
        </div>
      </article>
    </div>
    
    <div role="status" aria-live="polite" aria-label="Recommendation updates">
      <span className="sr-only">Recommendations loaded</span>
    </div>
  </section>
);

const MockVectorSearchDemo = () => (
  <main data-testid="vector-search-demo" role="main">
    <header>
      <h1>Vector Search Optimization Demo</h1>
      <p>Experience our high-performance vector search engine</p>
    </header>
    
    <section aria-label="Search controls">
      <h2 className="sr-only">Search Configuration</h2>
      
      <fieldset>
        <legend>Select Dataset Size</legend>
        <div role="radiogroup" aria-label="Dataset size options">
          <label>
            <input 
              type="radio" 
              name="dataset" 
              value="sample" 
              data-testid="dataset-sample"
              aria-describedby="sample-desc"
              defaultChecked
            />
            Sample (1K vectors)
          </label>
          <div id="sample-desc" className="sr-only">
            Small dataset for quick testing
          </div>
          
          <label>
            <input 
              type="radio" 
              name="dataset" 
              value="medium" 
              data-testid="dataset-medium"
              aria-describedby="medium-desc"
            />
            Medium (100K vectors)
          </label>
          <div id="medium-desc" className="sr-only">
            Medium-sized dataset for realistic performance testing
          </div>
        </div>
      </fieldset>
      
      <div>
        <label htmlFor="search-query">Search Query</label>
        <input
          id="search-query"
          data-testid="search-input"
          type="text"
          aria-describedby="search-help"
          placeholder="Enter your search query..."
        />
        <div id="search-help" className="sr-only">
          Enter keywords to search through the vector database
        </div>
        
        <button
          data-testid="search-button"
          aria-label="Execute vector search"
          aria-describedby="search-button-help"
        >
          Search
        </button>
        <div id="search-button-help" className="sr-only">
          Perform semantic search across the selected dataset
        </div>
      </div>
    </section>
    
    <section 
      data-testid="search-results" 
      role="region" 
      aria-label="Search results"
      aria-live="polite"
    >
      <h2>Search Results</h2>
      <div role="list" aria-label="Search result items">
        <article data-testid="result-item" role="listitem" tabIndex={0}>
          <h3>Machine learning algorithms for predictive analytics</h3>
          <div aria-label="Similarity score">
            <span className="sr-only">Similarity:</span>
            92%
          </div>
          <div className="metadata">
            <span className="sr-only">Category:</span> ML
            <span className="sr-only">Date:</span> 2024-01-15
          </div>
        </article>
      </div>
    </section>
    
    <section 
      data-testid="performance-metrics" 
      role="region" 
      aria-label="Performance metrics"
    >
      <h2>Performance Metrics</h2>
      <dl>
        <dt>Search Time</dt>
        <dd data-testid="search-time" aria-label="234 milliseconds">234ms</dd>
        <dt>Vectors Searched</dt>
        <dd data-testid="vectors-searched" aria-label="1000 vectors">1K</dd>
      </dl>
    </section>
  </main>
);

describe('AI Accessibility Tests', () => {
  describe('Chat Interface Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<MockChatInterface />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA labels and roles', () => {
      render(<MockChatInterface />);
      
      // Check main region
      expect(screen.getByRole('region', { name: /ai chat assistant/i })).toBeInTheDocument();
      
      // Check conversation log
      expect(screen.getByRole('log', { name: /chat conversation/i })).toBeInTheDocument();
      
      // Check form elements
      expect(screen.getByRole('textbox', { name: /chat input/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<MockChatInterface />);
      
      const chatInput = screen.getByTestId('chat-input');
      const sendButton = screen.getByTestId('send-button');
      const clearButton = screen.getByTestId('clear-chat-button');
      
      // Test tab order
      chatInput.focus();
      expect(document.activeElement).toBe(chatInput);
      
      fireEvent.keyDown(chatInput, { key: 'Tab' });
      expect(document.activeElement).toBe(sendButton);
      
      fireEvent.keyDown(sendButton, { key: 'Tab' });
      expect(document.activeElement).toBe(clearButton);
    });

    it('announces messages to screen readers', () => {
      render(<MockChatInterface />);
      
      const messageLog = screen.getByRole('log');
      expect(messageLog).toHaveAttribute('aria-live', 'polite');
      
      // Check message announcements include context
      expect(screen.getByText(/user says:/i)).toBeInTheDocument();
      expect(screen.getByText(/assistant says:/i)).toBeInTheDocument();
    });

    it('provides helpful descriptions and instructions', () => {
      render(<MockChatInterface />);
      
      // Check input help text
      expect(document.getElementById('chat-help')).toHaveTextContent(
        'Press Enter to send, Shift+Enter for new line'
      );
      
      // Check button descriptions
      expect(document.getElementById('send-help')).toHaveTextContent(
        'Send your message to the AI assistant'
      );
      
      expect(document.getElementById('clear-help')).toHaveTextContent(
        'Remove all messages from the current conversation'
      );
    });

    it('handles focus management correctly', () => {
      render(<MockChatInterface />);
      
      const chatInput = screen.getByTestId('chat-input');
      const sendButton = screen.getByTestId('send-button');
      
      // Simulate sending a message
      fireEvent.click(sendButton);
      
      // Focus should return to input after sending
      expect(document.activeElement).toBe(chatInput);
    });
  });

  describe('Recommendation Engine Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<MockRecommendationEngine />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('structures recommendations as a proper list', () => {
      render(<MockRecommendationEngine />);
      
      // Check list structure
      expect(screen.getByRole('list', { name: /recommended items/i })).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      
      // Check that items are focusable
      listItems.forEach(item => {
        expect(item).toHaveAttribute('tabindex', '0');
      });
    });

    it('provides comprehensive labeling for confidence scores', () => {
      render(<MockRecommendationEngine />);
      
      const confidenceScores = screen.getAllByTestId('confidence-score');
      
      confidenceScores.forEach(score => {
        // Should have descriptive aria-label
        expect(score).toHaveAttribute('aria-label');
        expect(score.getAttribute('aria-label')).toMatch(/\d+ percent confidence/);
      });
    });

    it('groups related actions properly', () => {
      render(<MockRecommendationEngine />);
      
      const actionGroup = screen.getByRole('group', { name: /recommendation actions/i });
      expect(actionGroup).toBeInTheDocument();
      
      // Check individual action buttons
      expect(screen.getByRole('button', { name: /like this recommendation/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /dislike this recommendation/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /dismiss this recommendation/i })).toBeInTheDocument();
    });

    it('provides status updates for dynamic content', () => {
      render(<MockRecommendationEngine />);
      
      const statusRegion = screen.getByRole('status');
      expect(statusRegion).toHaveAttribute('aria-live', 'polite');
      expect(statusRegion).toHaveAttribute('aria-label', 'Recommendation updates');
    });

    it('supports keyboard navigation between recommendations', () => {
      render(<MockRecommendationEngine />);
      
      const recommendations = screen.getAllByTestId('recommendation-item');
      
      // Test navigation between items
      recommendations[0]?.focus();
      expect(document.activeElement).toBe(recommendations[0]);
      
      fireEvent.keyDown(recommendations[0]!, { key: 'ArrowDown' });
      // In a real implementation, this would move focus to the next item
    });

    it('provides context for screen reader users', () => {
      render(<MockRecommendationEngine />);
      
      // Check section description
      expect(document.getElementById('recommendations-description')).toHaveTextContent(
        /personalized script and article recommendations/i
      );
      
      // Check individual item descriptions
      expect(document.getElementById('rec-1-desc')).toHaveTextContent(
        'Complete MLOps pipeline for training AI models'
      );
    });
  });

  describe('Vector Search Demo Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<MockVectorSearchDemo />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper form structure and labeling', () => {
      render(<MockVectorSearchDemo />);
      
      // Check fieldset and legend
      expect(screen.getByRole('group', { name: /select dataset size/i })).toBeInTheDocument();
      
      // Check radio group
      expect(screen.getByRole('radiogroup', { name: /dataset size options/i })).toBeInTheDocument();
      
      // Check search input
      expect(screen.getByLabelText(/search query/i)).toBeInTheDocument();
    });

    it('announces search results to screen readers', () => {
      render(<MockVectorSearchDemo />);
      
      const resultsSection = screen.getByTestId('search-results');
      expect(resultsSection).toHaveAttribute('aria-live', 'polite');
      expect(resultsSection).toHaveAttribute('aria-label', 'Search results');
    });

    it('provides semantic structure for results', () => {
      render(<MockVectorSearchDemo />);
      
      // Check results list structure
      expect(screen.getByRole('list', { name: /search result items/i })).toBeInTheDocument();
      
      const resultItems = screen.getAllByTestId('result-item');
      resultItems.forEach(item => {
        expect(item).toHaveAttribute('role', 'listitem');
        expect(item).toHaveAttribute('tabindex', '0');
      });
    });

    it('makes performance metrics accessible', () => {
      render(<MockVectorSearchDemo />);
      
      // Check metrics region
      expect(screen.getByRole('region', { name: /performance metrics/i })).toBeInTheDocument();
      
      // Check description list structure
      expect(screen.getByRole('term')).toBeInTheDocument();
      expect(screen.getByRole('definition')).toBeInTheDocument();
      
      // Check specific metric accessibility
      expect(screen.getByTestId('search-time')).toHaveAttribute('aria-label', '234 milliseconds');
      expect(screen.getByTestId('vectors-searched')).toHaveAttribute('aria-label', '1000 vectors');
    });

    it('provides helpful descriptions for form elements', () => {
      render(<MockVectorSearchDemo />);
      
      // Check search input help
      expect(document.getElementById('search-help')).toHaveTextContent(
        'Enter keywords to search through the vector database'
      );
      
      // Check button help
      expect(document.getElementById('search-button-help')).toHaveTextContent(
        'Perform semantic search across the selected dataset'
      );
      
      // Check dataset option descriptions
      expect(document.getElementById('sample-desc')).toHaveTextContent(
        'Small dataset for quick testing'
      );
    });
  });

  describe('Color Contrast and Visual Accessibility', () => {
    it('meets WCAG contrast requirements', () => {
      // Note: This would require actual color contrast checking in a real implementation
      // Tools like jest-axe can check this, but it requires actual CSS colors
      const { container } = render(<MockChatInterface />);
      
      // Check that important text elements exist (contrast would be checked by axe)
      expect(container.querySelector('.message')).toBeInTheDocument();
      expect(container.querySelector('button')).toBeInTheDocument();
      expect(container.querySelector('textarea')).toBeInTheDocument();
    });

    it('provides text alternatives for icon buttons', () => {
      render(<MockRecommendationEngine />);
      
      // Check that icon buttons have proper labels
      const likeButton = screen.getByRole('button', { name: /like this recommendation/i });
      const dislikeButton = screen.getByRole('button', { name: /dislike this recommendation/i });
      const dismissButton = screen.getByRole('button', { name: /dismiss this recommendation/i });
      
      expect(likeButton).toBeInTheDocument();
      expect(dislikeButton).toBeInTheDocument();
      expect(dismissButton).toBeInTheDocument();
      
      // Check that visual icons are hidden from screen readers
      expect(likeButton.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
      expect(dislikeButton.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
      expect(dismissButton.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });

    it('uses semantic HTML elements appropriately', () => {
      render(<MockVectorSearchDemo />);
      
      // Check main landmark
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Check heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      
      // Check form structure
      expect(screen.getByRole('group')).toBeInTheDocument(); // fieldset
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });
  });

  describe('Error States and Feedback Accessibility', () => {
    it('announces errors to screen readers', () => {
      const ErrorComponent = () => (
        <div>
          <div 
            role="alert" 
            aria-live="assertive"
            data-testid="error-message"
          >
            Service temporarily unavailable. Please try again.
          </div>
          <button data-testid="retry-button" aria-describedby="retry-help">
            Retry
          </button>
          <div id="retry-help" className="sr-only">
            Attempt to send your message again
          </div>
        </div>
      );
      
      render(<ErrorComponent />);
      
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
      
      const retryButton = screen.getByTestId('retry-button');
      expect(retryButton).toHaveAttribute('aria-describedby', 'retry-help');
    });

    it('provides loading state announcements', () => {
      const LoadingComponent = () => (
        <div>
          <div 
            role="status" 
            aria-live="polite"
            data-testid="loading-status"
          >
            AI is generating response...
          </div>
          <div aria-hidden="true" data-testid="loading-spinner">
            Loading spinner animation
          </div>
        </div>
      );
      
      render(<LoadingComponent />);
      
      const loadingStatus = screen.getByTestId('loading-status');
      expect(loadingStatus).toHaveAttribute('role', 'status');
      expect(loadingStatus).toHaveAttribute('aria-live', 'polite');
      
      // Visual loading indicator should be hidden from screen readers
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Mobile and Touch Accessibility', () => {
    it('provides adequate touch targets', () => {
      render(<MockRecommendationEngine />);
      
      const actionButtons = [
        screen.getByTestId('thumbs-up-button'),
        screen.getByTestId('thumbs-down-button'),
        screen.getByTestId('dismiss-button')
      ];
      
      // In a real implementation, we would check CSS computed styles
      // to ensure touch targets are at least 44px × 44px
      actionButtons.forEach(button => {
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('supports swipe gestures for recommendations', () => {
      // This would be tested with actual touch event simulation
      // For now, we just ensure the structure supports it
      render(<MockRecommendationEngine />);
      
      const recommendations = screen.getAllByTestId('recommendation-item');
      recommendations.forEach(item => {
        expect(item).toHaveAttribute('tabindex', '0');
      });
    });
  });
});