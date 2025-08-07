/**
 * Image optimization utilities for generating responsive image sizes and formats
 */

export interface ImageSize {
  width: number;
  height?: number;
  quality?: number;
}

export interface OptimizedImageVariant {
  src: string;
  width: number;
  height?: number;
  format: 'webp' | 'avif' | 'jpeg' | 'png';
}

// Standard breakpoints for responsive images
export const IMAGE_BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
  wide: 2560,
} as const;

// Standard image sizes for different use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150, quality: 80 },
  card: { width: 400, height: 300, quality: 85 },
  hero: { width: 1920, height: 1080, quality: 90 },
  gallery: { width: 800, height: 600, quality: 85 },
  avatar: { width: 200, height: 200, quality: 85 },
  og: { width: 1200, height: 630, quality: 90 },
} as const;

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(
  baseSrc: string,
  sizes: number[],
  format?: string
): string {
  return sizes
    .map((size) => {
      const src = generateImageUrl(baseSrc, { width: size, format });
      return `${src} ${size}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints: Record<string, number>): string {
  const sizes: string[] = [];
  
  // Sort breakpoints by size (descending)
  const sorted = Object.entries(breakpoints).sort(([, a], [, b]) => b - a);
  
  sorted.forEach(([, width], index) => {
    if (index === sorted.length - 1) {
      // Last item doesn't need media query
      sizes.push(`${width}px`);
    } else {
      const nextWidth = sorted[index + 1]?.[1] || 0;
      sizes.push(`(min-width: ${nextWidth}px) ${width}px`);
    }
  });
  
  return sizes.join(', ');
}

/**
 * Generate optimized image URL with transformations
 */
export function generateImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  } = {}
): string {
  // If using a CDN like Cloudinary or Vercel Image Optimization
  // this is where you'd add transformation parameters
  
  // For Next.js Image Optimization API
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('fm', options.format);
  if (options.fit) params.set('fit', options.fit);
  
  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Get optimal image format based on browser support
 */
export function getOptimalFormat(
  userAgent?: string,
  acceptHeader?: string
): 'avif' | 'webp' | 'jpeg' {
  // Check Accept header for format support
  if (acceptHeader) {
    if (acceptHeader.includes('image/avif')) return 'avif';
    if (acceptHeader.includes('image/webp')) return 'webp';
  }
  
  // Fallback to JPEG
  return 'jpeg';
}

/**
 * Calculate aspect ratio from width and height
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

/**
 * Generate blur data URL for placeholder
 */
export async function generateBlurDataURL(
  imagePath: string,
  width: number = 10
): Promise<string> {
  // This would typically use a library like plaiceholder or sharp
  // For now, return a simple gray placeholder
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${width}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e5e5"/>
    </svg>`
  ).toString('base64')}`;
}

/**
 * Get responsive image sizes based on container width
 */
export function getResponsiveImageSizes(
  containerWidth: number,
  density: number[] = [1, 2]
): number[] {
  const sizes: number[] = [];
  
  density.forEach((d) => {
    const size = Math.round(containerWidth * d);
    sizes.push(size);
  });
  
  // Remove duplicates and sort
  return [...new Set(sizes)].sort((a, b) => a - b);
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(images: string[]): void {
  if (typeof window === 'undefined') return;
  
  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    
    // Add format hint if WebP/AVIF
    if (src.includes('.webp')) {
      link.type = 'image/webp';
    } else if (src.includes('.avif')) {
      link.type = 'image/avif';
    }
    
    document.head.appendChild(link);
  });
}

/**
 * Check if image format is supported
 */
export async function isFormatSupported(format: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  const formats: Record<string, string> = {
    webp: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=',
  };
  
  const dataUrl = formats[format];
  if (!dataUrl) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = dataUrl;
  });
}