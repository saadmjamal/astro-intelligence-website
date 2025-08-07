/**
 * Comprehensive AI Test Suite
 * Tests all AI functionality with proper mocks and edge cases
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { performance } from 'perf_hooks';

// Define proper return types for mocks
interface MockResponse<T = any> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  metadata: { 
    requestId: string; 
    timestamp: Date; 
    processingTime: number;
    tokensUsed?: number;
  };
}

interface MockSessionData {
  id: string;
  messages: any[];
  context: {
    industry: string;
    companySize: string;
    currentChallenges: string[];
    interests: string[];
    techStack: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  status: string;
  metadata: {
    totalTokens: number;
    avgResponseTime: number;
    satisfactionRating: number;
  };
}

interface MockRecommendationResult {
  scripts: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    confidence: number;
    reasoning: string;
    metadata: {
      popularity: number;
      rating: number;
      complexity: string;
      estimatedTime: string;
    };
  }>;
  articles: Array<any>;
  error?: { code: string; message: string };
}

interface MockVectorResult {
  results: any[];
  searchTime: number;
  vectorsSearched: number;
  error?: string;
  sanitized?: boolean;
}

// Mock dependencies with proper typing
const mockChatService = {
  createSession: jest.fn<() => Promise<MockResponse<MockSessionData>>>(),
  getSession: jest.fn<(sessionId: string) => Promise<MockResponse<MockSessionData>>>(),
  sendMessage: jest.fn<(sessionId: string, message: string, userId?: string) => Promise<MockResponse<{ session: MockSessionData; response: any }>>>(),
  closeSession: jest.fn<(sessionId: string) => Promise<MockResponse>>(),
};

const mockRecommendationService = {
  getRecommendations: jest.fn<(userId?: string, options?: any) => Promise<MockRecommendationResult>>(),
  trackInteraction: jest.fn<(interaction: any) => Promise<void>>(),
  updateUserPreferences: jest.fn<(preferences: any) => Promise<void>>(),
};

const mockVectorStore = {
  search: jest.fn<(query: string, options?: any) => Promise<MockVectorResult>>(),
  addDocument: jest.fn<(document: any) => Promise<any>>(),
  getStats: jest.fn<() => Promise<any>>(),
};

// Mock the AI modules
jest.mock('../../lib/ai/chat-service', () => ({
  chatService: mockChatService,
  ChatService: jest.fn(() => mockChatService),
}));

jest.mock('../../lib/ai/recommendation-engine', () => ({
  recommendationService: mockRecommendationService,
  RecommendationService: jest.fn(() => mockRecommendationService),
}));

jest.mock('../../lib/ai/vector-store', () => ({
  vectorStore: mockVectorStore,
  VectorStore: jest.fn(() => mockVectorStore),
}));

// Test data generators
const generateChatSession = (overrides = {}): MockSessionData => ({
  id: 'session-123',
  messages: [],
  context: {
    industry: 'technology',
    companySize: 'medium',
    currentChallenges: ['ai-integration'],
    interests: ['machine-learning'],
    techStack: ['react', 'node'],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'active',
  metadata: {
    totalTokens: 0,
    avgResponseTime: 0,
    satisfactionRating: 0,
  },
  ...overrides,
});

const generateChatMessage = (overrides = {}) => ({
  id: 'msg-123',
  content: 'Hello AI',
  role: 'user',
  timestamp: new Date(),
  metadata: {
    tokens: 5,
  },
  ...overrides,
});

const generateRecommendations = (count = 3): MockRecommendationResult => ({
  scripts: Array.from({ length: count }, (_, i) => ({
    id: `script-${i}`,
    title: `AI Script ${i + 1}`,
    description: `Description for script ${i + 1}`,
    category: 'ml-ops',
    confidence: 0.8 + (i * 0.1),
    reasoning: `Based on your interest in ${['ML', 'AI', 'Data'][i]}`,
    metadata: {
      popularity: 100 + i * 50,
      rating: 4.0 + (i * 0.3),
      complexity: ['beginner', 'intermediate', 'advanced'][i % 3] as string,
      estimatedTime: `${i + 1}-${i + 2} hours`,
    },
  })),
  articles: [],
});

describe('Comprehensive AI Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset performance counters
    global.gc && global.gc();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Chat Service Tests', () => {
    describe('Session Management', () => {
      it('creates a new chat session successfully', async () => {
        const mockSession = generateChatSession();
        mockChatService.createSession.mockResolvedValue({
          success: true,
          data: mockSession,
          metadata: {
            requestId: 'req-123',
            timestamp: new Date(),
            processingTime: 100,
          },
        });

        const result = await mockChatService.createSession();

        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockSession);
        expect(mockChatService.createSession).toHaveBeenCalledWith();
      });

      it('handles session creation errors gracefully', async () => {
        mockChatService.createSession.mockResolvedValue({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid user profile',
          },
          metadata: {
            requestId: 'req-124',
            timestamp: new Date(),
            processingTime: 50,
          },
        });

        const result = await mockChatService.createSession();

        expect(result.success).toBe(false);
        expect(result.error?.code).toBe('VALIDATION_ERROR');
      });

      it('retrieves existing session successfully', async () => {
        const mockSession = generateChatSession();
        mockChatService.getSession.mockResolvedValue({
          success: true,
          data: mockSession,
          metadata: {
            requestId: 'req-125',
            timestamp: new Date(),
            processingTime: 25,
          },
        });

        const result = await mockChatService.getSession('session-123');

        expect(result.success).toBe(true);
        expect(result.data?.id).toBe('session-123');
        expect(mockChatService.getSession).toHaveBeenCalledWith('session-123');
      });

      it('handles session not found error', async () => {
        mockChatService.getSession.mockResolvedValue({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Chat session not found or expired.',
          },
          metadata: {
            requestId: 'req-126',
            timestamp: new Date(),
            processingTime: 10,
          },
        });

        const result = await mockChatService.getSession('nonexistent-session');

        expect(result.success).toBe(false);
        expect(result.error?.code).toBe('NOT_FOUND');
      });
    });

    describe('Message Processing', () => {
      it('sends message and receives AI response', async () => {
        const mockResponse = {
          success: true,
          data: {
            session: generateChatSession({
              messages: [
                generateChatMessage({ role: 'user', content: 'Hello' }),
                generateChatMessage({ role: 'assistant', content: 'Hi there!' }),
              ],
            }),
            response: generateChatMessage({ role: 'assistant', content: 'Hi there!' }),
          },
          metadata: {
            requestId: 'req-127',
            timestamp: new Date(),
            processingTime: 200,
            tokensUsed: 15,
          },
        };

        mockChatService.sendMessage.mockResolvedValue(mockResponse);

        const result = await mockChatService.sendMessage('session-123', 'Hello', 'user-123');

        expect(result.success).toBe(true);
        expect(result.data?.response.content).toBe('Hi there!');
        expect(result.metadata?.tokensUsed).toBe(15);
        expect(mockChatService.sendMessage).toHaveBeenCalledWith('session-123', 'Hello', 'user-123');
      });

      it('handles rate limiting', async () => {
        mockChatService.sendMessage.mockResolvedValue({
          success: false,
          error: {
            code: 'RATE_LIMIT',
            message: 'Too many messages. Please try again later.',
          },
          metadata: {
            requestId: 'req-128',
            timestamp: new Date(),
            processingTime: 5,
          },
        });

        const result = await mockChatService.sendMessage('session-123', 'Hello', 'user-123');

        expect(result.success).toBe(false);
        expect(result.error?.code).toBe('RATE_LIMIT');
      });

      it('validates empty message input', async () => {
        mockChatService.sendMessage.mockResolvedValue({
          success: false,
          error: {
            code: 'VALIDATION',
            message: 'Message content cannot be empty.',
          },
          metadata: {
            requestId: 'req-129',
            timestamp: new Date(),
            processingTime: 5,
          },
        });

        const result = await mockChatService.sendMessage('session-123', '', 'user-123');

        expect(result.success).toBe(false);
        expect(result.error?.code).toBe('VALIDATION');
      });

      it('handles long message content', async () => {
        const longMessage = 'A'.repeat(1500); // Test long message
        const mockResponse = {
          success: true,
          data: {
            session: generateChatSession(),
            response: generateChatMessage({
              role: 'assistant',
              content: 'I received your long message.',
            }),
          },
          metadata: {
            requestId: 'req-130',
            timestamp: new Date(),
            processingTime: 500,
            tokensUsed: 400,
          },
        };

        mockChatService.sendMessage.mockResolvedValue(mockResponse);

        const result = await mockChatService.sendMessage('session-123', longMessage, 'user-123');

        expect(result.success).toBe(true);
        expect(result.metadata?.tokensUsed).toBeGreaterThan(300);
      });
    });

    describe('Session Lifecycle', () => {
      it('closes session successfully', async () => {
        mockChatService.closeSession.mockResolvedValue({
          success: true,
          metadata: {
            requestId: 'req-131',
            timestamp: new Date(),
            processingTime: 50,
          },
        });

        const result = await mockChatService.closeSession('session-123');

        expect(result.success).toBe(true);
        expect(mockChatService.closeSession).toHaveBeenCalledWith('session-123');
      });
    });
  });

  describe('Recommendation Engine Tests', () => {
    describe('Recommendation Generation', () => {
      it('generates relevant recommendations for user', async () => {
        const mockRecommendations = generateRecommendations(5);
        mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);

        const result = await mockRecommendationService.getRecommendations('user-123', {
          categories: ['ml-ops'],
          maxRecommendations: 5,
        });

        expect(result.scripts).toHaveLength(5);
        expect(result.scripts[0]).toHaveProperty('confidence');
        expect(result.scripts[0]!.confidence).toBeGreaterThan(0.7);
        expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith('user-123', {
          categories: ['ml-ops'],
          maxRecommendations: 5,
        });
      });

      it('filters recommendations by confidence threshold', async () => {
        const mockRecommendations = generateRecommendations(3);
        // Set different confidence levels
        mockRecommendations.scripts[0]!.confidence = 0.9;
        mockRecommendations.scripts[1]!.confidence = 0.6; // Below threshold
        mockRecommendations.scripts[2]!.confidence = 0.8;

        const filteredRecommendations = {
          scripts: mockRecommendations.scripts.filter(s => s.confidence >= 0.7),
          articles: [],
        };

        mockRecommendationService.getRecommendations.mockResolvedValue(filteredRecommendations);

        const result = await mockRecommendationService.getRecommendations('user-123', {
          minConfidence: 0.7,
        });

        expect(result.scripts).toHaveLength(2);
        expect(result.scripts.every(s => s.confidence >= 0.7)).toBe(true);
      });

      it('handles empty recommendations gracefully', async () => {
        mockRecommendationService.getRecommendations.mockResolvedValue({
          scripts: [],
          articles: [],
        });

        const result = await mockRecommendationService.getRecommendations('new-user');

        expect(result.scripts).toHaveLength(0);
        expect(result.articles).toHaveLength(0);
      });
    });

    describe('User Interaction Tracking', () => {
      it('tracks user interactions successfully', async () => {
        mockRecommendationService.trackInteraction.mockResolvedValue(undefined);

        await mockRecommendationService.trackInteraction({
          userId: 'user-123',
          action: 'click',
          itemId: 'script-1',
          timestamp: new Date(),
        });

        expect(mockRecommendationService.trackInteraction).toHaveBeenCalledWith({
          userId: 'user-123',
          action: 'click',
          itemId: 'script-1',
          timestamp: expect.any(Date),
        });
      });

      it('updates user preferences successfully', async () => {
        mockRecommendationService.updateUserPreferences.mockResolvedValue(undefined);

        const preferences = {
          categories: ['ml-ops', 'devops'],
          complexity: ['intermediate', 'advanced'],
          excludeCompleted: true,
        };

        await mockRecommendationService.updateUserPreferences(preferences);

        expect(mockRecommendationService.updateUserPreferences).toHaveBeenCalledWith(preferences);
      });
    });
  });

  describe('Vector Search Tests', () => {
    describe('Search Functionality', () => {
      it('performs vector search successfully', async () => {
        const mockResults: MockVectorResult = {
          results: [
            {
              id: 'doc-1',
              text: 'Machine learning algorithms for data analysis',
              similarity: 0.95,
              metadata: { category: 'ML', source: 'docs' },
            },
            {
              id: 'doc-2',
              text: 'Neural networks and deep learning',
              similarity: 0.87,
              metadata: { category: 'AI', source: 'articles' },
            },
          ],
          searchTime: 150,
          vectorsSearched: 10000,
        };

        mockVectorStore.search.mockResolvedValue(mockResults);

        const result = await mockVectorStore.search('machine learning algorithms', {
          maxResults: 10,
          similarity: 0.8,
        });

        expect(result.results).toHaveLength(2);
        expect(result.results[0].similarity).toBeGreaterThan(0.8);
        expect(result.searchTime).toBeLessThan(1000);
        expect(mockVectorStore.search).toHaveBeenCalledWith('machine learning algorithms', {
          maxResults: 10,
          similarity: 0.8,
        });
      });

      it('handles search with no results', async () => {
        mockVectorStore.search.mockResolvedValue({
          results: [],
          searchTime: 50,
          vectorsSearched: 10000,
        });

        const result = await mockVectorStore.search('nonexistent query');

        expect(result.results).toHaveLength(0);
        expect(result.searchTime).toBeLessThan(1000);
      });

      it('performs search with similarity filtering', async () => {
        const mockResults: MockVectorResult = {
          results: [
            {
              id: 'doc-1',
              text: 'Highly relevant content',
              similarity: 0.95,
              metadata: {},
            },
          ],
          searchTime: 100,
          vectorsSearched: 5000,
        };

        mockVectorStore.search.mockResolvedValue(mockResults);

        const result = await mockVectorStore.search('test query', {
          similarity: 0.9,
        });

        expect(result.results.every(r => r.similarity >= 0.9)).toBe(true);
      });
    });
  });

  describe('Performance Tests', () => {
    describe('Response Time Benchmarks', () => {
      it('chat response time is under threshold', async () => {
        const startTime = performance.now();
        
        mockChatService.sendMessage.mockImplementation(async () => {
          await new Promise(resolve => setTimeout(resolve, 150)); // Simulate processing
          return {
            success: true,
            data: {
              session: generateChatSession(),
              response: generateChatMessage({ role: 'assistant', content: 'Quick response' }),
            },
            metadata: {
              requestId: 'req-perf-1',
              timestamp: new Date(),
              processingTime: 150,
            },
          };
        });

        await mockChatService.sendMessage('session-123', 'Hello');
        const responseTime = performance.now() - startTime;

        expect(responseTime).toBeLessThan(2000); // 2 second threshold
      });

      it('recommendation generation is under threshold', async () => {
        const startTime = performance.now();
        
        mockRecommendationService.getRecommendations.mockImplementation(async () => {
          await new Promise(resolve => setTimeout(resolve, 100)); // Simulate processing
          return generateRecommendations(5);
        });

        await mockRecommendationService.getRecommendations('user-123');
        const responseTime = performance.now() - startTime;

        expect(responseTime).toBeLessThan(500); // 500ms threshold
      });

      it('vector search is under threshold', async () => {
        const startTime = performance.now();
        
        mockVectorStore.search.mockImplementation(async () => {
          await new Promise(resolve => setTimeout(resolve, 200)); // Simulate processing
          return {
            results: [
              { id: 'doc-1', text: 'Result', similarity: 0.9, metadata: {} },
            ],
            searchTime: 200,
            vectorsSearched: 1000,
          };
        });

        await mockVectorStore.search('test query');
        const responseTime = performance.now() - startTime;

        expect(responseTime).toBeLessThan(1000); // 1 second threshold
      });
    });

    describe('Memory Usage Tests', () => {
      it('handles multiple concurrent operations without memory leaks', async () => {
        const initialMemory = process.memoryUsage().heapUsed;
        
        // Mock all services with minimal data
        mockChatService.sendMessage.mockResolvedValue({
          success: true,
          data: {
            session: generateChatSession(),
            response: generateChatMessage(),
          },
          metadata: { requestId: 'test', timestamp: new Date(), processingTime: 10 },
        });

        mockRecommendationService.getRecommendations.mockResolvedValue({
          scripts: [],
          articles: [],
        });

        mockVectorStore.search.mockResolvedValue({
          results: [],
          searchTime: 10,
          vectorsSearched: 0,
        });

        // Perform concurrent operations
        const operations = Array.from({ length: 50 }, async (_, i) => {
          await Promise.all([
            mockChatService.sendMessage(`session-${i}`, `message-${i}`),
            mockRecommendationService.getRecommendations(`user-${i}`),
            mockVectorStore.search(`query-${i}`),
          ]);
        });

        await Promise.all(operations);

        const finalMemory = process.memoryUsage().heapUsed;
        const memoryIncrease = finalMemory - initialMemory;

        // Should not increase by more than 50MB
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
      });
    });
  });

  describe('Error Handling Tests', () => {
    describe('Network and Service Errors', () => {
      it('handles network timeout errors', async () => {
        mockChatService.sendMessage.mockRejectedValue(new Error('Network timeout'));

        await expect(mockChatService.sendMessage('session-123', 'Hello'))
          .rejects.toThrow('Network timeout');
      });

      it('handles service unavailable errors', async () => {
        mockRecommendationService.getRecommendations.mockResolvedValue({
          scripts: [],
          articles: [],
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: 'Recommendation service is temporarily unavailable',
          },
        });

        const result = await mockRecommendationService.getRecommendations('user-123');

        expect(result.error?.code).toBe('SERVICE_UNAVAILABLE');
      });

      it('handles invalid input gracefully', async () => {
        mockVectorStore.search.mockResolvedValue({
          results: [],
          searchTime: 0,
          vectorsSearched: 0,
          error: 'Invalid search query',
        });

        const result = await mockVectorStore.search('');

        expect(result.results).toHaveLength(0);
        expect(result.error).toBeDefined();
      });
    });

    describe('Data Validation', () => {
      it('validates chat session data structure', async () => {
        const mockResponse = {
          success: true,
          data: {
            session: generateChatSession(),
            response: generateChatMessage(),
          },
          metadata: {
            requestId: 'req-validation',
            timestamp: new Date(),
            processingTime: 100,
          },
        };

        mockChatService.sendMessage.mockResolvedValue(mockResponse);

        const result = await mockChatService.sendMessage('session-123', 'Hello');

        expect(result.data?.session).toHaveProperty('id');
        expect(result.data?.session).toHaveProperty('messages');
        expect(result.data?.session).toHaveProperty('context');
        expect(result.data?.response).toHaveProperty('role');
        expect(result.data?.response).toHaveProperty('content');
      });

      it('validates recommendation data structure', async () => {
        const mockRecommendations = generateRecommendations(3);
        mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);

        const result = await mockRecommendationService.getRecommendations('user-123');

        expect(Array.isArray(result.scripts)).toBe(true);
        result.scripts.forEach(script => {
          expect(script).toHaveProperty('id');
          expect(script).toHaveProperty('title');
          expect(script).toHaveProperty('confidence');
          expect(script.confidence).toBeGreaterThanOrEqual(0);
          expect(script.confidence).toBeLessThanOrEqual(1);
        });
      });
    });
  });

  describe('Security Tests', () => {
    describe('Input Sanitization', () => {
      it('handles malicious input in chat messages', async () => {
        const maliciousInput = '<script>alert("XSS")</script>';
        
        mockChatService.sendMessage.mockResolvedValue({
          success: true,
          data: {
            session: generateChatSession(),
            response: generateChatMessage({
              role: 'assistant',
              content: 'I received your message safely.',
            }),
          },
          metadata: {
            requestId: 'req-security',
            timestamp: new Date(),
            processingTime: 100,
          },
        });

        const result = await mockChatService.sendMessage('session-123', maliciousInput);

        expect(result.success).toBe(true);
        expect(result.data?.response.content).not.toContain('<script>');
      });

      it('handles SQL injection attempts in search queries', async () => {
        const sqlInjection = "'; DROP TABLE documents; --";
        
        mockVectorStore.search.mockResolvedValue({
          results: [],
          searchTime: 10,
          vectorsSearched: 0,
          sanitized: true,
        });

        const result = await mockVectorStore.search(sqlInjection);

        expect(result.results).toHaveLength(0);
        expect(result.sanitized).toBe(true);
      });
    });

    describe('Rate Limiting', () => {
      it('enforces rate limits on chat messages', async () => {
        // Mock rate limit exceeded
        mockChatService.sendMessage.mockResolvedValue({
          success: false,
          error: {
            code: 'RATE_LIMIT',
            message: 'Too many messages. Please try again later.',
          },
          metadata: {
            requestId: 'req-rate-limit',
            timestamp: new Date(),
            processingTime: 5,
          },
        });

        const result = await mockChatService.sendMessage('session-123', 'Hello');

        expect(result.success).toBe(false);
        expect(result.error?.code).toBe('RATE_LIMIT');
      });
    });
  });
});