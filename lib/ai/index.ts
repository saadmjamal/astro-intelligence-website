/**
 * AI Module Exports
 * Central export point for all AI functionality
 */

// Core services
export * from './chat-service';
export * from './recommendation-engine';
export * from './content-generator';
export * from './analytics';

// Configuration and utilities
export * from './config';
export * from './utils';

// Re-export types for convenience
export type {
  ChatMessage,
  ChatSession,
  ChatState,
  UserProfile,
  ServiceRecommendation,
  RecommendationRequest,
  RecommendationResponse,
  ContentGenerationRequest,
  GeneratedContent,
  AIAnalytics,
  AIResponse,
  AIConfig,
  AIError,
  AIEvent,
} from '@/types/ai';