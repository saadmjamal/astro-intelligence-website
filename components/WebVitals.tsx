'use client';

import { useEffect } from 'react';
import { measureWebVitals, reportWebVitals } from '@/lib/utils/performance';

/**
 * Component to measure and report Core Web Vitals
 * Should be included in the root layout
 */
export function WebVitals() {
  useEffect(() => {
    // Only measure in production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_MEASURE_WEB_VITALS === 'true') {
      measureWebVitals((metrics) => {
        reportWebVitals(metrics);
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
}

export default WebVitals;