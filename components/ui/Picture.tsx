'use client';

import { cn } from '@/lib/utils';
import { generateImageUrl, generateSrcSet, IMAGE_BREAKPOINTS } from '@/lib/utils/image-optimization';

interface PictureProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
  formats?: ('avif' | 'webp' | 'jpeg' | 'png')[];
  breakpoints?: number[];
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * Picture component that serves optimal image formats
 * Uses <picture> element to provide multiple formats and sizes
 */
export function Picture({
  src,
  alt,
  className,
  sizes = '100vw',
  loading = 'lazy',
  priority = false,
  width,
  height,
  formats = ['avif', 'webp', 'jpeg'],
  breakpoints = [
    IMAGE_BREAKPOINTS.mobile,
    IMAGE_BREAKPOINTS.tablet,
    IMAGE_BREAKPOINTS.desktop,
  ],
  quality = 85,
  objectFit = 'cover',
}: PictureProps) {
  // Generate srcsets for each format
  const sources = formats.slice(0, -1).map((format) => ({
    format,
    srcset: generateSrcSet(src, breakpoints, format),
    type: `image/${format}`,
  }));

  // Fallback format (last in the formats array)
  const fallbackFormat = formats[formats.length - 1];
  const fallbackSrcset = generateSrcSet(src, breakpoints, fallbackFormat);

  return (
    <picture className={cn('block', className)}>
      {/* Modern formats */}
      {sources.map(({ format, srcset, type }) => (
        <source
          key={format}
          srcSet={srcset}
          sizes={sizes}
          type={type}
        />
      ))}
      
      {/* Fallback image */}
      <img
        src={generateImageUrl(src, { 
          width: width || breakpoints[breakpoints.length - 1],
          quality,
          format: fallbackFormat,
        })}
        srcSet={fallbackSrcset}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
        className={cn(
          'max-w-full h-auto',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down'
        )}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
    </picture>
  );
}

export default Picture;