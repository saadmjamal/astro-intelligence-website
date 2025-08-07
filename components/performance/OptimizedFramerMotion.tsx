'use client'

import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { memo, useMemo, useRef } from 'react'

// Reduced motion variants for accessibility
const createMotionVariants = (reducedMotion: boolean) => ({
  // Fade animations
  fadeIn: {
    initial: { opacity: reducedMotion ? 1 : 0 },
    animate: { opacity: 1 },
    exit: { opacity: reducedMotion ? 1 : 0 },
    transition: { duration: reducedMotion ? 0 : 0.3 }
  },
  
  // Slide animations  
  slideUp: {
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -20 },
    transition: { duration: reducedMotion ? 0 : 0.4, ease: 'easeOut' }
  },
  
  slideDown: {
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 },
    transition: { duration: reducedMotion ? 0 : 0.4, ease: 'easeOut' }
  },
  
  slideLeft: {
    initial: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -30 },
    transition: { duration: reducedMotion ? 0 : 0.4, ease: 'easeOut' }
  },
  
  slideRight: {
    initial: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : 30 },
    transition: { duration: reducedMotion ? 0 : 0.4, ease: 'easeOut' }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.8 },
    transition: { duration: reducedMotion ? 0 : 0.3, ease: 'backOut' }
  },
  
  // Hover animations
  hoverScale: {
    whileHover: reducedMotion ? {} : { scale: 1.05 },
    whileTap: reducedMotion ? {} : { scale: 0.95 },
    transition: { duration: 0.2, ease: 'easeInOut' }
  },
  
  // Stagger container
  staggerContainer: {
    initial: { opacity: reducedMotion ? 1 : 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.3,
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.2
      }
    }
  },
  
  // Stagger items
  staggerItem: {
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.4, ease: 'easeOut' }
    }
  }
})

// Optimized motion component with performance monitoring
export const OptimizedMotionDiv = memo(({
  children,
  variant = 'fadeIn',
  className = '',
  viewport = { once: true, margin: '-50px' },
  ...props
}: {
  children: React.ReactNode
  variant?: keyof ReturnType<typeof createMotionVariants>
  className?: string
  viewport?: { once?: boolean; margin?: string; amount?: number }
  [key: string]: any
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, viewport as any)
  const reducedMotion = useReducedMotion()
  
  const variants = useMemo(() => createMotionVariants(!!reducedMotion), [reducedMotion])
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant] as any}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      {...props}
    >
      {children}
    </motion.div>
  )
})

// Optimized section wrapper
export const OptimizedSection = memo(({
  children,
  variant: _variant = 'slideUp',
  className = '',
  containerVariant = 'staggerContainer',
  ...props
}: {
  children: React.ReactNode
  variant?: keyof ReturnType<typeof createMotionVariants>
  className?: string
  containerVariant?: keyof ReturnType<typeof createMotionVariants>
  [key: string]: any
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reducedMotion = useReducedMotion()
  
  const variants = useMemo(() => createMotionVariants(!!reducedMotion), [reducedMotion])
  
  return (
    <motion.section
      ref={ref}
      className={className}
      variants={variants[containerVariant] as any}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      {...props}
    >
      {children}
    </motion.section>
  )
})

// Optimized card with hover effects
export const OptimizedMotionCard = memo(({
  children,
  className = '',
  enableHover = true,
  ...props
}: {
  children: React.ReactNode
  className?: string
  enableHover?: boolean
  [key: string]: any
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()
  
  const variants = useMemo(() => {
    const baseVariants = createMotionVariants(!!reducedMotion)
    return {
      ...baseVariants.scaleIn,
      ...(enableHover && !reducedMotion ? baseVariants.hoverScale : {})
    }
  }, [reducedMotion, enableHover])
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      {...props}
    >
      {children}
    </motion.div>
  )
})

// Optimized list with stagger animation
export const OptimizedMotionList = memo(({
  children,
  className = '',
  staggerDelay = 0.1,
  ...props
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  [key: string]: any
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()
  
  const containerVariants = useMemo(() => ({
    initial: { opacity: reducedMotion ? 1 : 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.3,
        staggerChildren: reducedMotion ? 0 : staggerDelay,
        delayChildren: reducedMotion ? 0 : 0.2
      }
    }
  }), [reducedMotion, staggerDelay])
  
  const itemVariants = useMemo(() => ({
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.4, ease: 'easeOut' }
    }
  }), [reducedMotion])
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      {...props}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants as any}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants as any}>{children}</motion.div>
      }
    </motion.div>
  )
})

// Optimized AnimatePresence wrapper
export const OptimizedAnimatePresence = memo(({
  children,
  mode = 'wait',
  ...props
}: {
  children: React.ReactNode
  mode?: 'wait' | 'sync' | 'popLayout'
  [key: string]: any
}) => {
  const reducedMotion = useReducedMotion()
  
  // Skip AnimatePresence entirely if reduced motion is preferred
  if (reducedMotion) {
    return <>{children}</>
  }
  
  return (
    <AnimatePresence mode={mode} {...props}>
      {children}
    </AnimatePresence>
  )
})

// Performance-optimized viewport settings
export const optimizedViewport = {
  once: true,
  margin: '-50px',
  amount: 0.1
}

export const criticalViewport = {
  once: true,
  margin: '0px',
  amount: 0
}

// Export display names for debugging
OptimizedMotionDiv.displayName = 'OptimizedMotionDiv'
OptimizedSection.displayName = 'OptimizedSection'
OptimizedMotionCard.displayName = 'OptimizedMotionCard'
OptimizedMotionList.displayName = 'OptimizedMotionList'
OptimizedAnimatePresence.displayName = 'OptimizedAnimatePresence'