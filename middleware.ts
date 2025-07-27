import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map old service URLs to new ones
const redirectMap: Record<string, string> = {
  '/services/ai-enhanced-orchestration': '/services/ai-consulting',
  '/services/devops-as-a-service': '/services/cloud-architecture',
  '/services/platform-engineering': '/services/ml-engineering',
  '/services/microservices-architecture': '/services/strategic-partnerships',
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the current path needs a redirect
  if (redirectMap[pathname]) {
    return NextResponse.redirect(new URL(redirectMap[pathname], request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/services/:path*',
};
