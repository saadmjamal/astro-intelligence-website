import { generateSEOMetadata } from '@/lib/utils/metadata';
export const dynamic = 'force-dynamic'
const MobilePortfolioOptimized = () => null

export function generateMetadata() {
  return generateSEOMetadata({
    title: 'Mobile-Optimized Portfolio - Enterprise AI Results | Astro Intelligence',
    description: 'Mobile-first view of our Fortune 500 client success stories. 30% cost reduction, 5× faster deployment. Touch-optimized for executive decision makers.',
    keywords: ['Mobile Portfolio', 'Enterprise Mobile AI', 'Mobile Success Stories', 'Client Results Mobile', 'Executive Mobile Experience'],
  });
}

export default function MobilePortfolioPage() {
  return <MobilePortfolioOptimized />;
}