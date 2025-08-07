'use client';

import React, { forwardRef, useState, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium interactive focus-visible-ring disabled:opacity-50 disabled:pointer-events-none touch-manipulation touch-target',
  {
    variants: {
      variant: {
        // Enhanced CTA hierarchy with prominence levels
        primary: 'cta-primary', // Highest prominence
        secondary: 'cta-secondary', // Medium prominence  
        tertiary: 'cta-subtle', // Low prominence
        ghost: 'cta-ghost', // Minimal prominence
        outline: 'bg-transparent text-offwhite border-2 border-offwhite button-hover hover:bg-offwhite hover:text-navy',
        default: 'cta-primary',
      },
      prominence: {
        critical: 'cta-primary shadow-glow animate-pulse-glow', // Critical actions
        high: 'cta-primary shadow-lg', // Important actions
        medium: 'cta-secondary', // Secondary actions
        low: 'cta-subtle', // Tertiary actions
        minimal: 'cta-ghost', // Link-style actions
      },
      size: {
        xs: 'h-8 px-3 text-xs font-medium rounded-md touch-target',
        sm: 'mobile-button-sm rounded-md',
        md: 'mobile-button rounded-lg',
        lg: 'mobile-button-lg rounded-lg touch-target-lg',
        xl: 'h-16 px-10 text-xl font-semibold rounded-xl touch-target-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      prominence: 'high',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, prominence, fullWidth, asChild, loading, icon, rightIcon, children, disabled, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Create ripple effect
      if (buttonRef.current && !disabled && !loading) {
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

    if (asChild) {
      // When asChild is true, we expect a single child element that we'll clone with the button styles
      const child = children as React.ReactElement;
      const childProps = (child.props || {}) as any;
      return React.cloneElement(child, {
        ...props,
        ...childProps,
        className: cn(buttonVariants({ variant, size, prominence, fullWidth }), className, childProps.className),
        ref,
      } as any);
    }
    
    return (
      <motion.button 
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          buttonVariants({ variant, size, prominence, fullWidth }), 
          'relative overflow-hidden',
          className
        )} 
        disabled={disabled || loading}
        onClick={handleClick as any}
        aria-label={loading ? "Loading..." : props['aria-label']}
        aria-describedby={loading ? "button-loading-status" : props['aria-describedby']}
        whileHover={!disabled && !loading ? { 
          scale: 1.02,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        } : undefined}
        whileTap={!disabled && !loading ? { 
          scale: 0.98,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        } : undefined}
        style={{ willChange: 'transform' }}
        {...(props as any)}
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

        {loading && (
          <>
            <motion.svg 
              className="mr-2 h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
              role="presentation"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </motion.svg>
            <span className="sr-only">Loading, please wait...</span>
          </>
        )}
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
