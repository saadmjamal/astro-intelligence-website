# Security Configuration

This document outlines the security measures implemented in the Astro Intelligence website.

## Security Headers

The application implements comprehensive security headers through middleware:

### Content Security Policy (CSP)
- Restricts resource loading to trusted sources only
- Prevents XSS attacks by controlling script execution
- Configured differently for development and production environments

### Additional Security Headers
- **X-Frame-Options**: DENY - Prevents clickjacking attacks
- **X-Content-Type-Options**: nosniff - Prevents MIME type sniffing
- **Referrer-Policy**: strict-origin-when-cross-origin - Controls referrer information
- **X-XSS-Protection**: 1; mode=block - Legacy XSS protection for older browsers
- **Permissions-Policy**: Restricts access to browser features
- **Strict-Transport-Security**: Forces HTTPS connections

## Trusted Domains

The CSP allows connections to:
- **Authentication**: Clerk domains
- **Payments**: Stripe domains
- **Search**: Algolia domains
- **Analytics**: Plausible.io
- **Development**: Vercel Live, localhost (dev only)

## Testing Security Headers

To verify security headers are properly applied:

```bash
# Development
curl -I http://localhost:3000/api/security-headers

# Production
curl -I https://astrointelligence.com/api/security-headers
```

## Updating Security Policy

To modify security headers:
1. Edit `/lib/utils/security.ts`
2. Update the CSP directives or security headers
3. Test thoroughly in development
4. Deploy to production

## Security Best Practices

1. **No Inline Scripts**: Use nonce-based CSP for any required inline scripts
2. **HTTPS Only**: Enforce HTTPS in production with upgrade-insecure-requests
3. **Minimal Permissions**: Only allow necessary browser features
4. **Regular Updates**: Keep dependencies and security policies up to date