'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnimationPreferences } from './AnimationProvider';

// Interface moved inline to avoid unused warning
// Particle interface defined at usage point

interface CosmicParticlesProps {
  count?: number;
  className?: string;
  interactive?: boolean;
  density?: 'low' | 'medium' | 'high';
}

export const CosmicParticles: React.FC<CosmicParticlesProps> = ({
  count = 25, // PERFORMANCE FIX: Reduced default from 50 to 25
  className = '',
  interactive = false,
  density = 'medium',
}) => {
  const { animationsEnabled } = useAnimationPreferences();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Adjust particle count based on density and performance
  const particleCount = useMemo(() => {
    const densityMultiplier = {
      low: 0.5,
      medium: 1,
      high: 2,
    };
    
    // PERFORMANCE FIX: Drastically reduce particles on mobile for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const mobileMultiplier = isMobile ? 0.2 : 0.8; // Reduced from 0.3 to 0.2 for mobile, 1 to 0.8 for desktop
    
    // Cap maximum particles for performance
    const maxParticles = isMobile ? 10 : 30; // Maximum 10 on mobile, 30 on desktop
    const calculatedCount = Math.floor(count * densityMultiplier[density] * mobileMultiplier);
    
    return Math.min(calculatedCount, maxParticles);
  }, [count, density]);

  // Generate particles with cosmic colors
  const particles = useMemo(() => {
    const colors = [
      'var(--cosmic-comet-blue)',
      'var(--cosmic-aurora)',
      'var(--cosmic-plasma)',
      'var(--cosmic-pulsar)',
      '#FFFFFF',
    ];

    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    } as {
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
    }));
  }, [particleCount]);

  // Animation loop for floating particles
  useEffect(() => {
    if (!animationsEnabled || !containerRef.current) return;

    const startTime = Date.now();
    const particleElements = containerRef.current.children;

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - startTime) / 1000;

      Array.from(particleElements).forEach((element, index) => {
        const particle = particles[index];
        if (!particle) return;

        const htmlElement = element as HTMLElement;
        
        // Calculate floating motion
        const floatY = Math.sin(deltaTime * particle.speed + particle.id) * 20;
        const floatX = Math.cos(deltaTime * particle.speed * 0.5 + particle.id) * 10;
        
        // Apply transform with GPU acceleration
        htmlElement.style.transform = `translate3d(${floatX}px, ${floatY}px, 0)`;
        
        // Subtle opacity pulse
        const opacity = particle.opacity + Math.sin(deltaTime * 2 + particle.id) * 0.2;
        htmlElement.style.opacity = Math.max(0.1, Math.min(1, opacity)).toString();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationsEnabled, particles]);

  // Mouse interaction effect
  useEffect(() => {
    if (!interactive || !animationsEnabled || !containerRef.current) return;

    const container = containerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      Array.from(container.children).forEach((element, index) => {
        const particle = particles[index];
        if (!particle) return;

        const htmlElement = element as HTMLElement;
        const distance = Math.sqrt(
          Math.pow(mouseX - particle.x, 2) + Math.pow(mouseY - particle.y, 2)
        );

        // Repel particles from cursor
        if (distance < 15) {
          const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX);
          const force = (15 - distance) / 15;
          const offsetX = Math.cos(angle) * force * 20;
          const offsetY = Math.sin(angle) * force * 20;

          htmlElement.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
          htmlElement.style.opacity = '1';
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, animationsEnabled, particles]);

  if (!animationsEnabled) {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        {/* Static cosmic background for reduced motion */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-cosmic-comet-blue/10 via-transparent to-cosmic-aurora/10" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ willChange: 'transform' }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            willChange: 'transform, opacity',
            filter: particle.size > 2 ? 'blur(0.5px)' : 'none',
            boxShadow: particle.size > 2 ? `0 0 ${particle.size * 2}px ${particle.color}` : 'none',
          }}
        />
      ))}
      
      {/* Additional cosmic atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-star-dust via-transparent to-cosmic-nebula-mist opacity-30" />
    </div>
  );
};

// Loading particles for page transitions
export const LoadingParticles: React.FC = () => {
  const { animationsEnabled } = useAnimationPreferences();

  if (!animationsEnabled) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cosmic-aurora rounded-full"
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
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default CosmicParticles;