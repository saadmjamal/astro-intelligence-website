/**
 * Image optimization configuration
 * Centralized settings for image formats, sizes, and quality
 */

export const imageOptimizationConfig = {
  // Supported image formats in order of preference
  formats: ['avif', 'webp', 'jpeg'] as const,
  
  // Quality settings for each format
  quality: {
    avif: 80,
    webp: 85,
    jpeg: 90,
    png: 95,
  },
  
  // Device sizes for responsive images (matches Next.js config)
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  
  // Smaller image sizes for icons and thumbnails
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  // Common aspect ratios
  aspectRatios: {
    square: '1:1',
    video: '16:9',
    portrait: '3:4',
    landscape: '4:3',
    ultrawide: '21:9',
    og: '1200:630', // Open Graph
  },
  
  // Lazy loading configuration
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1,
  },
  
  // Preload settings for critical images
  preload: {
    // Images to preload on homepage
    homepage: [
      // Add critical homepage images here
    ],
    // Images to preload on portfolio pages
    portfolio: [
      // Add critical portfolio images here
    ],
  },
  
  // Placeholder settings
  placeholder: {
    blur: {
      enabled: true,
      dataUrl: true,
    },
    skeleton: {
      enabled: true,
      shimmer: true,
    },
  },
  
  // CDN configuration (if using external image CDN)
  cdn: {
    enabled: false,
    baseUrl: '',
    transformations: {
      auto: 'format,compress',
      quality: 'auto:best',
    },
  },
} as const;

// Type-safe image optimization settings
export type ImageFormat = typeof imageOptimizationConfig.formats[number];
export type AspectRatio = keyof typeof imageOptimizationConfig.aspectRatios;

// Helper to get optimized image URL based on config
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    format?: ImageFormat;
    quality?: number;
  } = {}
): string {
  const { cdn } = imageOptimizationConfig;
  
  if (cdn.enabled && cdn.baseUrl) {
    // Use CDN transformation
    const params = new URLSearchParams();
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.format) params.set('f', options.format);
    if (options.quality) params.set('q', options.quality.toString());
    
    return `${cdn.baseUrl}/${src}?${params.toString()}`;
  }
  
  // Use Next.js image optimization
  return src;
}