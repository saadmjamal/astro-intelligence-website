import { jest } from '@jest/globals';

/**
 * Test utilities and helpers specifically for AI component testing
 */

// Mock AI Response Types
export interface MockChatResponse {
  id: string;
  message: string;
  role: 'user' | 'assistant';
  timestamp: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata?: {
    provider: string;
    model: string;
    responseTime: number;
    confidence?: number;
  };
}

export interface MockRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  confidence: number;
  reasoning: string;
  metadata: {
    popularity: number;
    rating: number;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;
  };
}

export interface MockVectorSearchResult {
  id: string;
  text: string;
  similarity: number;
  metadata?: Record<string, any>;
}

// Mock Data Generators
export class MockAIDataGenerator {
  static generateChatResponse(overrides: Partial<MockChatResponse> = {}): MockChatResponse {
    return {
      id: `msg-${Math.random().toString(36).substr(2, 9)}`,
      message: 'Hello! How can I help you today?',
      role: 'assistant',
      timestamp: new Date().toISOString(),
      usage: {
        promptTokens: 12,
        completionTokens: 8,
        totalTokens: 20
      },
      metadata: {
        provider: 'openai',
        model: 'gpt-4',
        responseTime: 234,
        confidence: 0.95
      },
      ...overrides
    };
  }

  static generateRecommendations(count: number = 5): MockRecommendation[] {
    const categories = ['ml-ops', 'database', 'devops', 'frontend', 'security'];
    const complexities: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `rec-${i}`,
      title: `AI Recommendation ${i + 1}`,
      description: `Description for recommendation ${i + 1}`,
      category: categories[i % categories.length] || 'general',
      confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0 range
      reasoning: `Based on your recent activity in ${categories[i % categories.length] || 'general'}`,
      metadata: {
        popularity: Math.floor(Math.random() * 1000) + 100,
        rating: Math.random() * 2 + 3, // 3.0-5.0 range
        complexity: complexities[i % complexities.length] || 'beginner',
        estimatedTime: `${Math.floor(Math.random() * 4) + 1}-${Math.floor(Math.random() * 2) + 2} hours`
      }
    }));
  }

  static generateVectorSearchResults(count: number = 10): MockVectorSearchResult[] {
    const sampleTexts = [
      'Machine learning algorithms for predictive analytics',
      'Neural network optimization techniques',
      'Deep learning with transformer models',
      'Computer vision and image processing',
      'Natural language processing applications',
      'Reinforcement learning strategies',
      'Data preprocessing and feature engineering',
      'Model deployment and MLOps practices',
      'Statistical analysis and data mining',
      'AI ethics and responsible development'
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: `result-${i}`,
      text: sampleTexts[i % sampleTexts.length] + ` (variant ${i})`,
      similarity: Math.random() * 0.4 + 0.6, // 0.6-1.0 range
      metadata: {
        category: ['ML', 'AI', 'Data Science', 'Deep Learning'][i % 4],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        source: `source-${i % 3 + 1}`
      }
    }));
  }

  static generateUserPreferences() {
    return {
      userId: 'test-user-123',
      categories: ['ml-ops', 'database', 'performance'],
      complexity: ['intermediate', 'advanced'],
      recentActivity: [
        { type: 'script_download', id: 'ai-pipeline-v2', timestamp: Date.now() - 86400000 },
        { type: 'article_read', id: 'vector-optimization', timestamp: Date.now() - 172800000 },
        { type: 'chat_interaction', id: 'conv-123', timestamp: Date.now() - 3600000 }
      ],
      preferences: {
        showExplanations: true,
        maxRecommendations: 5,
        includePopular: true,
        excludeCompleted: true
      }
    };
  }

  static generateConversationHistory(length: number = 10) {
    const history = [];
    for (let i = 0; i < length; i++) {
      history.push({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: i % 2 === 0 
          ? `User message ${Math.floor(i / 2) + 1}` 
          : `Assistant response ${Math.floor(i / 2) + 1}`,
        timestamp: new Date(Date.now() - (length - i) * 60000).toISOString()
      });
    }
    return history;
  }
}

// Mock Service Classes
export class MockAIService {
  private responses: MockChatResponse[] = [];
  private delay: number;

  constructor(delay: number = 200) {
    this.delay = delay;
  }

