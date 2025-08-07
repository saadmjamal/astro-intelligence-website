# 🤖 AI Setup & Configuration Guide

Complete guide for setting up and configuring all AI services, vector databases, and integrations for Astro Intelligence.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [AI Service Providers](#ai-service-providers)
3. [Vector Databases](#vector-databases)
4. [Environment Configuration](#environment-configuration)
5. [Development Setup](#development-setup)
6. [Production Deployment](#production-deployment)
7. [Testing & Validation](#testing--validation)
8. [Troubleshooting](#troubleshooting)
9. [Performance Optimization](#performance-optimization)
10. [Security Considerations](#security-considerations)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database (Supabase recommended)
- At least one AI service provider account (OpenAI recommended)
- Vector database account (Pinecone recommended)

### 5-Minute Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd astro-intelligence
   pnpm install
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your API keys (minimum required)
   echo "OPENAI_API_KEY=sk-proj-your_key_here" >> .env.local
   echo "SUPABASE_URL=https://your_project.supabase.co" >> .env.local
   echo "SUPABASE_ANON_KEY=your_anon_key" >> .env.local
   ```

3. **Database Setup**
   ```bash
   # Initialize vector database
   pnpm run db:setup
   
   # Run migrations
   pnpm run db:migrate
   ```

4. **Test AI Services**
   ```bash
   # Start development server
   pnpm dev
   
   # Test AI functionality
   curl http://localhost:3000/api/ai/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello AI!"}'
   ```

## 🧠 AI Service Providers

### OpenAI (Primary Provider) ⭐

**Recommended for most use cases**

1. **Create Account**
   - Visit [OpenAI Platform](https://platform.openai.com)
   - Create account and verify email
   - Add payment method (required for API access)

2. **Generate API Keys**
   ```bash
   # Go to API Keys section
   # Create new secret key
   # Copy key (starts with sk-proj-)
   ```

3. **Configuration**
   ```env
   OPENAI_API_KEY=sk-proj-your_api_key_here
   OPENAI_ORGANIZATION_ID=org-your_org_id      # Optional
   OPENAI_PROJECT_ID=proj_your_project_id      # Optional
   
   # Model Selection
   AI_DEFAULT_MODEL=gpt-4
   AI_CHAT_MODEL=gpt-4
   AI_RECOMMENDATIONS_MODEL=gpt-4
   AI_CONTENT_MODEL=gpt-4
   ```

4. **Cost Optimization**
   ```env
   # Use cheaper models for development
   AI_DEFAULT_MODEL=gpt-3.5-turbo
   AI_CHAT_MODEL=gpt-3.5-turbo
   AI_RECOMMENDATIONS_MODEL=gpt-3.5-turbo
   AI_CONTENT_MODEL=gpt-3.5-turbo
   ```

### Anthropic Claude (Secondary Provider)

**Best for safety-focused applications**

1. **Setup**
   - Visit [Anthropic Console](https://console.anthropic.com)
   - Create account and generate API key
   - Configure environment

2. **Configuration**
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-your_key_here
   ANTHROPIC_MODEL=claude-3-sonnet-20240229
   ANTHROPIC_TEMPERATURE=0.7
   ANTHROPIC_MAX_TOKENS=2000
   ```

### Google AI/Gemini (Alternative)

**Good for Google Cloud integration**

1. **Setup**
   - Enable Google AI API in Cloud Console
   - Create service account and download key
   - Generate API key

2. **Configuration**
   ```env
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   GOOGLE_CLOUD_PROJECT_ID=your_project_id
   GOOGLE_AI_MODEL=gemini-pro
   ```

### Azure OpenAI (Enterprise)

**Best for enterprise customers**

1. **Setup**
   - Request access to Azure OpenAI
   - Create Azure OpenAI resource
   - Deploy models (GPT-4, GPT-3.5-turbo)

2. **Configuration**
   ```env
   AZURE_OPENAI_API_KEY=your_azure_key
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment
   ```

## 🗄️ Vector Databases

### Pinecone (Recommended) ⭐

**Best for production applications**

1. **Setup**
   ```bash
   # Create account at https://pinecone.io
   # Create new project
   # Generate API key
   ```

2. **Create Index**
   ```bash
   # Using Pinecone Console or CLI
   pinecone create-index astro-intelligence-vectors \
     --dimension 1536 \
     --metric cosine \
     --pods 1
   ```

3. **Configuration**
   ```env
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_environment
   PINECONE_INDEX_NAME=astro-intelligence-vectors
   PINECONE_DIMENSIONS=1536
   PINECONE_METRIC=cosine
   ```

### Supabase Vector (Alternative)

**Good for PostgreSQL-based applications**

1. **Setup**
   ```sql
   -- Enable vector extension
   CREATE EXTENSION IF NOT EXISTS vector;
   
   -- Create documents table
   CREATE TABLE documents (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     content text NOT NULL,
     embedding vector(1536),
     metadata jsonb DEFAULT '{}',
     created_at timestamp with time zone DEFAULT now(),
     updated_at timestamp with time zone DEFAULT now()
   );
   
   -- Create vector index
   CREATE INDEX ON documents 
   USING ivfflat (embedding vector_cosine_ops) 
   WITH (lists = 100);
   ```

2. **Configuration**
   ```env
   SUPABASE_URL=https://your_project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   SUPABASE_VECTOR_TABLE=documents
   ```

### Weaviate (Self-hosted Option)

**Best for advanced semantic search**

1. **Setup with Docker**
   ```yaml
   # docker-compose.yml
   version: '3.4'
   services:
     weaviate:
       image: semitechnologies/weaviate:latest
       ports:
         - "8080:8080"
       environment:
         QUERY_DEFAULTS_LIMIT: 25
         AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
         PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
         DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
   ```

2. **Configuration**
   ```env
   WEAVIATE_URL=http://localhost:8080
   WEAVIATE_API_KEY=your_api_key
   WEAVIATE_CLASS_NAME=Document
   ```

### ChromaDB (Local Development)

**Perfect for local development and testing**

1. **Setup**
   ```bash
   # Install ChromaDB
   pip install chromadb
   
   # Start server
   chroma run --host localhost --port 8000
   ```

2. **Configuration**
   ```env
   CHROMADB_HOST=localhost
   CHROMADB_PORT=8000
   CHROMADB_COLLECTION=astro-intelligence
   ```

## ⚙️ Environment Configuration

### Production Environment

1. **Copy Template**
   ```bash
   cp .env.example .env.production
   ```

2. **Required Variables**
   ```env
   # Core Application
   NODE_ENV=production
   SITE_URL=https://astrointelligence.com
   NEXT_PUBLIC_SITE_URL=https://astrointelligence.com
   
   # AI Services (Choose at least one)
   OPENAI_API_KEY=sk-proj-your_production_key
   
   # Vector Database (Choose one)
   PINECONE_API_KEY=your_production_pinecone_key
   PINECONE_ENVIRONMENT=your_production_environment
   PINECONE_INDEX_NAME=astro-intelligence-prod
   
   # Database
   DATABASE_URL=postgresql://user:pass@host:5432/astro_intelligence_prod
   
   # Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key
   CLERK_SECRET_KEY=sk_live_your_key
   
   # Monitoring
   SENTRY_DSN=https://your_sentry_dsn
   ```

3. **Security Settings**
   ```env
   # Generate strong secrets
   NEXTAUTH_SECRET=$(openssl rand -base64 32)
   JWT_SECRET=$(openssl rand -base64 32)
   ENCRYPTION_KEY=$(openssl rand -base64 32)
   
   # Enable security features
   AI_RATE_LIMIT_ENABLED=true
   AI_CHAT_RATE_LIMIT=20
   AI_RECOMMENDATIONS_RATE_LIMIT=30
   AI_CONTENT_GENERATION_RATE_LIMIT=10
   ```

### Development Environment

1. **Copy Template**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Development-Friendly Settings**
   ```env
   # Relaxed settings for development
   NODE_ENV=development
   DEVELOPMENT_MODE=true
   DEBUG_AI_RESPONSES=true
   LOG_LEVEL=debug
   
   # Use cheaper models
   AI_DEFAULT_MODEL=gpt-3.5-turbo
   
   # Disable rate limiting
   AI_RATE_LIMIT_ENABLED=false
   
   # Enable experimental features
   ENABLE_EXPERIMENTAL_AI=true
   ENABLE_API_PLAYGROUND=true
   ```

## 🔧 Development Setup

### Local Database Setup

1. **PostgreSQL with Docker**
   ```bash
   # Start PostgreSQL
   docker run -d \
     --name postgres-ai \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=astro_intelligence_dev \
     -p 5432:5432 \
     postgres:15
   ```

2. **Redis Cache (Optional)**
   ```bash
   # Start Redis
   docker run -d \
     --name redis-ai \
     -p 6379:6379 \
     redis:7-alpine
   ```

3. **Vector Database (ChromaDB)**
   ```bash
   # Install and start ChromaDB
   pip install chromadb
   chroma run --host localhost --port 8000
   ```

### Development Workflow

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Database Migration**
   ```bash
   # Run database migrations
   pnpm run db:migrate
   
   # Seed development data
   pnpm run db:seed
   ```

3. **Start Development Server**
   ```bash
   pnpm dev
   ```

4. **Test AI Services**
   ```bash
   # Run AI-specific tests
   pnpm test:ai
   
   # Test specific AI features
   pnpm test:ai:chat
   pnpm test:ai:recommendations
   pnpm test:ai:performance
   ```

### IDE Configuration

1. **VS Code Settings**
   ```json
   {
     "typescript.preferences.importModuleSpecifier": "relative",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "files.associations": {
       ".env.local": "dotenv",
       ".env.example": "dotenv"
     }
   }
   ```

2. **Environment Variables IntelliSense**
   ```typescript
   // types/env.d.ts
   declare namespace NodeJS {
     interface ProcessEnv {
       OPENAI_API_KEY: string;
       PINECONE_API_KEY: string;
       // ... other env vars
     }
   }
   ```

## 🚀 Production Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   ```bash
   # Set production environment variables
   vercel env add OPENAI_API_KEY production
   vercel env add PINECONE_API_KEY production
   vercel env add DATABASE_URL production
   ```

3. **Build Configuration**
   ```json
   // vercel.json
   {
     "framework": "nextjs",
     "buildCommand": "pnpm build",
     "outputDirectory": ".next",
     "functions": {
       "app/api/**/*.ts": {
         "maxDuration": 30
       }
     }
   }
   ```

### Docker Deployment

1. **Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json pnpm-lock.yaml ./
   RUN npm install -g pnpm && pnpm install --frozen-lockfile
   
   # Build application
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm install -g pnpm && pnpm build
   
   # Production image
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   
   EXPOSE 3000
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - DATABASE_URL=${DATABASE_URL}
         - OPENAI_API_KEY=${OPENAI_API_KEY}
       depends_on:
         - db
         - redis
     
     db:
       image: postgres:15
       environment:
         POSTGRES_DB: astro_intelligence
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
       volumes:
         - postgres_data:/var/lib/postgresql/data
     
     redis:
       image: redis:7-alpine
       ports:
         - "6379:6379"
   
   volumes:
     postgres_data:
   ```

## 🧪 Testing & Validation

### AI Service Testing

1. **Unit Tests**
   ```bash
   # Test AI configuration
   pnpm test app/config/ai.config.test.ts
   
   # Test chat functionality
   pnpm test components/ai/ChatInterface.test.tsx
   
   # Test vector operations
   pnpm test lib/ai/vector-store.test.ts
   ```

2. **Integration Tests**
   ```bash
   # Test API endpoints
   pnpm test:ai:integration
   
   # Test vector database integration
   pnpm test app/api/ai/embeddings/route.test.ts
   ```

3. **Performance Tests**
   ```bash
   # Test AI response times
   pnpm test:ai:performance
   
   # Load test AI endpoints
   pnpm test:load
   ```

### Manual Testing Checklist

- [ ] AI chat responds correctly
- [ ] Vector search returns relevant results
- [ ] Rate limiting works as expected
- [ ] Error handling displays appropriate messages
- [ ] All environment variables are loaded
- [ ] Database connections are established
- [ ] Authentication flow works
- [ ] Monitoring and logging are functional

### Validation Scripts

1. **Configuration Validator**
   ```typescript
   // scripts/validate-ai-config.ts
   import { validateAIConfig } from '@/app/config/ai.config';
   import { validateVectorConfig } from '@/app/config/vectors.config';
   
   console.log('Validating AI configuration...');
   const aiValidation = validateAIConfig();
   const vectorValidation = validateVectorConfig();
   
   if (!aiValidation.valid) {
     console.error('AI Config Errors:', aiValidation.errors);
     process.exit(1);
   }
   
   if (!vectorValidation.valid) {
     console.error('Vector Config Errors:', vectorValidation.errors);
     process.exit(1);
   }
   
   console.log('✅ All configurations are valid!');
   ```

2. **Health Check Endpoint**
   ```typescript
   // app/api/health/route.ts
   import { NextResponse } from 'next/server';
   import { checkProviderAvailability } from '@/app/config/ai.config';
   import { checkVectorProviderAvailability } from '@/app/config/vectors.config';
   
   export async function GET() {
     const aiProviders = checkProviderAvailability();
     const vectorProviders = checkVectorProviderAvailability();
     
     return NextResponse.json({
       status: 'healthy',
       ai: aiProviders,
       vectors: vectorProviders,
       timestamp: new Date().toISOString(),
     });
   }
   ```

## 🔧 Troubleshooting

### Common Issues

#### 1. "OpenAI API Key Not Found"
```bash
# Check environment variable
echo $OPENAI_API_KEY

# Verify .env.local file
cat .env.local | grep OPENAI_API_KEY

# Restart development server
pnpm dev
```

#### 2. "Vector Database Connection Failed"
```bash
# Test Pinecone connection
curl -X GET "https://controller.pinecone.io/actions/whoami" \
  -H "Api-Key: your_api_key"

# Test Supabase connection
curl "https://your_project.supabase.co/rest/v1/" \
  -H "apikey: your_anon_key"
```

#### 3. "Rate Limit Exceeded"
```env
# Temporarily disable rate limiting
AI_RATE_LIMIT_ENABLED=false

# Or increase limits
AI_CHAT_RATE_LIMIT=100
AI_RECOMMENDATIONS_RATE_LIMIT=100
```

#### 4. "Database Migration Failed"
```bash
# Reset database
pnpm run db:reset

# Re-run migrations
pnpm run db:migrate

# Verify tables exist
pnpm run db:status
```

### Debug Mode

1. **Enable Debug Logging**
   ```env
   DEBUG_AI_RESPONSES=true
   LOG_LEVEL=debug
   NODE_ENV=development
   ```

2. **Monitor Logs**
   ```bash
   # Follow development logs
   tail -f .next/trace.log
   
   # Monitor AI API calls
   curl http://localhost:3000/api/debug/ai-logs
   ```

### Performance Issues

1. **Slow AI Responses**
   - Check model selection (use gpt-3.5-turbo for development)
   - Verify network connectivity
   - Monitor API rate limits
   - Check server resources

2. **Vector Search Timeout**
   - Verify vector database connection
   - Check index status
   - Optimize query parameters
   - Consider using local ChromaDB for development

## ⚡ Performance Optimization

### AI Response Optimization

1. **Model Selection**
   ```env
   # Use appropriate models for each use case
   AI_CHAT_MODEL=gpt-3.5-turbo          # Fast, cost-effective
   AI_RECOMMENDATIONS_MODEL=gpt-4        # High quality
   AI_CONTENT_MODEL=gpt-4               # Creative tasks
   ```

2. **Caching Strategy**
   ```env
   # Enable response caching
   AI_CACHE_ENABLED=true
   AI_RESPONSE_CACHE_TTL=1800           # 30 minutes
   
   # Cache configuration
   CACHE_TTL=3600                       # 1 hour
   ```

3. **Request Optimization**
   ```env
   # Limit concurrent requests
   AI_MAX_CONCURRENT_REQUESTS=5
   
   # Set timeouts
   AI_REQUEST_TIMEOUT=30000             # 30 seconds
   ```

### Vector Database Optimization

1. **Index Configuration**
   ```env
   # Pinecone optimization
   PINECONE_PODS=1                      # Start with 1 pod
   PINECONE_REPLICAS=1                  # Increase for high availability
   PINECONE_POD_TYPE=p1.x1             # Scale up for performance
   ```

2. **Search Optimization**
   ```env
   # Optimize search parameters
   VECTOR_SIMILARITY_THRESHOLD=0.8      # Higher = more precise
   VECTOR_MAX_RESULTS=10               # Limit results
   ```

3. **Batch Operations**
   ```env
   # Optimize batch operations
   VECTOR_BATCH_UPSERT_SIZE=100
   VECTOR_MAX_CONCURRENT_UPSERTS=5
   ```

### Monitoring and Metrics

1. **Performance Monitoring**
   ```env
   # Enable monitoring
   VECTOR_MONITORING_ENABLED=true
   AI_ANALYTICS_ENABLED=true
   
   # Sentry for error tracking
   SENTRY_DSN=https://your_sentry_dsn
   ```

2. **Custom Metrics**
   ```typescript
   // lib/monitoring/ai-metrics.ts
   export const aiMetrics = {
     responseTime: (duration: number, model: string) => {
       console.log(`AI Response Time: ${duration}ms (${model})`);
     },
     
     tokenUsage: (tokens: number, model: string) => {
       console.log(`Token Usage: ${tokens} (${model})`);
     },
     
     vectorSearchTime: (duration: number, results: number) => {
       console.log(`Vector Search: ${duration}ms (${results} results)`);
     },
   };
   ```

## 🔒 Security Considerations

### API Key Security

1. **Environment Variables**
   - Never commit API keys to version control
   - Use different keys for development/production
   - Rotate keys regularly
   - Monitor API key usage

2. **Key Management**
   ```bash
   # Generate secure secrets
   openssl rand -base64 32

   # Use environment-specific keys
   OPENAI_API_KEY_DEV=sk-proj-dev-key
   OPENAI_API_KEY_PROD=sk-proj-prod-key
   ```

### Rate Limiting

1. **API Protection**
   ```env
   # Enable rate limiting
   AI_RATE_LIMIT_ENABLED=true
   AI_CHAT_RATE_LIMIT=20
   AI_RECOMMENDATIONS_RATE_LIMIT=30
   AI_CONTENT_GENERATION_RATE_LIMIT=10
   ```

2. **User-based Limits**
   ```typescript
   // lib/rate-limit/user-limits.ts
   export const userRateLimits = {
     free: { chatPerHour: 10, recommendationsPerHour: 5 },
     pro: { chatPerHour: 100, recommendationsPerHour: 50 },
     enterprise: { chatPerHour: 1000, recommendationsPerHour: 500 },
   };
   ```

### Data Privacy

1. **Content Filtering**
   ```typescript
   // lib/ai/content-filter.ts
   export function filterSensitiveContent(text: string): string {
     // Remove PII, sensitive data, etc.
     return text.replace(/\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g, '[CARD_NUMBER]');
   }
   ```

2. **Audit Logging**
   ```typescript
   // lib/monitoring/audit-log.ts
   export function logAIRequest(userId: string, request: string, response: string) {
     console.log({
       timestamp: new Date().toISOString(),
       userId,
       requestLength: request.length,
       responseLength: response.length,
       // Don't log actual content for privacy
     });
   }
   ```

## 📚 Additional Resources

### Documentation Links

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com)
- [Pinecone Documentation](https://docs.pinecone.io)
- [Supabase Vector/pgvector](https://supabase.com/docs/guides/database/extensions/pgvector)
- [Next.js Documentation](https://nextjs.org/docs)

### Community Resources

- [OpenAI Community Forum](https://community.openai.com)
- [Pinecone Community](https://www.pinecone.io/community/)
- [Astro Intelligence Discord](#) (if available)

### Example Projects

- [AI Chat Implementation](./examples/ai-chat)
- [Vector Search Demo](./examples/vector-search)
- [Content Generation](./examples/content-generation)

---

## 🆘 Need Help?

If you encounter issues not covered in this guide:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [health check endpoint](#validation-scripts)
3. Enable [debug mode](#debug-mode)
4. Check our [GitHub Issues](https://github.com/your-repo/issues)
5. Join our [Discord community](#) (if available)

---

**Last Updated:** $(date +%Y-%m-%d)

**Version:** 2.0.0

**Compatibility:** Next.js 15+, Node.js 18+