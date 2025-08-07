'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading skeleton for ImageGallery
const ImageGalleryLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="aspect-video skeleton rounded-lg" />
    ))}
  </div>
);

// Dynamically import ImageGallery component
export const DynamicImageGallery = dynamic(
  () => import('./ImageGallery').then((mod) => mod.ImageGallery),
  {
    loading: () => <ImageGalleryLoader />,
    ssr: true, // Enable SSR for SEO
  }
);

// Wrap with Suspense for better loading states
export function ImageGalleryWrapper(props: React.ComponentProps<typeof DynamicImageGallery>) {
  return (
    <Suspense fallback={<ImageGalleryLoader />}>
      <DynamicImageGallery {...props} />
    </Suspense>
  );
}

export default ImageGalleryWrapper;