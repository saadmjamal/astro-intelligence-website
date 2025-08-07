import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock Recommendation Engine Component
const RecommendationEngine = React.lazy(() => import('@/components/ai/RecommendationEngine'));

// Mock recommendation service
const mockRecommendationService = {
  getRecommendations: jest.fn() as jest.MockedFunction<(userId: string, options?: any) => Promise<any>>,
  updateUserPreferences: jest.fn() as jest.MockedFunction<(userId: string, preferences: any) => Promise<void>>,
  trackInteraction: jest.fn() as jest.MockedFunction<(interaction: any) => Promise<void>>,
  getPersonalizedContent: jest.fn() as jest.MockedFunction<(userId: string) => Promise<any>>,
};

jest.mock('@/lib/ai/recommendationService', () => ({
  RecommendationService: jest.fn(() => mockRecommendationService),
}));

// Test utilities
const renderRecommendationEngine = (props = {}) => {
  const defaultProps = {
    userId: 'test-user-123',
    context: 'dashboard',
    maxRecommendations: 5,
    ...props,
  };
  
  return render(
    <React.Suspense fallback={<div>Loading recommendations...</div>}>
      <RecommendationEngine {...defaultProps} />
    </React.Suspense>
  );
};

// Mock recommendation data
const mockRecommendations = {
  scripts: [
    {
      id: 'script-1',
      title: 'AI Model Training Pipeline',
      description: 'Complete MLOps pipeline for training AI models',
      category: 'ml-ops',
      confidence: 0.95,
      reasoning: 'Based on your recent ML project activity',
      metadata: {
        popularity: 850,
        rating: 4.8,
        complexity: 'advanced',
        estimatedTime: '2-3 hours'
      }
    },
    {
      id: 'script-2',
      title: 'Vector Database Optimizer',
      description: 'High-performance vector search optimization',
      category: 'database',
      confidence: 0.87,
      reasoning: 'Matches your interest in search technologies',
      metadata: {
        popularity: 623,
        rating: 4.6,
        complexity: 'intermediate',
        estimatedTime: '1-2 hours'
      }
    },
    {
      id: 'script-3',
      title: 'Cloud Infrastructure Automation',
      description: 'Kubernetes and Terraform automation scripts',
      category: 'devops',
      confidence: 0.82,
      reasoning: 'Complements your current infrastructure setup',
      metadata: {
        popularity: 445,
        rating: 4.4,
        complexity: 'advanced',
        estimatedTime: '3-4 hours'
      }
    }
  ],
  articles: [
    {
      id: 'article-1',
      title: 'Advanced Vector Search Techniques',
      category: 'research',
      confidence: 0.91,
      readTime: '8 min',
      tags: ['vector-search', 'optimization', 'performance']
    },
    {
      id: 'article-2',
      title: 'MLOps Best Practices for Production',
      category: 'best-practices',
      confidence: 0.89,
      readTime: '12 min',
      tags: ['mlops', 'production', 'deployment']
    }
  ]
};

const mockUserPreferences = {
  userId: 'test-user-123',
  categories: ['ml-ops', 'database', 'performance'],
  complexity: ['intermediate', 'advanced'],
  recentActivity: [
    { type: 'script_download', id: 'ai-pipeline-v2', timestamp: Date.now() - 86400000 },
    { type: 'article_read', id: 'vector-optimization', timestamp: Date.now() - 172800000 }
  ],
  preferences: {
    showExplanations: true,
    maxRecommendations: 5,
    includePopular: true,
    excludeCompleted: true
  }
};

