'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useImagePreloader } from '@/hooks/useImagePreloader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  preload?: boolean;
  responsive?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  fill = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  lazy = true,
  preload = false,
  responsive = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy || priority);
  const imageRef = useRef<HTMLDivElement>(null);
  const { preloadImage } = useImagePreloader();

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (responsive && !fill 
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    : undefined);

  // Generate optimized width/height for responsive images
  const optimizedWidth = responsive ? width || 1920 : width;
  const optimizedHeight = responsive ? height || 1080 : height;

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 
    blurDataURL || 
    `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${optimizedWidth || 800}" height="${optimizedHeight || 600}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1a2e"/>
        <rect width="100%" height="100%" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>`
    ).toString('base64')}`;

  // Intersection observer for lazy loading
  const handleIntersection = useCallback((isIntersecting: boolean) => {
    if (isIntersecting && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [shouldLoad]);

  useIntersectionObserver(imageRef, handleIntersection, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Preload image if requested using the enhanced preloader
  useEffect(() => {
    if (preload && !priority && src) {
      preloadImage(src, {
        sizes: responsiveSizes,
        priority: priority ? 'high' : 'low',
        fetchPriority: priority ? 'high' : 'low',
      }).catch(() => {
        // Preload failed, but we'll still try to load normally
      });
    }
  }, [preload, priority, src, responsiveSizes, preloadImage]);

  // Don't render image until it should load (for lazy loading)
  if (!shouldLoad) {
    return (
      <div
        ref={imageRef}
        className={cn(
          'relative overflow-hidden bg-gradient-to-br from-bg-card to-transparent',
          fill ? 'absolute inset-0' : 'aspect-video',
          className
        )}
        style={!fill ? { width: optimizedWidth, height: optimizedHeight } : undefined}
      >
        {/* Loading skeleton */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-bg-card via-offwhite/10 to-offwhite/5" />
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center bg-gradient-to-br from-bg-card to-transparent border border-subtle rounded',
          fill ? 'absolute inset-0' : 'aspect-video',
          className
        )}
        style={!fill ? { width: optimizedWidth, height: optimizedHeight } : undefined}
      >
        <div className="text-center text-subtle-foreground">
          <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative overflow-hidden',
        fill ? 'absolute inset-0' : '',
        className
      )}
      style={!fill ? { width: optimizedWidth, height: optimizedHeight } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : optimizedWidth}
        height={fill ? undefined : optimizedHeight}
        fill={fill}
        sizes={responsiveSizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          fill ? 'object-cover' : ''
        )}
        {...props}
      />
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-bg-card via-offwhite/10 to-offwhite/5" />
      )}
    </div>
  );
}