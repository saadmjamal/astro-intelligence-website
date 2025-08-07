/**
 * Performance-optimized utilities with bundle splitting
 */

// Dynamic import for heavy libraries
export const lazyFramerMotion = () => import('framer-motion');

// Optimized lucide icon imports - tree-shakeable
export const icons = {
  // Core navigation icons
  ChevronLeft: () => import('lucide-react').then(mod => ({ default: mod.ChevronLeft })),
  ChevronRight: () => import('lucide-react').then(mod => ({ default: mod.ChevronRight })),
  Menu: () => import('lucide-react').then(mod => ({ default: mod.Menu })),
  X: () => import('lucide-react').then(mod => ({ default: mod.X })),
  
  // Form icons
  Search: () => import('lucide-react').then(mod => ({ default: mod.Search })),
  Mail: () => import('lucide-react').then(mod => ({ default: mod.Mail })),
  User: () => import('lucide-react').then(mod => ({ default: mod.User })),
  
  // Media icons
  ZoomIn: () => import('lucide-react').then(mod => ({ default: mod.ZoomIn })),
  ZoomOut: () => import('lucide-react').then(mod => ({ default: mod.ZoomOut })),
  Play: () => import('lucide-react').then(mod => ({ default: mod.Play })),
  Pause: () => import('lucide-react').then(mod => ({ default: mod.Pause })),
};

/**
 * Lazy load search components only when needed
 */
export const lazySearchComponents = {
  InstantSearch: () => import('react-instantsearch').then(mod => mod.InstantSearch),
  SearchBox: () => import('react-instantsearch').then(mod => mod.SearchBox),
  Hits: () => import('react-instantsearch').then(mod => mod.Hits),
  Configure: () => import('react-instantsearch').then(mod => mod.Configure),
};

/**
 * Performance-optimized image loading with intersection observer
 */
export class LazyImageLoader {
  private observer: IntersectionObserver | null = null;
  private images = new Set<HTMLImageElement>();

  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              this.loadImage(img);
              this.observer?.unobserve(img);
              this.images.delete(img);
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1,
        }
      );
    }
  }

  observe(img: HTMLImageElement) {
    if (this.observer) {
      this.observer.observe(img);
      this.images.add(img);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadImage(img);
    }
  }

  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.images.clear();
    }
  }
}

/**
 * Critical resource preloader for above-the-fold content
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  const criticalImages = [
    // Add critical above-the-fold images here
    '/hero-background.webp',
    '/logo.svg',
  ];

  const criticalFonts = [
    '/fonts/Inter-Regular.woff2',
    '/fonts/Inter-Medium.woff2',
    '/fonts/Orbitron-Regular.woff2',
  ];

  // Preload critical images
  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts
  criticalFonts.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = src;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Bundle analysis utilities
 */
export const bundleOptimization = {
  // Check if large dependencies are needed
  isFramerMotionNeeded: () => {
    // Only load framer-motion for pages with animations
    return window.location.pathname === '/' || 
           window.location.pathname.includes('/portfolio');
  },

  isSearchNeeded: () => {
    // Only load search on search and docs pages
    return window.location.pathname.includes('/search') ||
           window.location.pathname.includes('/docs');
  },

  // Lazy load non-critical CSS
  loadNonCriticalCSS: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  },
};