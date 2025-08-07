'use client';

import { useEffect, useCallback, useRef } from 'react';

interface PreloadOptions {
  sizes?: string;
  priority?: 'high' | 'low' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  crossOrigin?: 'anonymous' | 'use-credentials';
}

interface PreloadedImage {
  src: string;
  status: 'loading' | 'loaded' | 'error';
  image?: HTMLImageElement;
  error?: Error;
}

export function useImagePreloader() {
  const preloadCacheRef = useRef<Map<string, PreloadedImage>>(new Map());
  const loadingPromisesRef = useRef<Map<string, Promise<HTMLImageElement>>>(new Map());

  const preloadImage = useCallback(
    (src: string, options: PreloadOptions = {}): Promise<HTMLImageElement> => {
      const { sizes, priority = 'auto', fetchPriority = priority, crossOrigin } = options;
      
      // Return cached result if available
      const cached = preloadCacheRef.current.get(src);
      if (cached?.status === 'loaded' && cached.image) {
        return Promise.resolve(cached.image);
      }
      if (cached?.status === 'error' && cached.error) {
        return Promise.reject(cached.error);
      }

      // Return existing promise if already loading
      const existingPromise = loadingPromisesRef.current.get(src);
      if (existingPromise) {
        return existingPromise;
      }

      // Create new loading promise
      const loadingPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        // Update cache with loading status
        preloadCacheRef.current.set(src, { src, status: 'loading' });

        // Try using link preload first for better browser optimization
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        if (sizes) link.imageSizes = sizes;
        if (fetchPriority !== 'auto') link.fetchPriority = fetchPriority;
        if (crossOrigin) link.crossOrigin = crossOrigin;
        
        // Add link to head for preloading
        document.head.appendChild(link);

        // Create image element for actual loading
        const img = new Image();
        
        if (crossOrigin) img.crossOrigin = crossOrigin;
        if (sizes) img.sizes = sizes;

        const handleLoad = () => {
          preloadCacheRef.current.set(src, {
            src,
            status: 'loaded',
            image: img,
          });
          loadingPromisesRef.current.delete(src);
          
          // Clean up link element
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
          
          resolve(img);
        };

        const handleError = () => {
          const error = new Error(`Failed to preload image: ${src}`);
          preloadCacheRef.current.set(src, {
            src,
            status: 'error',
            error,
          });
          loadingPromisesRef.current.delete(src);
          
          // Clean up link element
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
          
          reject(error);
        };

        img.addEventListener('load', handleLoad, { once: true });
        img.addEventListener('error', handleError, { once: true });

        // Start loading
        img.src = src;
      });

      // Store the promise
      loadingPromisesRef.current.set(src, loadingPromise);
      
      return loadingPromise;
    },
    []
  );

  const preloadImages = useCallback(
    async (
      images: Array<{ src: string; options?: PreloadOptions }>,
      { concurrency = 3, timeout = 10000 } = {}
    ) => {
      const results: Array<{ src: string; success: boolean; image?: HTMLImageElement; error?: Error }> = [];
      
      // Process images in batches to avoid overwhelming the browser
      for (let i = 0; i < images.length; i += concurrency) {
        const batch = images.slice(i, i + concurrency);
        
        const batchPromises = batch.map(async ({ src, options }) => {
          try {
            const timeoutPromise = new Promise<never>((_, reject) => {
              setTimeout(() => reject(new Error(`Timeout loading ${src}`)), timeout);
            });
            
            const image = await Promise.race([
              preloadImage(src, options),
              timeoutPromise,
            ]);
            
            return { src, success: true, image };
          } catch (error) {
            return { 
              src, 
              success: false, 
              error: error instanceof Error ? error : new Error(`Unknown error loading ${src}`) 
            };
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
      }

      return results;
    },
    [preloadImage]
  );

  const getPreloadedImage = useCallback((src: string): PreloadedImage | null => {
    return preloadCacheRef.current.get(src) || null;
  }, []);

  const clearCache = useCallback(() => {
    preloadCacheRef.current.clear();
    loadingPromisesRef.current.clear();
  }, []);

  const getCacheStats = useCallback(() => {
    const cache = preloadCacheRef.current;
    const total = cache.size;
    const loaded = Array.from(cache.values()).filter(img => img.status === 'loaded').length;
    const loading = Array.from(cache.values()).filter(img => img.status === 'loading').length;
    const errors = Array.from(cache.values()).filter(img => img.status === 'error').length;
    
    return { total, loaded, loading, errors };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Remove any remaining link elements
      const links = document.querySelectorAll('link[rel="preload"][as="image"]');
      links.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
      
      clearCache();
    };
  }, [clearCache]);

  return {
    preloadImage,
    preloadImages,
    getPreloadedImage,
    clearCache,
    getCacheStats,
  };
}

export default useImagePreloader;