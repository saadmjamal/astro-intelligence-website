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
- **💳 Script Marketplace** - Premium automation scripts (Phase 2)
- **🔬 Research Lab** - AI research microsite (Phase 3)
- **📖 Knowledge Base** - Advanced documentation (Phase 4)

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Content**: [Contentlayer2](https://contentlayer.dev/) for MDX
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Auth**: [Clerk](https://clerk.com/) (Phase 2)
- **Payments**: [Stripe](https://stripe.com/) (Phase 2)
- **Search**: [Algolia DocSearch](https://docsearch.algolia.com/) (Phase 4)
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
# Required for Phase 2+
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional
ALGOLIA_APP_ID=...
ALGOLIA_API_KEY=...
CONVERTKIT_API_KEY=...
RESEND_API_KEY=...
SENTRY_DSN=...
```

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
title: "Your Post Title"
date: "2025-01-27"
excerpt: "Brief description"
author: "Author Name"
tags: ["AI", "Cloud"]
---

# Your content here...
```

2. The post will automatically appear on `/blog`

### Adding Case Studies

1. Create a new MDX file in `content/case-studies/`:

```mdx
---
title: "Project Name"
client: "Client Name"
date: "2025-01-27"
excerpt: "Project summary"
featuredImage: "/images/case-study.jpg"
tags: ["AI", "Enterprise"]
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
