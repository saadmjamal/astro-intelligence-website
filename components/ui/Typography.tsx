import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  'font-heading font-bold tracking-tight',
  {
    variants: {
      variant: {
        h1: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
        h2: 'text-3xl md:text-4xl lg:text-5xl',
        h3: 'text-2xl md:text-3xl lg:text-4xl',
        h4: 'text-xl md:text-2xl lg:text-3xl',
        h5: 'text-lg md:text-xl lg:text-2xl',
        h6: 'text-base md:text-lg lg:text-xl',
      },
      color: {
        default: 'text-offwhite',
        magenta: 'text-magenta',
        gradient: 'bg-gradient-to-r from-magenta to-offwhite bg-clip-text text-transparent',
      },
    },
    defaultVariants: {
      variant: 'h1',
      color: 'default',
    },
  }
);

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, color, as = 'h1', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ variant: variant || as, color, className }))}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

const textVariants = cva(
  'font-body',
  {
    variants: {
      variant: {
        body: 'text-base md:text-lg leading-relaxed',
        lead: 'text-lg md:text-xl lg:text-2xl leading-relaxed font-light',
        small: 'text-sm md:text-base',
        caption: 'text-xs md:text-sm text-offwhite/70',
      },
    },
    defaultVariants: {
      variant: 'body',
    },
  }
);

export interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, as = 'p', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Heading, Text, headingVariants, textVariants };