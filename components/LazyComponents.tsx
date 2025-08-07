'use client'

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

// Lazy load heavy components for better performance
const CometAbout = lazy(() => import('@/components/CometAbout'))
const CometContact = lazy(() => import('@/components/CometContact'))
const AIShowcase = lazy(() => import('@/components/AIShowcase'))

// Loading skeleton component
const ComponentSkeleton = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`animate-pulse bg-gray-800 rounded-lg ${height} w-full mb-8`}>
    <div className="p-8 space-y-4">
      <div className="h-8 bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  </div>
)

// Optimized lazy wrapper with intersection observer
export const LazySection = ({ 
  children, 
  fallback,
  rootMargin = '50px'
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: rootMargin }}
      transition={{ duration: 0.3 }}
    >
      <Suspense fallback={fallback || <ComponentSkeleton />}>
        {children}
      </Suspense>
    </motion.div>
  )
}

// Pre-configured lazy components
export const LazyCometAbout = () => (
  <LazySection fallback={<ComponentSkeleton height="h-96" />}>
    <CometAbout />
  </LazySection>
)

export const LazyCometContact = () => (
  <LazySection fallback={<ComponentSkeleton height="h-80" />}>
    <CometContact />
  </LazySection>
)

export const LazyAIShowcase = () => (
  <LazySection fallback={<ComponentSkeleton height="h-screen" />}>
    <AIShowcase />
  </LazySection>
)