import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', rounded = 'lg', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-200',
          {
            // Variants
            'dark:bg-navy-800 dark:border-navy-700 border border-gray-200 bg-white':
              variant === 'default',
            'dark:border-navy-700 border-2 border-gray-200 bg-transparent': variant === 'outlined',
            'dark:bg-navy-800 bg-white shadow-lg hover:shadow-xl': variant === 'elevated',
            'dark:bg-navy-800/80 dark:border-navy-700/50 border border-gray-200/50 bg-white/80 backdrop-blur-md':
              variant === 'glass',
            // Padding
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
            'p-10': padding === 'xl',
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
    <div ref={ref} className={cn('space-y-1.5 p-6', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl leading-none font-semibold tracking-tight', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-600 dark:text-gray-300', className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
