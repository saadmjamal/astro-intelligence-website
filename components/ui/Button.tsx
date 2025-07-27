'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-navy disabled:opacity-50 disabled:pointer-events-none touch-manipulation',
  {
    variants: {
      variant: {
        primary: 'bg-magenta text-navy hover:bg-opacity-90 active:scale-95',
        secondary:
          'bg-transparent text-offwhite border-2 border-magenta hover:bg-magenta hover:text-navy active:scale-95',
        ghost: 'bg-transparent text-offwhite hover:bg-offwhite hover:bg-opacity-10 active:scale-95',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 text-base rounded-lg',
        lg: 'h-14 px-8 text-lg rounded-lg min-w-[44px]', // Mobile-friendly touch target
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
