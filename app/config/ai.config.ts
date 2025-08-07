/**
 * AI Service Configuration
 * Centralized configuration for all AI services, providers, and integrations
 */

import { z } from 'zod';

// Environment validation schemas
const aiConfigSchema = z.object({
  // OpenAI Configuration
  openai: z.object({
    apiKey: z.string().min(1, 'OpenAI API key is required'),
    organizationId: z.string().optional(),
    projectId: z.string().optional(),
    defaultModel: z.string().default('gpt-4'),
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().positive().default(2000),
  }),

  // Anthropic Configuration
  anthropic: z.object({
    apiKey: z.string().optional(),
    defaultModel: z.string().default('claude-3-sonnet-20240229'),
    temperature: z.number().min(0).max(1).default(0.7),
    maxTokens: z.number().positive().default(2000),
  }),

  // Google AI Configuration
  googleAI: z.object({
    apiKey: z.string().optional(),
    projectId: z.string().optional(),
    defaultModel: z.string().default('gemini-pro'),
  }),

  // Azure OpenAI Configuration
  azureOpenAI: z.object({
    apiKey: z.string().optional(),
    endpoint: z.string().url().optional(),
    deploymentName: z.string().optional(),
  }),

  // Rate Limiting
  rateLimits: z.object({
    enabled: z.boolean().default(true),
    chatPerHour: z.number().positive().default(20),
    recommendationsPerHour: z.number().positive().default(30),
    contentGenerationPerHour: z.number().positive().default(10),
  }),

  // Feature Flags
  features: z.object({
    chatEnabled: z.boolean().default(true),
    recommendationsEnabled: z.boolean().default(true),
    contentGenerationEnabled: z.boolean().default(true),
    analyticsEnabled: z.boolean().default(true),
    experimentalFeaturesEnabled: z.boolean().default(false),
  }),

  // Performance Configuration
  performance: z.object({
    cacheEnabled: z.boolean().default(true),
    cacheTTL: z.number().positive().default(3600), // 1 hour
    aiResponseCacheTTL: z.number().positive().default(1800), // 30 minutes
    maxConcurrentRequests: z.number().positive().default(10),
    requestTimeout: z.number().positive().default(30000), // 30 seconds
  }),

  // Development Configuration
  development: z.object({
    debugMode: z.boolean().default(false),
    logLevel: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
    testMode: z.boolean().default(false),
  }),
});

// Load and validate configuration from environment
function loadAIConfig() {
  const config = {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      organizationId: process.env.OPENAI_ORGANIZATION_ID,
      projectId: process.env.OPENAI_PROJECT_ID,
      defaultModel: process.env.AI_DEFAULT_MODEL || 'gpt-4',
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2000'),
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      defaultModel: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
      temperature: parseFloat(process.env.ANTHROPIC_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '2000'),
    },
    googleAI: {
      apiKey: process.env.GOOGLE_AI_API_KEY,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      defaultModel: process.env.GOOGLE_AI_MODEL || 'gemini-pro',
    },
    azureOpenAI: {
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
    },
    rateLimits: {
      enabled: process.env.AI_RATE_LIMIT_ENABLED === 'true',
      chatPerHour: parseInt(process.env.AI_CHAT_RATE_LIMIT || '20'),
      recommendationsPerHour: parseInt(process.env.AI_RECOMMENDATIONS_RATE_LIMIT || '30'),
      contentGenerationPerHour: parseInt(process.env.AI_CONTENT_GENERATION_RATE_LIMIT || '10'),
    },
    features: {
      chatEnabled: process.env.AI_CHAT_ENABLED !== 'false',
      recommendationsEnabled: process.env.AI_RECOMMENDATIONS_ENABLED !== 'false',
      contentGenerationEnabled: process.env.AI_CONTENT_GENERATION_ENABLED !== 'false',
      analyticsEnabled: process.env.AI_ANALYTICS_ENABLED !== 'false',
      experimentalFeaturesEnabled: process.env.ENABLE_EXPERIMENTAL_AI === 'true',
    },
    performance: {
      cacheEnabled: process.env.AI_CACHE_ENABLED !== 'false',
      cacheTTL: parseInt(process.env.CACHE_TTL || '3600'),
      aiResponseCacheTTL: parseInt(process.env.AI_RESPONSE_CACHE_TTL || '1800'),
      maxConcurrentRequests: parseInt(process.env.AI_MAX_CONCURRENT_REQUESTS || '10'),
      requestTimeout: parseInt(process.env.AI_REQUEST_TIMEOUT || '30000'),
    },
    development: {
      debugMode: process.env.DEBUG_AI_RESPONSES === 'true',
      logLevel: (process.env.LOG_LEVEL || 'info') as 'error' | 'warn' | 'info' | 'debug',
      testMode: process.env.NODE_ENV === 'test',
    },
  };

  // Validate configuration
  try {
    return aiConfigSchema.parse(config);
  } catch (error) {
    console.error('AI Configuration validation failed:', error);
    throw new Error('Invalid AI configuration. Please check your environment variables.');
  }
}

// Export validated configuration
export const aiConfig = loadAIConfig();

