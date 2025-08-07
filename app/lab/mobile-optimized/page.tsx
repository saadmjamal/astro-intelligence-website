import { generateSEOMetadata } from '@/lib/utils/metadata';
import MobileResearchLabOptimized from '@/components/mobile/MobileResearchLabOptimized';

export function generateMetadata() {
  return generateSEOMetadata({
    title: 'Mobile Research Lab - Interactive AI Demos | Astro Intelligence', 
    description: 'Touch-friendly interactive demos and mobile-optimized research papers. Experience our AI research with mobile-native interactions.',
    keywords: ['Mobile Research Lab', 'Interactive Mobile Demos', 'Mobile AI Research', 'Touch-Optimized Demos', 'Mobile AI Innovation'],
  });
}

export default function MobileResearchLabPage() {
  return <MobileResearchLabOptimized />;
}