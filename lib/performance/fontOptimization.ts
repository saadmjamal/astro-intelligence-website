// Font optimization utilities for performance
import { Inter, Roboto_Mono } from 'next/font/google'

// Optimized font loading with preload and display swap
export const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const robotoMonoFont = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Only preload primary font
  fallback: ['monospace'],
  variable: '--font-roboto-mono',
  weight: ['400', '700']
})

// Critical font preloader for immediate text rendering
export const preloadCriticalFonts = () => {
  if (typeof window === 'undefined') return

  // Preload the most critical font weights
  const criticalFonts = [
    { family: 'Inter', weight: '400', display: 'swap' },
    { family: 'Inter', weight: '700', display: 'swap' },
    { family: 'Inter', weight: '900', display: 'swap' }
  ]

  criticalFonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = `https://fonts.gstatic.com/s/${font.family.toLowerCase()}/${font.weight}.woff2`
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Font loading optimization class
export class FontOptimizer {
  private static instance: FontOptimizer
  private fontsLoaded = false
  private observers: IntersectionObserver[] = []

  static getInstance(): FontOptimizer {
    if (!FontOptimizer.instance) {
      FontOptimizer.instance = new FontOptimizer()
    }
    return FontOptimizer.instance
  }

  // Initialize font optimization
  init() {
    if (typeof window === 'undefined') return

    // Use Font Loading API if available
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        this.fontsLoaded = true
        document.documentElement.classList.add('fonts-loaded')
      })
    }

    // Preload critical fonts
    preloadCriticalFonts()

    // Setup font observer for non-critical text
    this.setupFontObserver()
  }

  // Setup intersection observer for non-critical fonts
  private setupFontObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          element.classList.add('load-fonts')
        }
      })
    }, { rootMargin: '100px' })

    // Observe elements with non-critical fonts
    document.querySelectorAll('[data-font-priority="low"]').forEach(el => {
      observer.observe(el)
    })

    this.observers.push(observer)
  }

  // Get optimized font class names
  getOptimizedFontClass(priority: 'critical' | 'high' | 'low' = 'high'): string {
    const baseClass = interFont.className
    
    switch (priority) {
      case 'critical':
        return `${baseClass} font-critical`
      case 'high':
        return baseClass
      case 'low':
        return `${baseClass} font-lazy`
      default:
        return baseClass
    }
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// React hook for font optimization
export const useFontOptimization = (priority: 'critical' | 'high' | 'low' = 'high') => {
  const fontOptimizer = FontOptimizer.getInstance()
  
  return {
    fontClass: fontOptimizer.getOptimizedFontClass(priority),
    isLoaded: fontOptimizer['fontsLoaded']
  }
}