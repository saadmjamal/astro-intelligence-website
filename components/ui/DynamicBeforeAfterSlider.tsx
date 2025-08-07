'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading skeleton for BeforeAfterSlider
const BeforeAfterLoader = () => (
  <div className="relative aspect-video skeleton rounded-lg overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full animate-pulse" />
  </div>
);

// Dynamically import BeforeAfterSlider component
export const DynamicBeforeAfterSlider = dynamic(
  () => import('./BeforeAfterSlider').then((mod) => mod.BeforeAfterSlider),
  {
    loading: () => <BeforeAfterLoader />,
    ssr: true, // Enable SSR for SEO
  }
);

// Wrap with Suspense for better loading states
export function BeforeAfterSliderWrapper(props: React.ComponentProps<typeof DynamicBeforeAfterSlider>) {
  return (
    <Suspense fallback={<BeforeAfterLoader />}>
      <DynamicBeforeAfterSlider {...props} />
    </Suspense>
  );
}

export default BeforeAfterSliderWrapper;