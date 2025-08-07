/**
 * Advanced XSS Protection System
 * Provides comprehensive protection against Cross-Site Scripting attacks
 */

import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

export interface XSSProtectionOptions {
  allowedTags?: string[];
  allowedAttributes?: string[];
  forbiddenTags?: string[];
  forbiddenAttributes?: string[];
  stripScripts?: boolean;
  stripStyles?: boolean;
  maxLength?: number;
}

export class XSSProtection {
  private static readonly DEFAULT_ALLOWED_TAGS = [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'code', 'pre',
    'a'
  ];

  private static readonly DEFAULT_ALLOWED_ATTRIBUTES = {
    'a': ['href', 'title', 'target'],
    '*': ['class']
  };

  private static readonly DANGEROUS_PATTERNS = [
    /javascript:/gi,
    /data:text\/html/gi,
    /data:application/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<script[^>]*>/gi,
    /<\/script>/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /<meta[^>]*>/gi,
    /<style[^>]*>/gi,
    /<form[^>]*>/gi,
    /<input[^>]*>/gi,
    /<textarea[^>]*>/gi,
    /<select[^>]*>/gi,
    /<button[^>]*>/gi,
    /expression\s*\(/gi,
    /url\s*\(/gi,
    /import\s+/gi,
    /@import/gi,
    /<!--[\s\S]*?-->/gi
  ];

  /**
   * Sanitize HTML content with comprehensive XSS protection
   */
  static sanitizeHtml(html: string, options: XSSProtectionOptions = {}): string {
    if (!html || typeof html !== 'string') {
      return '';
    }

    // Check length limit
    if (options.maxLength && html.length > options.maxLength) {
      throw new Error(`Content exceeds maximum length of ${options.maxLength} characters`);
    }

    // Pre-sanitization: Remove dangerous patterns
    let cleanHtml = html;
    for (const pattern of this.DANGEROUS_PATTERNS) {
      cleanHtml = cleanHtml.replace(pattern, '');
    }

    // Configure DOMPurify
    const config: any = {
      ALLOWED_TAGS: options.allowedTags || this.DEFAULT_ALLOWED_TAGS,
      ALLOWED_ATTR: options.allowedAttributes || this.DEFAULT_ALLOWED_ATTRIBUTES,
      FORBID_TAGS: options.forbiddenTags || ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button', 'iframe', 'frame', 'frameset'],
      FORBID_ATTR: options.forbiddenAttributes || ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit'],
      KEEP_CONTENT: false,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false,
      SANITIZE_DOM: true,
      WHOLE_DOCUMENT: false,
      IN_PLACE: false
    };

    if (options.stripScripts !== false) {
      config.FORBID_TAGS.push('script');
    }

    if (options.stripStyles !== false) {
      config.FORBID_TAGS.push('style');
      config.FORBID_ATTR.push('style');
    }

    // Sanitize with DOMPurify
    const sanitized = DOMPurify.sanitize(cleanHtml, config) as unknown as string;

    // Additional post-processing checks
    return this.postProcessSanitized(sanitized);
  }

  /**
   * Sanitize plain text to prevent XSS in text contexts
   */
  static sanitizeText(text: string, options: { maxLength?: number } = {}): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    // Check length limit
    if (options.maxLength && text.length > options.maxLength) {
      throw new Error(`Text exceeds maximum length of ${options.maxLength} characters`);
    }

    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/\r?\n/g, '<br>');
  }

  /**
   * Sanitize JSON data to prevent XSS in JSON contexts
   */
  static sanitizeJSON(data: any, options: { maxDepth?: number; maxLength?: number } = {}): any {
    const maxDepth = options.maxDepth || 10;
    const maxLength = options.maxLength || 10000;

    const sanitizeValue = (value: any, currentDepth: number = 0): any => {
      if (currentDepth > maxDepth) {
        throw new Error('JSON depth limit exceeded');
      }

      if (value === null || value === undefined) {
        return value;
      }

      if (typeof value === 'string') {
        if (value.length > maxLength) {
          throw new Error('String length limit exceeded');
        }
        
        // Check for dangerous patterns in strings
        for (const pattern of this.DANGEROUS_PATTERNS) {
          if (pattern.test(value)) {
            return value.replace(pattern, '');
          }
        }
        
        return this.sanitizeText(value);
      }

      if (typeof value === 'number' || typeof value === 'boolean') {
        return value;
      }

      if (Array.isArray(value)) {
        return value.map(item => sanitizeValue(item, currentDepth + 1));
      }

      if (typeof value === 'object') {
        const sanitized: any = {};
        for (const [key, val] of Object.entries(value)) {
          // Sanitize object keys
          const cleanKey = this.sanitizeText(key);
          sanitized[cleanKey] = sanitizeValue(val, currentDepth + 1);
        }
        return sanitized;
      }

      // For unknown types, convert to string and sanitize
      return this.sanitizeText(String(value));
    };

    return sanitizeValue(data);
  }

