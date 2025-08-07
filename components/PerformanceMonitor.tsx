'use client';

import { useState, useEffect } from 'react';
import { measureWebVitals, type WebVitalsMetrics } from '@/lib/utils/performance';
import { cn } from '@/lib/utils';

interface PerformanceMonitorProps {
  className?: string;
  compact?: boolean;
}

/**
 * Performance monitoring component for development
 * Shows Core Web Vitals in real-time
 */
export function PerformanceMonitor({ className, compact = false }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    measureWebVitals((newMetrics) => {
      setMetrics(newMetrics);
    });

    // Toggle visibility with keyboard shortcut (Ctrl/Cmd + Shift + P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (process.env.NODE_ENV !== 'development' || !isVisible) return null;

  const getScoreColor = (metric: string, value?: number) => {
    if (!value) return 'text-gray-500';

    switch (metric) {
      case 'LCP':
        if (value <= 2500) return 'text-green-500';
        if (value <= 4000) return 'text-yellow-500';
        return 'text-red-500';
      case 'FID':
        if (value <= 100) return 'text-green-500';
        if (value <= 300) return 'text-yellow-500';
        return 'text-red-500';
      case 'CLS':
        if (value <= 0.1) return 'text-green-500';
        if (value <= 0.25) return 'text-yellow-500';
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (compact) {
    return (
      <div
        className={cn(
          'fixed bottom-4 right-4 bg-black/90 text-white p-2 rounded-lg text-xs font-mono backdrop-blur-sm z-50',
          className
        )}
      >
        <div className="flex gap-3">
          <span className={getScoreColor('LCP', metrics.LCP)}>
            LCP: {metrics.LCP ? `${(metrics.LCP / 1000).toFixed(2)}s` : '—'}
          </span>
          <span className={getScoreColor('FID', metrics.FID)}>
            FID: {metrics.FID ? `${metrics.FID.toFixed(0)}ms` : '—'}
          </span>
          <span className={getScoreColor('CLS', metrics.CLS)}>
            CLS: {metrics.CLS ? metrics.CLS.toFixed(3) : '—'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-sm font-mono backdrop-blur-sm z-50 min-w-[300px]',
        className
      )}
    >
      <div className="mb-2 font-bold text-center">Core Web Vitals</div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>LCP (Largest Contentful Paint):</span>
          <span className={getScoreColor('LCP', metrics.LCP)}>
            {metrics.LCP ? `${(metrics.LCP / 1000).toFixed(2)}s` : '—'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FID (First Input Delay):</span>
          <span className={getScoreColor('FID', metrics.FID)}>
            {metrics.FID ? `${metrics.FID.toFixed(0)}ms` : '—'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS (Cumulative Layout Shift):</span>
          <span className={getScoreColor('CLS', metrics.CLS)}>
            {metrics.CLS ? metrics.CLS.toFixed(3) : '—'}
          </span>
        </div>
        {metrics.FCP && (
          <div className="flex justify-between">
            <span>FCP (First Contentful Paint):</span>
            <span className="text-gray-400">
              {(metrics.FCP / 1000).toFixed(2)}s
            </span>
          </div>
        )}
        {metrics.TTFB && (
          <div className="flex justify-between">
            <span>TTFB (Time to First Byte):</span>
            <span className="text-gray-400">
              {metrics.TTFB.toFixed(0)}ms
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 text-xs text-gray-400 text-center">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}

export default PerformanceMonitor;