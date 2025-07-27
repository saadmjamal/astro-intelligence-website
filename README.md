# Astro Intelligence Inc Website

A high-performance, mobile-first Next.js 15 application showcasing AI and cloud services with emphasis on ethical AI themes and futuristic design.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Content**: Contentlayer2 for MDX
- **Auth**: Clerk
- **Payments**: Stripe
- **Search**: Algolia
- **Monitoring**: Sentry
- **Analytics**: Plausible

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/astro-intelligence/website.git
cd website

# Install dependencies
pnpm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file with your credentials. See `.env.local.example` for required variables.

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Run tests
pnpm test

# Start Storybook
pnpm storybook
```

## Project Structure

```
app/              # Next.js pages and API routes
components/       # Reusable React components
content/          # MDX content files
lib/              # Utility functions and configurations
public/           # Static assets
stories/          # Storybook stories
```

## Content Management

Blog posts and case studies are written in MDX format in the `content/` directory. Contentlayer automatically generates types and processes the content.

## Deployment

The site automatically deploys to Vercel on push to the main branch. Preview deployments are created for pull requests.

## License

© 2025 Astro Intelligence Inc. All rights reserved.
