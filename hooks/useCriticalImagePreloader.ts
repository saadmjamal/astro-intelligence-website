'use client';

import { useEffect, useCallback } from 'react';
import { useImagePreloader } from './useImagePreloader';

interface CriticalImage {
  src: string;
  sizes?: string;
  priority?: 'high' | 'low' | 'auto';
}

interface CriticalImagePreloaderOptions {
  /**
   * Maximum number of images to preload concurrently
   * @default 6
   */
  maxConcurrent?: number;
  
  /**
   * Timeout for each image load in milliseconds
   * @default 5000
   */
  timeout?: number;
  
  /**
   * Whether to preload images immediately or wait for idle time
   * @default true
   */
  immediate?: boolean;
  
  /**
   * Callback when preloading starts
   */
  onStart?: () => void;
  
  /**
   * Callback when an image finishes loading (success or failure)
   */
  onImageComplete?: (src: string, success: boolean) => void;
  
  /**
   * Callback when all images finish loading
   */
  onComplete?: (results: Array<{ src: string; success: boolean }>) => void;
}

/**
 * Hook for preloading critical above-the-fold images
 * These images should load immediately for better LCP scores
 */
export function useCriticalImagePreloader(
  images: CriticalImage[],
  options: CriticalImagePreloaderOptions = {}
) {
  const {
    maxConcurrent = 6,
    timeout = 5000,
    immediate = true,
    onStart,
    onImageComplete,
    onComplete,
  } = options;

  const { preloadImages, getCacheStats } = useImagePreloader();

  const preloadCriticalImages = useCallback(async () => {
    if (images.length === 0) return;

    onStart?.();

    // Convert to format expected by preloadImages
    const imageList = images.map(({ src, sizes, priority = 'high' }) => ({
      src,
      options: { sizes, priority, fetchPriority: priority },
    }));

    try {
      const results = await preloadImages(imageList, {
        concurrency: maxConcurrent,
        timeout,
      });

      // Call individual completion callbacks
      results.forEach(({ src, success }) => {
        onImageComplete?.(src, success);
      });

      // Call overall completion callback
      onComplete?.(results.map(({ src, success }) => ({ src, success })));

      return results;
    } catch (error) {
      console.error('Critical image preloading failed:', error);
      return [];
    }
  }, [images, maxConcurrent, timeout, onStart, onImageComplete, onComplete, preloadImages]);

  // Effect to start preloading
  useEffect(() => {
    if (!immediate || images.length === 0) return;

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const idleCallback = window.requestIdleCallback(() => {
          preloadCriticalImages();
        }, { timeout: 1000 });

        return () => {
          window.cancelIdleCallback(idleCallback);
        };
      } else {
        const timeoutId = setTimeout(() => {
          preloadCriticalImages();
        }, 0);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, [images, immediate, preloadCriticalImages]);

  return {
    preloadCriticalImages,
    getCacheStats,
  };
}

/**
 * Hook for preloading hero/banner images specifically
 * These are the most critical for LCP
 */
export function useHeroImagePreloader(
  heroImages: string | string[],
  options: Omit<CriticalImagePreloaderOptions, 'immediate'> = {}
) {
  const imageArray = Array.isArray(heroImages) ? heroImages : [heroImages];
  
  const criticalImages: CriticalImage[] = imageArray.map((src, index) => ({
    src,
    sizes: '100vw', // Hero images typically take full width
    priority: index === 0 ? 'high' : 'auto', // First image gets highest priority
  }));

  return useCriticalImagePreloader(criticalImages, {
    ...options,
    immediate: true, // Always preload hero images immediately
    maxConcurrent: 2, // Limit concurrent hero image loading
  });
}

export default useCriticalImagePreloader;