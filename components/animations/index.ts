// Animation system exports
export { PageTransition, usePageTransition } from './PageTransition';
export { 
  AnimatedButton, 
  AnimatedFormField, 
  AnimatedCard, 
  ScrollReveal, 
  FloatingActionButton 
} from './MicroInteractions';
export { AnimationProvider, useAnimationPreferences } from './AnimationProvider';
export { CosmicParticles, LoadingParticles } from './CosmicParticles';

// Animation utilities and constants
export const ANIMATION_CONSTANTS = {
  // Durations (in seconds)
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
    PAGE_TRANSITION: 0.6,
  },
  
  // Easing functions
  EASING: {
    EASE_OUT: [0.22, 1, 0.36, 1],
    EASE_IN_OUT: [0.4, 0, 0.2, 1],
    BOUNCE: [0.68, -0.55, 0.265, 1.55],
    COSMIC: [0.22, 1, 0.36, 1], // Custom cosmic easing
  },
  
  // Spring configurations
  SPRING: {
    GENTLE: { stiffness: 300, damping: 30 },
    BOUNCY: { stiffness: 400, damping: 17 },
    SNAPPY: { stiffness: 500, damping: 25 },
  },
} as const;

// Common animation variants
export const ANIMATION_VARIANTS = {
  // Fade variants
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  // Slide variants
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  
  // Scale variants
  zoomIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  
  zoomOut: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  
  // Cosmic variants
  cosmicReveal: {
    initial: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      filter: 'blur(10px)',
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: 'blur(0px)',
    },
    exit: { 
      opacity: 0, 
      scale: 1.05, 
      y: -20,
      filter: 'blur(5px)',
    },
  },
  
  // List stagger variants
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const;

// Performance utilities
export const PERFORMANCE = {
  // Will-change hints for common animations
  WILL_CHANGE: {
    TRANSFORM: 'transform',
    OPACITY: 'opacity',
    FILTER: 'filter',
    TRANSFORM_OPACITY: 'transform, opacity',
    AUTO: 'auto',
  },
  
  // GPU acceleration helper
  GPU_ACCELERATE: {
    transform: 'translateZ(0)',
    willChange: 'transform',
  },
} as const;