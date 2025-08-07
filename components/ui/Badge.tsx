import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
  size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'secondary', size = 'sm', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium transition-colors',
          {
            // Sizes
            'px-2.5 py-0.5 text-xs rounded-full': size === 'sm',
            'px-3 py-1 text-sm rounded-full': size === 'md',
            // Variants
            'bg-primary text-white': variant === 'default',
            'bg-gray-100 dark:bg-gray-800 text-muted-foreground': variant === 'secondary',
            'border border-gray-200 dark:border-gray-700 text-muted-foreground': variant === 'outline',
            'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300': variant === 'destructive',
            'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300': variant === 'success',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export default Badge;