/**
 * Performance optimization utilities for Core Web Vitals
 */

/**
 * Debounce function to limit the rate of function calls
 * Useful for scroll, resize, and input events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle function to ensure function is called at most once per interval
 * Useful for scroll and resize handlers
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return function (this: any, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Prefetch priority resources
 * Adds link tags for critical resources
 */
export function prefetchResources(resources: {
  fonts?: string[];
  styles?: string[];
  scripts?: string[];
  images?: string[];
}) {
  if (typeof window === 'undefined') return;

  const head = document.head;

  // Prefetch fonts
  resources.fonts?.forEach((font) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = font;
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  });

  // Prefetch critical CSS
  resources.styles?.forEach((style) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = style;
    head.appendChild(link);
  });

  // Prefetch critical scripts
  resources.scripts?.forEach((script) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = script;
    head.appendChild(link);
  });

  // Prefetch critical images
  resources.images?.forEach((image) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image;
    head.appendChild(link);
  });
}

/**
 * Measure Core Web Vitals
 */
export interface WebVitalsMetrics {
  CLS?: number;
  FID?: number;
  LCP?: number;
  FCP?: number;
  TTFB?: number;
}

export function measureWebVitals(callback: (metrics: WebVitalsMetrics) => void) {
  if (typeof window === 'undefined') return;

  const metrics: WebVitalsMetrics = {};

  // Observe Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && 'startTime' in lastEntry) {
          metrics.LCP = lastEntry.startTime;
          callback(metrics);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0] as any;
        if (firstEntry && 'processingStart' in firstEntry) {
          metrics.FID = firstEntry.processingStart - firstEntry.startTime;
          callback(metrics);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Observe Cumulative Layout Shift
      let clsValue = 0;
      const clsEntries: PerformanceEntry[] = [];
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsEntries.push(entry);
            clsValue += (entry as any).value;
          }
        }
        metrics.CLS = clsValue;
        callback(metrics);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.error('Error setting up performance observers:', e);
    }
  }
}

/**
 * Report web vitals to analytics
 */
export function reportWebVitals(metrics: WebVitalsMetrics) {
  // Report to your analytics service
  if (window.plausible) {
    window.plausible('Web Vitals', {
      props: {
        cls: metrics.CLS?.toFixed(3),
        fid: metrics.FID?.toFixed(0),
        lcp: metrics.LCP?.toFixed(0),
        fcp: metrics.FCP?.toFixed(0),
        ttfb: metrics.TTFB?.toFixed(0),
      },
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metrics);
  }
}

/**
 * Lazy load component with dynamic import
 */
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(importFunc);
}

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (callback: IdleRequestCallback) => {
        const start = Date.now();
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
          });
        }, 1);
      };

/**
 * Cancel idle callback polyfill
 */
export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : clearTimeout;

// Type augmentation for Plausible
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | undefined> }) => void;
  }
}

// React import for lazy loading
import React from 'react';