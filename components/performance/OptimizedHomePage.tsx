'use client'

import { Suspense, memo } from 'react'
import { PerformanceOptimizer } from './ResourceOptimization'
import { OptimizedSection } from './OptimizedFramerMotion'
import { 
  LazyCoreServices, 
  LazyAIShowcase,
  LazyAgencyPortfolio,
  LazyCometAbout,
  LazyCometContact,
  preloadCriticalComponents
} from './DynamicImports'

// Critical above-the-fold component (not lazy loaded)
const CriticalHero = memo(() => (
  <section className="min-h-screen bg-gradient-to-br from-cosmic-midnight to-cosmic-black flex items-center justify-center">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        AI-Powered <span className="text-cosmic-comet-blue">Intelligence</span>
      </h1>
      <p className="text-xl text-cosmic-text-secondary mb-8 max-w-2xl mx-auto">
        Transform your business with cutting-edge artificial intelligence solutions
      </p>
      <button className="btn-primary">
        Get Started
      </button>
    </div>
  </section>
))

// Loading states for different sections
const _HeroSkeleton = () => (
  <div className="min-h-screen bg-cosmic-midnight animate-pulse flex items-center justify-center">
    <div className="text-center">
      <div className="h-16 bg-gray-700 rounded w-96 mb-6 mx-auto"></div>
      <div className="h-6 bg-gray-700 rounded w-80 mb-8 mx-auto"></div>
      <div className="h-12 bg-gray-600 rounded w-32 mx-auto"></div>
    </div>
  </div>
)

const ServicesSkeleton = () => (
  <div className="py-24 px-4 animate-pulse">
    <div className="container mx-auto">
      <div className="h-12 bg-gray-700 rounded w-80 mb-16 mx-auto"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
)

// Optimized Home Page component
export const OptimizedHomePage = memo(() => {
  // Preload critical components on mount
  if (typeof window !== 'undefined') {
    preloadCriticalComponents()
  }

  return (
    <PerformanceOptimizer>
      <main>
        {/* Critical above-the-fold content - loaded immediately */}
        <CriticalHero />
        
        {/* Core services section - high priority lazy loading */}
        <OptimizedSection className="py-24 bg-cosmic-surface">
          <Suspense fallback={<ServicesSkeleton />}>
            <LazyCoreServices />
          </Suspense>
        </OptimizedSection>

        {/* AI Showcase section - medium priority */}
        <OptimizedSection className="py-24">
          <Suspense fallback={<div className="h-96 bg-gray-800 animate-pulse rounded-lg mx-4"></div>}>
            <LazyAIShowcase />
          </Suspense>
        </OptimizedSection>

        {/* Portfolio section - medium priority */}
        <OptimizedSection className="py-24 bg-cosmic-surface">
          <Suspense fallback={<div className="h-80 bg-gray-800 animate-pulse rounded-lg mx-4"></div>}>
            <LazyAgencyPortfolio />
          </Suspense>
        </OptimizedSection>

        {/* About section - low priority */}
        <OptimizedSection className="py-24">
          <Suspense fallback={<div className="h-64 bg-gray-800 animate-pulse rounded-lg mx-4"></div>}>
            <LazyCometAbout />
          </Suspense>
        </OptimizedSection>

        {/* Contact section - low priority */}
        <OptimizedSection className="py-24 bg-cosmic-surface">
          <Suspense fallback={<div className="h-64 bg-gray-800 animate-pulse rounded-lg mx-4"></div>}>
            <LazyCometContact />
          </Suspense>
        </OptimizedSection>
      </main>
    </PerformanceOptimizer>
  )
})

OptimizedHomePage.displayName = 'OptimizedHomePage'
CriticalHero.displayName = 'CriticalHero'