  /**
   * Validate and sanitize URL to prevent XSS through URLs
   */
  static sanitizeUrl(url: string, options: { allowedProtocols?: string[]; maxLength?: number } = {}): string {
    if (!url || typeof url !== 'string') {
      return '';
    }

    const maxLength = options.maxLength || 2048;
    const allowedProtocols = options.allowedProtocols || ['http:', 'https:', 'mailto:'];

    if (url.length > maxLength) {
      throw new Error('URL length limit exceeded');
    }

    try {
      const parsedUrl = new URL(url);
      
      // Check if protocol is allowed
      if (!allowedProtocols.includes(parsedUrl.protocol)) {
        throw new Error('URL protocol not allowed');
      }

      // Check for dangerous patterns in URL components
      const components = [
        parsedUrl.hostname,
        parsedUrl.pathname,
        parsedUrl.search,
        parsedUrl.hash
      ];

      for (const component of components) {
        if (component) {
          for (const pattern of this.DANGEROUS_PATTERNS) {
            if (pattern.test(component)) {
              throw new Error('URL contains dangerous content');
            }
          }
        }
      }

      return parsedUrl.toString();
    } catch {
      // If URL parsing fails, treat as relative URL and sanitize
      if (url.startsWith('/') || url.startsWith('#')) {
        return this.sanitizeText(url).replace(/<br>/g, '');
      }
      
      throw new Error('Invalid URL format');
    }
  }

  /**
   * Create a schema for validating potentially dangerous content
   */
  static createSecureSchema(options: { maxLength?: number; allowHtml?: boolean } = {}) {
    const maxLength = options.maxLength || 10000;
    const allowHtml = options.allowHtml || false;

    return z.string()
      .max(maxLength, `Content must be less than ${maxLength} characters`)
      .refine(
        (value) => {
          // Check for dangerous patterns
          for (const pattern of this.DANGEROUS_PATTERNS) {
            if (pattern.test(value)) {
              return false;
            }
          }
          return true;
        },
        { message: 'Content contains potentially dangerous elements' }
      )
      .transform((value) => {
        return allowHtml ? this.sanitizeHtml(value) : this.sanitizeText(value);
      });
  }

  /**
   * Post-process sanitized content for additional security
   */
  private static postProcessSanitized(content: string): string {
    // Remove any remaining script tags that might have been missed
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // Remove any remaining event handlers
    content = content.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // Remove any remaining javascript: URLs
    content = content.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
    
    // Remove any remaining data: URLs that might be dangerous
    content = content.replace(/src\s*=\s*["']data:(?!image\/)[^"']*["']/gi, 'src=""');
    
    return content;
  }

  /**
   * Generate Content Security Policy nonce
   */
  static async generateCSPNonce(): Promise<string> {
    const { randomBytes } = await import("crypto");
    return randomBytes(16).toString('base64');
  }

  /**
   * Validate content against CSP rules
   */
  static validateCSP(content: string, _nonce?: string): boolean {
    // Check for inline scripts without nonce
    const scriptRegex = /<script(?![^>]*nonce=["']([^"']+)["'])[^>]*>/gi;
    const matches = content.match(scriptRegex);
    
    if (matches && matches.length > 0) {
      return false; // Inline scripts without nonce are not allowed
    }
    
    return true;
  }
}

// Export default sanitization functions for convenience
export const sanitizeHtml = XSSProtection.sanitizeHtml;
export const sanitizeText = XSSProtection.sanitizeText;
export const sanitizeJSON = XSSProtection.sanitizeJSON;
export const sanitizeUrl = XSSProtection.sanitizeUrl;
export const createSecureSchema = XSSProtection.createSecureSchema;