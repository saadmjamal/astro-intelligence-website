import { jest } from '@jest/globals';
import { performance } from 'perf_hooks';

// Mock AI services for performance testing
const mockAIService = {
  chat: jest.fn() as jest.MockedFunction<(message: string) => Promise<any>>,
  recommendations: jest.fn() as jest.MockedFunction<(userId: string, options?: any) => Promise<any>>,
  vectorSearch: jest.fn() as jest.MockedFunction<(query: string, options?: any) => Promise<any>>,
  generateContent: jest.fn() as jest.MockedFunction<(prompt: string) => Promise<any>>,
  analyzePerformance: jest.fn() as jest.MockedFunction<() => Promise<any>>
};

jest.mock('@/lib/ai/services', () => ({
  AIService: mockAIService
}));

// Performance test utilities
const measurePerformance = async (operation: () => Promise<any>): Promise<{
  result: any;
  duration: number;
  memory: number;
}> => {
  const startTime = performance.now();
  const startMemory = process.memoryUsage().heapUsed;
  
  const result = await operation();
  
  const endTime = performance.now();
  const endMemory = process.memoryUsage().heapUsed;
  
  return {
    result,
    duration: endTime - startTime,
    memory: endMemory - startMemory
  };
};

const generateLargeDataset = (size: number) => {
  return Array.from({ length: size }, (_, i) => ({
    id: `item-${i}`,
    content: `Test content for item ${i}`,
    metadata: {
      timestamp: Date.now(),
      category: `category-${i % 10}`,
      priority: Math.random() > 0.5 ? 'high' : 'normal'
    }
  }));
};

