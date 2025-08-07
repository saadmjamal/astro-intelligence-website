import { generateSEOMetadata } from '@/lib/utils/metadata';
import MobileAboutOptimized from '@/components/mobile/MobileAboutOptimized';

export function generateMetadata() {
  return generateSEOMetadata({
    title: 'Mobile About - Meet Our Mobile AI Leadership Team | Astro Intelligence',
    description: 'Meet the mobile-first AI experts helping Fortune 500s achieve 30% cost reduction. Touch-optimized team profiles and company story.',
    keywords: ['Mobile About Page', 'Mobile AI Leadership', 'Mobile Team Profiles', 'Mobile Company Story', 'Mobile AI Experts'],
  });
}

export default function MobileAboutPage() {
  return <MobileAboutOptimized />;
}