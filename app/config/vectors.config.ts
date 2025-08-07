/**
 * Vector Database Configuration
 * Centralized configuration for all vector database providers and embedding services
 */

import { z } from 'zod';

// Vector database configuration schema
const vectorConfigSchema = z.object({
  // Primary Vector Database Provider
  primaryProvider: z.enum(['pinecone', 'supabase', 'weaviate', 'chromadb']).default('pinecone'),

  // Pinecone Configuration
  pinecone: z.object({
    apiKey: z.string().optional(),
    environment: z.string().optional(),
    indexName: z.string().default('astro-intelligence-vectors'),
    dimensions: z.number().positive().default(1536),
    metric: z.enum(['cosine', 'euclidean', 'dotproduct']).default('cosine'),
    pods: z.number().positive().default(1),
    replicas: z.number().positive().default(1),
    podType: z.string().default('p1.x1'),
  }),

  // Supabase Vector Configuration
  supabase: z.object({
    url: z.string().url().optional(),
    anonKey: z.string().optional(),
    serviceRoleKey: z.string().optional(),
    tableName: z.string().default('documents'),
    embeddingColumn: z.string().default('embedding'),
    contentColumn: z.string().default('content'),
    metadataColumn: z.string().default('metadata'),
  }),

  // Weaviate Configuration
  weaviate: z.object({
    url: z.string().url().optional(),
    apiKey: z.string().optional(),
    className: z.string().default('Document'),
    vectorizerModule: z.string().default('text2vec-openai'),
  }),

  // ChromaDB Configuration
  chromadb: z.object({
    host: z.string().default('localhost'),
    port: z.number().positive().default(8000),
    ssl: z.boolean().default(false),
    apiKey: z.string().optional(),
    collectionName: z.string().default('astro-intelligence'),
  }),

  // Embedding Configuration
  embeddings: z.object({
    provider: z.enum(['openai', 'cohere', 'sentence-transformers']).default('openai'),
    model: z.string().default('text-embedding-3-small'),
    dimensions: z.number().positive().default(1536),
    maxTokens: z.number().positive().default(8191),
    batchSize: z.number().positive().default(100),
  }),

  // Search Configuration
  search: z.object({
    enabled: z.boolean().default(true),
    similarityThreshold: z.number().min(0).max(1).default(0.8),
    maxResults: z.number().positive().default(10),
    includeMetadata: z.boolean().default(true),
    reranking: z.boolean().default(false),
  }),

  // Performance Configuration
  performance: z.object({
    cacheEnabled: z.boolean().default(true),
    cacheTTL: z.number().positive().default(3600), // 1 hour
    maxConcurrentUpserts: z.number().positive().default(5),
    batchUpsertSize: z.number().positive().default(100),
    connectionTimeout: z.number().positive().default(10000), // 10 seconds
    requestTimeout: z.number().positive().default(30000), // 30 seconds
  }),

  // Index Management
  indexManagement: z.object({
    autoCreateIndex: z.boolean().default(true),
    autoOptimize: z.boolean().default(true),
    optimizationInterval: z.number().positive().default(86400000), // 24 hours
    backupEnabled: z.boolean().default(false),
    backupInterval: z.number().positive().default(604800000), // 7 days
  }),
});

