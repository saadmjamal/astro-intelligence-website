'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePWA } from './MobilePWAProvider';

// Mobile Performance Optimization Utilities
export function MobilePerformanceOptimizer() {
  const pwa = usePWA();
  const performanceObserverRef = useRef<PerformanceObserver | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0
  });

  // Monitor Web Vitals
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        setPerformanceMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          setPerformanceMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setPerformanceMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            setPerformanceMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Time to First Byte (TTFB)
      const navigationEntries = performance.getEntriesByType('navigation') as any[];
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        const ttfb = navEntry.responseStart - navEntry.requestStart;
        setPerformanceMetrics(prev => ({ ...prev, ttfb }));
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
      };
    }
  }, []);

  // Optimize based on network conditions
  useEffect(() => {
    if (pwa.networkSpeed === 'slow' || pwa.dataSaverMode) {
      // Reduce image quality
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.dataset.originalSrc && !img.dataset.optimized) {
          img.src = img.dataset.originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          img.dataset.optimized = 'true';
        }
      });

      // Defer non-critical animations
      document.documentElement.classList.add('reduce-animations');
    } else {
      document.documentElement.classList.remove('reduce-animations');
    }
  }, [pwa.networkSpeed, pwa.dataSaverMode]);

  // Battery optimization
  useEffect(() => {
    if (pwa.batteryLevel !== null && pwa.batteryLevel < 20) {
      // Enable battery saver mode
      document.documentElement.classList.add('battery-saver-mode');
      
      // Reduce refresh rates
      const animations = document.querySelectorAll('[data-animation]');
      animations.forEach(el => {
        (el as HTMLElement).style.animationDuration = '2s';
      });
    } else {
      document.documentElement.classList.remove('battery-saver-mode');
    }
  }, [pwa.batteryLevel]);

  // Memory optimization
  useEffect(() => {
    if (pwa.memoryUsage !== null && pwa.memoryUsage > 80) {
      // Clean up unused resources
      if ('memory' in performance) {
        // Force garbage collection if possible
        if ((window as any).gc) {
          (window as any).gc();
        }
      }
      
      // Reduce cache size
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName.includes('old-') || cacheName.includes('temp-')) {
              caches.delete(cacheName);
            }
          });
        });
      }
    }
  }, [pwa.memoryUsage]);

  return null;
}

// Image optimization hook
export function useOptimizedImages() {
  const pwa = usePWA();

  const getOptimizedImageProps = useCallback((src: string, alt: string) => {
    const isSlowNetwork = pwa.networkSpeed === 'slow' || pwa.dataSaverMode;
    
    return {
      src: isSlowNetwork ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : src,
      alt,
      loading: 'lazy' as const,
      decoding: 'async' as const,
      ...(isSlowNetwork && {
        sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      })
    };
  }, [pwa.networkSpeed, pwa.dataSaverMode]);

  return { getOptimizedImageProps };
}

// Intersection Observer hook for mobile
export function useMobileIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Use smaller root margin on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const mobileOptions = {
      rootMargin: isMobile ? '50px' : '100px',
      threshold: isMobile ? 0.1 : 0.25,
      ...options
    };

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(callback, mobileOptions);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  return { observe, unobserve, disconnect };
}

// Mobile-optimized animation hook
export function useMobileAnimation() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [batteryLow, setBatteryLow] = useState(false);

  useEffect(() => {
    // Check user preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(prefersReducedMotion);

    // Check battery level
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const checkBattery = () => setBatteryLow(battery.level < 0.2);
        checkBattery();
        battery.addEventListener('levelchange', checkBattery);
        
        return () => battery.removeEventListener('levelchange', checkBattery);
      });
    }
  }, []);

  const getAnimationProps = useCallback((baseProps: any) => {
    if (reduceMotion || batteryLow) {
      return {
        ...baseProps,
        transition: { duration: 0.01 },
        animate: baseProps.animate ? { ...baseProps.animate, transition: { duration: 0.01 } } : undefined
      };
    }
    return baseProps;
  }, [reduceMotion, batteryLow]);

  return { getAnimationProps, shouldReduceMotion: reduceMotion || batteryLow };
}

// Touch gesture optimization
export function useTouchOptimization() {
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => {
      setTouchStartTime(Date.now());
      setIsTouch(true);
    };

    const handleTouchEnd = () => {
      const touchDuration = Date.now() - touchStartTime;
      
      // If touch was very quick (< 150ms), treat as tap
      if (touchDuration < 150) {
        document.documentElement.classList.add('quick-tap');
        setTimeout(() => {
          document.documentElement.classList.remove('quick-tap');
        }, 300);
      }
    };

    const handleMouseDown = () => {
      setIsTouch(false);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [touchStartTime]);

  const getTouchProps = useCallback((onClick: () => void) => {
    return {
      onClick: isTouch ? undefined : onClick,
      onTouchEnd: isTouch ? (e: React.TouchEvent) => {
        e.preventDefault();
        onClick();
      } : undefined,
      style: {
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }
    };
  }, [isTouch]);

  return { getTouchProps, isTouch };
}

// Mobile viewport hook
export function useMobileViewport() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    orientation: 'portrait' as 'portrait' | 'landscape',
    isSmallScreen: false,
    isMobile: false
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? 'landscape' : 'portrait';
      const isSmallScreen = width < 640;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      setViewport({ width, height, orientation, isSmallScreen, isMobile });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
}

// Service Worker management hook
export function useServiceWorker() {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setIsSupported(true);

      navigator.serviceWorker.register('/sw.js').then(registration => {
        setIsRegistered(true);

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      }).catch(error => {
        console.warn('Service Worker registration failed:', error);
      });
    }
  }, []);

  const updateServiceWorker = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  }, []);

  return {
    isSupported,
    isRegistered,
    updateAvailable,
    updateServiceWorker
  };
}