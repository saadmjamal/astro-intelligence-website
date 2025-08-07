'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

export interface PerformanceMetrics {
  renderTime: number
  componentCount: number
  memoryUsage?: number
}

// Custom hook for performance optimization
export const usePerformanceOptimization = () => {
  const prefersReducedMotion = useReducedMotion()
  const performanceRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    componentCount: 0
  })
  
  // Optimize animations based on device capabilities
  const getOptimizedAnimationProps = useCallback((baseProps: any) => {
    if (prefersReducedMotion) {
      return {
        ...baseProps,
        transition: { duration: 0.01 },
        animate: baseProps.initial || { opacity: 1 }
      }
    }
    return baseProps
  }, [prefersReducedMotion])

  // Debounced resize handler
  const useDebouncedResize = useCallback((callback: () => void, delay: number = 250) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    
    useEffect(() => {
      const handleResize = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(callback, delay)
      }
      
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [callback, delay])
  }, [])

  // Optimized intersection observer
  const useOptimizedIntersectionObserver = useCallback((
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) => {
    const elementRef = useRef<HTMLElement>(null)
    
    useEffect(() => {
      if (!elementRef.current) return
      
      const observer = new IntersectionObserver(callback, {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      })
      
      observer.observe(elementRef.current)
      
      return () => {
        observer.disconnect()
      }
    }, [callback, options])
    
    return elementRef
  }, [])

  // Memory usage tracking (development only)
  const trackMemoryUsage = useCallback(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memInfo = (performance as any).memory
      performanceRef.current.memoryUsage = memInfo.usedJSHeapSize
      
      // Log if memory usage is high
      if (memInfo.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
        console.warn('High memory usage detected:', {
          used: `${(memInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
          total: `${(memInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
          limit: `${(memInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`
        })
      }
    }
  }, [])

  // Component render time tracking
  const measureRenderTime = useCallback((componentName: string) => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      if (process.env.NODE_ENV === 'development') {
        if (renderTime > 16) { // More than one frame (60fps)
          console.warn(`Slow render detected in ${componentName}:`, `${renderTime.toFixed(2)}ms`)
        }
      }
      
      performanceRef.current.renderTime = renderTime
    }
  }, [])

  // Preload critical resources
  const preloadResource = useCallback((href: string, as: string, type?: string) => {
    if (typeof window === 'undefined') return
    
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    
    document.head.appendChild(link)
  }, [])

  // Battery-aware optimizations
  const useBatteryOptimization = useCallback(() => {
    useEffect(() => {
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          if (battery.level < 0.2 || !battery.charging) {
            // Reduce animations and heavy computations when battery is low
            document.documentElement.classList.add('battery-saver')
          }
        })
      }
    }, [])
  }, [])

  return {
    prefersReducedMotion,
    getOptimizedAnimationProps,
    useDebouncedResize,
    useOptimizedIntersectionObserver,
    trackMemoryUsage,
    measureRenderTime,
    preloadResource,
    useBatteryOptimization,
    performanceMetrics: performanceRef.current
  }
}

// Hook for optimizing particle systems
export const useOptimizedParticles = (baseCount: number) => {
  const prefersReducedMotion = useReducedMotion()
  
  const getParticleCount = useCallback(() => {
    if (prefersReducedMotion) return 0
    
    // Reduce particles based on device performance
    if (typeof window !== 'undefined') {
      const { deviceMemory, hardwareConcurrency } = navigator as any
      
      if (deviceMemory && deviceMemory < 4) return Math.max(1, Math.floor(baseCount / 4))
      if (hardwareConcurrency && hardwareConcurrency < 4) return Math.max(1, Math.floor(baseCount / 2))
    }
    
    return baseCount
  }, [baseCount, prefersReducedMotion])

  return {
    particleCount: getParticleCount(),
    shouldAnimate: !prefersReducedMotion
  }
}

// Hook for image optimization
export const useImageOptimization = () => {
  const preloadCriticalImages = useCallback((images: string[]) => {
    if (typeof window === 'undefined') return
    
    images.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  const lazyLoadImages = useCallback(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src || ''
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        })
      })

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  }, [])

  return {
    preloadCriticalImages,
    lazyLoadImages
  }
}