// Load and validate vector configuration
function loadVectorConfig() {
  const config = {
    primaryProvider: (process.env.VECTOR_PRIMARY_PROVIDER || 'pinecone') as 'pinecone' | 'supabase' | 'weaviate' | 'chromadb',
    
    pinecone: {
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
      indexName: process.env.PINECONE_INDEX_NAME || 'astro-intelligence-vectors',
      dimensions: parseInt(process.env.PINECONE_DIMENSIONS || '1536'),
      metric: (process.env.PINECONE_METRIC || 'cosine') as 'cosine' | 'euclidean' | 'dotproduct',
      pods: parseInt(process.env.PINECONE_PODS || '1'),
      replicas: parseInt(process.env.PINECONE_REPLICAS || '1'),
      podType: process.env.PINECONE_POD_TYPE || 'p1.x1',
    },

    supabase: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      tableName: process.env.SUPABASE_VECTOR_TABLE || 'documents',
      embeddingColumn: process.env.SUPABASE_EMBEDDING_COLUMN || 'embedding',
      contentColumn: process.env.SUPABASE_CONTENT_COLUMN || 'content',
      metadataColumn: process.env.SUPABASE_METADATA_COLUMN || 'metadata',
    },

    weaviate: {
      url: process.env.WEAVIATE_URL,
      apiKey: process.env.WEAVIATE_API_KEY,
      className: process.env.WEAVIATE_CLASS_NAME || 'Document',
      vectorizerModule: process.env.WEAVIATE_VECTORIZER || 'text2vec-openai',
    },

    chromadb: {
      host: process.env.CHROMADB_HOST || 'localhost',
      port: parseInt(process.env.CHROMADB_PORT || '8000'),
      ssl: process.env.CHROMADB_SSL === 'true',
      apiKey: process.env.CHROMADB_API_KEY,
      collectionName: process.env.CHROMADB_COLLECTION || 'astro-intelligence',
    },

    embeddings: {
      provider: (process.env.EMBEDDING_PROVIDER || 'openai') as 'openai' | 'cohere' | 'sentence-transformers',
      model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
      dimensions: parseInt(process.env.EMBEDDING_DIMENSIONS || '1536'),
      maxTokens: parseInt(process.env.EMBEDDING_MAX_TOKENS || '8191'),
      batchSize: parseInt(process.env.EMBEDDING_BATCH_SIZE || '100'),
    },

    search: {
      enabled: process.env.VECTOR_SEARCH_ENABLED !== 'false',
      similarityThreshold: parseFloat(process.env.VECTOR_SIMILARITY_THRESHOLD || '0.8'),
      maxResults: parseInt(process.env.VECTOR_MAX_RESULTS || '10'),
      includeMetadata: process.env.VECTOR_INCLUDE_METADATA !== 'false',
      reranking: process.env.VECTOR_RERANKING === 'true',
    },

    performance: {
      cacheEnabled: process.env.VECTOR_CACHE_ENABLED !== 'false',
      cacheTTL: parseInt(process.env.VECTOR_CACHE_TTL || '3600'),
      maxConcurrentUpserts: parseInt(process.env.VECTOR_MAX_CONCURRENT_UPSERTS || '5'),
      batchUpsertSize: parseInt(process.env.VECTOR_BATCH_UPSERT_SIZE || '100'),
      connectionTimeout: parseInt(process.env.VECTOR_CONNECTION_TIMEOUT || '10000'),
      requestTimeout: parseInt(process.env.VECTOR_REQUEST_TIMEOUT || '30000'),
    },

    indexManagement: {
      autoCreateIndex: process.env.VECTOR_AUTO_CREATE_INDEX !== 'false',
      autoOptimize: process.env.VECTOR_AUTO_OPTIMIZE !== 'false',
      optimizationInterval: parseInt(process.env.VECTOR_OPTIMIZATION_INTERVAL || '86400000'),
      backupEnabled: process.env.VECTOR_BACKUP_ENABLED === 'true',
      backupInterval: parseInt(process.env.VECTOR_BACKUP_INTERVAL || '604800000'),
    },
  };

  // Validate configuration
  try {
    return vectorConfigSchema.parse(config);
  } catch (error) {
    console.error('Vector Configuration validation failed:', error);
    throw new Error('Invalid vector database configuration. Please check your environment variables.');
  }
}

// Export validated configuration
export const vectorConfig = loadVectorConfig();

