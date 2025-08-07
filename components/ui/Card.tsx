import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass' | 'floating' | 'minimal';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hover?: boolean;
  hierarchy?: 'primary' | 'secondary' | 'tertiary';
  prominence?: 'high' | 'medium' | 'low';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', rounded = 'lg', hover = false, hierarchy = 'secondary', prominence = 'medium', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'interactive',
          hover && 'card-hover',
          {
            // Enhanced variants with hierarchy
            'bg-layer-raised border border-subtle':
              variant === 'default',
            'bg-transparent border-2 border-default': variant === 'outlined',
            'bg-layer-elevated shadow-lg hover:shadow-xl': variant === 'elevated',
            'bg-layer-floating': variant === 'floating',
            'bg-layer-modal': variant === 'glass',
            'bg-transparent border-none': variant === 'minimal',
            
            // Hierarchy levels
            'border-magenta/20 shadow-md': hierarchy === 'primary',
            'border-subtle': hierarchy === 'secondary',
            'border-subtle/50': hierarchy === 'tertiary',
            
            // Prominence levels
            'shadow-xl border-magenta/30': prominence === 'high',
            'shadow-md': prominence === 'medium',
            'shadow-sm': prominence === 'low',
            
            // Padding
            'p-0': padding === 'none',
            'mobile-card-sm': padding === 'sm',
            'mobile-card': padding === 'md',
            'mobile-card-lg': padding === 'lg',
            'p-8 sm:p-10 md:p-12': padding === 'xl',
            
            // Rounded
            'rounded-none': rounded === 'none',
            'rounded-sm': rounded === 'sm',
            'rounded-md': rounded === 'md',
            'rounded-lg': rounded === 'lg',
            'rounded-xl': rounded === 'xl',
            'rounded-full': rounded === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-1.5 mobile-padding-sm', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { hierarchy?: 'primary' | 'secondary' | 'tertiary' }
>(({ className, hierarchy = 'secondary', ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h3
    ref={ref}
    className={cn(
      'text-scale-subtitle leading-tight font-semibold tracking-tight',
      {
        'emphasis-high': hierarchy === 'primary',
        'emphasis-medium': hierarchy === 'secondary', 
        'emphasis-normal': hierarchy === 'tertiary',
      },
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { hierarchy?: 'primary' | 'secondary' | 'tertiary' }
>(({ className, hierarchy = 'secondary', ...props }, ref) => (
  <p 
    ref={ref} 
    className={cn(
      'text-scale-body leading-relaxed',
      {
        'color-hierarchy-secondary': hierarchy === 'primary',
        'color-hierarchy-muted': hierarchy === 'secondary',
        'color-hierarchy-subtle': hierarchy === 'tertiary',
      }, 
      className
    )} 
    {...props} 
  />
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mobile-padding-sm pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center mobile-padding-sm pt-0', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
