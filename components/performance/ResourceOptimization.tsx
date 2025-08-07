'use client'

import { useEffect, useMemo } from 'react'
import { memo } from 'react'

// Font preloading and optimization
export const FontOptimization = memo(() => {
  useEffect(() => {
    // Preload critical fonts
    const preloadFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/space-grotesk-var.woff2'
    ]

    preloadFonts.forEach(fontUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = fontUrl
      document.head.appendChild(link)
    })

    // Font display optimization
    const style = document.createElement('style')
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 300 700;
        font-display: swap;
        src: url('/fonts/space-grotesk-var.woff2') format('woff2');
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup is handled automatically by browser
    }
  }, [])

  return null
})

// Critical CSS inlining component
export const CriticalCSS = memo(() => {
  const criticalStyles = useMemo(() => `
    /* Critical above-the-fold styles */
    .hero-section {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f23 0%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .nav-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: rgba(15, 15, 35, 0.8);
      backdrop-filter: blur(10px);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      transition: transform 0.2s ease;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
    }
  `, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.setAttribute('data-critical', 'true')
    style.textContent = criticalStyles
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.querySelector('style[data-critical="true"]')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [criticalStyles])

  return null
})

// Resource hints for external resources
export const ResourceHints = memo(() => {
  useEffect(() => {
    const hints = [
      // DNS prefetch for external domains
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
      { rel: 'dns-prefetch', href: 'https://api.openai.com' },
      
      // Preconnect to critical origins
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      
      // Prefetch likely next pages
      { rel: 'prefetch', href: '/services' },
      { rel: 'prefetch', href: '/about' },
      { rel: 'prefetch', href: '/contact' }
    ]

    const links: HTMLLinkElement[] = []
    
    hints.forEach(hint => {
      const link = document.createElement('link')
      link.rel = hint.rel
      link.href = hint.href
      if (hint.crossOrigin) {
        link.crossOrigin = hint.crossOrigin
      }
      document.head.appendChild(link)
      links.push(link)
    })

    return () => {
      links.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      })
    }
  }, [])

  return null
})

// Service Worker registration for caching
export const ServiceWorkerSetup = memo(() => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return null
})

// Performance monitoring and Web Vitals
export const PerformanceMonitoring = memo(() => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // TODO: Web Vitals monitoring - install web-vitals package if needed
    // import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      const _vitalsHandler = (metric: any) => {
        // Send to analytics service
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true
          })
        }

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log(metric)
        }
      }

      // onCLS(vitalsHandler)
      // onFID(vitalsHandler)
      // onFCP(vitalsHandler)
      // onLCP(vitalsHandler)
      // onTTFB(vitalsHandler)
    // })

    // Performance observer for long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry)
          }
        }
      })
      
      observer.observe({ entryTypes: ['longtask'] })

      return () => observer.disconnect()
    }
  }, [])

  return null
})

// Bundle size analyzer (development only)
export const BundleAnalyzer = memo(() => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.ANALYZE === 'true') {
      // Dynamic import analysis
      const modules = new Set<string>()
      
      const originalImport = window.eval('import')
      window.eval = function(code: string) {
        if (code.includes('import(')) {
          const match = code.match(/import\(['"`]([^'"`]+)['"`]\)/)
          if (match) {
            modules.add(match[1]!)
          }
        }
        return originalImport(code)
      }

      // Log bundle information after 2 seconds
      setTimeout(() => {
        console.group('Bundle Analysis')
        console.log('Dynamic imports:', Array.from(modules))
        console.log('Performance:', performance.getEntriesByType('navigation'))
        console.groupEnd()
      }, 2000)
    }
  }, [])

  return null
})

// Tree shaking helper - marks unused exports
export const markUnusedExports = (exports: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    const unused = Object.keys(exports).filter(key => 
      !exports[key] || typeof exports[key] === 'undefined'
    )
    if (unused.length > 0) {
      console.warn('Potentially unused exports:', unused)
    }
  }
}

// Memory usage monitoring
export const MemoryMonitoring = memo(() => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const checkMemory = () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory
          if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
            console.warn('High memory usage detected:', {
              used: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
              limit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB'
            })
          }
        }
      }

      const interval = setInterval(checkMemory, 30000) // Check every 30 seconds
      return () => clearInterval(interval)
    }
  }, [])

  return null
})

// Comprehensive optimization wrapper
export const PerformanceOptimizer = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FontOptimization />
      <CriticalCSS />
      <ResourceHints />
      <ServiceWorkerSetup />
      <PerformanceMonitoring />
      <BundleAnalyzer />
      <MemoryMonitoring />
      {children}
    </>
  )
})

// Export display names
FontOptimization.displayName = 'FontOptimization'
CriticalCSS.displayName = 'CriticalCSS'
ResourceHints.displayName = 'ResourceHints'
ServiceWorkerSetup.displayName = 'ServiceWorkerSetup'
PerformanceMonitoring.displayName = 'PerformanceMonitoring'
BundleAnalyzer.displayName = 'BundleAnalyzer'
MemoryMonitoring.displayName = 'MemoryMonitoring'
PerformanceOptimizer.displayName = 'PerformanceOptimizer'