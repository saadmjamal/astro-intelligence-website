# Astro Intelligence Inc Website

> The future of intelligent cloud architecture

A high-performance, mobile-first Next.js 15 application showcasing AI and cloud services with emphasis on ethical AI themes and futuristic design.

🚀 **[Live Demo](https://astro-intelligence.vercel.app)** | 📘 **[Documentation](./CLAUDE.md)** | 🎨 **[Design System](./stories)**

## ✨ Features

### Core Functionality

- **📱 Mobile-First Design** - Optimized for all devices with touch-friendly interactions
- **🎨 Futuristic UI/UX** - Custom design system with ethical AI themes
- **📝 MDX Blog Engine** - Type-safe content management with Contentlayer2
- **🚀 High Performance** - Static generation, ISR, and optimized assets
- **♿ Accessible** - WCAG compliant with semantic HTML and ARIA support
- **🌍 SEO Optimized** - Meta tags, structured data, and sitemap generation

### Business Features

- **💼 Service Showcase** - AI Consulting, Cloud Architecture, ML Engineering, Strategic Partnerships
- **📚 Portfolio** - Case studies with rich media support
- **📰 Blog** - Technical articles with syntax highlighting
- **🤖 AI Chat Assistant** - Intelligent customer support with multi-provider support
- **🔍 AI-Powered Search** - Vector-based semantic search across content
- **💡 AI Recommendations** - Personalized service and content suggestions
- **💳 Script Marketplace** - Premium automation scripts (Phase 2)
- **🔬 Research Lab** - AI research microsite (Phase 3)
- **📖 Knowledge Base** - Advanced documentation (Phase 4)

### 🤖 AI Features

- **Multi-Provider AI Integration** - OpenAI, Anthropic, Google AI, Azure OpenAI support
- **Intelligent Chat System** - Context-aware conversations with session management
- **Smart Recommendations** - AI-powered service recommendations based on user profile
- **Content Generation** - Automated content creation (blog posts, case studies, proposals)
- **Vector Database Support** - Pinecone, Supabase Vector, Weaviate, ChromaDB integration
- **Advanced Rate Limiting** - IP-based and user-based request throttling
- **Response Caching** - Intelligent caching with TTL for improved performance
- **Security Features** - Input sanitization, content filtering, audit logging
- **Performance Monitoring** - Real-time metrics and performance optimization

> 📖 **[Complete AI Integration Guide](../AI_INTEGRATION_GUIDE.md)** - Comprehensive documentation for AI features, API endpoints, and deployment

## 🛠️ Tech Stack

### Core Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Content**: [Contentlayer2](https://contentlayer.dev/) for MDX
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### AI & Data Stack
- **AI Providers**: [OpenAI](https://openai.com/), [Anthropic](https://anthropic.com/), [Google AI](https://ai.google.dev/)
- **Vector Databases**: [Pinecone](https://pinecone.io/), [Supabase Vector](https://supabase.com/), [Weaviate](https://weaviate.io/), [ChromaDB](https://chromadb.com/)
- **Embeddings**: OpenAI text-embedding-3-small, Cohere, Sentence Transformers
- **Search**: Vector similarity search, hybrid search, semantic search

### Infrastructure & Services
- **Auth**: [Clerk](https://clerk.com/) (Phase 2)
- **Payments**: [Stripe](https://stripe.com/) (Phase 2)
- **Search**: [Algolia DocSearch](https://docsearch.algolia.com/) (Phase 4)
- **Email**: [Resend](https://resend.com/), [ConvertKit](https://convertkit.com/)
- **Monitoring**: [Sentry](https://sentry.io/)
- **Analytics**: [Plausible](https://plausible.io/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 8+ (or npm/yarn)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/saadmjamal/astro-intelligence-website.git
cd astro-intelligence-website

# Install dependencies
pnpm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# 🤖 AI SERVICE PROVIDERS (Required)
OPENAI_API_KEY=sk-proj-your_openai_api_key_here
ANTHROPIC_API_KEY=sk-ant-api03-your_anthropic_api_key_here  # Optional
GOOGLE_AI_API_KEY=your_google_ai_api_key_here              # Optional

# 🗄️ VECTOR DATABASE (Choose one)
PINECONE_API_KEY=your_pinecone_api_key_here                # Recommended
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=astro-intelligence-vectors

# OR use Supabase Vector (Alternative)
SUPABASE_URL=https://your_project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 🔐 AUTHENTICATION & PAYMENTS (Phase 2+)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# 📧 EMAIL & COMMUNICATION (Optional)
RESEND_API_KEY=re_your_resend_api_key_here
CONVERTKIT_API_KEY=your_convertkit_api_key_here

# 🔍 SEARCH & ANALYTICS (Optional)
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_API_KEY=your_algolia_api_key_here
SENTRY_DSN=https://your_sentry_dsn_here

# ⚙️ AI CONFIGURATION (Optional - has defaults)
AI_DEFAULT_MODEL=gpt-4
AI_CHAT_RATE_LIMIT=20
AI_RECOMMENDATIONS_RATE_LIMIT=30
VECTOR_SIMILARITY_THRESHOLD=0.8
```

For detailed AI setup instructions, see [docs/AI_SETUP.md](./docs/AI_SETUP.md)

## 📚 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server (port 3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm type-check       # Run TypeScript compiler check

# Testing
pnpm test             # Run Jest unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:e2e         # Run Cypress E2E tests
pnpm test:e2e:ui      # Open Cypress UI

# Content
pnpm contentlayer build    # Build MDX content
pnpm contentlayer dev      # Watch content changes

# Documentation
pnpm storybook        # Start Storybook (port 6006)
pnpm build-storybook  # Build Storybook static site
```

### Project Structure

```
astro-intelligence/
├── app/                  # Next.js App Router
│   ├── (marketing)/      # Marketing pages group
│   ├── api/              # API routes
│   ├── blog/             # Blog pages
│   ├── portfolio/        # Case study pages
│   └── scripts/          # Script marketplace (Phase 2)
├── components/           # Reusable React components
│   ├── ui/               # Base UI components
│   ├── sections/         # Page sections
│   └── mdx/              # MDX components
├── content/              # MDX content files
│   ├── posts/            # Blog posts
│   ├── case-studies/     # Portfolio items
│   └── research/         # Research articles
├── lib/                  # Utilities and helpers
│   ├── utils/            # General utilities
│   ├── api/              # API client functions
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
│   ├── images/           # Image assets
│   └── og/               # Open Graph images
├── stories/              # Storybook stories
└── styles/               # Global styles
```

## 🎨 Design System

### Color Palette

- **Navy**: `#0a0e23` - Primary brand color
- **Magenta**: `#ff3eb5` - Accent color
- **Black**: `#000000` - High contrast text
- **Off-white**: `#f5f5f5` - Background color

### Typography

- **Headings**: Orbitron (400-900 weights)
- **Body**: Inter (400-700 weights)

### Breakpoints

- Mobile: 320px+
- Tablet: 768px+ (`md:`)
- Desktop: 1024px+ (`lg:`)
- Wide: 1280px+ (`xl:`)

## 📝 Content Management

### Creating Blog Posts

1. Create a new MDX file in `content/posts/`:

```mdx
---
title: 'Your Post Title'
date: '2025-01-27'
excerpt: 'Brief description'
author: 'Author Name'
tags: ['AI', 'Cloud']
---

# Your content here...
```

2. The post will automatically appear on `/blog`

### Adding Case Studies

1. Create a new MDX file in `content/case-studies/`:

```mdx
---
title: 'Project Name'
client: 'Client Name'
date: '2025-01-27'
excerpt: 'Project summary'
featuredImage: '/images/case-study.jpg'
tags: ['AI', 'Enterprise']
---

# Case study content...
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables
4. Deploy!

### Manual Deployment

```bash
# Build the application
pnpm build

# Test production build locally
pnpm start

# Deploy the .next folder to your hosting provider
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### E2E Tests

```bash
# Run headless
pnpm test:e2e

# Open Cypress UI
pnpm test:e2e:ui
```

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: <1.8s
- **Largest Contentful Paint**: <2.5s
- **Total Blocking Time**: <150ms
- **Cumulative Layout Shift**: <0.1

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

© 2025 Astro Intelligence Inc. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit written permission from Astro Intelligence Inc.

---

<p align="center">
  Built with ❤️ by the Astro Intelligence team
</p>
