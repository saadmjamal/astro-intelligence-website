'use client'

import React, { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react'

interface PerformanceMetrics {
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  bundleSize: number | null
}

interface PerformanceMonitorProps {
  showMetrics?: boolean
  alertThresholds?: {
    lcp: number
    fid: number
    cls: number
  }
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showMetrics = process.env.NODE_ENV === 'development',
  alertThresholds = {
    lcp: 2500, // 2.5 seconds
    fid: 100,  // 100ms
    cls: 0.1   // 0.1 shift
  }
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    bundleSize: null
  })

  const [performanceGrade, setPerformanceGrade] = useState<'A' | 'B' | 'C' | 'D' | 'F'>('A')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Web Vitals measurement
    const measureWebVitals = () => {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // FID (First Input Delay) - replaced with INP in modern browsers
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime
            setMetrics(prev => ({ ...prev, fid }))
          }
        })
      }).observe({ entryTypes: ['first-input'] })

      // CLS (Cumulative Layout Shift)
      let clsValue = 0
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        setMetrics(prev => ({ ...prev, cls: clsValue }))
      }).observe({ entryTypes: ['layout-shift'] })

      // TTFB (Time to First Byte)
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navEntry) {
        setMetrics(prev => ({ ...prev, ttfb: navEntry.responseStart }))
      }
    }

    measureWebVitals()

    // Bundle size estimation (development only)
    if (process.env.NODE_ENV === 'development') {
      // Estimate bundle size from script tags
      const scripts = Array.from(document.querySelectorAll('script[src]'))
      let estimatedSize = 0
      
      scripts.forEach(script => {
        const src = script.getAttribute('src')
        if (src && src.includes('/_next/')) {
          // Rough estimation based on script count
          estimatedSize += 200 // KB per script (rough estimate)
        }
      })

      setMetrics(prev => ({ ...prev, bundleSize: estimatedSize }))
    }
  }, [])

  // Calculate performance grade
  useEffect(() => {
    const { lcp, fid, cls } = metrics
    if (lcp === null || fid === null || cls === null) return

    let score = 100

    // LCP scoring
    if (lcp > 4000) score -= 30
    else if (lcp > 2500) score -= 15
    else if (lcp > 1500) score -= 5

    // FID scoring  
    if (fid > 300) score -= 25
    else if (fid > 100) score -= 10
    else if (fid > 50) score -= 3

    // CLS scoring
    if (cls > 0.25) score -= 25
    else if (cls > 0.1) score -= 10
    else if (cls > 0.05) score -= 3

    // Grade assignment
    if (score >= 90) setPerformanceGrade('A')
    else if (score >= 80) setPerformanceGrade('B')
    else if (score >= 70) setPerformanceGrade('C')
    else if (score >= 60) setPerformanceGrade('D')
    else setPerformanceGrade('F')
  }, [metrics])

  const getMetricStatus = (value: number | null, threshold: number, reverse = false) => {
    if (value === null) return 'loading'
    return reverse 
      ? (value < threshold ? 'good' : 'warning')
      : (value > threshold ? 'warning' : 'good')
  }

  const formatMetric = (value: number | null, unit: string) => {
    if (value === null) return '...'
    return `${Math.round(value)}${unit}`
  }

  if (!showMetrics) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-blue-500" />
        <h3 className="font-semibold text-sm">Performance Monitor</h3>
        <div className={`px-2 py-1 rounded text-xs font-bold ${
          performanceGrade === 'A' ? 'bg-green-100 text-green-800' :
          performanceGrade === 'B' ? 'bg-blue-100 text-blue-800' :
          performanceGrade === 'C' ? 'bg-yellow-100 text-yellow-800' :
          performanceGrade === 'D' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          {performanceGrade}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {/* LCP */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            {getMetricStatus(metrics.lcp, alertThresholds.lcp) === 'good' ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : getMetricStatus(metrics.lcp, alertThresholds.lcp) === 'warning' ? (
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
            ) : (
              <Clock className="h-3 w-3 text-gray-400" />
            )}
            LCP
          </span>
          <span className="font-mono">{formatMetric(metrics.lcp, 'ms')}</span>
        </div>

        {/* FID */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            {getMetricStatus(metrics.fid, alertThresholds.fid) === 'good' ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : getMetricStatus(metrics.fid, alertThresholds.fid) === 'warning' ? (
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
            ) : (
              <Clock className="h-3 w-3 text-gray-400" />
            )}
            FID
          </span>
          <span className="font-mono">{formatMetric(metrics.fid, 'ms')}</span>
        </div>

        {/* CLS */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            {getMetricStatus(metrics.cls, alertThresholds.cls) === 'good' ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : getMetricStatus(metrics.cls, alertThresholds.cls) === 'warning' ? (
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
            ) : (
              <Clock className="h-3 w-3 text-gray-400" />
            )}
            CLS
          </span>
          <span className="font-mono">{metrics.cls ? metrics.cls.toFixed(3) : '...'}</span>
        </div>

        {/* TTFB */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            {getMetricStatus(metrics.ttfb, 600) === 'good' ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : getMetricStatus(metrics.ttfb, 600) === 'warning' ? (
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
            ) : (
              <Clock className="h-3 w-3 text-gray-400" />
            )}
            TTFB
          </span>
          <span className="font-mono">{formatMetric(metrics.ttfb, 'ms')}</span>
        </div>

        {/* Bundle Size (dev only) */}
        {process.env.NODE_ENV === 'development' && metrics.bundleSize && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-purple-500" />
              Bundle
            </span>
            <span className="font-mono">{formatMetric(metrics.bundleSize, 'KB')}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500">
        🚀 Landing page optimized by Hive Mind
      </div>
    </div>
  )
}

export default PerformanceMonitor