// Model Selection Logic
export function selectAIModel(purpose: 'chat' | 'recommendations' | 'content' | 'embeddings') {
  const { openai, anthropic: _anthropic, googleAI: _googleAI } = aiConfig;

  switch (purpose) {
    case 'chat':
      return {
        provider: 'openai',
        model: process.env.AI_CHAT_MODEL || openai.defaultModel,
        temperature: 0.7,
        maxTokens: 1000,
      };
    case 'recommendations':
      return {
        provider: 'openai',
        model: process.env.AI_RECOMMENDATIONS_MODEL || openai.defaultModel,
        temperature: 0.3,
        maxTokens: 800,
      };
    case 'content':
      return {
        provider: 'openai',
        model: process.env.AI_CONTENT_MODEL || openai.defaultModel,
        temperature: 0.8,
        maxTokens: 1500,
      };
    case 'embeddings':
      return {
        provider: 'openai',
        model: 'text-embedding-3-small',
        dimensions: 1536,
      };
    default:
      return {
        provider: 'openai',
        model: openai.defaultModel,
        temperature: 0.7,
        maxTokens: 1000,
      };
  }
}

// Provider Availability Check
export function checkProviderAvailability() {
  const _availability = {
    openai: !!aiConfig.openai.apiKey,
    anthropic: !!aiConfig.anthropic.apiKey,
    googleAI: !!aiConfig.googleAI.apiKey,
    azureOpenAI: !!(aiConfig.azureOpenAI.apiKey && aiConfig.azureOpenAI.endpoint),
  };

  const availableProviders = Object.entries(_availability)
    .filter(([, available]) => available)
    .map(([provider]) => provider);

  return {
    availability: _availability,
    availableProviders,
    hasAnyProvider: availableProviders.length > 0,
  };
}

// Rate Limiting Configuration
export const rateLimitConfig = {
  chat: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: aiConfig.rateLimits.chatPerHour,
    message: 'Too many chat messages. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },
  recommendations: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: aiConfig.rateLimits.recommendationsPerHour,
    message: 'Too many recommendation requests. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },
  content: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: aiConfig.rateLimits.contentGenerationPerHour,
    message: 'Content generation limit reached. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },
};

// AI Service URLs and Endpoints
export const aiEndpoints = {
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    chat: '/chat/completions',
    embeddings: '/embeddings',
    models: '/models',
  },
  anthropic: {
    baseUrl: 'https://api.anthropic.com',
    chat: '/v1/messages',
  },
  googleAI: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    chat: '/models/gemini-pro:generateContent',
  },
  azureOpenAI: {
    baseUrl: aiConfig.azureOpenAI.endpoint,
    chat: `/openai/deployments/${aiConfig.azureOpenAI.deploymentName}/chat/completions`,
    embeddings: `/openai/deployments/${aiConfig.azureOpenAI.deploymentName}/embeddings`,
  },
};

// Error Handling Configuration
export const errorConfig = {
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  maxRetryDelay: 10000, // 10 seconds
  timeoutDuration: aiConfig.performance.requestTimeout,
  enableFallback: true,
  fallbackProvider: 'anthropic',
};

// Analytics and Monitoring Configuration
export const monitoringConfig = {
  enabled: aiConfig.features.analyticsEnabled,
  trackUsage: true,
  trackPerformance: true,
  trackErrors: true,
  retentionDays: 90,
  batchSize: 100,
  flushInterval: 60000, // 1 minute
};

// Development and Testing Configuration
export const devConfig = {
  enableMocking: process.env.NODE_ENV === 'test',
  mockResponses: aiConfig.development.testMode,
  enableDebugLogs: aiConfig.development.debugMode,
  enablePerformanceMetrics: true,
  enableRequestLogging: aiConfig.development.debugMode,
};

// Export types for TypeScript
export type AIConfig = z.infer<typeof aiConfigSchema>;
export type AIProvider = 'openai' | 'anthropic' | 'googleAI' | 'azureOpenAI';
export type AIPurpose = 'chat' | 'recommendations' | 'content' | 'embeddings';

// Configuration validation utility
export function validateAIConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const { availability } = checkProviderAvailability();

  if (!availability.openai && !availability.anthropic && !availability.googleAI) {
    errors.push('At least one AI provider (OpenAI, Anthropic, or Google AI) must be configured');
  }

  if (aiConfig.rateLimits.enabled && aiConfig.rateLimits.chatPerHour <= 0) {
    errors.push('Chat rate limit must be greater than 0 when rate limiting is enabled');
  }

  if (aiConfig.performance.requestTimeout < 1000) {
    errors.push('Request timeout must be at least 1000ms');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Configuration summary for debugging
export function getConfigSummary() {
  const { availability: _availability, availableProviders } = checkProviderAvailability();
  
  return {
    environment: process.env.NODE_ENV,
    availableProviders,
    featuresEnabled: Object.entries(aiConfig.features)
      .filter(([, enabled]) => enabled)
      .map(([feature]) => feature),
    rateLimiting: aiConfig.rateLimits.enabled,
    caching: aiConfig.performance.cacheEnabled,
    debugMode: aiConfig.development.debugMode,
  };
}