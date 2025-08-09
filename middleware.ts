// Temporary: remove Clerk from Edge middleware for Vercel compatibility
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map old service URLs to new ones
const redirectMap: Record<string, string> = {
  '/services/ai-enhanced-orchestration': '/services/ai-consulting',
  '/services/devops-as-a-service': '/services/cloud-architecture',
  '/services/platform-engineering': '/services/ml-engineering',
  '/services/microservices-architecture': '/services/strategic-partnerships',
};

// const isProtectedRoute = createRouteMatcher([
//   '/dashboard(.*)',
//   '/api/dashboard(.*)',
// ]);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if the current path needs a redirect
  if (redirectMap[pathname]) {
    return NextResponse.redirect(new URL(redirectMap[pathname], req.url), 301);
  }

  // Auth temporarily disabled in Edge middleware; dashboard is public preview.

  // Add basic security headers (Edge Runtime compatible)
  const response = NextResponse.next();
  
  // Basic security headers that are safe for Edge Runtime
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};