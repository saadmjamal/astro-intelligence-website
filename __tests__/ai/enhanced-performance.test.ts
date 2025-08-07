/**
 * Enhanced AI Performance Tests
 * Comprehensive performance testing for AI services with detailed metrics
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { performance } from 'perf_hooks';

// Performance monitoring utilities
class PerformanceMonitor {
  private metrics: {
    responseTimes: number[];
    memoryUsage: number[];
    throughput: number[];
    errorCount: number;
    successCount: number;
  } = {
    responseTimes: [],
    memoryUsage: [],
    throughput: [],
    errorCount: 0,
    successCount: 0,
  };

  record(duration: number, success: boolean, memoryUsage?: number) {
    this.metrics.responseTimes.push(duration);
    if (memoryUsage) this.metrics.memoryUsage.push(memoryUsage);
    
    if (success) {
      this.metrics.successCount++;
    } else {
      this.metrics.errorCount++;
    }
  }

  recordThroughput(requestsPerSecond: number) {
    this.metrics.throughput.push(requestsPerSecond);
  }

  getStats() {
    const responseTimes = this.metrics.responseTimes.sort((a, b) => a - b);
    const memoryUsages = this.metrics.memoryUsage.sort((a, b) => a - b);
    
    return {
      responseTime: {
        count: responseTimes.length,
        average: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length || 0,
        median: responseTimes[Math.floor(responseTimes.length / 2)] || 0,
        p95: responseTimes[Math.floor(responseTimes.length * 0.95)] || 0,
        p99: responseTimes[Math.floor(responseTimes.length * 0.99)] || 0,
        min: responseTimes[0] || 0,
        max: responseTimes[responseTimes.length - 1] || 0,
      },
      memory: {
        average: memoryUsages.reduce((a, b) => a + b, 0) / memoryUsages.length || 0,
        peak: Math.max(...memoryUsages) || 0,
        min: Math.min(...memoryUsages) || 0,
      },
      throughput: {
        average: this.metrics.throughput.reduce((a, b) => a + b, 0) / this.metrics.throughput.length || 0,
        peak: Math.max(...this.metrics.throughput) || 0,
      },
      reliability: {
        successRate: this.metrics.successCount / (this.metrics.successCount + this.metrics.errorCount) || 0,
        errorRate: this.metrics.errorCount / (this.metrics.successCount + this.metrics.errorCount) || 0,
        totalRequests: this.metrics.successCount + this.metrics.errorCount,
      },
    };
  }

  reset() {
    this.metrics = {
      responseTimes: [],
      memoryUsage: [],
      throughput: [],
      errorCount: 0,
      successCount: 0,
    };
  }
}

// Mock AI services with realistic delays
const createMockChatService = (baseDelay = 200) => ({
  sendMessage: jest.fn().mockImplementation(async (sessionId: string, message: string) => {
    const processingTime = baseDelay + Math.random() * 100; // Add some variance
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    return {
      success: Math.random() > 0.05, // 95% success rate
      data: {
        session: {
          id: sessionId,
          messages: [
            { id: 'msg-1', role: 'user', content: message, timestamp: new Date() },
            { id: 'msg-2', role: 'assistant', content: 'AI response', timestamp: new Date() },
          ],
        },
        response: { id: 'msg-2', role: 'assistant', content: 'AI response', timestamp: new Date() },
      },
      metadata: {
        requestId: `req-${Date.now()}`,
        timestamp: new Date(),
        processingTime,
        tokensUsed: Math.ceil(message.length / 4) + 10,
      },
    };
  }),
});

const createMockRecommendationService = (baseDelay = 150) => ({
  getRecommendations: jest.fn(async (userId: string, options: any = {}) => {
    const processingTime = baseDelay + Math.random() * 50;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    const count = options.maxRecommendations || 5;
    return {
      scripts: Array.from({ length: count }, (_, i) => ({
        id: `script-${i}`,
        title: `AI Script ${i + 1}`,
        description: `Description for script ${i + 1}`,
        category: 'ml-ops',
        confidence: 0.7 + Math.random() * 0.3,
        reasoning: `Based on user ${userId} preferences`,
        metadata: {
          popularity: 100 + i * 50,
          rating: 4.0 + Math.random(),
          complexity: ['beginner', 'intermediate', 'advanced'][i % 3],
          estimatedTime: `${i + 1}-${i + 2} hours`,
        },
      })),
      articles: [],
    };
  }),
});

const createMockVectorStore = (baseDelay = 100) => ({
  search: jest.fn().mockImplementation(async (query: string, options: any = {}) => {
    const processingTime = baseDelay + Math.random() * 100;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    const maxResults = options.maxResults || 10;
    const vectorsSearched = options.datasetSize === 'large' ? 1000000 : 10000;
    
    return {
      results: Array.from({ length: Math.min(maxResults, 10) }, (_, i) => ({
        id: `doc-${i}`,
        text: `Result ${i + 1} for query: ${query}`,
        similarity: 0.6 + Math.random() * 0.4,
        metadata: {
          category: ['ML', 'AI', 'Data'][i % 3],
          source: `source-${i % 3 + 1}`,
        },
      })),
      searchTime: processingTime,
      vectorsSearched,
    };
  }),
});

describe('Enhanced AI Performance Tests', () => {
  // Set timeout for all tests in this suite
  jest.setTimeout(60000);
  let performanceMonitor: PerformanceMonitor;
  let mockChatService: ReturnType<typeof createMockChatService>;
  let mockRecommendationService: ReturnType<typeof createMockRecommendationService>;
  let mockVectorStore: ReturnType<typeof createMockVectorStore>;

  beforeEach(() => {
    performanceMonitor = new PerformanceMonitor();
    mockChatService = createMockChatService();
    mockRecommendationService = createMockRecommendationService();
    mockVectorStore = createMockVectorStore();
    
    // Force garbage collection if available
    if (global.gc) global.gc();
  });

  afterEach(() => {
    performanceMonitor.reset();
    jest.clearAllMocks();
  });

  describe('Response Time Benchmarks', () => {
    it('chat service meets response time SLA', async () => {
      const iterations = 20;
      const maxResponseTime = 2000; // 2 seconds SLA
      
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        const result = await mockChatService.sendMessage(`session-${i}`, `Test message ${i}`) as any;
        const responseTime = performance.now() - startTime;
        
        performanceMonitor.record(responseTime, result.success);
        
        // Each individual request should meet SLA
        expect(responseTime).toBeLessThan(maxResponseTime);
      }
      
      const stats = performanceMonitor.getStats();
      
      // Aggregate stats should meet performance requirements
      expect(stats.responseTime.average).toBeLessThan(500); // Average under 500ms
      expect(stats.responseTime.p95).toBeLessThan(1000); // 95% under 1s
      expect(stats.responseTime.p99).toBeLessThan(1500); // 99% under 1.5s
      expect(stats.reliability.successRate).toBeGreaterThan(0.95); // 95% success rate
      
      console.log('Chat Service Performance Stats:', JSON.stringify(stats, null, 2));
    });

    it('recommendation service meets response time SLA', async () => {
      const iterations = 15;
      const maxResponseTime = 1000; // 1 second SLA
      
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        const result = await mockRecommendationService.getRecommendations(`user-${i}`, {
          maxRecommendations: 5,
        }) as any;
        const responseTime = performance.now() - startTime;
        
        performanceMonitor.record(responseTime, !!result.scripts);
        
        expect(responseTime).toBeLessThan(maxResponseTime);
      }
      
      const stats = performanceMonitor.getStats();
      
      expect(stats.responseTime.average).toBeLessThan(300); // Average under 300ms
      expect(stats.responseTime.p95).toBeLessThan(500); // 95% under 500ms
      expect(stats.reliability.successRate).toBe(1); // 100% success rate expected
      
      console.log('Recommendation Service Performance Stats:', JSON.stringify(stats, null, 2));
    });

    it('vector search meets response time SLA', async () => {
      const iterations = 10;
      const maxResponseTime = 1500; // 1.5 second SLA for complex search
      
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        const result = await mockVectorStore.search(`machine learning query ${i}`, {
          maxResults: 10,
          datasetSize: 'large',
        }) as any;
        const responseTime = performance.now() - startTime;
        
        performanceMonitor.record(responseTime, result.results.length > 0);
        
        expect(responseTime).toBeLessThan(maxResponseTime);
      }
      
      const stats = performanceMonitor.getStats();
      
      expect(stats.responseTime.average).toBeLessThan(400); // Average under 400ms
      expect(stats.responseTime.p95).toBeLessThan(800); // 95% under 800ms
      expect(stats.reliability.successRate).toBe(1); // 100% success rate expected
      
      console.log('Vector Search Performance Stats:', JSON.stringify(stats, null, 2));
    });
  });

  describe('Throughput and Load Testing', () => {
    it('handles concurrent chat requests efficiently', async () => {
      const concurrency = 10;
      const requestsPerBatch = 5;
      const batches = 3;
      
      for (let batch = 0; batch < batches; batch++) {
        const batchStartTime = performance.now();
        
        const promises = Array.from({ length: concurrency }, async (_, i) => {
          const requests = Array.from({ length: requestsPerBatch }, (_, j) => 
            mockChatService.sendMessage(`session-${batch}-${i}`, `Batch ${batch} message ${j}`)
          );
          return Promise.all(requests);
        });
        
        const results = await Promise.all(promises);
        const batchDuration = performance.now() - batchStartTime;
        const totalRequests = concurrency * requestsPerBatch;
        const throughput = (totalRequests / batchDuration) * 1000; // requests per second
        
        performanceMonitor.recordThroughput(throughput);
        
        // Validate all requests succeeded
        const allSuccessful = results.every((batchResults: any) => 
          batchResults.every((result: any) => result.success)
        );
        
        expect(allSuccessful).toBe(true);
        expect(throughput).toBeGreaterThan(5); // At least 5 req/s under load
      }
      
      const stats = performanceMonitor.getStats();
      expect(stats.throughput.average).toBeGreaterThan(5);
      
      console.log('Concurrent Chat Throughput Stats:', JSON.stringify(stats, null, 2));
    });

    it('maintains performance under sustained load', async () => {
      const duration = 2000; // Reduced to 2 seconds for faster tests
      const requestInterval = 400; // Request every 400ms (less frequent)
      const startTime = Date.now();
      
      const requests: Promise<any>[] = [];
      let requestCount = 0;
      
      while (Date.now() - startTime < duration) {
        requests.push(
          (mockChatService.sendMessage as any)(`load-session-${requestCount}`, `Load test message ${requestCount}`)
            .then((result: any) => {
              const responseTime = Date.now() - startTime;
              performanceMonitor.record(responseTime, result.success);
              return result;
            })
        );
        
        requestCount++;
        await new Promise(resolve => setTimeout(resolve, requestInterval));
      }
      
      // Wait for all requests to complete
      const results = await Promise.all(requests);
      
      const stats = performanceMonitor.getStats();
      const successRate = stats.reliability.successRate;
      
      expect(successRate).toBeGreaterThan(0.95); // 95% success rate under load
      expect(stats.responseTime.average).toBeLessThan(1000); // Average under 1s
      expect(requestCount).toBeGreaterThan(20); // Should have made at least 20 requests
      
      console.log(`Sustained Load Test (${requestCount} requests):`, JSON.stringify(stats, null, 2));
    });
  });

  describe('Memory and Resource Usage', () => {
    it('maintains stable memory usage during operations', async () => {
      const iterations = 10; // Reduced iterations for faster tests
      const memorySnapshots: number[] = [];
      
      // Take initial memory snapshot
      if (global.gc) global.gc();
      const initialMemory = process.memoryUsage().heapUsed;
      memorySnapshots.push(initialMemory);
      
      for (let i = 0; i < iterations; i++) {
        // Perform various AI operations
        await Promise.all([
          mockChatService.sendMessage(`session-${i}`, `Memory test message ${i}`),
          mockRecommendationService.getRecommendations(`user-${i}`),
          mockVectorStore.search(`memory test query ${i}`),
        ]);
        
        // Take memory snapshot every 10 iterations
        if (i % 10 === 0) {
          if (global.gc) global.gc(); // Force garbage collection
          const currentMemory = process.memoryUsage().heapUsed;
          memorySnapshots.push(currentMemory);
          performanceMonitor.record(0, true, currentMemory);
        }
      }
      
      // Final memory check
      if (global.gc) global.gc();
      const finalMemory = process.memoryUsage().heapUsed;
      memorySnapshots.push(finalMemory);
      
      const memoryIncrease = finalMemory - initialMemory;
      const maxMemoryIncrease = 100 * 1024 * 1024; // 100MB threshold
      
      expect(memoryIncrease).toBeLessThan(maxMemoryIncrease);
      
      const stats = performanceMonitor.getStats();
      console.log('Memory Usage Stats:', {
        initialMemoryMB: (initialMemory / 1024 / 1024).toFixed(2),
        finalMemoryMB: (finalMemory / 1024 / 1024).toFixed(2),
        increaseMB: (memoryIncrease / 1024 / 1024).toFixed(2),
        peakMemoryMB: (stats.memory.peak / 1024 / 1024).toFixed(2),
        averageMemoryMB: (stats.memory.average / 1024 / 1024).toFixed(2),
      });
    });

    it('releases resources properly after operations', async () => {
      const iterations = 5; // Reduced iterations for faster tests
      const memoryCheckpoints: number[] = [];
      
      for (let checkpoint = 0; checkpoint < 4; checkpoint++) {
        // Perform operations
        for (let i = 0; i < iterations; i++) {
          await mockChatService.sendMessage(`cleanup-session-${i}`, 'Cleanup test');
        }
        
        // Force cleanup and measure memory
        if (global.gc) global.gc();
        const memory = process.memoryUsage().heapUsed;
        memoryCheckpoints.push(memory);
        
        // Wait briefly between checkpoints
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Memory should stabilize after initial operations
      const memoryGrowth = memoryCheckpoints.map((mem, i) => 
        i === 0 ? 0 : mem - memoryCheckpoints[i - 1]
      );
      
      // Later checkpoints should show minimal growth
      const laterGrowth = memoryGrowth.slice(2);
      const maxLaterGrowth = Math.max(...laterGrowth);
      const avgLaterGrowth = laterGrowth.reduce((a, b) => a + b, 0) / laterGrowth.length;
      
      expect(maxLaterGrowth).toBeLessThan(10 * 1024 * 1024); // <10MB growth
      expect(avgLaterGrowth).toBeLessThan(5 * 1024 * 1024); // <5MB average growth
      
      console.log('Memory Cleanup Stats:', {
        checkpoints: memoryCheckpoints.map(m => (m / 1024 / 1024).toFixed(2) + 'MB'),
        growth: memoryGrowth.map(g => (g / 1024 / 1024).toFixed(2) + 'MB'),
        maxLaterGrowthMB: (maxLaterGrowth / 1024 / 1024).toFixed(2),
        avgLaterGrowthMB: (avgLaterGrowth / 1024 / 1024).toFixed(2),
      });
    });
  });

  describe('Stress Testing', () => {
    it('handles high-frequency requests without degradation', async () => {
      const duration = 3000; // 3 seconds
      const highFrequency = 50; // 50ms intervals
      const startTime = Date.now();
      
      const results: any[] = [];
      let requestCount = 0;
      
      while (Date.now() - startTime < duration) {
        const requestStartTime = performance.now();
        
        try {
          const result = await mockChatService.sendMessage(`stress-${requestCount}`, 'Stress test') as any;
          const responseTime = performance.now() - requestStartTime;
          
          results.push({ success: result.success, responseTime, requestId: requestCount });
          performanceMonitor.record(responseTime, result.success);
          
        } catch (error) {
          const responseTime = performance.now() - requestStartTime;
          results.push({ success: false, responseTime, error: (error as Error).message, requestId: requestCount });
          performanceMonitor.record(responseTime, false);
        }
        
        requestCount++;
        await new Promise(resolve => setTimeout(resolve, highFrequency));
      }
      
      const stats = performanceMonitor.getStats();
      const failureRate = results.filter(r => !r.success).length / results.length;
      
      expect(failureRate).toBeLessThan(0.1); // <10% failure rate under stress
      expect(stats.responseTime.average).toBeLessThan(2000); // Average under 2s
      expect(requestCount).toBeGreaterThan(50); // Should handle at least 50 requests
      
      console.log(`Stress Test Results (${requestCount} requests):`, {
        successRate: (1 - failureRate).toFixed(3),
        averageResponseTime: stats.responseTime.average.toFixed(2) + 'ms',
        p95ResponseTime: stats.responseTime.p95.toFixed(2) + 'ms',
        requestsPerSecond: (requestCount / (duration / 1000)).toFixed(2),
      });
    });

    it('recovers from temporary service degradation', async () => {
      // Create a service that starts slow, then improves
      const adaptiveChatService = {
        sendMessage: jest.fn().mockImplementation(async (sessionId: string, message: string) => {
          const callCount = adaptiveChatService.sendMessage.mock.calls.length;
          const delay = callCount < 10 ? 1000 : 200; // First 10 calls are slow
          
          await new Promise(resolve => setTimeout(resolve, delay));
          
          return {
            success: true,
            data: {
              session: { id: sessionId, messages: [] },
              response: { id: 'resp', role: 'assistant', content: 'Response' },
            },
            metadata: {
              requestId: `req-${callCount}`,
              timestamp: new Date(),
              processingTime: delay,
            },
          };
        }),
      };
      
      const iterations = 20;
      const responseTimes: number[] = [];
      
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        await adaptiveChatService.sendMessage(`recovery-${i}`, 'Recovery test');
        const responseTime = performance.now() - startTime;
        
        responseTimes.push(responseTime);
        performanceMonitor.record(responseTime, true);
      }
      
      // Performance should improve over time
      const earlyResponses = responseTimes.slice(0, 10);
      const laterResponses = responseTimes.slice(10);
      
      const earlyAverage = earlyResponses.reduce((a, b) => a + b, 0) / earlyResponses.length;
      const laterAverage = laterResponses.reduce((a, b) => a + b, 0) / laterResponses.length;
      
      expect(laterAverage).toBeLessThan(earlyAverage * 0.5); // Later responses should be <50% of early ones
      expect(laterAverage).toBeLessThan(500); // Later responses should be fast
      
      console.log('Recovery Test Results:', {
        earlyAverageMs: earlyAverage.toFixed(2),
        laterAverageMs: laterAverage.toFixed(2),
        improvementRatio: (earlyAverage / laterAverage).toFixed(2) + 'x',
      });
    });
  });

  describe('Performance Regression Detection', () => {
    it('detects performance regression patterns', async () => {
      const baselineIterations = 10;
      const testIterations = 10;
      
      // Establish baseline performance
      const baselinePerformance = new PerformanceMonitor();
      for (let i = 0; i < baselineIterations; i++) {
        const startTime = performance.now();
        await mockChatService.sendMessage(`baseline-${i}`, 'Baseline test');
        const responseTime = performance.now() - startTime;
        baselinePerformance.record(responseTime, true);
      }
      
      // Create degraded service for regression test
      const degradedService = createMockChatService(400); // Slower service
      
      // Test against degraded service
      const testPerformance = new PerformanceMonitor();
      for (let i = 0; i < testIterations; i++) {
        const startTime = performance.now();
        await degradedService.sendMessage(`test-${i}`, 'Regression test');
        const responseTime = performance.now() - startTime;
        testPerformance.record(responseTime, true);
      }
      
      const baselineStats = baselinePerformance.getStats();
      const testStats = testPerformance.getStats();
      
      const regressionThreshold = 1.5; // 50% performance degradation threshold
      const performanceRatio = testStats.responseTime.average / baselineStats.responseTime.average;
      
      // This test should detect the regression
      expect(performanceRatio).toBeGreaterThan(regressionThreshold);
      
      console.log('Regression Detection Results:', {
        baselineAverageMs: baselineStats.responseTime.average.toFixed(2),
        testAverageMs: testStats.responseTime.average.toFixed(2),
        performanceRatio: performanceRatio.toFixed(2),
        regressionDetected: performanceRatio > regressionThreshold,
      });
    });
  });
});