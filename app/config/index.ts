/**
 * Configuration Index
 * Centralized exports for all configuration modules
 */

// AI Configuration
export {
  aiConfig,
  selectAIModel,
  checkProviderAvailability,
  rateLimitConfig,
  aiEndpoints,
  errorConfig,
  monitoringConfig,
  devConfig,
  validateAIConfig,
  getConfigSummary,
  type AIConfig,
  type AIProvider,
  type AIPurpose,
} from './ai.config';

// Vector Database Configuration
export {
  vectorConfig,
  providerConnections,
  checkVectorProviderAvailability,
  embeddingConfigs,
  indexSchemas,
  searchQueryTemplates,
  vectorPerformanceConfig,
  validateVectorConfig,
  getVectorConfigSummary,
  createVectorDBConnection,
  type VectorConfig,
  type VectorProvider,
  type EmbeddingProvider,
} from './vectors.config';

// Import specific functions for internal use
import { validateAIConfig as validateAI, getConfigSummary as getAIConfigSummary, checkProviderAvailability as checkAIProviderAvailability } from './ai.config';
import { validateVectorConfig as validateVector, getVectorConfigSummary as getVectorSummary, checkVectorProviderAvailability as checkVectorProviderAvailability } from './vectors.config';

// Configuration validation utility
export function validateAllConfigurations() {
  const aiValidation = validateAI();
  const vectorValidation = validateVector();

  const allErrors = [
    ...aiValidation.errors,
    ...vectorValidation.errors,
  ];

  return {
    valid: aiValidation.valid && vectorValidation.valid,
    errors: allErrors,
    ai: aiValidation,
    vectors: vectorValidation,
  };
}

// Configuration summary utility
export function getAllConfigSummaries() {
  return {
    ai: getAIConfigSummary(),
    vectors: getVectorSummary(),
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };
}

// Health check utility
export function getSystemHealth() {
  const aiProviders = checkAIProviderAvailability();
  const vectorProviders = checkVectorProviderAvailability();
  const config = validateAllConfigurations();

  return {
    status: config.valid ? 'healthy' : 'degraded',
    ai: {
      available: aiProviders.hasAnyProvider,
      providers: aiProviders.availableProviders,
    },
    vectors: {
      available: vectorProviders.hasAnyProvider,
      primary: vectorProviders.primaryAvailable,
      providers: vectorProviders.availableProviders,
    },
    configuration: {
      valid: config.valid,
      errors: config.errors,
    },
  };
}