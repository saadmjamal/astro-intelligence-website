import { generateSEOMetadata } from '@/lib/utils/metadata';

export function generateMetadata() {
  return generateSEOMetadata({
    title: 'Portfolio - Proven Results | 30% Cost Reduction Delivered',
    description: 'See how we helped Fortune 500s cut cloud costs by 30% and deploy 5× faster. Real client results, case studies, and measurable ROI from our AI-powered solutions.',
    keywords: ['Portfolio', 'Case Studies', 'Client Results', 'ROI', 'Cost Reduction', 'Success Stories', 'Testimonials'],
  });
}