/**
 * AI Utility Functions
 * Common utilities for AI services, validation, and data processing
 */

import type { UserProfile, ChatMessage, AIError } from '@/types/ai';
import { INDUSTRY_CLASSIFICATIONS, COMPANY_SIZE_INDICATORS } from './config';

/**
 * Generate a unique ID for sessions, messages, etc.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate and sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 1000); // Limit length
}

/**
 * Extract user profile information from conversation context
 */
export function extractUserProfile(messages: ChatMessage[]): Partial<UserProfile> {
  const profile: Partial<UserProfile> = {};
  const conversationText = messages
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ');

  // Extract industry
  for (const [industry, keywords] of Object.entries(INDUSTRY_CLASSIFICATIONS)) {
    if (keywords.some(keyword => conversationText.includes(keyword))) {
      profile.industry = industry;
      break;
    }
  }

  // Extract company size
  for (const [size, indicators] of Object.entries(COMPANY_SIZE_INDICATORS)) {
    if (indicators.some(indicator => conversationText.includes(indicator))) {
      profile.companySize = size as UserProfile['companySize'];
      break;
    }
  }

  // Extract challenges and interests from keywords
  const challenges: string[] = [];
  const interests: string[] = [];

  if (conversationText.includes('scale')) challenges.push('scalability');
  if (conversationText.includes('security')) challenges.push('security');
  if (conversationText.includes('cost')) challenges.push('cost-optimization');
  if (conversationText.includes('performance')) challenges.push('performance');
  if (conversationText.includes('integration')) challenges.push('integration');

  if (conversationText.includes('ai') || conversationText.includes('artificial intelligence')) {
    interests.push('AI Consulting');
  }
  if (conversationText.includes('cloud') || conversationText.includes('aws') || conversationText.includes('azure')) {
    interests.push('Cloud Architecture');
  }
  if (conversationText.includes('machine learning') || conversationText.includes('ml')) {
    interests.push('ML Engineering');
  }

  if (challenges.length > 0) profile.challenges = challenges;
  if (interests.length > 0) profile.interests = interests;

  return profile;
}

/**
 * Calculate relevance score for service recommendations
 */
export function calculateRelevanceScore(
  userProfile: UserProfile,
  serviceKeywords: string[]
): number {
  let score = 0.5; // Base score

  // Industry match bonus
  if (userProfile.industry) {
    const industryBonus = serviceKeywords.some(keyword =>
      keyword.toLowerCase().includes(userProfile.industry!)
    ) ? 0.2 : 0;
    score += industryBonus;
  }

  // Interest alignment bonus
  if (userProfile.interests && userProfile.interests.length > 0) {
    const interestMatch = userProfile.interests.some(interest =>
      serviceKeywords.some(keyword =>
        keyword.toLowerCase().includes(interest.toLowerCase())
      )
    );
    if (interestMatch) score += 0.15;
  }

  // Challenge alignment bonus
  if (userProfile.challenges && userProfile.challenges.length > 0) {
    const challengeMatch = userProfile.challenges.some(challenge =>
      serviceKeywords.some(keyword =>
        keyword.toLowerCase().includes(challenge.toLowerCase())
      )
    );
    if (challengeMatch) score += 0.15;
  }

  // Company size relevance
  if (userProfile.companySize) {
    const sizeMultiplier = {
      startup: 0.8,   // More focused on essentials
      small: 0.9,     // Practical solutions
      medium: 1.0,    // Full range
      enterprise: 1.1 // Complex solutions
    }[userProfile.companySize];
    
    score *= sizeMultiplier;
  }

  return Math.min(Math.max(score, 0), 1); // Clamp between 0 and 1
}

/**
 * Format time duration in human-readable format
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

/**
 * Calculate estimated reading time for content
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Validate API request data
 */
export function validateRequest<T>(data: any, requiredFields: (keyof T)[]): T | AIError {
  const missing = requiredFields.filter(field => !data[field]);
  
  if (missing.length > 0) {
    return {
      type: 'validation',
      message: `Missing required fields: ${missing.join(', ')}`,
      retryable: false,
      metadata: { missingFields: missing }
    };
  }

  return data as T;
}

/**
 * Handle API errors with proper error types
 */
export function handleApiError(error: any): AIError {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    return {
      type: 'rate_limit',
      message: 'API rate limit exceeded. Please try again later.',
      retryable: true,
      metadata: { retryAfter: error.retryAfter }
    };
  }

  if (error.code === 'UNAUTHORIZED') {
    return {
      type: 'auth',
      message: 'Authentication failed.',
      retryable: false,
    };
  }

  if (error.name === 'NetworkError' || error.code === 'ECONNREFUSED') {
    return {
      type: 'network',
      message: 'Network connection failed. Please check your connection.',
      retryable: true,
    };
  }

  return {
    type: 'unknown',
    message: error.message || 'An unexpected error occurred.',
    retryable: false,
    metadata: { originalError: error }
  };
}

/**
 * Retry failed operations with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      const aiError = handleApiError(error);
      if (!aiError.retryable || attempt === maxRetries) {
        throw aiError;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Debounce function for search and input operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Create a cache with TTL support
 */
export class TTLCache<K, V> {
  private cache = new Map<K, { value: V; expiry: number }>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  constructor(defaultTTL?: number) {
    if (defaultTTL) this.defaultTTL = defaultTTL;
  }

  set(key: K, value: V, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expiry });
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Clean expired items
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
    return this.cache.size;
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static timers = new Map<string, number>();

  static start(label: string): void {
    this.timers.set(label, performance.now());
  }

  static end(label: string): number {
    const start = this.timers.get(label);
    if (!start) return 0;

    const duration = performance.now() - start;
    this.timers.delete(label);
    return duration;
  }

  static measure<T>(label: string, operation: () => T | Promise<T>): T | Promise<T> {
    this.start(label);
    
    try {
      const result = operation();
      
      if (result instanceof Promise) {
        return result.finally(() => {
          const duration = this.end(label);
          console.debug(`${label}: ${duration.toFixed(2)}ms`);
        });
      } else {
        const duration = this.end(label);
        console.debug(`${label}: ${duration.toFixed(2)}ms`);
        return result;
      }
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}