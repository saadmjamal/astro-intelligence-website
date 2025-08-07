'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Text } from '@/components/ui/Typography';

interface BeforeAfterImage {
  src: string;
  alt: string;
  caption?: string;
}

interface BeforeAfterSliderProps {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  className?: string;
  aspectRatio?: 'square' | '16:9' | '4:3';
  initialPosition?: number;
}

export function BeforeAfterSlider({
  before,
  after,
  className,
  aspectRatio = '16:9',
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectRatios = {
    square: 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    switch (e.key) {
      case 'ArrowLeft':
        setPosition(Math.max(0, position - step));
        break;
      case 'ArrowRight':
        setPosition(Math.min(100, position + step));
        break;
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUpGlobal);
      document.addEventListener('touchend', handleMouseUpGlobal);
    }
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      document.removeEventListener('touchend', handleMouseUpGlobal);
    };
  }, [isDragging]);

  return (
    <div className={cn('relative', className)}>
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden rounded-lg border border-subtle',
          aspectRatios[aspectRatio],
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseUp}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* After image (background) */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={after.src}
            alt={after.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            lazy={false}
          />
        </div>

        {/* Before image (foreground with clip) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <OptimizedImage
            src={before.src}
            alt={before.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            lazy={false}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white shadow-xl"
          style={{ left: `${position}%` }}
        >
          <button
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-12 h-12 rounded-full bg-white shadow-lg',
              'flex items-center justify-center',
              'hover:scale-110 transition-transform',
              'focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2'
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            aria-label="Drag to compare before and after"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </button>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded px-3 py-1">
          <Text variant="small" className="text-white font-semibold">
            Before
          </Text>
        </div>
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded px-3 py-1">
          <Text variant="small" className="text-white font-semibold">
            After
          </Text>
        </div>
      </div>

      {/* Captions */}
      {(before.caption || after.caption) && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {before.caption && (
            <div className="text-center">
              <Text variant="small" className="text-muted-foreground">
                <span className="font-semibold">Before:</span> {before.caption}
              </Text>
            </div>
          )}
          {after.caption && (
            <div className="text-center">
              <Text variant="small" className="text-muted-foreground">
                <span className="font-semibold">After:</span> {after.caption}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
}