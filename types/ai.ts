/**
 * AI Intelligence Types for AstroIntelligence Platform
 * Comprehensive type definitions for chat, recommendations, content generation, and analytics
 */

// Chat Interface Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  metadata?: {
    tokens?: number;
    model?: string;
    context?: string;
    confidence?: number;
  };
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  context: UserProfile;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed' | 'archived';
  metadata?: {
    totalTokens?: number;
    avgResponseTime?: number;
    satisfactionRating?: number;
  };
}

export interface ChatState {
  isOpen: boolean;
  isLoading: boolean;
  currentSession: ChatSession | null;
  error: string | null;
}

// User Profile and Context Types
export interface UserProfile {
  industry?: string;
  companySize?: 'startup' | 'small' | 'medium' | 'enterprise';
  role?: string;
  currentChallenges?: string[];
  challenges?: string[];
  interests?: string[];
  techStack?: string[];
  technicalLevel?: 'beginner' | 'intermediate' | 'advanced';
  budget?: 'under-10k' | '10k-50k' | '50k-100k' | '100k+';
  timeline?: 'immediate' | '1-3months' | '3-6months' | '6months+';
}

// Vector Search Types
export interface EmbeddingMetadata {
  id: string;
  type: string;
  source: string;
  title: string;
  category: string;
}

export interface SearchResult {
  id: string;
  content: string;
  score: number;
  metadata: {
    type: string;
    source: string;
    title: string;
    category: string;
    timestamp: number;
  };
}

export interface VectorSearchOptions {
  limit?: number;
  threshold?: number;
  category?: string;
  type?: string;
}

// Service Recommendation Types
export interface ServiceRecommendation {
  id: string;
  title: string;
  description: string;
  relevanceScore: number;
  reasoning: string[];
  estimatedCost?: string;
  timeline?: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  nextSteps?: string[];
}

export interface RecommendationRequest {
  userProfile: UserProfile;
  currentPage?: string;
  preferences?: {
    includeServices?: string[];
    excludeServices?: string[];
    maxRecommendations?: number;
  };
}

export interface RecommendationResponse {
  recommendations: ServiceRecommendation[];
  totalScore: number;
  confidence: number;
  reasoning: string;
  metadata: {
    processingTime: number;
    modelVersion: string;
    timestamp: Date;
  };
}

// Content Generation Types
export interface ContentGenerationRequest {
  type: 'blog_post' | 'blog-post' | 'case-study' | 'technical-doc' | 'email' | 'proposal';
  topic: string;
  audience?: 'technical' | 'business' | 'general';
  tone?: 'professional' | 'casual' | 'persuasive' | 'educational';
  length?: 'short' | 'medium' | 'long';
  keywords?: string[];
  context?: string;
  format?: 'markdown' | 'html' | 'plain';
}

export interface GeneratedContent {
  id: string;
  content: string;
  title?: string;
  summary?: string;
  metadata: {
    wordCount: number;
    readingTime: number;
    seoScore?: number;
    topics: string[];
    keywordDensity?: Record<string, number>;
    generatedAt: Date;
    model: string;
    suggestions?: string[];
  };
}

// Type alias for backward compatibility
export type ContentGenerationResponse = GeneratedContent;

// Analytics Types
export interface AIAnalytics {
  sessions: {
    total: number;
    active: number;
    averageDuration: number;
    satisfactionRating: number;
  };
  interactions: {
    totalMessages: number;
    averageResponseTime: number;
    successRate: number;
    topIntents: Array<{ intent: string; count: number }>;
  };
  recommendations: {
    totalGenerated: number;
    clickThroughRate: number;
    conversionRate: number;
    topServices: Array<{ service: string; requests: number }>;
  };
  content: {
    totalGenerated: number;
    averageQualityScore: number;
    topTypes: Array<{ type: string; count: number }>;
  };
  performance: {
    averageLatency: number;
    errorRate: number;
    uptime: number;
    tokenUsage: number;
  };
}

// API Response Types
export interface AIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    requestId: string;
    timestamp: Date;
    processingTime: number;
    tokensUsed?: number;
  };
}

// Configuration Types
export interface AIConfig {
  models: {
    chat: string;
    recommendations: string;
    content: string;
  };
  limits: {
    messagesPerHour: number;
    recommendationsPerHour: number;
    contentGenerationsPerHour: number;
    maxTokensPerRequest: number;
  };
  features: {
    chatEnabled: boolean;
    recommendationsEnabled: boolean;
    contentGenerationEnabled: boolean;
    analyticsEnabled: boolean;
  };
}

// Component Props Types
export interface ChatInterfaceProps {
  mode?: 'floating' | 'embedded' | 'fullscreen';
  initialMessage?: string;
  userProfile?: Partial<UserProfile>;
  onSessionStart?: (session: ChatSession) => void;
  onSessionEnd?: (session: ChatSession) => void;
  onMessageSent?: (message: ChatMessage) => void;
  className?: string;
}

export interface RecommendationEngineProps {
  userProfile: UserProfile;
  maxRecommendations?: number;
  showReasoningDetails?: boolean;
  onRecommendationClick?: (recommendation: ServiceRecommendation) => void;
  className?: string;
}

export interface ContentGeneratorProps {
  onContentGenerated?: (content: GeneratedContent) => void;
  allowedTypes?: ContentGenerationRequest['type'][];
  defaultSettings?: Partial<ContentGenerationRequest>;
  className?: string;
}

// Error Types
export interface AIError {
  type: 'validation' | 'api' | 'rate_limit' | 'auth' | 'network' | 'unknown';
  message: string;
  code?: string;
  retryable: boolean;
  metadata?: any;
}

// Event Types
export interface AIEvent {
  type: 'chat_message' | 'recommendation_generated' | 'content_created' | 'session_started' | 'session_ended';
  data: any;
  timestamp: Date;
  sessionId?: string;
  userId?: string;
}