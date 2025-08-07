'use client'

import { memo, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Memoized motion wrapper for reusable animations
export const MemoizedMotionDiv = memo(motion.div)
export const MemoizedMotionSection = memo(motion.section)
export const MemoizedAnimatePresence = memo(AnimatePresence)

// Memoized icon components to prevent re-renders
export const MemoizedIcon = memo(({ 
  Icon, 
  className = '', 
  size = 24, 
  ...props 
}: { 
  Icon: React.ComponentType<any>
  className?: string
  size?: number
  [key: string]: any
}) => <Icon className={className} size={size} {...props} />)

// Memoized button component with stable callbacks
export const MemoizedButton = memo(({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  [key: string]: any
}) => {
  const baseClasses = useMemo(() => {
    const variants = {
      primary: 'bg-cosmic-comet-blue hover:bg-cosmic-aurora text-white',
      secondary: 'bg-cosmic-surface hover:bg-cosmic-surface/80 text-cosmic-text',
      outline: 'border border-cosmic-comet-blue hover:bg-cosmic-comet-blue/10 text-cosmic-comet-blue'
    }
    
    return `px-6 py-3 rounded-lg font-medium transition-all duration-200 ${variants[variant]} ${className}`
  }, [variant, className])

  const handleClick = useCallback(() => {
    if (onClick && !disabled) {
      onClick()
    }
  }, [onClick, disabled])

  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

// Memoized card component for reusable layouts
export const MemoizedCard = memo(({
  children,
  className = '',
  padding = 'p-6',
  background = 'bg-cosmic-surface',
  hover = true
}: {
  children: React.ReactNode
  className?: string
  padding?: string
  background?: string
  hover?: boolean
}) => {
  const cardClasses = useMemo(() => {
    const hoverEffect = hover ? 'hover:scale-105 hover:shadow-xl' : ''
    return `rounded-lg border border-cosmic-border transition-all duration-300 ${background} ${padding} ${hoverEffect} ${className}`
  }, [className, padding, background, hover])

  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
})

// Memoized metric counter with optimized animations
export const MemoizedMetricCounter = memo(({
  value,
  label,
  suffix = '',
  className = ''
}: {
  value: number
  label: string
  suffix?: string
  className?: string
}) => {
  const animationProps = useMemo(() => ({
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 }
  }), [])

  return (
    <MemoizedMotionDiv {...animationProps} className={className}>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-cosmic-comet-blue mb-2">
          {value.toLocaleString()}{suffix}
        </div>
        <div className="text-cosmic-text-secondary text-sm md:text-base">
          {label}
        </div>
      </div>
    </MemoizedMotionDiv>
  )
})

// Memoized testimonial component
export const MemoizedTestimonial = memo(({
  quote,
  author,
  role,
  company,
  avatar,
  className = ''
}: {
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
  className?: string
}) => {
  const avatarElement = useMemo(() => {
    if (avatar) {
      return (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={avatar} 
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
        </>
      )
    }
    return (
      <div className="w-12 h-12 rounded-full bg-cosmic-comet-blue flex items-center justify-center">
        <span className="text-white font-medium text-lg">
          {author.charAt(0)}
        </span>
      </div>
    )
  }, [avatar, author])

  return (
    <MemoizedCard className={className}>
      <blockquote className="text-cosmic-text-secondary italic mb-4">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        {avatarElement}
        <div>
          <div className="font-medium text-white">{author}</div>
          <div className="text-sm text-cosmic-text-muted">
            {role} at {company}
          </div>
        </div>
      </div>
    </MemoizedCard>
  )
})

// Memoized service card with hover effects
export const MemoizedServiceCard = memo(({
  icon,
  title,
  description,
  features = [],
  className = ''
}: {
  icon: React.ComponentType<any>
  title: string
  description: string
  features?: string[]
  className?: string
}) => {
  const featuresList = useMemo(() => 
    features.map((feature, index) => (
      <li key={index} className="text-cosmic-text-secondary text-sm">
        • {feature}
      </li>
    )), [features]
  )

  return (
    <MemoizedCard className={`text-center group ${className}`} hover={true}>
      <div className="mb-4">
        <MemoizedIcon 
          Icon={icon} 
          className="w-12 h-12 mx-auto text-cosmic-comet-blue group-hover:text-cosmic-aurora transition-colors duration-300" 
        />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-cosmic-text-secondary mb-4">{description}</p>
      {features.length > 0 && (
        <ul className="text-left space-y-1">
          {featuresList}
        </ul>
      )}
    </MemoizedCard>
  )
})

// Memoized portfolio item
export const MemoizedPortfolioItem = memo(({
  title,
  description,
  image,
  tags = [],
  link,
  className = ''
}: {
  title: string
  description: string
  image: string
  tags?: string[]
  link?: string
  className?: string
}) => {
  const tagElements = useMemo(() => 
    tags.map((tag, index) => (
      <span 
        key={index}
        className="px-2 py-1 bg-cosmic-comet-blue/20 text-cosmic-comet-blue text-xs rounded"
      >
        {tag}
      </span>
    )), [tags]
  )

  const _handleClick = useCallback(() => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }, [link])

  return (
    <MemoizedCard 
      className={`group cursor-pointer ${className}`} 
      hover={true}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-cosmic-text-secondary text-sm mb-3">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tagElements}
        </div>
      )}
    </MemoizedCard>
  )
})

// Performance monitoring wrapper
export const MemoizedPerformanceWrapper = memo(({
  children,
  name,
  threshold = 100
}: {
  children: React.ReactNode
  name: string
  threshold?: number
}) => {
  useMemo(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const startTime = performance.now()
      
      // Monitor component render time
      setTimeout(() => {
        const endTime = performance.now()
        const renderTime = endTime - startTime
        
        if (renderTime > threshold) {
          console.warn(`Component "${name}" took ${renderTime.toFixed(2)}ms to render`)
        }
      }, 0)
    }
  }, [name, threshold])

  return <>{children}</>
})

// Export display names for debugging
MemoizedButton.displayName = 'MemoizedButton'
MemoizedCard.displayName = 'MemoizedCard'
MemoizedMetricCounter.displayName = 'MemoizedMetricCounter'
MemoizedTestimonial.displayName = 'MemoizedTestimonial'
MemoizedServiceCard.displayName = 'MemoizedServiceCard'
MemoizedPortfolioItem.displayName = 'MemoizedPortfolioItem'
MemoizedPerformanceWrapper.displayName = 'MemoizedPerformanceWrapper'