  async sendMessage(message: string, options: any = {}): Promise<MockChatResponse> {
    await new Promise(resolve => setTimeout(resolve, this.delay));
    
    if (options.shouldFail) {
      throw new Error(options.errorMessage || 'AI service error');
    }

    const response = MockAIDataGenerator.generateChatResponse({
      message: `Response to: ${message}`,
      metadata: {
        provider: 'openai',
        model: 'gpt-4',
        responseTime: this.delay,
        confidence: 0.95
      }
    });

    this.responses.push(response);
    return response;
  }

  getHistory(): MockChatResponse[] {
    return this.responses;
  }

  clearHistory(): void {
    this.responses = [];
  }

  setDelay(delay: number): void {
    this.delay = delay;
  }
}

export class MockRecommendationService {
  private recommendations: MockRecommendation[] = [];
  private delay: number;

  constructor(delay: number = 100) {
    this.delay = delay;
    this.recommendations = MockAIDataGenerator.generateRecommendations(10);
  }

  async getRecommendations(userId: string, options: any = {}): Promise<{
    scripts: MockRecommendation[];
    articles: MockRecommendation[];
  }> {
    await new Promise(resolve => setTimeout(resolve, this.delay));
    
    if (options.shouldFail) {
      throw new Error(options.errorMessage || 'Recommendation service error');
    }

    const filteredRecommendations = this.recommendations.filter(rec => {
      if (options.categories && !options.categories.includes(rec.category)) {
        return false;
      }
      if (options.minConfidence && rec.confidence < options.minConfidence) {
        return false;
      }
      return true;
    });

    const maxResults = options.maxRecommendations || 5;
    
    return {
      scripts: filteredRecommendations.slice(0, maxResults),
      articles: filteredRecommendations.slice(maxResults, maxResults * 2)
    };
  }

  async trackInteraction(interaction: any): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
    // Mock tracking - in real implementation would send to analytics
  }

  async updateUserPreferences(preferences: any): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
    // Mock preference update
  }
}

export class MockVectorSearchService {
  private results: MockVectorSearchResult[] = [];
  private delay: number;

  constructor(delay: number = 150) {
    this.delay = delay;
    this.results = MockAIDataGenerator.generateVectorSearchResults(50);
  }

  async search(query: string, options: any = {}): Promise<{
    results: MockVectorSearchResult[];
    searchTime: number;
    vectorsSearched: number;
  }> {
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, this.delay));
    
    if (options.shouldFail) {
      throw new Error(options.errorMessage || 'Vector search service error');
    }

    // Simulate search relevance by checking query terms
    const queryTerms = query.toLowerCase().split(' ');
    const relevantResults = this.results.filter(result => 
      queryTerms.some(term => result.text.toLowerCase().includes(term))
    );

    const maxResults = options.maxResults || 10;
    const finalResults = relevantResults.length > 0 
      ? relevantResults.slice(0, maxResults)
      : this.results.slice(0, maxResults);

    return {
      results: finalResults,
      searchTime: Date.now() - startTime,
      vectorsSearched: options.datasetSize === 'large' ? 1000000 : 
                       options.datasetSize === 'medium' ? 100000 : 1000
    };
  }
}

