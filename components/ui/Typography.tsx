import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('font-heading tracking-tight', {
  variants: {
    variant: {
      // Enhanced scale relationships with perfect ratios
      hero: 'text-scale-hero font-black', // New largest scale
      display: 'text-scale-display font-bold', // New display scale
      title: 'text-scale-title font-bold', // Added title variant
      headline: 'text-scale-headline font-bold', // Added headline variant
      h1: 'text-scale-headline font-bold',
      h2: 'text-scale-title font-semibold',
      h3: 'text-scale-subtitle font-semibold',
      h4: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-[1.2]',
      h5: 'text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-[1.3]',
      h6: 'text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-[1.4]',
    },
    hierarchy: {
      primary: 'color-hierarchy-primary',
      secondary: 'color-hierarchy-secondary', 
      muted: 'color-hierarchy-muted',
      subtle: 'color-hierarchy-subtle',
      accent: 'color-hierarchy-accent',
    },
    emphasis: {
      hero: 'emphasis-hero',
      critical: 'emphasis-critical',
      high: 'emphasis-high',
      medium: 'emphasis-medium',
      normal: 'emphasis-normal',
      low: 'emphasis-low',
    },
    color: {
      default: 'text-primary-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-magenta',
      gradient: 'bg-gradient-to-r from-magenta-500 to-primary bg-clip-text text-transparent',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
  },
  defaultVariants: {
    variant: 'h1',
    color: 'default',
    weight: 'bold',
    hierarchy: 'primary',
    emphasis: 'high',
  },
});

export interface HeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, color, weight, hierarchy, emphasis, as = 'h1', ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ variant: variant || (as === 'div' || as === 'span' ? 'h1' : as), color, weight, hierarchy, emphasis, className }))}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

const textVariants = cva('font-body', {
  variants: {
    variant: {
      // Enhanced text scale system
      'hero-lead': 'text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light tracking-wide',
      lead: 'text-scale-lead font-light',
      'body-large': 'text-lg md:text-xl leading-[1.6]',
      body: 'text-scale-body',
      'body-small': 'text-scale-small',
      small: 'text-sm leading-[1.6]',
      caption: 'text-scale-caption',
      overline: 'text-xs md:text-sm font-semibold uppercase tracking-[0.1em] leading-tight',
    },
    hierarchy: {
      primary: 'color-hierarchy-primary',
      secondary: 'color-hierarchy-secondary',
      muted: 'color-hierarchy-muted',
      subtle: 'color-hierarchy-subtle',
      accent: 'color-hierarchy-accent',
    },
    emphasis: {
      normal: 'emphasis-normal',
      low: 'emphasis-low',
      subtle: 'emphasis-subtle',
      minimal: 'emphasis-minimal',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-subtle-foreground',
      accent: 'text-magenta',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    weight: 'normal',
    hierarchy: 'muted',
    emphasis: 'normal',
  },
});

export interface TextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, color, weight, hierarchy, emphasis, as = 'p', ...props }, ref) => {
    const Component = as;

    return <Component ref={ref} className={cn(textVariants({ variant, color, weight, hierarchy, emphasis, className }))} {...props} />;
  }
);

Text.displayName = 'Text';

export { Heading, Text, headingVariants, textVariants };
