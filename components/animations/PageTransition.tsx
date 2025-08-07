'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Cosmic particle effect for page transitions
const CosmicParticles = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  >
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cosmic-aurora rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          x: [0, Math.random() * 200 - 100],
          y: [0, Math.random() * 200 - 100],
        }}
        transition={{
          duration: 2,
          delay: Math.random() * 0.5,
          ease: "easeOut",
        }}
      />
    ))}
  </motion.div>
);

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
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
    scale: 1.02,
    y: -20,
    filter: 'blur(5px)',
  },
};

// Loading overlay variants
const loadingOverlayVariants = {
  initial: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  animate: {
    scaleX: [0, 1, 1, 0],
    transformOrigin: ['left', 'left', 'right', 'right'],
  },
  exit: {
    scaleX: 0,
    transformOrigin: 'right',
  },
};

// Cosmic warp effect
const CosmicWarp = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-40"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.3, 0] }}
    transition={{ duration: 1.2 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-comet-blue/20 to-transparent transform -skew-x-12" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-aurora/10 to-transparent transform skew-x-12" />
  </motion.div>
);

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth cosmic feel
        }}
        className="min-h-screen"
        style={{
          willChange: 'transform, opacity, filter',
        }}
      >
        {/* Loading overlay with cosmic gradient */}
        <motion.div
          variants={loadingOverlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-cosmic-primary z-50"
        />

        {/* Cosmic warp effect */}
        <CosmicWarp />

        {/* Cosmic particles */}
        <CosmicParticles />

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Hook for triggering page transitions programmatically
export const usePageTransition = () => {
  const triggerTransition = (callback: () => void) => {
    // Add a small delay to allow for visual feedback before navigation
    setTimeout(callback, 100);
  };

  return { triggerTransition };
};

export default PageTransition;