// Provider-specific connection configurations
export const providerConnections = {
  pinecone: {
    apiKey: vectorConfig.pinecone.apiKey,
    environment: vectorConfig.pinecone.environment,
    baseUrl: `https://${vectorConfig.pinecone.indexName}-${vectorConfig.pinecone.environment}.svc.pinecone.io`,
  },
  
  supabase: {
    url: vectorConfig.supabase.url,
    key: vectorConfig.supabase.serviceRoleKey || vectorConfig.supabase.anonKey,
    schema: 'public',
  },
  
  weaviate: {
    url: vectorConfig.weaviate.url,
    apiKey: vectorConfig.weaviate.apiKey,
    headers: vectorConfig.weaviate.apiKey ? { 'Authorization': `Bearer ${vectorConfig.weaviate.apiKey}` } : {},
  },
  
  chromadb: {
    url: `${vectorConfig.chromadb.ssl ? 'https' : 'http'}://${vectorConfig.chromadb.host}:${vectorConfig.chromadb.port}`,
    headers: vectorConfig.chromadb.apiKey ? { 'Authorization': `Bearer ${vectorConfig.chromadb.apiKey}` } : {},
  },
};

// Provider Availability Check
export function checkVectorProviderAvailability() {
  const _availability = {
    pinecone: !!(vectorConfig.pinecone.apiKey && vectorConfig.pinecone.environment),
    supabase: !!(vectorConfig.supabase.url && (vectorConfig.supabase.anonKey || vectorConfig.supabase.serviceRoleKey)),
    weaviate: !!vectorConfig.weaviate.url,
    chromadb: !!(vectorConfig.chromadb.host && vectorConfig.chromadb.port),
  };

  const availableProviders = Object.entries(_availability)
    .filter(([, available]) => available)
    .map(([provider]) => provider);

  const primaryAvailable = _availability[vectorConfig.primaryProvider];

  return {
    availability: _availability,
    availableProviders,
    primaryAvailable,
    hasAnyProvider: availableProviders.length > 0,
    recommendedFallback: availableProviders.find(p => p !== vectorConfig.primaryProvider),
  };
}

// Embedding Configuration by Provider
export const embeddingConfigs = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: 'https://api.openai.com/v1',
    models: {
      'text-embedding-3-small': { dimensions: 1536, maxTokens: 8191 },
      'text-embedding-3-large': { dimensions: 3072, maxTokens: 8191 },
      'text-embedding-ada-002': { dimensions: 1536, maxTokens: 8191 },
    },
  },
  
  cohere: {
    apiKey: process.env.COHERE_API_KEY,
    baseUrl: 'https://api.cohere.ai/v1',
    models: {
      'embed-english-v3.0': { dimensions: 1024, maxTokens: 512 },
      'embed-multilingual-v3.0': { dimensions: 1024, maxTokens: 512 },
    },
  },
  
  'sentence-transformers': {
    models: {
      'all-MiniLM-L6-v2': { dimensions: 384, maxTokens: 256 },
      'all-mpnet-base-v2': { dimensions: 768, maxTokens: 384 },
    },
  },
};

// Index Schema Definitions
export const indexSchemas = {
  pinecone: {
    dimension: vectorConfig.pinecone.dimensions,
    metric: vectorConfig.pinecone.metric,
    pods: vectorConfig.pinecone.pods,
    replicas: vectorConfig.pinecone.replicas,
    pod_type: vectorConfig.pinecone.podType,
  },
  
  supabase: {
    table: vectorConfig.supabase.tableName,
    columns: {
      id: 'uuid PRIMARY KEY DEFAULT gen_random_uuid()',
      content: 'text NOT NULL',
      embedding: `vector(${vectorConfig.embeddings.dimensions})`,
      metadata: 'jsonb DEFAULT \'{}\'',
      created_at: 'timestamp with time zone DEFAULT now()',
      updated_at: 'timestamp with time zone DEFAULT now()',
    },
    indexes: [
      `CREATE INDEX ON ${vectorConfig.supabase.tableName} USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)`,
    ],
  },
  
  weaviate: {
    class: vectorConfig.weaviate.className,
    properties: [
      { name: 'content', dataType: ['text'] },
      { name: 'metadata', dataType: ['object'] },
      { name: 'createdAt', dataType: ['date'] },
    ],
    vectorizer: vectorConfig.weaviate.vectorizerModule,
  },
  
  chromadb: {
    name: vectorConfig.chromadb.collectionName,
    metadata: { 'hnsw:space': 'cosine' },
  },
};