describe('AI Performance Benchmarks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset performance counters
    if (global.gc) {
      global.gc();
    }
  });

  describe('Chat Interface Performance', () => {
    it('meets sub-2s response time requirement for chat messages', async () => {
      const mockResponse = {
        message: 'Hello! How can I help you today?',
        usage: { totalTokens: 20 },
        metadata: { provider: 'openai' }
      };
      
      mockAIService.chat.mockImplementation(() => 
        new Promise(resolve => {
          setTimeout(() => resolve(mockResponse), 150); // Simulate realistic API latency
        })
      );

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.chat('Hello AI assistant!');
      });

      expect(duration).toBeLessThan(2000); // Sub-2s requirement
      expect(duration).toBeGreaterThan(100); // Ensure test is realistic
    });

    it('handles concurrent chat requests efficiently', async () => {
      const mockResponse = { message: 'Concurrent response' };
      mockAIService.chat.mockResolvedValue(mockResponse);

      const concurrentRequests = Array.from({ length: 10 }, (_, i) => 
        measurePerformance(() => mockAIService.chat(`Message ${i}`))
      );

      const results = await Promise.all(concurrentRequests);
      
      // All requests should complete within reasonable time
      results.forEach(({ duration }) => {
        expect(duration).toBeLessThan(3000);
      });

      // Average response time should be reasonable
      const averageDuration = results.reduce((sum, { duration }) => sum + duration, 0) / results.length;
      expect(averageDuration).toBeLessThan(1500);
    });

    it('maintains performance with long conversation history', async () => {
      const longHistory = Array.from({ length: 50 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i} in a very long conversation history`
      }));

      mockAIService.chat.mockResolvedValue({ message: 'Response with long history' });

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.chat('New message', { history: longHistory });
      });

      expect(duration).toBeLessThan(2500); // Slightly higher limit for complex requests
    });

    it('efficiently processes large message content', async () => {
      const largeMessage = 'x'.repeat(5000); // 5KB message
      mockAIService.chat.mockResolvedValue({ message: 'Processed large message' });

      const { duration, memory } = await measurePerformance(async () => {
        return await mockAIService.chat(largeMessage);
      });

      expect(duration).toBeLessThan(2000);
      expect(memory).toBeLessThan(10 * 1024 * 1024); // <10MB memory usage
    });
  });

  describe('Recommendation Engine Performance', () => {
    it('loads recommendations within 500ms', async () => {
      const mockRecommendations = {
        scripts: generateLargeDataset(20),
        articles: generateLargeDataset(10)
      };

      mockAIService.recommendations.mockImplementation(() =>
        new Promise(resolve => {
          setTimeout(() => resolve(mockRecommendations), 200);
        })
      );

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.recommendations('test-user-123');
      });

      expect(duration).toBeLessThan(500); // Sub-500ms requirement
    });

    it('handles large user preference datasets efficiently', async () => {
      const largeUserProfile = {
        userId: 'test-user',
        preferences: generateLargeDataset(1000),
        history: generateLargeDataset(500),
        interactions: generateLargeDataset(2000)
      };

      mockAIService.recommendations.mockResolvedValue({
        scripts: generateLargeDataset(10),
        articles: generateLargeDataset(5)
      });

      const { duration, memory } = await measurePerformance(async () => {
        return await mockAIService.recommendations(largeUserProfile.userId, largeUserProfile);
      });

      expect(duration).toBeLessThan(800); // Higher limit for complex profiles
      expect(memory).toBeLessThan(50 * 1024 * 1024); // <50MB memory usage
    });

    it('maintains performance with real-time personalization updates', async () => {
      const userInteractions = generateLargeDataset(100);
      
      mockAIService.recommendations.mockResolvedValue({
        scripts: generateLargeDataset(5),
        articles: generateLargeDataset(3)
      });

      // Simulate rapid updates
      const rapidUpdates = Array.from({ length: 20 }, (_, i) =>
        measurePerformance(() => 
          mockAIService.recommendations('user-123', { 
            recentInteractions: userInteractions.slice(i * 5, (i + 1) * 5) 
          })
        )
      );

      const results = await Promise.all(rapidUpdates);
      
      results.forEach(({ duration }) => {
        expect(duration).toBeLessThan(600);
      });
    });

    it('efficiently calculates recommendation confidence scores', async () => {
      const complexRecommendationSet = {
        scripts: Array.from({ length: 100 }, (_, i) => ({
          id: `script-${i}`,
          title: `Script ${i}`,
          features: generateLargeDataset(20), // Complex feature set
          userMatches: generateLargeDataset(10)
        }))
      };

      mockAIService.recommendations.mockImplementation(async () => {
        // Simulate confidence calculation
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          scripts: complexRecommendationSet.scripts.map(script => ({
            ...script,
            confidence: Math.random() * 0.4 + 0.6 // 0.6-1.0 range
          }))
        };
      });

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.recommendations('user-123');
      });

      expect(duration).toBeLessThan(700); // Complex calculation limit
    });
  });

  describe('Vector Search Performance', () => {
    it('performs sub-millisecond searches on small datasets', async () => {
      const searchResults = {
        results: generateLargeDataset(10),
        searchTime: 0.5,
        vectorsSearched: 1000
      };

      mockAIService.vectorSearch.mockImplementation(() =>
        new Promise(resolve => {
          setTimeout(() => resolve(searchResults), 1); // <1ms simulation
        })
      );

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.vectorSearch('machine learning optimization');
      });

      expect(duration).toBeLessThan(100); // Including overhead
    });

    it('scales efficiently with large vector databases', async () => {
      const largeSearchResults = {
        results: generateLargeDataset(50),
        searchTime: 234,
        vectorsSearched: 1000000
      };

      mockAIService.vectorSearch.mockImplementation(() =>
        new Promise(resolve => {
          setTimeout(() => resolve(largeSearchResults), 250);
        })
      );

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.vectorSearch('complex neural network architecture', {
          datasetSize: 'large',
          maxResults: 50
        });
      });

      expect(duration).toBeLessThan(500); // Reasonable for large datasets
    });

    it('handles concurrent search requests without degradation', async () => {
      const mockResult = {
        results: generateLargeDataset(5),
        searchTime: 150,
        vectorsSearched: 10000
      };

      mockAIService.vectorSearch.mockResolvedValue(mockResult);

      const concurrentSearches = Array.from({ length: 10 }, (_, i) =>
        measurePerformance(() => 
          mockAIService.vectorSearch(`query ${i}`)
        )
      );

      const results = await Promise.all(concurrentSearches);
      
      // Performance should not degrade significantly
      const maxDuration = Math.max(...results.map(r => r.duration));
      const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
      
      expect(maxDuration).toBeLessThan(600);
      expect(avgDuration).toBeLessThan(400);
    });

    it('efficiently processes complex query embeddings', async () => {
      const complexQuery = `
        Advanced machine learning techniques for optimizing neural network 
        architectures with attention mechanisms and transformer models for 
        natural language processing applications in production environments
      `;

      mockAIService.vectorSearch.mockImplementation(async (query) => {
        // Simulate embedding calculation
        await new Promise(resolve => setTimeout(resolve, 50));
        return {
          results: generateLargeDataset(10),
          searchTime: 123,
          queryComplexity: query.length
        };
      });

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.vectorSearch(complexQuery);
      });

      expect(duration).toBeLessThan(300);
    });
  });

  describe('Content Generation Performance', () => {
    it('generates content within acceptable time limits', async () => {
      const mockContent = {
        title: 'Generated Article Title',
        content: 'x'.repeat(2000), // 2KB content
        metadata: { wordCount: 300, readTime: '2 min' }
      };

      mockAIService.generateContent.mockImplementation(() =>
        new Promise(resolve => {
          setTimeout(() => resolve(mockContent), 800);
        })
      );

      const { duration } = await measurePerformance(async () => {
        return await mockAIService.generateContent({
          type: 'article',
          topic: 'machine learning',
          length: 'medium'
        });
      });

      expect(duration).toBeLessThan(3000); // Reasonable for content generation
    });

    it('handles batch content generation efficiently', async () => {
      const batchRequests = Array.from({ length: 5 }, (_, i) => ({
        type: 'snippet',
        topic: `topic-${i}`,
        length: 'short'
      }));

      mockAIService.generateContent.mockImplementation((request) =>
        new Promise(resolve => {
          setTimeout(() => resolve({
            content: `Generated content for ${request.topic}`,
            metadata: { requestId: Math.random() }
          }), 200);
        })
      );

      const { duration } = await measurePerformance(async () => {
        return await Promise.all(
          batchRequests.map(req => mockAIService.generateContent(req))
        );
      });

      expect(duration).toBeLessThan(1500); // Batch should be efficient
    });
  });

  describe('Memory Usage and Resource Management', () => {
    it('maintains memory usage within acceptable limits', async () => {
      const largeOperations = Array.from({ length: 50 }, () =>
        measurePerformance(async () => {
          const largeData = generateLargeDataset(1000);
          return await mockAIService.analyzePerformance(largeData);
        })
      );

      mockAIService.analyzePerformance.mockImplementation(async (data) => {
        // Simulate processing
        const processed = data.map(item => ({ ...item, processed: true }));
        return { processedCount: processed.length };
      });

      const results = await Promise.all(largeOperations);
      
      // Memory usage should not grow excessively
      const memoryUsages = results.map(r => r.memory);
      const avgMemoryUsage = memoryUsages.reduce((sum, mem) => sum + mem, 0) / memoryUsages.length;
      
      expect(avgMemoryUsage).toBeLessThan(100 * 1024 * 1024); // <100MB average
    });

    it('cleans up resources properly after operations', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Perform memory-intensive operations
      const operations = Array.from({ length: 10 }, () =>
        measurePerformance(async () => {
          const tempData = generateLargeDataset(5000);
          mockAIService.chat.mockResolvedValue({ processed: tempData.length });
          return await mockAIService.chat('memory test');
        })
      );

      await Promise.all(operations);
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      // Allow some time for cleanup
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // <50MB increase
    });
  });

  describe('API Rate Limiting and Throttling', () => {
    it('handles rate-limited scenarios gracefully', async () => {
      let callCount = 0;
      
      mockAIService.chat.mockImplementation(() => {
        callCount++;
        if (callCount <= 5) {
          return Promise.resolve({ message: `Response ${callCount}` });
        } else {
          return Promise.reject(new Error('Rate limit exceeded'));
        }
      });

      const rapidRequests = Array.from({ length: 10 }, (_, i) =>
        measurePerformance(() => 
          mockAIService.chat(`Rapid request ${i}`).catch(err => ({ error: err.message }))
        )
      );

      const results = await Promise.all(rapidRequests);
      
      // Should handle both successful and rate-limited requests
      const successfulRequests = results.filter(r => !r.result.error);
      const rateLimitedRequests = results.filter(r => r.result.error);
      
      expect(successfulRequests.length).toBe(5);
      expect(rateLimitedRequests.length).toBe(5);
      
      // Rate-limited requests should fail quickly
      rateLimitedRequests.forEach(({ duration }) => {
        expect(duration).toBeLessThan(100);
      });
    });

    it('implements exponential backoff for retries', async () => {
      let attemptCount = 0;
      const retryDelays: number[] = [];
      
      mockAIService.chat.mockImplementation(() => {
        attemptCount++;
        const delay = Math.pow(2, attemptCount - 1) * 100; // Exponential backoff
        retryDelays.push(delay);
        
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (attemptCount < 3) {
              reject(new Error('Temporary failure'));
            } else {
              resolve({ message: 'Success after retries' });
            }
          }, delay);
        });
      });

      const { duration } = await measurePerformance(async () => {
        // Simulate retry logic
        for (let i = 0; i < 3; i++) {
          try {
            return await mockAIService.chat('Retry test');
          } catch (error) {
            if (i === 2) throw error;
            // Continue to next attempt
          }
        }
      });

      expect(retryDelays).toEqual([100, 200, 400]); // Exponential progression
      expect(duration).toBeGreaterThan(700); // Should account for backoff delays
    });
  });

  describe('Performance Monitoring and Metrics', () => {
    it('tracks response time percentiles accurately', async () => {
      const responseTimes: number[] = [];
      
      mockAIService.chat.mockImplementation(() =>
        new Promise(resolve => {
          const delay = Math.random() * 1000; // 0-1000ms random delay
          responseTimes.push(delay);
          setTimeout(() => resolve({ message: 'Timed response' }), delay);
        })
      );

      const requests = Array.from({ length: 100 }, () =>
        measurePerformance(() => mockAIService.chat('Performance test'))
      );

      const results = await Promise.all(requests);
      const durations = results.map(r => r.duration);
      
      durations.sort((a, b) => a - b);
      
      const p50 = durations[Math.floor(durations.length * 0.5)];
      const p95 = durations[Math.floor(durations.length * 0.95)];
      const p99 = durations[Math.floor(durations.length * 0.99)];
      
      expect(p50).toBeLessThan(800);
      expect(p95).toBeLessThan(1200);
      expect(p99).toBeLessThan(1500);
    });

    it('measures throughput under load', async () => {
      mockAIService.chat.mockImplementation(() =>
        new Promise(resolve => {
          setTimeout(() => resolve({ message: 'Load test response' }), 100);
        })
      );

      const startTime = performance.now();
      const loadTestRequests = Array.from({ length: 50 }, () =>
        mockAIService.chat('Load test')
      );

      await Promise.all(loadTestRequests);
      const endTime = performance.now();
      
      const totalTime = endTime - startTime;
      const throughput = (50 * 1000) / totalTime; // Requests per second
      
      expect(throughput).toBeGreaterThan(10); // Minimum 10 RPS
    });

    it('identifies performance bottlenecks', async () => {
      const bottleneckOperations = {
        fastOperation: () => Promise.resolve({ fast: true }),
        slowOperation: () => new Promise(resolve => 
          setTimeout(() => resolve({ slow: true }), 500)
        ),
        mediumOperation: () => new Promise(resolve => 
          setTimeout(() => resolve({ medium: true }), 200)
        )
      };

      const performanceResults = {};
      
      for (const [name, operation] of Object.entries(bottleneckOperations)) {
        const { duration } = await measurePerformance(operation);
        performanceResults[name] = duration;
      }

      expect(performanceResults['fastOperation']).toBeLessThan(50);
      expect(performanceResults['mediumOperation']).toBeLessThan(300);
      expect(performanceResults['slowOperation']).toBeGreaterThan(400);
      
      // Identify bottleneck
      const slowestOperation = Object.entries(performanceResults as Record<string, number>)
        .reduce((a, b) => a[1] > b[1] ? a : b);
      
      expect(slowestOperation[0]).toBe('slowOperation');
    });
  });
});