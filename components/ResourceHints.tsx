import { Fragment } from 'react';

/**
 * Resource hints to improve loading performance
 * Adds preconnect, dns-prefetch, and preload tags
 */
export function ResourceHints() {
  return (
    <Fragment>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://vercel.com" />
      <link rel="dns-prefetch" href="https://clerk.com" />
      <link rel="dns-prefetch" href="https://stripe.com" />
      
      {/* Preload critical fonts - optimized loading */}
      <link
        rel="preload"
        href="/_next/static/media/c9a5bc6a7c948fb0-s.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload" 
        href="/_next/static/media/d6b16ce4a6175f26-s.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Prefetch above-the-fold images */}
      <link rel="preload" href="/hero-background.webp" as="image" />
      <link rel="preload" href="/logo.svg" as="image" />
      
      {/* Optimize third-party connections */}
      <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      <link rel="preconnect" href="https://clerk.dev" />
      
      {/* Prefetch critical pages for faster navigation */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/portfolio" />
      <link rel="prefetch" href="/contact" />
    </Fragment>
  );
}

export default ResourceHints;