// Search Query Templates
export const searchQueryTemplates = {
  similaritySearch: {
    threshold: vectorConfig.search.similarityThreshold,
    limit: vectorConfig.search.maxResults,
    includeMetadata: vectorConfig.search.includeMetadata,
  },
  
  hybridSearch: {
    vectorWeight: 0.7,
    keywordWeight: 0.3,
    minScore: 0.6,
  },
  
  filteredSearch: {
    metadataFilters: ['category', 'tags', 'date_range'],
    combineMode: 'AND',
  },
};

// Performance Monitoring Configuration
export const vectorPerformanceConfig = {
  monitoring: {
    enabled: process.env.VECTOR_MONITORING_ENABLED !== 'false',
    metricsCollection: true,
    slowQueryThreshold: 1000, // ms
    errorTracking: true,
  },
  
  optimization: {
    enableQueryCaching: vectorConfig.performance.cacheEnabled,
    cacheSize: 1000,
    indexOptimization: vectorConfig.indexManagement.autoOptimize,
    batchOperations: true,
  },
  
  alerts: {
    highLatency: 5000, // ms
    lowSimilarityScore: 0.3,
    indexCapacityThreshold: 0.8,
    errorRateThreshold: 0.05,
  },
};

// Export types
export type VectorConfig = z.infer<typeof vectorConfigSchema>;
export type VectorProvider = 'pinecone' | 'supabase' | 'weaviate' | 'chromadb';
export type EmbeddingProvider = 'openai' | 'cohere' | 'sentence-transformers';

// Configuration validation utility
export function validateVectorConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const { primaryAvailable, hasAnyProvider } = checkVectorProviderAvailability();

  if (!hasAnyProvider) {
    errors.push('At least one vector database provider must be configured');
  }

  if (!primaryAvailable) {
    errors.push(`Primary vector provider (${vectorConfig.primaryProvider}) is not properly configured`);
  }

  if (vectorConfig.embeddings.provider === 'openai' && !process.env.OPENAI_API_KEY) {
    errors.push('OpenAI API key is required when using OpenAI embeddings');
  }

  if (vectorConfig.search.similarityThreshold < 0 || vectorConfig.search.similarityThreshold > 1) {
    errors.push('Similarity threshold must be between 0 and 1');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Configuration summary for debugging
export function getVectorConfigSummary() {
  const { availability: _availability, availableProviders, primaryAvailable } = checkVectorProviderAvailability();
  
  return {
    primaryProvider: vectorConfig.primaryProvider,
    primaryAvailable,
    availableProviders,
    embeddingProvider: vectorConfig.embeddings.provider,
    searchEnabled: vectorConfig.search.enabled,
    cacheEnabled: vectorConfig.performance.cacheEnabled,
    indexManagement: {
      autoCreate: vectorConfig.indexManagement.autoCreateIndex,
      autoOptimize: vectorConfig.indexManagement.autoOptimize,
    },
  };
}

// Vector Database Factory
export function createVectorDBConnection(provider?: VectorProvider) {
  const targetProvider = provider || vectorConfig.primaryProvider;
  const connection = providerConnections[targetProvider];
  
  if (!connection) {
    throw new Error(`Unsupported vector database provider: ${targetProvider}`);
  }
  
  return {
    provider: targetProvider,
    config: vectorConfig[targetProvider],
    connection,
    schema: indexSchemas[targetProvider],
  };
}