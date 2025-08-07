/**
 * Security utilities and configurations
 * Provides comprehensive security measures including:
 * - Content Security Policy (CSP) with nonce support
 * - Input sanitization and validation
 * - SQL injection prevention
 * - XSS protection
 * - Session security
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';

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
 * Sanitize HTML content to prevent XSS attacks
 * Uses DOMPurify to clean potentially malicious content
 * Note: This function should not be used in Edge Runtime/Middleware
 */
export async function sanitizeHtml(html: string): Promise<string> {
  // For Edge Runtime compatibility, we'll use basic sanitization
  // DOMPurify requires window/document which aren't available in Edge Runtime
  try {
    // Try to load DOMPurify if available
    const DOMPurify = await import('isomorphic-dompurify').then(m => m.default);
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'title', 'target'],
      FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea'],
      FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'style'],
    }) as unknown as string;
  } catch {
    // Fallback to basic HTML escaping for Edge Runtime
    return sanitizeText(html);
  }
}

/**
 * Sanitize text content for safe display
 * Escapes HTML entities and removes potentially dangerous content
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Generate parameterized query to prevent SQL injection
 * Ensures all user inputs are properly escaped
 */
export function createSafeQuery(template: string, params: Record<string, any>): { query: string; values: any[] } {
  const values: any[] = [];
  let paramIndex = 1;
  
  const query = template.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, (match, paramName) => {
    if (params.hasOwnProperty(paramName)) {
      values.push(params[paramName]);
      return `$${paramIndex++}`;
    }
    throw new Error(`Missing parameter: ${paramName}`);
  });
  
  return { query, values };
}

/**
 * Validate session token with timing-safe comparison
 * Prevents timing attacks on session validation
 */
export function validateSessionToken(providedToken: string, actualToken: string): boolean {
  if (providedToken.length !== actualToken.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < providedToken.length; i++) {
    result |= providedToken.charCodeAt(i) ^ actualToken.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Enhanced input validation schemas
 */
export const secureInputSchemas = {
  // Chat message validation
  chatMessage: z.object({
    message: z.string()
      .min(1, 'Message cannot be empty')
      .max(2000, 'Message too long')
      .refine((val) => !/<script|javascript:|data:|vbscript:/i.test(val), {
        message: 'Message contains potentially dangerous content'
      }),
    sessionId: z.string().uuid().optional(),
    userProfile: z.object({
      industry: z.string().max(100).optional(),
      companySize: z.enum(['startup', 'small', 'medium', 'enterprise']).optional(),
      currentChallenges: z.array(z.string().max(200)).max(10).optional(),
      interests: z.array(z.string().max(100)).max(10).optional(),
      techStack: z.array(z.string().max(50)).max(20).optional(),
    }).optional(),
  }),
  
  // Contact form validation
  contactForm: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name too long')
      .regex(/^[a-zA-Z\s\-\']+$/, 'Name contains invalid characters'),
    email: z.string()
      .email('Invalid email address')
      .max(254, 'Email too long'),
    company: z.string().max(200).optional(),
    budget: z.enum(['under-10k', '10k-50k', '50k-100k', 'over-100k']).optional(),
    message: z.string()
      .min(10, 'Message must be at least 10 characters')
      .max(2000, 'Message too long')
      .refine((val) => !/<script|javascript:|data:|vbscript:/i.test(val), {
        message: 'Message contains potentially dangerous content'
      }),
    honeypot: z.string().max(0, 'Bot detected'), // Anti-spam field
  }),
  
  // API parameter validation
  apiParams: z.object({
    sessionId: z.string().uuid('Invalid session ID format'),
    limit: z.number().int().min(1).max(100).optional(),
    offset: z.number().int().min(0).optional(),
  }),
};

/**
 * Rate limiting with enhanced security
 */
export class SecureRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number; blocked: boolean }> = new Map();
  private blockedIPs: Set<string> = new Set();
  
  constructor(
    private maxAttempts: number = 10,
    private windowMs: number = 15 * 60 * 1000, // 15 minutes
    private blockDurationMs: number = 60 * 60 * 1000 // 1 hour
  ) {}
  
  isAllowed(ip: string): boolean {
    const now = Date.now();
    
    // Check if IP is permanently blocked
    if (this.blockedIPs.has(ip)) {
      return false;
    }
    
    const record = this.attempts.get(ip);
    
    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.attempts.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
        blocked: false
      });
      return true;
    }
    
    if (record.blocked && now < record.resetTime) {
      return false;
    }
    
    record.count++;
    
    if (record.count > this.maxAttempts) {
      record.blocked = true;
      record.resetTime = now + this.blockDurationMs;
      
      // Block IP if excessive attempts
      if (record.count > this.maxAttempts * 3) {
        this.blockedIPs.add(ip);
      }
      
      return false;
    }
    
    return true;
  }
  
  reset(ip: string): void {
    this.attempts.delete(ip);
    this.blockedIPs.delete(ip);
  }
}

/**
 * Generate a cryptographically secure random nonce for inline scripts
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