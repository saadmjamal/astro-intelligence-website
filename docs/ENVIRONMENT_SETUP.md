# AstroIntelligence AI Platform - Environment Configuration Guide

## Overview

This guide explains how to set up the environment variables for the AstroIntelligence AI platform. The application is designed to work in multiple modes:

- **Fallback Mode**: Works without any AI credentials using mock data
- **Development Mode**: Local development with selected AI services
- **Production Mode**: Full AI capabilities with all services configured

## Quick Start

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Enable basic AI features** (Optional):
   - Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Uncomment `OPENAI_API_KEY` in `.env.local` and add your key
   - Restart your development server

3. **Start development**:
   ```bash
   pnpm dev
   ```

The application will work immediately with fallback data, and you can gradually enable real AI services as needed.

## Environment Files

### `.env.example`
Production-ready configuration template with all available options. Use this as reference for production deployments.

### `.env.local`
Local development configuration with safe defaults. This file:
- Is configured for local development
- Uses fallback mode by default
- Has relaxed rate limits for testing
- Includes helpful comments and setup guides

### `.env.local.example` (Legacy)
Kept for backward compatibility. Use `.env.local` instead.

## AI Service Configuration

### OpenAI (Primary AI Provider)

**Required for**: Chat, recommendations, content generation, embeddings

```bash
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your_openai_api_key_here
OPENAI_ORGANIZATION_ID=org-your_organization_id_here  # Optional
OPENAI_PROJECT_ID=proj_your_project_id_here          # Optional
```

**Model Configuration**:
```bash
AI_DEFAULT_MODEL=gpt-4
AI_CHAT_MODEL=gpt-4
AI_RECOMMENDATIONS_MODEL=gpt-4
AI_CONTENT_MODEL=gpt-4
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=2000
```

### Anthropic Claude (Alternative AI Provider)

**Required for**: Alternative AI processing when OpenAI is unavailable

```bash
# Get your API key from: https://console.anthropic.com/
ANTHROPIC_API_KEY=sk-ant-your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

### Google AI (Alternative AI Provider)

**Required for**: Additional AI capabilities and fallback

```bash
# Get your API key from: https://aistudio.google.com/app/apikey
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
GOOGLE_CLOUD_PROJECT_ID=your_gcp_project_id_here
```

### Azure OpenAI (Enterprise Alternative)

**Required for**: Enterprise deployments with Azure

```bash
# Get credentials from: https://portal.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name_here
```

## Vector Database Configuration

### Pinecone (Recommended for Production)

**Required for**: Semantic search, content recommendations, RAG

```bash
# Get your API key from: https://app.pinecone.io/
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=your_pinecone_environment_here
PINECONE_INDEX_NAME=astro-intelligence-vectors
```

**Setup Steps**:
1. Create a Pinecone account
2. Create a new index with 1536 dimensions (for OpenAI embeddings)
3. Choose cosine similarity metric
4. Copy your API key and environment

### Supabase Vector (Alternative)

**Required for**: Database + vector search in one service

```bash
# Configure both database and vector search
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Setup Steps**:
1. Create a Supabase project
2. Enable the vector extension in your database
3. Copy your project URL and service role key

### Other Vector Databases

The platform supports Weaviate and ChromaDB as alternatives. See `.env.example` for configuration options.

## Database & Storage

### Supabase (Primary Database)

**Required for**: User data, content storage, analytics

