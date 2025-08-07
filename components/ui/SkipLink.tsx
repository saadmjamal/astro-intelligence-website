'use client';

import { cn } from '@/lib/utils';

interface SkipLinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SkipLink({ 
  href = '#main-content', 
  className,
  children = 'Skip to main content' 
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'absolute left-0 top-0 z-[100] bg-magenta text-black px-4 py-2 font-medium min-h-[44px] min-w-[44px] flex items-center justify-center',
        'transform -translate-y-full focus:translate-y-0',
        'transition-transform duration-200',
        'focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2',
        'touch-target',
        className
      )}
    >
      {children}
    </a>
  );
}