'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Text } from '@/components/ui/Typography';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  aspectRatio?: 'square' | '16:9' | '4:3' | 'auto';
}

export function ImageGallery({
  images,
  className,
  columns = 3,
  aspectRatio = '16:9',
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const aspectRatios = {
    square: 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    auto: '',
  };

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    setZoom(1);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.5, 1));
  };


  return (
    <>
      <div className={cn('grid gap-4', gridCols[columns], className)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              'group relative overflow-hidden rounded-lg border border-subtle',
              'hover:border-magenta/50 transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-background'
            )}
            aria-label={`View ${image.alt}`}
          >
            <div className={cn('relative', aspectRatios[aspectRatio])}>
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={`(max-width: 768px) 100vw, (max-width: 1200px) ${100 / columns}vw, ${100 / columns}vw`}
                lazy={index > 6} // Load first 6 images immediately, lazy load rest
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <Text variant="small" className="text-white">
                  {image.caption}
                </Text>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={selectedImage !== null}
        onClose={() => {
          setSelectedImage(null);
          setZoom(1);
        }}
        className="max-w-7xl"
        closeOnEscape={true}
      >
        {selectedImage !== null && <ImageGalleryModal
          selectedImage={selectedImage}
          images={images}
          zoom={zoom}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onClose={() => {
            setSelectedImage(null);
            setZoom(1);
          }}
        />}
      </Modal>
    </>
  );
}

interface ImageGalleryModalProps {
  selectedImage: number;
  images: GalleryImage[];
  zoom: number;
  onPrevious: () => void;
  onNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onClose: () => void;
}

function ImageGalleryModal({
  selectedImage,
  images,
  zoom,
  onPrevious,
  onNext,
  onZoomIn,
  onZoomOut,
  onClose,
}: ImageGalleryModalProps) {
  const currentImage = images[selectedImage];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case '+':
        case '=':
          onZoomIn();
          break;
        case '-':
          onZoomOut();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onPrevious, onNext, onZoomIn, onZoomOut]);

  if (!currentImage) return null;

  return (
    <div className="relative flex flex-col h-[90vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-subtle">
        <Text variant="small" className="text-muted-foreground">
          {selectedImage + 1} / {images.length}
        </Text>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onZoomOut}
            disabled={zoom <= 1}
            aria-label="Zoom out"
            className="p-2 h-9 w-9"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Text variant="small" className="text-muted-foreground min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </Text>
          <Button
            size="sm"
            variant="ghost"
            onClick={onZoomIn}
            disabled={zoom >= 3}
            aria-label="Zoom in"
            className="p-2 h-9 w-9"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            aria-label="Close gallery"
            className="p-2 h-9 w-9"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image container */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${zoom})`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <OptimizedImage
            src={currentImage.src}
            alt={currentImage.alt}
            width={currentImage.width || 1920}
            height={currentImage.height || 1080}
            className="max-w-full max-h-full object-contain"
            priority
            lazy={false}
          />
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 h-10 w-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onNext}  
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 h-10 w-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <div className="p-4 border-t border-subtle">
          <Text variant="body" className="text-center">
            {currentImage.caption}
          </Text>
        </div>
      )}
    </div>
  );
}