// Performance optimization exports
export * from './DynamicImports'
export * from './MemoizedComponents' 
export * from './OptimizedFramerMotion'
export * from './OptimizedImage'
export * from './ResourceOptimization'
export * from './OptimizedHomePage'

// Main performance utilities
export {
  createLazyComponent,
  preloadComponents,
  preloadCriticalComponents
} from './DynamicImports'

export {
  MemoizedButton,
  MemoizedCard,
  MemoizedMetricCounter,
  MemoizedTestimonial,
  MemoizedServiceCard,
  MemoizedPortfolioItem,
  MemoizedPerformanceWrapper
} from './MemoizedComponents'

export {
  OptimizedMotionDiv,
  OptimizedSection,
  OptimizedMotionCard,
  OptimizedMotionList,
  OptimizedAnimatePresence,
  optimizedViewport,
  criticalViewport
} from './OptimizedFramerMotion'

export {
  OptimizedImage,
  ProgressiveImage,
  OptimizedImageGallery,
  OptimizedAvatar,
  OptimizedBackground
} from './OptimizedImage'

export {
  PerformanceOptimizer,
  FontOptimization,
  ResourceHints,
  PerformanceMonitoring
} from './ResourceOptimization'