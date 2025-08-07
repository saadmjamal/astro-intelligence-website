'use client'

import { memo, useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

// Enhanced image component with performance optimizations
export const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Generate blur data URL if not provided
  const generateBlurDataURL = useCallback((width: number, height: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#1a1a2e' // cosmic-midnight color
      ctx.fillRect(0, 0, width, height)
    }
    return canvas.toDataURL()
  }, [])

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)

  const handleLoad = useCallback(() => {
    setImageLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setImageError(true)
    onError?.()
  }, [onError])

  // Preload critical images
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [src, priority])

  if (imageError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        sizes={sizes || (fill ? '100vw' : undefined)}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </motion.div>
  )
})

// Progressive image loader with intersection observer
export const ProgressiveImage = memo(({
  src,
  placeholderSrc,
  alt,
  className = '',
  ...props
}: {
  src: string
  placeholderSrc?: string
  alt: string
  className?: string
  [key: string]: any
}) => {
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const img = new window.Image()
          img.onload = () => {
            setCurrentSrc(src)
            setIsLoaded(true)
          }
          img.src = src
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [src])

  return (
    <div ref={imgRef} className={className}>
      <OptimizedImage
        src={currentSrc}
        alt={alt}
        className={`transition-all duration-500 ${isLoaded ? 'filter-none' : 'filter blur-sm'}`}
        {...props}
      />
    </div>
  )
})

// Image gallery with optimized loading
export const OptimizedImageGallery = memo(({
  images,
  className = '',
  itemClassName = '',
  priority = false
}: {
  images: { src: string; alt: string; width?: number; height?: number }[]
  className?: string
  itemClassName?: string
  priority?: boolean
}) => {
  return (
    <div className={className}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ delay: index * 0.1 }}
          className={itemClassName}
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            width={image.width || 400}
            height={image.height || 300}
            priority={priority && index < 3} // Prioritize first 3 images
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg"
          />
        </motion.div>
      ))}
    </div>
  )
})

// Avatar component with fallback
export const OptimizedAvatar = memo(({
  src,
  alt,
  fallbackText,
  size = 48,
  className = ''
}: {
  src?: string
  alt: string
  fallbackText?: string
  size?: number
  className?: string
}) => {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div 
        className={`rounded-full bg-cosmic-comet-blue flex items-center justify-center text-white font-medium ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {fallbackText || alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      onError={() => setHasError(true)}
      quality={90}
    />
  )
})

// Background image with optimized loading
export const OptimizedBackground = memo(({
  src,
  alt,
  children,
  className = '',
  overlay = true,
  overlayColor = 'bg-black/50'
}: {
  src: string
  alt: string
  children?: React.ReactNode
  className?: string
  overlay?: boolean
  overlayColor?: string
}) => {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {overlay && <div className={`absolute inset-0 ${overlayColor}`} />}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
})

// Export display names
OptimizedImage.displayName = 'OptimizedImage'
ProgressiveImage.displayName = 'ProgressiveImage'
OptimizedImageGallery.displayName = 'OptimizedImageGallery'
OptimizedAvatar.displayName = 'OptimizedAvatar'
OptimizedBackground.displayName = 'OptimizedBackground'