describe('AI Recommendation Engine', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRecommendationService.getRecommendations.mockReset();
    mockRecommendationService.updateUserPreferences.mockReset();
    mockRecommendationService.trackInteraction.mockReset();
  });

  describe('Initial Loading and Rendering', () => {
    it('renders loading state initially', () => {
      renderRecommendationEngine();
      expect(screen.getByText('Loading recommendations...')).toBeInTheDocument();
    });

    it('renders recommendations after loading', async () => {
      mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
      
      renderRecommendationEngine();
      
      await waitFor(() => {
        expect(screen.getByText('AI Model Training Pipeline')).toBeInTheDocument();
        expect(screen.getByText('Vector Database Optimizer')).toBeInTheDocument();
      });
    });

    it('displays correct number of recommendations', async () => {
      mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
      
      renderRecommendationEngine({ maxRecommendations: 3 });
      
      await waitFor(() => {
        const recommendationItems = screen.getAllByTestId('recommendation-item');
        expect(recommendationItems).toHaveLength(3);
      });
    });
  });

  describe('Recommendation Display and Metadata', () => {
    beforeEach(async () => {
      mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
      renderRecommendationEngine();
      
      await waitFor(() => {
        expect(screen.getByText('AI Model Training Pipeline')).toBeInTheDocument();
      });
    });

    it('displays recommendation confidence scores', () => {
      expect(screen.getByText('95%')).toBeInTheDocument(); // High confidence
      expect(screen.getByText('87%')).toBeInTheDocument(); // Medium confidence
    });

    it('shows reasoning for recommendations', () => {
      expect(screen.getByText(/based on your recent ml project activity/i)).toBeInTheDocument();
      expect(screen.getByText(/matches your interest in search technologies/i)).toBeInTheDocument();
    });

    it('displays metadata like ratings and complexity', () => {
      expect(screen.getByText('4.8')).toBeInTheDocument(); // Rating
      expect(screen.getByText(/advanced/i)).toBeInTheDocument(); // Complexity
      expect(screen.getByText(/2-3 hours/i)).toBeInTheDocument(); // Estimated time
    });

    it('categorizes recommendations properly', () => {
      expect(screen.getByText(/ml-ops/i)).toBeInTheDocument();
      expect(screen.getByText(/database/i)).toBeInTheDocument();
      expect(screen.getByText(/devops/i)).toBeInTheDocument();
    });
  });

  describe('User Interactions and Tracking', () => {
    beforeEach(async () => {
      mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
      renderRecommendationEngine();
      
      await waitFor(() => {
        expect(screen.getByText('AI Model Training Pipeline')).toBeInTheDocument();
      });
    });

    it('tracks clicks on recommendations', async () => {
      const recommendationLink = screen.getByRole('link', { name: /ai model training pipeline/i });
      fireEvent.click(recommendationLink);
      
      expect(mockRecommendationService.trackInteraction).toHaveBeenCalledWith({
        userId: 'test-user-123',
        action: 'click',
        itemId: 'script-1',
        itemType: 'script',
        context: 'dashboard',
        confidence: 0.95
      });
    });

    it('tracks hover events for engagement metrics', async () => {
      const recommendationItem = screen.getByTestId('recommendation-item');
      fireEvent.mouseEnter(recommendationItem);
      
      await waitFor(() => {
        expect(mockRecommendationService.trackInteraction).toHaveBeenCalledWith({
          userId: 'test-user-123',
          action: 'hover',
          itemId: 'script-1',
          itemType: 'script',
          context: 'dashboard',
          duration: expect.any(Number)
        });
      });
    });

    it('handles feedback on recommendations', async () => {
      const thumbsUpButton = screen.getByRole('button', { name: /like recommendation/i });
      fireEvent.click(thumbsUpButton);
      
      expect(mockRecommendationService.updateUserPreferences).toHaveBeenCalledWith({
        userId: 'test-user-123',
        feedback: {
          itemId: 'script-1',
          rating: 'positive',
          categories: ['ml-ops'],
          features: ['high-confidence']
        }
      });
    });

    it('allows dismissing recommendations', async () => {
      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      fireEvent.click(dismissButton);
      
      await waitFor(() => {
        expect(screen.queryByText('AI Model Training Pipeline')).not.toBeInTheDocument();
      });
      
      expect(mockRecommendationService.trackInteraction).toHaveBeenCalledWith({
        userId: 'test-user-123',
        action: 'dismiss',
        itemId: 'script-1',
        itemType: 'script',
        context: 'dashboard'
      });
    });
  });

  describe('Personalization and Preferences', () => {
    it('respects user preferences for complexity levels', async () => {
      const userPrefs = { ...mockUserPreferences, complexity: ['beginner'] };
      mockRecommendationService.getRecommendations.mockResolvedValue({
        ...mockRecommendations,
        scripts: mockRecommendations.scripts.filter(s => s.metadata.complexity === 'beginner')
      });
      
      renderRecommendationEngine({ userPreferences: userPrefs });
      
      await waitFor(() => {
        expect(screen.queryByText(/advanced/i)).not.toBeInTheDocument();
      });
    });

    it('filters by user-preferred categories', async () => {
      const userPrefs = { ...mockUserPreferences, categories: ['ml-ops'] };
      mockRecommendationService.getRecommendations.mockResolvedValue({
        scripts: mockRecommendations.scripts.filter(s => s.category === 'ml-ops'),
        articles: []
      });
      
      renderRecommendationEngine({ userPreferences: userPrefs });
      
      await waitFor(() => {
        expect(screen.getByText('AI Model Training Pipeline')).toBeInTheDocument();
        expect(screen.queryByText('Vector Database Optimizer')).not.toBeInTheDocument();
      });
    });

    it('excludes previously completed items when configured', async () => {
      const userPrefs = {
        ...mockUserPreferences,
        recentActivity: [
          { type: 'script_completed', id: 'script-1', timestamp: Date.now() - 86400000 }
        ]
      };
      
      mockRecommendationService.getRecommendations.mockResolvedValue({
        scripts: mockRecommendations.scripts.filter(s => s.id !== 'script-1'),
        articles: mockRecommendations.articles
      });
      
      renderRecommendationEngine({ userPreferences: userPrefs });
      
      await waitFor(() => {
        expect(screen.queryByText('AI Model Training Pipeline')).not.toBeInTheDocument();
        expect(screen.getByText('Vector Database Optimizer')).toBeInTheDocument();
      });
    });
  });

  describe('Performance and Accuracy Validation', () => {
    it('meets sub-500ms loading time for recommendations', async () => {
      const startTime = performance.now();
      
      mockRecommendationService.getRecommendations.mockImplementation(() => 
        new Promise(resolve => {
          setTimeout(() => resolve(mockRecommendations), 200);
        })
      );
      
      renderRecommendationEngine();
      
      await waitFor(() => {
        expect(screen.getByText('AI Model Training Pipeline')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      expect(loadTime).toBeLessThan(500); // Sub-500ms requirement
    });

    it('validates recommendation accuracy above 80%', async () => {
      mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
      
      renderRecommendationEngine();
      
      await waitFor(() => {
        const confidenceScores = screen.getAllByTestId('confidence-score');
        const scores = confidenceScores.map(el => parseFloat(el.textContent?.replace('%', '') || '0'));
        const averageConfidence = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        
        expect(averageConfidence).toBeGreaterThan(80);
      });
    });

    it('handles high-volume recommendation requests efficiently', async () => {
      const largeRecommendationSet = {
        scripts: Array.from({ length: 100 }, (_, i) => ({
          ...mockRecommendations.scripts[0],
          id: `script-${i}`,
          title: `Script ${i}`,
          confidence: 0.9 - (i * 0.005) // Decreasing confidence
        })),
        articles: []
      };
      
      mockRecommendationService.getRecommendations.mockResolvedValue(largeRecommendationSet);
      
      const startTime = performance.now();
      renderRecommendationEngine({ maxRecommendations: 20 });
      
      await waitFor(() => {
        expect(screen.getAllByTestId('recommendation-item')).toHaveLength(20);
      });
      
      const renderTime = performance.now() - startTime;
      expect(renderTime).toBeLessThan(1000); // Should render efficiently
    });
  });

  describe('Error Handling and Fallbacks', () => {
    it('displays fallback content when recommendations fail to load', async () => {
      mockRecommendationService.getRecommendations.mockRejectedValue(
        new Error('Failed to fetch recommendations')
      );
      
      renderRecommendationEngine();
      
      await waitFor(() => {
        expect(screen.getByText(/unable to load recommendations/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
      });
    });

    it('retries loading recommendations when retry button is clicked', async () => {
      mockRecommendationService.getRecommendations
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockRecommendations);
      
      renderRecommendationEngine();
      
      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: /retry/i });
        fireEvent.click(retryButton);
      });
      
      await waitFor(() => {
        expect(screen.getByText('AI Model Training Pipeline')).toBeInTheDocument();
      });
      
      expect(mockRecommendationService.getRecommendations).toHaveBeenCalledTimes(2);
    });

    it('gracefully handles malformed recommendation data', async () => {
      const malformedData = {
        scripts: [
          { id: 'script-1', title: null, confidence: 'invalid' }, // Invalid data
          { id: 'script-2' }, // Missing required fields
        ],
        articles: null // Invalid structure
      };
      
      mockRecommendationService.getRecommendations.mockResolvedValue(malformedData);
      
      renderRecommendationEngine();
      
      await waitFor(() => {
        expect(screen.getByText(/no recommendations available/i)).toBeInTheDocument();
      });
    });

    it('handles slow recommendation service gracefully', async () => {
      mockRecommendationService.getRecommendations.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockRecommendations), 5000))
      );
      
      renderRecommendationEngine();
      
      // Should show timeout message after 3 seconds
      await waitFor(() => {
        expect(screen.getByText(/taking longer than usual/i)).toBeInTheDocument();
      }, { timeout: 4000 });
    });
  });

  describe('Accessibility and User Experience', () => {
    beforeEach(async () => {
      mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
      renderRecommendationEngine();
      
      await waitFor(() => {
        expect(screen.getByText('AI Model Training Pipeline')).toBeInTheDocument();
      });
    });

    it('has proper ARIA labels for screen readers', () => {
      expect(screen.getByRole('region', { name: /recommendations/i })).toBeInTheDocument();
      expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Recommended items');
    });

    it('supports keyboard navigation between recommendations', () => {
      const recommendationLinks = screen.getAllByRole('link');
      
      recommendationLinks[0].focus();
      expect(document.activeElement).toBe(recommendationLinks[0]);
      
      fireEvent.keyDown(recommendationLinks[0], { key: 'ArrowDown' });
      expect(document.activeElement).toBe(recommendationLinks[1]);
    });

    it('provides clear visual feedback for interactions', async () => {
      const recommendationItem = screen.getByTestId('recommendation-item');
      
      fireEvent.mouseEnter(recommendationItem);
      expect(recommendationItem).toHaveClass('hover:bg-gray-50');
      
      fireEvent.focus(recommendationItem);
      expect(recommendationItem).toHaveClass('focus:ring-2');
    });

    it('announces recommendation updates to screen readers', async () => {
      const refreshButton = screen.getByRole('button', { name: /refresh recommendations/i });
      fireEvent.click(refreshButton);
      
      const announcementRegion = screen.getByRole('status');
      expect(announcementRegion).toHaveAttribute('aria-live', 'polite');
    });
  });
});