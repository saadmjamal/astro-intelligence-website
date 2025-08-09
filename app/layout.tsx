import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import './mobile-accessibility.css'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AIPersonalizationProvider } from '@/components/AIPersonalizationProvider'
import { MobileAccessibilityProvider } from '@/components/accessibility/MobileAccessibilityProvider'
import { MobilePWAProvider } from '@/components/mobile/MobilePWAProvider'
import { Suspense } from 'react'
import AnalyticsClient from './analytics-client'

const manrope = Manrope({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope'
})

export const metadata: Metadata = {
  title: {
    default: 'Astro Intelligence - Enterprise AI & Cloud Solutions',
    template: '%s | Astro Intelligence'
  },
  description: 'Human‑first enterprise AI for cloud and operations. Pragmatic automation, telemetry, and SOC 2 guardrails—no inflated claims.',
  keywords: ['Enterprise AI', 'Cloud Solutions', 'Ethical AI', 'SOC 2', 'Cloud Cost Optimization', 'AI Service Desk'],
  authors: [{ name: 'Astro Intelligence' }],
  creator: 'Astro Intelligence',
  publisher: 'Astro Intelligence',
  metadataBase: new URL('https://astro-intelligence.com'),
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover'
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00FF94' },
    { media: '(prefers-color-scheme: dark)', color: '#00FF94' }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Astro AI'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://astro-intelligence.com',
    siteName: 'Astro Intelligence',
    title: 'Astro Intelligence - Enterprise AI for Cloud & Operations',
    description: 'Pragmatic automation with guardrails. Telemetry, approvals, and measurable outcomes.',
    images: ['/og-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="application-name" content="Astro AI" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Astro AI" />
          <meta name="format-detection" content="telephone=yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#00FF94" />
          <meta name="msapplication-tap-highlight" content="no" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                      .then(registration => console.log('SW registered'))
                      .catch(error => console.log('SW registration failed'));
                  });
                }
              `
            }}
          />
        </head>
        <body className={`${manrope.variable} font-sans antialiased bg-black`}>
          <ThemeProvider defaultTheme="dark">
            <MobileAccessibilityProvider>
              <MobilePWAProvider>
                <AIPersonalizationProvider>
                  <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                    <Header />
                    <AnalyticsClient />
                    {children}
                  </Suspense>
                </AIPersonalizationProvider>
              </MobilePWAProvider>
            </MobileAccessibilityProvider>
          </ThemeProvider>
        </body>
      </html>
  )
}