'use client';

import { SkipLink } from './SkipLink';

/**
 * Comprehensive skip navigation component for WCAG 2.1 AA compliance
 * Provides multiple skip links for better accessibility
 */
export function SkipNavigation() {
  return (
    <div className="skip-navigation" role="navigation" aria-label="Skip navigation">
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>
      <SkipLink 
        href="#primary-navigation" 
        className="absolute left-0 top-12 z-[100] bg-magenta text-black px-4 py-2 font-medium min-h-[44px] min-w-[44px] flex items-center justify-center transform -translate-y-full focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 touch-target"
      >
        Skip to navigation
      </SkipLink>
      <SkipLink 
        href="#footer" 
        className="absolute left-0 top-24 z-[100] bg-magenta text-black px-4 py-2 font-medium min-h-[44px] min-w-[44px] flex items-center justify-center transform -translate-y-full focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 touch-target"
      >
        Skip to footer
      </SkipLink>
    </div>
  );
}

/**
 * Main content wrapper with proper landmark role
 */
interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main 
      id="main-content" 
      role="main" 
      className={className}
      aria-label="Main content"
    >
      {children}
    </main>
  );
}

/**
 * Primary navigation wrapper with proper landmark role
 */
interface PrimaryNavigationProps {
  children: React.ReactNode;
  className?: string;
}

export function PrimaryNavigation({ children, className }: PrimaryNavigationProps) {
  return (
    <nav 
      id="primary-navigation" 
      role="navigation" 
      className={className}
      aria-label="Main navigation"
    >
      {children}
    </nav>
  );
}

/**
 * Footer wrapper with proper landmark role
 */
interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Footer({ children, className }: FooterProps) {
  return (
    <footer 
      id="footer" 
      role="contentinfo" 
      className={className}
      aria-label="Site footer"
    >
      {children}
    </footer>
  );
}