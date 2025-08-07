'use client'

import { lazy, Suspense, ComponentType } from 'react'
import { motion } from 'framer-motion'

// Loading skeleton for various component types
const LoadingSkeleton = ({ 
  type = 'default',
  height = '200px',
  className = ''
}: {
  type?: 'hero' | 'services' | 'ai' | 'portfolio' | 'default'
  height?: string
  className?: string
}) => {
  const getSkeletonConfig = () => {
    switch (type) {
      case 'hero':
        return {
          height: 'min-h-screen',
          content: (
            <>
              <div className="h-20 bg-gray-700 rounded w-3/4 mb-8"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2 mb-12"></div>
              <div className="h-12 bg-gray-600 rounded w-40"></div>
            </>
          )
        }
      case 'services':
        return {
          height: 'h-96',
          content: (
            <>
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-700 rounded"></div>
                ))}
              </div>
            </>
          )
        }
      case 'ai':
        return {
          height: 'h-80',
          content: (
            <>
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-40 bg-gray-700 rounded mb-4"></div>
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-600 rounded flex-1"></div>
                ))}
              </div>
            </>
          )
        }
      case 'portfolio':
        return {
          height: 'h-96',
          content: (
            <>
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-40 bg-gray-700 rounded"></div>
                ))}
              </div>
            </>
          )
        }
      default:
        return {
          height,
          content: (
            <>
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </>
          )
        }
    }
  }

  const config = getSkeletonConfig()
  
  return (
    <div className={`animate-pulse bg-gray-800 rounded-lg ${config.height} w-full p-8 ${className}`}>
      {config.content}
    </div>
  )
}

// Enhanced lazy loading wrapper with intersection observer
export const LazyComponent = ({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  className = ''
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: rootMargin, amount: threshold }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={className}
    >
      <Suspense fallback={fallback || <LoadingSkeleton />}>
        {children}
      </Suspense>
    </motion.div>
  )
}

// Optimized dynamic imports with priority loading
export const createLazyComponent = <P = Record<string, never>>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: {
    fallbackType?: 'hero' | 'services' | 'ai' | 'portfolio' | 'default'
    fallbackHeight?: string
    priority?: 'high' | 'medium' | 'low'
    preload?: boolean
  } = {}
) => {
  const LazyLoadedComponent = lazy(() => {
    // Add artificial delay for low priority components
    const delay = options.priority === 'low' ? 100 : 0
    return delay > 0 
      ? new Promise<{default: ComponentType<P>}>(resolve => setTimeout(() => importFn().then(resolve), delay))
      : importFn()
  })

  // Preload component if specified
  if (options.preload && typeof window !== 'undefined') {
    requestIdleCallback(() => {
      importFn().catch(() => {}) // Preload silently
    })
  }

  return (props: P) => (
    <LazyComponent
      fallback={
        <LoadingSkeleton 
          type={options.fallbackType} 
          height={options.fallbackHeight}
        />
      }
    >
      <LazyLoadedComponent {...(props as any)} />
    </LazyComponent>
  )
}

// Pre-configured lazy components for major sections
export const LazyHero = createLazyComponent(
  () => import('../EnhancedHero'),
  { fallbackType: 'hero', priority: 'high', preload: true }
)

export const LazyCoreServices = createLazyComponent(
  () => import('../OptimizedCoreServices'),
  { fallbackType: 'services', priority: 'high', preload: true }
)

export const LazyAIShowcase = createLazyComponent(
  () => import('../AIShowcase'),
  { fallbackType: 'ai', priority: 'medium' }
)

export const LazyAgencyPortfolio = createLazyComponent(
  () => import('../AgencyPortfolio'),
  { fallbackType: 'portfolio', priority: 'medium' }
)

export const LazyCometAbout = createLazyComponent(
  () => import('../CometAbout'),
  { priority: 'low' }
)

export const LazyCometContact = createLazyComponent(
  () => import('../CometContact'),
  { priority: 'low' }
)

// Utility for batch preloading components
export const preloadComponents = (components: (() => Promise<any>)[]) => {
  if (typeof window !== 'undefined') {
    requestIdleCallback(() => {
      components.forEach(comp => comp().catch(() => {}))
    })
  }
}

// Export for use in pages
export const preloadCriticalComponents = () => {
  preloadComponents([
    () => import('../EnhancedHero'),
    () => import('../OptimizedCoreServices'),
    () => import('../Header'),
    () => import('../Footer')
  ])
}