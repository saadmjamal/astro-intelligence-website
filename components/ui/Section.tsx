import React from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text } from './Typography';
import { Badge } from './Badge';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'aside';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as = 'section', size = 'md', spacing = 'md', children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(
          'container-width',
          {
            // Size variants
            'section-padding-sm': size === 'sm',
            'section-padding': size === 'md',
            'section-padding-lg': size === 'lg',
            'section-padding-lg py-32': size === 'xl',
            
            // Spacing variants
            'space-y-0': spacing === 'none',
            'space-y-8': spacing === 'sm',
            'space-y-12': spacing === 'md',
            'space-y-16': spacing === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  overline?: string | React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  titleVariant?: 'display' | 'headline' | 'title';
  spacing?: 'sm' | 'md' | 'lg';
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ 
    className, 
    badge, 
    overline, 
    title, 
    subtitle, 
    description, 
    alignment = 'center',
    titleVariant = 'headline',
    spacing = 'md',
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'section-intro',
          {
            'text-left': alignment === 'left',
            'text-center': alignment === 'center',
            'text-right': alignment === 'right',
            'mb-8': spacing === 'sm',
            'mb-12': spacing === 'md',
            'mb-16': spacing === 'lg',
          },
          className
        )}
        {...props}
      >
        {badge && (
          <div className="badge mb-4">
            <Badge variant="secondary" className="badge-text">
              {badge}
            </Badge>
          </div>
        )}
        
        {overline && (
          <div className="overline mb-3">
            {typeof overline === 'string' ? (
              <Text variant="overline" hierarchy="subtle">
                {overline}
              </Text>
            ) : (
              overline
            )}
          </div>
        )}
        
        <Heading 
          as="h2" 
          variant={titleVariant} 
          emphasis="critical" 
          className="title mb-6"
        >
          {title}
        </Heading>
        
        {subtitle && (
          <Heading 
            as="h3" 
            variant="h3" 
            hierarchy="secondary" 
            className="subtitle mb-4"
          >
            {subtitle}
          </Heading>
        )}
        
        {description && (
          <Text 
            variant="body-large" 
            hierarchy="muted" 
            className="description"
          >
            {description}
          </Text>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: 'stack' | 'grid' | 'flex' | 'columns';
  spacing?: 'sm' | 'md' | 'lg';
  columns?: 1 | 2 | 3 | 4;
}

const SectionContent = React.forwardRef<HTMLDivElement, SectionContentProps>(
  ({ 
    className, 
    layout = 'stack', 
    spacing = 'md', 
    columns = 3,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'content-block-body',
          {
            // Layout variants
            'stack-md': layout === 'stack' && spacing === 'md',
            'stack-sm': layout === 'stack' && spacing === 'sm',
            'stack-lg': layout === 'stack' && spacing === 'lg',
            
            'mobile-grid grid-gap': layout === 'grid',
            'grid grid-cols-1 md:grid-cols-2': layout === 'grid' && columns === 2,
            'grid grid-cols-1 md:grid-cols-3': layout === 'grid' && columns === 3,
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': layout === 'grid' && columns === 4,
            
            'flex flex-col gap-6 lg:flex-row lg:gap-8': layout === 'flex',
            'columns-1 md:columns-2 lg:columns-3 gap-8': layout === 'columns',
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

SectionContent.displayName = 'SectionContent';

interface SectionFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cta' | 'navigation' | 'info';
  alignment?: 'left' | 'center' | 'right';
}

const SectionFooter = React.forwardRef<HTMLDivElement, SectionFooterProps>(
  ({ className, variant = 'cta', alignment = 'center', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'content-block-footer',
          {
            'text-left': alignment === 'left',
            'text-center': alignment === 'center',
            'text-right': alignment === 'right',
            'flex justify-center gap-4': variant === 'cta',
            'flex justify-between items-center': variant === 'navigation',
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

SectionFooter.displayName = 'SectionFooter';

export { Section, SectionHeader, SectionContent, SectionFooter };
export type { SectionProps, SectionHeaderProps, SectionContentProps, SectionFooterProps };