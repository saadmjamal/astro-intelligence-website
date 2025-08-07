/**
 * Edge-safe security utilities for use in middleware
 * These utilities are compatible with the Edge Runtime
 */

import { NextRequest } from 'next/server';

export interface CSPDirectives {
  'default-src': string[];
  'script-src': string[];
  'style-src': string[];
  'font-src': string[];
  'img-src': string[];
  'connect-src': string[];
  'frame-src': string[];
  'object-src': string[];
  'base-uri': string[];
  'form-action': string[];
  'frame-ancestors': string[];
  'upgrade-insecure-requests'?: boolean;
}

/**
 * Generate Content Security Policy based on environment
 * Edge Runtime compatible version
 */
export function generateCSP(_req: NextRequest): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const nonce = generateNonce();
  
  const directives: CSPDirectives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      isDevelopment ? "'unsafe-eval'" : '',
      `'nonce-${nonce}'`,
      'https://clerk.com',
      'https://*.clerk.accounts.dev',
      'https://js.stripe.com',
      'https://vercel.live',
      // Next.js requires these for hot reload and error overlay
      isDevelopment ? "'unsafe-inline'" : '',
      isDevelopment ? 'http://localhost:*' : '',
    ].filter(Boolean),
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      'https://fonts.googleapis.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
    ],
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      'https:',
      isDevelopment ? 'http:' : '',
    ].filter(Boolean),
    'connect-src': [
      "'self'",
      'https://clerk.com',
      'https://*.clerk.accounts.dev',
      'https://api.stripe.com',
      'https://*.algolia.net',
      'https://*.algolianet.com',
      'https://plausible.io',
      'https://vercel.live',
      'wss://ws-us3.pusher.com',
      isDevelopment ? 'ws://localhost:*' : '',
      isDevelopment ? 'http://localhost:*' : '',
    ].filter(Boolean),
    'frame-src': [
      "'self'",
      'https://js.stripe.com',
      'https://hooks.stripe.com',
      'https://vercel.live',
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };

  if (!isDevelopment) {
    directives['upgrade-insecure-requests'] = true;
  }

  return Object.entries(directives)
    .map(([key, value]) => {
      if (key === 'upgrade-insecure-requests' && value === true) {
        return key;
      }
      return `${key} ${Array.isArray(value) ? value.join(' ') : value}`;
    })
    .join('; ');
}

/**
 * Generate a cryptographically secure random nonce for inline scripts
 * Edge Runtime compatible version
 */
export function generateNonce(): string {
  // In Edge Runtime, use Web Crypto API
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback for older environments
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Security headers configuration
 * Edge Runtime compatible
 */
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};