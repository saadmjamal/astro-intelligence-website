import { generateCSP, generateNonce, securityHeaders } from '@/lib/utils/security';

// Mock NextRequest for testing
class MockNextRequest {
  url: string;
  
  constructor(url: string | URL) {
    this.url = url.toString();
  }
}

describe('Security Utilities', () => {
  describe('generateCSP', () => {
    const mockRequest = new MockNextRequest(new URL('http://localhost:3000')) as any;

    beforeEach(() => {
      (process.env as any).NODE_ENV = 'test';
    });

    it('generates CSP for production environment', () => {
      (process.env as any).NODE_ENV = 'production';
      const csp = generateCSP(mockRequest);

      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self'");
      expect(csp).toContain('https://clerk.com');
      expect(csp).toContain('https://js.stripe.com');
      expect(csp).toContain('upgrade-insecure-requests');
      expect(csp).not.toContain("'unsafe-eval'");
      expect(csp).not.toContain('http://localhost');
    });

    it('generates CSP for development environment', () => {
      (process.env as any).NODE_ENV = 'development';
      const csp = generateCSP(mockRequest);

      expect(csp).toContain("'unsafe-eval'");
      expect(csp).toContain("'unsafe-inline'");
      expect(csp).toContain('http://localhost:*');
      expect(csp).toContain('ws://localhost:*');
      expect(csp).not.toContain('upgrade-insecure-requests');
    });

    it('includes nonce in script-src', () => {
      const csp = generateCSP(mockRequest);
      expect(csp).toMatch(/'nonce-[\w\d]+'/);
    });

    it('includes all required connect-src domains', () => {
      const csp = generateCSP(mockRequest);
      
      expect(csp).toContain('https://clerk.com');
      expect(csp).toContain('https://*.clerk.accounts.dev');
      expect(csp).toContain('https://api.stripe.com');
      expect(csp).toContain('https://*.algolia.net');
      expect(csp).toContain('https://plausible.io');
      expect(csp).toContain('wss://ws-us3.pusher.com');
    });

    it('includes font sources', () => {
      const csp = generateCSP(mockRequest);
      
      expect(csp).toContain("font-src 'self' https://fonts.gstatic.com");
    });

    it('includes style sources', () => {
      const csp = generateCSP(mockRequest);
      
      expect(csp).toContain("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com");
    });

    it('sets frame-ancestors to none', () => {
      const csp = generateCSP(mockRequest);
      expect(csp).toContain("frame-ancestors 'none'");
    });

    it('sets object-src to none', () => {
      const csp = generateCSP(mockRequest);
      expect(csp).toContain("object-src 'none'");
    });

    it('sets base-uri to self', () => {
      const csp = generateCSP(mockRequest);
      expect(csp).toContain("base-uri 'self'");
    });

    it('sets form-action to self', () => {
      const csp = generateCSP(mockRequest);
      expect(csp).toContain("form-action 'self'");
    });
  });

  describe('generateNonce', () => {
    it('generates a string nonce', () => {
      const nonce = generateNonce();
      expect(typeof nonce).toBe('string');
      expect(nonce.length).toBeGreaterThan(0);
    });

    it('generates unique nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      expect(nonce1).not.toBe(nonce2);
    });
  });

  describe('securityHeaders', () => {
    it('includes all required security headers', () => {
      expect(securityHeaders['X-Frame-Options']).toBe('DENY');
      expect(securityHeaders['X-Content-Type-Options']).toBe('nosniff');
      expect(securityHeaders['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
      expect(securityHeaders['X-XSS-Protection']).toBe('1; mode=block');
      expect(securityHeaders['Permissions-Policy']).toBe('camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=()');
      expect(securityHeaders['Strict-Transport-Security']).toBe('max-age=31536000; includeSubDomains');
    });

    it('has correct header values', () => {
      expect(Object.keys(securityHeaders)).toHaveLength(10);
      Object.values(securityHeaders).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });
});