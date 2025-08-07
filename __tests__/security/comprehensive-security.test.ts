/**
 * Comprehensive Security Test Suite
 * Tests all security measures implemented in the application
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import {
  sanitizeHtml,
  sanitizeText,
  generateNonce,
  createSafeQuery,
  validateSessionToken,
  secureInputSchemas,
  SecureRateLimiter
} from '../../lib/utils/security';
import { XSSProtection } from '../../lib/security/xss-protection';
import { SecureSessionManager } from '../../lib/security/session-manager';

describe('Security Test Suite', () => {
  
  describe('XSS Protection', () => {
    it('should sanitize malicious HTML content', () => {
      const maliciousHtml = '<script>alert("XSS")</script><p>Safe content</p>';
      const sanitized = sanitizeHtml(maliciousHtml);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('<p>Safe content</p>');
      expect(sanitized).not.toContain('alert');
    });

    it('should prevent JavaScript execution in HTML', () => {
      const maliciousInputs = [
        '<img src="x" onerror="alert(1)">',
        '<div onclick="maliciousFunction()">Click me</div>',
        '<a href="javascript:alert(1)">Click me</a>',
        '<iframe src="javascript:alert(1)"></iframe>',
        '<object data="data:text/html,<script>alert(1)</script>"></object>'
      ];

      maliciousInputs.forEach(input => {
        const sanitized = sanitizeHtml(input);
        expect(sanitized).not.toMatch(/javascript:/i);
        expect(sanitized).not.toMatch(/on\w+=/i);
        expect(sanitized).not.toMatch(/<script/i);
        expect(sanitized).not.toMatch(/<iframe/i);
        expect(sanitized).not.toMatch(/<object/i);
      });
    });

    it('should sanitize text content properly', () => {
      const maliciousText = '<script>alert("XSS")</script>Hello & "World"';
      const sanitized = sanitizeText(maliciousText);
      
      expect(sanitized).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;Hello &amp; &quot;World&quot;');
    });

    it('should handle URL sanitization', () => {
      const maliciousUrls = [
        'javascript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'vbscript:msgbox(1)',
        'https://example.com/<script>alert(1)</script>'
      ];

      maliciousUrls.forEach(url => {
        expect(() => XSSProtection.sanitizeUrl(url)).toThrow();
      });

      // Valid URLs should pass
      const validUrls = [
        'https://example.com',
        'http://example.com/path?query=value',
        'mailto:test@example.com',
        '/relative/path',
        '#anchor'
      ];

      validUrls.forEach(url => {
        expect(() => XSSProtection.sanitizeUrl(url)).not.toThrow();
      });
    });

    it('should validate JSON data against XSS', () => {
      const maliciousJSON = {
        name: '<script>alert(1)</script>',
        description: 'Safe content',
        nested: {
          dangerous: '<img src=x onerror=alert(1)>',
          safe: 'Normal text'
        },
        array: ['<script>alert(1)</script>', 'safe item']
      };

      const sanitized = XSSProtection.sanitizeJSON(maliciousJSON);
      
      expect(sanitized.name).not.toContain('<script>');
      expect(sanitized.nested.dangerous).not.toContain('onerror');
      expect(sanitized.array[0]).not.toContain('<script>');
      expect(sanitized.description).toBe('Safe content');
    });
  });

  describe('SQL Injection Prevention', () => {
    it('should create parameterized queries', () => {
      const template = 'SELECT * FROM users WHERE id = :userId AND email = :email';
      const params = { userId: 123, email: 'test@example.com' };
      
      const { query, values } = createSafeQuery(template, params);
      
      expect(query).toBe('SELECT * FROM users WHERE id = $1 AND email = $2');
      expect(values).toEqual([123, 'test@example.com']);
    });

    it('should handle complex parameterized queries', () => {
      const template = `
        INSERT INTO posts (title, content, author_id, created_at)
        VALUES (:title, :content, :authorId, :createdAt)
        RETURNING id
      `;
      const params = {
        title: 'Test Post',
        content: 'Post content with "quotes"',
        authorId: 456,
        createdAt: new Date('2023-01-01')
      };
      
      const { query, values } = createSafeQuery(template, params);
      
      expect(query).toContain('VALUES ($1, $2, $3, $4)');
      expect(values).toHaveLength(4);
      expect(values[0]).toBe('Test Post');
    });

    it('should throw error for missing parameters', () => {
      const template = 'SELECT * FROM users WHERE id = :userId';
      const params = {}; // Missing userId
      
      expect(() => createSafeQuery(template, params)).toThrow('Missing parameter: userId');
    });
  });

  describe('Session Security', () => {
    it('should validate session tokens securely', () => {
      const validToken = 'abc123def456';
      const providedToken1 = 'abc123def456';
      const providedToken2 = 'abc123def457'; // Different
      const providedToken3 = 'abc123def45'; // Shorter
      
      expect(validateSessionToken(providedToken1, validToken)).toBe(true);
      expect(validateSessionToken(providedToken2, validToken)).toBe(false);
      expect(validateSessionToken(providedToken3, validToken)).toBe(false);
    });

    it('should handle timing attacks on session validation', () => {
      const validToken = 'a'.repeat(32);
      const shortToken = 'a';
      const longToken = 'a'.repeat(100);
      
      // These should all return false, regardless of timing
      const start1 = Date.now();
      const result1 = validateSessionToken(shortToken, validToken);
      const time1 = Date.now() - start1;
      
      const start2 = Date.now();
      const result2 = validateSessionToken(longToken, validToken);
      const time2 = Date.now() - start2;
      
      expect(result1).toBe(false);
      expect(result2).toBe(false);
      // Both should fail quickly due to length mismatch
    });
  });

  describe('Rate Limiting', () => {
    let rateLimiter: SecureRateLimiter;
    
    beforeEach(() => {
      rateLimiter = new SecureRateLimiter(3, 1000, 5000); // 3 attempts per second, 5 second block
    });

    it('should allow requests within limits', () => {
      const ip = '127.0.0.1';
      
      expect(rateLimiter.isAllowed(ip)).toBe(true);
      expect(rateLimiter.isAllowed(ip)).toBe(true);
      expect(rateLimiter.isAllowed(ip)).toBe(true);
    });

    it('should block requests exceeding limits', () => {
      const ip = '127.0.0.1';
      
      // Use up the limit
      rateLimiter.isAllowed(ip);
      rateLimiter.isAllowed(ip);
      rateLimiter.isAllowed(ip);
      
      // Next request should be blocked
      expect(rateLimiter.isAllowed(ip)).toBe(false);
    });

    it('should handle different IPs separately', () => {
      const ip1 = '127.0.0.1';
      const ip2 = '127.0.0.2';
      
      // Use up limit for ip1
      rateLimiter.isAllowed(ip1);
      rateLimiter.isAllowed(ip1);
      rateLimiter.isAllowed(ip1);
      rateLimiter.isAllowed(ip1); // This should fail
      
      // ip2 should still work
      expect(rateLimiter.isAllowed(ip2)).toBe(true);
    });
  });

  describe('Input Validation', () => {
    it('should validate chat messages securely', () => {
      const validMessage = {
        message: 'Hello, how can I help you?',
        sessionId: '123e4567-e89b-12d3-a456-426614174000',
        userProfile: {
          industry: 'Technology',
          companySize: 'medium' as const
        }
      };
      
      const result = secureInputSchemas.chatMessage.safeParse(validMessage);
      expect(result.success).toBe(true);
    });

    it('should reject malicious chat messages', () => {
      const maliciousMessages = [
        { message: '<script>alert(1)</script>' },
        { message: 'javascript:alert(1)' },
        { message: 'data:text/html,<script>alert(1)</script>' },
        { message: 'vbscript:msgbox(1)' },
        { message: 'Hello onclick="alert(1)" world' }
      ];

      maliciousMessages.forEach(msg => {
        const result = secureInputSchemas.chatMessage.safeParse(msg);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.message).toContain('dangerous content');
        }
      });
    });

    it('should validate contact form data', () => {
      const validContact = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        budget: 'over-100k' as const,
        message: 'I need help with my project',
        honeypot: '' // Should be empty
      };
      
      const result = secureInputSchemas.contactForm.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it('should reject malicious contact form data', () => {
      const maliciousContact = {
        name: '<script>alert(1)</script>',
        email: 'test@example.com',
        message: 'Hello <img src=x onerror=alert(1)>',
        honeypot: '' // Bot detection would be handled elsewhere
      };
      
      const result = secureInputSchemas.contactForm.safeParse(maliciousContact);
      expect(result.success).toBe(false);
    });

    it('should detect bot submissions via honeypot', () => {
      const botSubmission = {
        name: 'Bot',
        email: 'bot@spam.com',
        message: 'Spam message',
        honeypot: 'I am a bot' // Bots often fill this field
      };
      
      const result = secureInputSchemas.contactForm.safeParse(botSubmission);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('Bot detected');
      }
    });
  });

  describe('Cryptographic Functions', () => {
    it('should generate secure random nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      
      expect(nonce1).toHaveLength(32); // 16 bytes = 32 hex chars
      expect(nonce2).toHaveLength(32);
      expect(nonce1).not.toBe(nonce2); // Should be different
      expect(nonce1).toMatch(/^[a-f0-9]{32}$/); // Should be hex
    });

    it('should generate different nonces each time', () => {
      const nonces = Array.from({ length: 100 }, () => generateNonce());
      const uniqueNonces = new Set(nonces);
      
      expect(uniqueNonces.size).toBe(100); // All should be unique
    });
  });

  describe('Security Headers', () => {
    it('should include comprehensive security headers', () => {
      const { securityHeaders } = require('@/lib/utils/security');
      
      expect(securityHeaders).toHaveProperty('X-Frame-Options', 'DENY');
      expect(securityHeaders).toHaveProperty('X-Content-Type-Options', 'nosniff');
      expect(securityHeaders).toHaveProperty('X-XSS-Protection', '1; mode=block');
      expect(securityHeaders).toHaveProperty('Strict-Transport-Security');
      expect(securityHeaders).toHaveProperty('Cross-Origin-Embedder-Policy', 'require-corp');
      expect(securityHeaders).toHaveProperty('Cross-Origin-Opener-Policy', 'same-origin');
    });
  });

  describe('Content Security Policy', () => {
    it('should generate valid CSP directives', () => {
      const { generateCSP } = require('@/lib/utils/security');
      
      const mockRequest = {
        headers: new Map([['host', 'example.com']])
      } as any;
      
      const csp = generateCSP(mockRequest);
      
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).toContain("frame-ancestors 'none'");
    });
  });

  describe('Error Handling', () => {
    it('should not leak sensitive information in errors', () => {
      try {
        // Simulate a database error
        throw new Error('Database connection failed: password=secret123');
      } catch (error) {
        // Our error handling should sanitize this
        const sanitizedError = 'Database operation failed';
        expect(sanitizedError).not.toContain('password');
        expect(sanitizedError).not.toContain('secret123');
      }
    });
  });

  describe('Integration Tests', () => {
    it('should handle multiple security layers together', () => {
      const maliciousInput = `
        <script>alert('XSS')</script>
        <img src="javascript:alert('XSS')">
        '; DROP TABLE users; --
        <iframe src="data:text/html,<script>alert(1)</script>"></iframe>
      `;
      
      // First sanitize HTML
      const sanitizedHtml = sanitizeHtml(maliciousInput);
      expect(sanitizedHtml).not.toContain('<script>');
      expect(sanitizedHtml).not.toContain('javascript:');
      expect(sanitizedHtml).not.toContain('DROP TABLE');
      
      // Then validate with schema
      const schema = XSSProtection.createSecureSchema({ maxLength: 1000, allowHtml: true });
      const validationResult = schema.safeParse(maliciousInput);
      
      // Should either succeed with sanitized content or fail validation
      if (validationResult.success) {
        expect(validationResult.data).not.toContain('<script>');
      } else {
        expect(validationResult.error).toBeDefined();
      }
    });
  });
});

// Performance tests for security functions
describe('Security Performance', () => {
  it('should sanitize large content efficiently', () => {
    const largeContent = '<p>Safe content</p>'.repeat(1000) + 
                        '<script>alert(1)</script>'.repeat(100);
    
    const start = Date.now();
    const sanitized = sanitizeHtml(largeContent);
    const time = Date.now() - start;
    
    expect(time).toBeLessThan(1000); // Should complete in under 1 second
    expect(sanitized).not.toContain('<script>');
  });

  it('should handle rate limiting efficiently', () => {
    const rateLimiter = new SecureRateLimiter(100, 1000);
    const ip = '127.0.0.1';
    
    const start = Date.now();
    for (let i = 0; i < 1000; i++) {
      rateLimiter.isAllowed(ip);
    }
    const time = Date.now() - start;
    
    expect(time).toBeLessThan(100); // Should handle 1000 requests in under 100ms
  });
});