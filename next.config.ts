import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  poweredByHeader: false,
  compress: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enhanced webpack configuration for performance
  webpack: (config, { dev, isServer, webpack }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              maxSize: 244000
            },
            // Separate heavy animation library
            framer: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'async',
              priority: 20,
              maxSize: 100000
            },
            // Separate icon library
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide-react',
              chunks: 'async',
              priority: 15,
              maxSize: 50000
            },
            // React and core libraries
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 30
            },
            // Common utilities
            commons: {
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              name: 'commons',
              maxSize: 50000
            }
          }
        },
        // Tree shaking optimizations
        usedExports: true,
        sideEffects: false,
        // Minimize bundle
        minimize: true,
        // Module concatenation
        concatenateModules: true
      }

      // Analyze bundle size in production
      if (process.env.ANALYZE === 'true') {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.ANALYZE': JSON.stringify('true')
          })
        )
      }
    }

    // Development optimizations
    if (dev) {
      // Faster builds in development
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
    }

    // Add alias for performance components
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components/performance': require('path').resolve(__dirname, 'components/performance'),
    }
    
    return config
  },
  
  // Experimental features for Next.js 15
  experimental: {
    optimizePackageImports: [
      'framer-motion', 
      'lucide-react',
      '@heroicons/react',
      'react-countup',
      'date-fns'
    ],
    // Optimize CSS loading - disabled temporarily to avoid critters issues
    // optimizeCss: true,
  },
  
  // Server external packages (updated from experimental)
  serverExternalPackages: ['sharp'],
  
  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    rules: {},
  },
};

// Only use bundle analyzer when not using Turbopack for dev
// Bundle analyzer is primarily webpack-based and may conflict with Turbopack
export default process.env.ANALYZE === 'true' 
  ? withBundleAnalyzer(withContentlayer(nextConfig))
  : withContentlayer(nextConfig);
