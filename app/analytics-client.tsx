'use client'

import { useEffect } from 'react'

export default function AnalyticsClient() {
  useEffect(() => {
    function onClick(e: Event) {
      const target = e.target as HTMLElement
      const el = target?.closest('[data-analytics]') as HTMLElement | null
      if (!el) return
      const name = el.getAttribute('data-analytics') || 'click'
      try {
        // Plausible
        // @ts-ignore
        if (typeof window !== 'undefined' && window.plausible) window.plausible(name)
      } catch {}
      try {
        // GA4
        // @ts-ignore
        if (typeof window !== 'undefined' && window.gtag) window.gtag('event', name)
      } catch {}
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
