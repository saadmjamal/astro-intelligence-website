'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// Enhanced Button with ripple effect
interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
        size,
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick?.(e);
  };

  const baseClasses = 'relative overflow-hidden font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-comet-blue focus-visible:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-cosmic-primary text-white shadow-cosmic-medium hover:shadow-cosmic-high',
    secondary: 'border-2 border-cosmic-comet-blue bg-transparent text-cosmic-comet-blue hover:bg-cosmic-star-dust hover:text-cosmic-aurora',
    ghost: 'bg-transparent text-cosmic-comet-blue hover:bg-cosmic-star-dust',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: variant === 'primary' ? 'var(--shadow-cosmic-high)' : 'var(--glow-cosmic-medium)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleClick}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      
      {children}
    </motion.button>
  );
};

// Enhanced Form Field with focus animations
interface AnimatedFormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export const AnimatedFormField: React.FC<AnimatedFormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Floating label */}
      <motion.label
        className={`absolute left-3 pointer-events-none transition-all duration-200 ${
          isFocused || hasValue
            ? 'top-0 text-xs text-cosmic-aurora bg-cosmic-black px-2 -translate-y-1/2'
            : 'top-1/2 text-base text-text-muted -translate-y-1/2'
        }`}
        animate={{
          fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
          color: isFocused ? 'var(--cosmic-aurora)' : error ? 'var(--cosmic-supernova)' : 'var(--text-muted)',
        }}
      >
        {label} {required && '*'}
      </motion.label>

      {/* Input field */}
      <motion.input
        type={type}
        placeholder={isFocused ? placeholder : ''}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full px-4 py-3 bg-cosmic-black border-2 rounded-lg transition-all duration-200 focus:outline-none ${
          error
            ? 'border-cosmic-supernova focus:border-cosmic-supernova'
            : 'border-cosmic-stellar focus:border-cosmic-aurora'
        }`}
        whileFocus={{ 
          boxShadow: error 
            ? '0 0 0 3px rgba(255, 64, 129, 0.2)' 
            : '0 0 0 3px rgba(0, 229, 255, 0.2)',
        }}
      />

      {/* Animated underline */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-cosmic-aurora`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-cosmic-supernova"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Animated Card with hover effects and glow
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowOnHover?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverable = true,
  glowOnHover = true,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const springConfig = { stiffness: 300, damping: 30 };
  const x = useSpring(rotateX, springConfig);
  const y = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={`relative bg-cosmic-black border border-cosmic-stellar rounded-xl p-6 transition-all duration-300 ${className}`}
      style={hoverable ? { rotateX: x, rotateY: y, transformStyle: 'preserve-3d' } : {}}
      onMouseMove={hoverable ? handleMouseMove : undefined}
      onMouseLeave={hoverable ? handleMouseLeave : undefined}
      whileHover={hoverable ? {
        y: -8,
        boxShadow: glowOnHover ? 'var(--shadow-cosmic-high)' : 'var(--shadow-cosmic-medium)',
        borderColor: 'var(--cosmic-comet-blue)',
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Cosmic glow effect */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 bg-gradient-cosmic-primary opacity-0 rounded-xl blur-xl -z-10"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

// Scroll-triggered reveal animation
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { x: 50, y: 0 };
      case 'right': return { x: -50, y: 0 };
      default: return { y: 50, x: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...getInitialPosition(),
        filter: 'blur(10px)',
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating action button with cosmic particles
export const FloatingActionButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = () => {
    // Generate particles on click
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    onClick?.();
  };

  return (
    <motion.button
      className={`relative w-14 h-14 bg-gradient-cosmic-primary rounded-full shadow-cosmic-medium flex items-center justify-center ${className}`}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: 'var(--shadow-cosmic-high)',
      }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 400, damping: 17 }
      }}
      onClick={handleClick}
    >
      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-cosmic-aurora rounded-full"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{ 
            scale: [0, 1, 0], 
            x: particle.x, 
            y: particle.y 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {children}
    </motion.button>
  );
};