```bash
# Get credentials from: https://supabase.com/dashboard/projects
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**Setup Steps**:
1. Create a Supabase project
2. Run the database migrations (see `supabase/schema.sql`)
3. Copy your project credentials

## Authentication

### Clerk (User Management)

**Required for**: User authentication, dashboard access

```bash
# Get credentials from: https://dashboard.clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_live_your_clerk_secret_key_here
```

**Setup Steps**:
1. Create a Clerk application
2. Configure sign-in/sign-up pages
3. Set up redirect URLs
4. Copy your API keys

## Payment Processing

### Stripe (Optional)

**Required for**: Subscription billing, payment processing

```bash
# Get credentials from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
```

## Search & Analytics

### Algolia (Optional)

**Required for**: Advanced search functionality

```bash
# Get credentials from: https://www.algolia.com/api-keys
ALGOLIA_APP_ID=your_algolia_app_id_here
ALGOLIA_ADMIN_KEY=your_algolia_admin_key_here
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_algolia_search_key_here
```

## Performance & Rate Limiting

### AI Rate Limits

Configure rate limits to control costs and usage:

```bash
AI_RATE_LIMIT_ENABLED=true
AI_CHAT_RATE_LIMIT=20                    # Messages per hour
AI_RECOMMENDATIONS_RATE_LIMIT=30         # Requests per hour
AI_CONTENT_GENERATION_RATE_LIMIT=10      # Generations per hour
```

### Performance Settings

```bash
AI_CACHE_ENABLED=true
CACHE_TTL=3600                           # Cache time in seconds
AI_MAX_CONCURRENT_REQUESTS=10
AI_REQUEST_TIMEOUT=30000                 # Timeout in milliseconds
```

### Vector Database Performance

```bash
VECTOR_CACHE_ENABLED=true
VECTOR_MAX_CONCURRENT_UPSERTS=5
VECTOR_BATCH_UPSERT_SIZE=100
VECTOR_AUTO_CREATE_INDEX=true
```

## Development Settings

### Debug Configuration

```bash
NODE_ENV=development
DEBUG_AI_RESPONSES=true
LOG_LEVEL=debug
AI_MOCK_RESPONSES=false
```

### Feature Flags

Enable/disable features during development:

```bash
AI_CHAT_ENABLED=true
AI_RECOMMENDATIONS_ENABLED=true
AI_CONTENT_GENERATION_ENABLED=true
AI_ANALYTICS_ENABLED=true
ENABLE_EXPERIMENTAL_AI=true
```

## Security Best Practices

### Environment Security

1. **Never commit `.env.local`** with real credentials
2. **Use different credentials** for development, staging, and production
3. **Regularly rotate API keys** and secrets
4. **Monitor usage** and set up billing alerts
5. **Use environment-specific configurations**

### API Key Management

- Store production keys in your deployment platform (Vercel, Netlify, etc.)
- Use test/development keys for local development
- Enable key restrictions where possible (IP whitelisting, etc.)
- Monitor key usage for suspicious activity

## Deployment Configurations

### Vercel Deployment

Add environment variables through the Vercel dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add production values from `.env.example`
4. Deploy your application

### Other Platforms

- **Netlify**: Add variables in Site Settings > Environment Variables
- **Railway**: Use the Variables tab in your project dashboard
- **Docker**: Use environment variable injection or `.env` files

## Troubleshooting

### Common Issues

1. **AI features not working**:
   - Check that `OPENAI_API_KEY` is uncommented and valid
   - Verify your OpenAI account has sufficient credits
   - Check rate limits in your OpenAI dashboard

2. **Vector search not working**:
   - Ensure `PINECONE_API_KEY` and `PINECONE_ENVIRONMENT` are set
   - Verify your Pinecone index exists and has the correct dimensions
   - Check Pinecone console for usage limits

3. **Authentication issues**:
   - Verify Clerk credentials are correct
   - Check that redirect URLs match your configuration
   - Ensure development/production environments use appropriate keys

4. **Database connection errors**:
   - Confirm Supabase URL and keys are correct
   - Check that your Supabase project is active
   - Verify database migrations have been run

### Debug Mode

Enable debug mode for detailed logging:

```bash
DEBUG_AI_RESPONSES=true
LOG_LEVEL=debug
```

This will log:
- AI request/response details
- Vector database operations
- Authentication flows
- Performance metrics

### Testing Configuration

Use test mode to validate your setup:

```bash
AI_MOCK_RESPONSES=true
NODE_ENV=test
```

This enables:
- Mock AI responses
- Simulated vector search
- Test data instead of real API calls

## Configuration Validation

The application automatically validates your configuration on startup:

- ✅ **AI Provider**: At least one AI service must be configured
- ✅ **Vector Database**: At least one vector provider must be available
- ✅ **Authentication**: Required for dashboard access
- ✅ **Rate Limits**: Must be positive numbers when enabled
- ✅ **Timeouts**: Must be at least 1000ms

Check your console logs for validation warnings or errors.

## Support

For configuration help:
1. Check the inline comments in `.env.example` and `.env.local`
2. Review this documentation
3. Check the application logs for specific error messages
4. Consult the service provider documentation for credential setup

## Migration Guide

### From Legacy Configuration

If you have an existing `.env.local` file:

1. **Backup your current file**:
   ```bash
   cp .env.local .env.local.backup
   ```

2. **Copy the new template**:
   ```bash
   cp .env.example .env.local
   ```

3. **Migrate your values**:
   - Copy your API keys from the backup
   - Update variable names if needed
   - Add any new required variables

4. **Test the configuration**:
   ```bash
   pnpm dev
   ```

### Version Updates

When updating the platform:
1. Compare your `.env.local` with the latest `.env.example`
2. Add any new required variables
3. Update deprecated variable names
4. Check for new feature flags or performance settings

---

This configuration system is designed to be flexible and secure. Start with the basics and gradually enable more services as your needs grow.