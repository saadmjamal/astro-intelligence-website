import { NextRequest, NextResponse } from 'next/server';

/**
 * Test endpoint to verify security headers are properly applied
 */
export async function GET(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  
  const securityHeaders = [
    'content-security-policy',
    'x-frame-options',
    'x-content-type-options',
    'referrer-policy',
    'x-xss-protection',
    'permissions-policy',
    'strict-transport-security'
  ];
  
  const appliedHeaders = securityHeaders.reduce((acc, header) => {
    if (headers[header]) {
      acc[header] = headers[header];
    }
    return acc;
  }, {} as Record<string, string>);
  
  return NextResponse.json({
    success: true,
    appliedHeaders,
    missingHeaders: securityHeaders.filter(h => !headers[h]),
    environment: process.env.NODE_ENV,
  });
}