// Test Utilities
export class AITestUtils {
  static createMockAPIResponse(data: any, status: number = 200, delay: number = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status >= 400) {
          reject({ status, data });
        } else {
          resolve({ status, data });
        }
      }, delay);
    });
  }

  static async measureResponseTime<T>(operation: () => Promise<T>): Promise<{ result: T; duration: number }> {
    const startTime = performance.now();
    const result = await operation();
    const endTime = performance.now();
    
    return {
      result,
      duration: endTime - startTime
    };
  }

  static createPerformanceMonitor() {
    const metrics = {
      responseTimes: [] as number[],
      errorCount: 0,
      successCount: 0
    };

    return {
      record(duration: number, success: boolean) {
        metrics.responseTimes.push(duration);
        if (success) {
          metrics.successCount++;
        } else {
          metrics.errorCount++;
        }
      },
      
      getStats() {
        const sortedTimes = [...metrics.responseTimes].sort((a, b) => a - b);
        const len = sortedTimes.length;
        
        return {
          count: len,
          average: len > 0 ? sortedTimes.reduce((a, b) => a + b, 0) / len : 0,
          median: len > 0 ? sortedTimes[Math.floor(len / 2)] : 0,
          p95: len > 0 ? sortedTimes[Math.floor(len * 0.95)] : 0,
          p99: len > 0 ? sortedTimes[Math.floor(len * 0.99)] : 0,
          min: len > 0 ? sortedTimes[0] : 0,
          max: len > 0 ? sortedTimes[len - 1] : 0,
          successRate: (metrics.successCount / (metrics.successCount + metrics.errorCount)) || 0
        };
      },
      
      reset() {
        metrics.responseTimes = [];
        metrics.errorCount = 0;
        metrics.successCount = 0;
      }
    };
  }

  static async simulateNetworkConditions(
    operation: () => Promise<any>,
    conditions: 'fast' | 'slow' | 'unreliable' | 'timeout'
  ) {
    switch (conditions) {
      case 'fast':
        return operation();
      
      case 'slow':
        await new Promise(resolve => setTimeout(resolve, 2000));
        return operation();
      
      case 'unreliable':
        if (Math.random() < 0.3) {
          throw new Error('Network error');
        }
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        return operation();
      
      case 'timeout':
        await new Promise(resolve => setTimeout(resolve, 5000));
        throw new Error('Request timeout');
      
      default:
        return operation();
    }
  }

  static generateLoadTestScenario(
    operation: () => Promise<any>,
    concurrency: number = 10,
    duration: number = 5000
  ) {
    const results: Array<{ success: boolean; duration: number; error?: string }> = [];
    const startTime = Date.now();

    const executeOperation = async () => {
      const opStartTime = performance.now();
      try {
        await operation();
        const opEndTime = performance.now();
        results.push({
          success: true,
          duration: opEndTime - opStartTime
        });
      } catch (error) {
        const opEndTime = performance.now();
        results.push({
          success: false,
          duration: opEndTime - opStartTime,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    return new Promise<typeof results>((resolve) => {
      const workers: Promise<void>[] = [];
      
      for (let i = 0; i < concurrency; i++) {
        const worker = (async () => {
          while (Date.now() - startTime < duration) {
            await executeOperation();
            await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between requests
          }
        })();
        
        workers.push(worker);
      }

      Promise.all(workers).then(() => resolve(results));
    });
  }
}

// Jest Mock Helpers
export const createAIMocks = () => {
  const chatService = new MockAIService();
  const recommendationService = new MockRecommendationService();
  const vectorSearchService = new MockVectorSearchService();

  return {
    chatService: {
      sendMessage: jest.fn(chatService.sendMessage.bind(chatService)),
      getHistory: jest.fn(chatService.getHistory.bind(chatService)),
      clearHistory: jest.fn(chatService.clearHistory.bind(chatService)),
      getTypingStatus: jest.fn(() => false)
    },
    
    recommendationService: {
      getRecommendations: jest.fn(recommendationService.getRecommendations.bind(recommendationService)),
      trackInteraction: jest.fn(recommendationService.trackInteraction.bind(recommendationService)),
      updateUserPreferences: jest.fn(recommendationService.updateUserPreferences.bind(recommendationService))
    },
    
    vectorSearchService: {
      search: jest.fn(vectorSearchService.search.bind(vectorSearchService))
    }
  };
};

// Accessibility Testing Helpers
export const AIAccessibilityHelpers = {
  checkChatAccessibility: (container: HTMLElement) => {
    const chatInput = container.querySelector('[role="textbox"]');
    const sendButton = container.querySelector('button[type="submit"]');
    const messageLog = container.querySelector('[role="log"]');
    
    return {
      hasProperLabels: !!(chatInput?.getAttribute('aria-label') && sendButton?.getAttribute('aria-label')),
      hasMessageLog: !!messageLog,
      hasLiveRegion: messageLog?.getAttribute('aria-live') === 'polite',
      isKeyboardAccessible: !!(chatInput?.getAttribute('tabindex') !== '-1')
    };
  },
  
  checkRecommendationAccessibility: (container: HTMLElement) => {
    const recommendationRegion = container.querySelector('[role="region"]');
    const recommendationList = container.querySelector('[role="list"]');
    const recommendationItems = container.querySelectorAll('[role="listitem"]');
    
    return {
      hasProperRegion: !!recommendationRegion?.getAttribute('aria-label'),
      hasProperList: !!recommendationList,
      allItemsAccessible: Array.from(recommendationItems).every(item => 
        item.getAttribute('tabindex') === '0'
      ),
      hasKeyboardSupport: true // Would need more complex checking in real implementation
    };
  }
};

export default {
  MockAIDataGenerator,
  MockAIService,
  MockRecommendationService,
  MockVectorSearchService,
  AITestUtils,
  createAIMocks,
  AIAccessibilityHelpers
};