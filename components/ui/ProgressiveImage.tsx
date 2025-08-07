'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { generateSizes, IMAGE_BREAKPOINTS, generateImageUrl } from '@/lib/utils/image-optimization';

interface ProgressiveImageProps {
  src: string;
  lowQualitySrc?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  lowQuality?: number;
  placeholder?: 'blur' | 'empty' | 'progressive';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  preload?: boolean;
  progressive?: boolean;
  fadeInDuration?: number;
  threshold?: number;
  rootMargin?: string;
}

export function ProgressiveImage({
  src,
  lowQualitySrc,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  fill = false,
  quality = 85,
  lowQuality = 20,
  placeholder = 'progressive',
  blurDataURL,
  onLoad,
  onError,
  lazy = true,
  preload = false,
  progressive = true,
  fadeInDuration = 500,
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}: ProgressiveImageProps) {
  const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy || priority || preload);
  const imageRef = useRef<HTMLDivElement>(null);
  const { preloadImage } = useImagePreloader();

  // Generate low quality src if not provided and progressive is enabled
  const lowQualityImageSrc = progressive ? (
    lowQualitySrc || generateImageUrl(src, { quality: lowQuality })
  ) : undefined;
  
  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || generateSizes({
    mobile: IMAGE_BREAKPOINTS.mobile,
    tablet: IMAGE_BREAKPOINTS.tablet,
    desktop: IMAGE_BREAKPOINTS.desktop,
  });

  // Intersection observer for lazy loading
  const handleIntersection = useCallback((isIntersecting: boolean) => {
    if (isIntersecting && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [shouldLoad]);

  useIntersectionObserver(imageRef, handleIntersection, {
    threshold,
    rootMargin,
  });

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 
    blurDataURL || 
    generateBlurDataURL(width || 800, height || 600);

  // Preload high quality image when low quality loads or immediately if not progressive
  useEffect(() => {
    if (shouldLoad && (lowQualityLoaded || !progressive || priority)) {
      if (preload && !priority) {
        preloadImage(src, { 
          sizes,
          priority: priority ? 'high' : 'low',
          fetchPriority: priority ? 'high' : 'low',
        }).catch(() => {
          // Preload failed, but we'll still try to load normally
        });
      }
    }
  }, [shouldLoad, lowQualityLoaded, progressive, priority, preload, src, sizes, preloadImage]);

  const handleLowQualityLoad = useCallback(() => {
    setLowQualityLoaded(true);
  }, []);

  const handleHighQualityLoad = useCallback(() => {
    setHighQualityLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Don't render until should load
  if (!shouldLoad) {
    return (
      <div
        ref={imageRef}
        className={cn(
          'relative overflow-hidden bg-gradient-to-br from-bg-card to-transparent',
          fill ? 'absolute inset-0' : 'aspect-video',
          className
        )}
        style={!fill ? { width: width || 800, height: height || 600 } : undefined}
      >
        {/* Loading skeleton */}
        <div className="absolute inset-0 skeleton" />
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
        style={!fill ? { width: width || 800, height: height || 600 } : undefined}
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
      style={!fill ? { width: width || 800, height: height || 600 } : undefined}
    >
      {/* Low quality image for progressive loading */}
      {progressive && lowQualityImageSrc && !highQualityLoaded && (
        <Image
          src={lowQualityImageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={responsiveSizes}
          quality={lowQuality}
          priority={priority}
          placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
          blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
          onLoad={handleLowQualityLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            lowQualityLoaded ? 'opacity-100' : 'opacity-0',
            fill ? 'object-cover' : '',
            'blur-sm scale-105' // Slight blur and scale for low quality
          )}
        />
      )}

      {/* High quality image */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={!progressive && placeholder === 'blur' ? 'blur' : 'empty'}
        blurDataURL={!progressive && placeholder === 'blur' ? defaultBlurDataURL : undefined}
        onLoad={handleHighQualityLoad}
        onError={handleError}
        className={cn(
          'transition-opacity',
          fill ? 'object-cover' : '',
          highQualityLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transitionDuration: `${fadeInDuration}ms`,
        }}
        {...props}
      />
      
      {/* Loading overlay when neither image is loaded */}
      {!lowQualityLoaded && !highQualityLoaded && (
        <div className="absolute inset-0 skeleton" />
      )}
    </div>
  );
}


// Helper function to generate blur data URL
function generateBlurDataURL(width: number, height: number): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a2e"/>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export default ProgressiveImage;