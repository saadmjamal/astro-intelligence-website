import React from 'react'
import { Metadata } from 'next'
import OptimizedEnhancedHero from '@/components/OptimizedEnhancedHero'
import TrustSection from '@/components/TrustSection'
import OptimizedCoreServices from '@/components/OptimizedCoreServices'
import { LazyCometAbout, LazyCometContact } from '@/components/LazyComponents'
import EnhancedFooter from '@/components/EnhancedFooter'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'
import WebVitals from '@/components/WebVitals'
import { ResourceHints } from '@/components/ResourceHints'

// Optimized metadata for better SEO and performance
export const metadata: Metadata = {
  title: 'AstroIntelligence - Enterprise AI Solutions | 45% Cost Reduction',
  description: 'Transform your enterprise with AI precision. Trusted by Fortune 500 companies for 45% cost reduction, 8× faster deployment, and enterprise-grade security.',
  keywords: 'AI, machine learning, enterprise solutions, automation, cloud optimization, performance',
  openGraph: {
    title: 'AstroIntelligence - Enterprise AI Solutions',
    description: 'Transform your enterprise with AI precision. 45% cost reduction guaranteed.',
    images: ['/images/og-homepage.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AstroIntelligence - Enterprise AI Solutions',
    description: 'Transform your enterprise with AI precision. 45% cost reduction guaranteed.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://astrointelligence.ai',
  },
}

export default function PerformanceOptimizedPage() {
  return (
    <>
      {/* Resource hints for critical resources */}
      <ResourceHints />
      
      <main className="bg-black">
        {/* Above the fold - Critical content */}
        <OptimizedEnhancedHero />
        
        {/* Social proof - High priority */}
        <TrustSection />
        
        {/* Core value prop - High priority */}
        <OptimizedCoreServices />
        
        {/* Below the fold - Lazy loaded */}
        <LazyCometAbout />
        <LazyCometContact />
      </main>
      
      {/* Footer - Always visible */}
      <EnhancedFooter />
      
      {/* Performance monitoring - Development only */}
      <PerformanceMonitor compact />
      <WebVitals />
    </>
  )
}