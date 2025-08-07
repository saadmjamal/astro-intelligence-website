'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
}

export function Breadcrumb({ 
  items, 
  className, 
  showHome = true,
  separator = <ChevronRight className="h-4 w-4" aria-hidden="true" />
}: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumb items if not provided
  const breadcrumbItems = items || generateBreadcrumbItems(pathname);
  
  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <ol className="flex items-center space-x-2 text-sm">
        {showHome && (
          <li>
            <Link
              href="/"
              className="text-muted-foreground hover:text-magenta transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-navy rounded-sm px-1"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
        )}
        
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            {(showHome || index > 0) && (
              <span className="text-subtle-foreground">{separator}</span>
            )}
            
            {item.current ? (
              <span 
                className="text-magenta font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-magenta transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-navy rounded-sm px-1"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Auto-generate breadcrumb items from pathname
function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];
  
  // Route mapping for better labels
  const routeLabels: Record<string, string> = {
    'services': 'Services',
    'ai-consulting': 'AI Consulting',
    'cloud-architecture': 'Cloud Architecture',
    'ml-engineering': 'ML Engineering',
    'strategic-partnerships': 'Strategic Partnerships',
    'portfolio': 'Portfolio',
    'scripts': 'Scripts',
    'research-lab': 'Research Lab',
    'lab': 'Research Lab',
    'blog': 'Blog',
    'about': 'About',
    'contact': 'Contact',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'dashboard': 'Dashboard',
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
  };
  
  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    
    items.push({
      label: routeLabels[segment] || capitalizeFirst(segment.replace(/-/g, ' ')),
      href,
      current: isLast,
    });
  });
  
  return items;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Preset breadcrumb configurations for common pages
export const breadcrumbPresets = {
  services: (service?: string): BreadcrumbItem[] => [
    { label: 'Services', href: '/services' },
    ...(service ? [{ label: service, href: `/services/${service.toLowerCase().replace(/\s+/g, '-')}`, current: true }] : [])
  ],
  
  portfolio: (project?: string): BreadcrumbItem[] => [
    { label: 'Portfolio', href: '/portfolio' },
    ...(project ? [{ label: project, href: `/portfolio/${project.toLowerCase().replace(/\s+/g, '-')}`, current: true }] : [])
  ],
  
  blog: (post?: string): BreadcrumbItem[] => [
    { label: 'Blog', href: '/blog' },
    ...(post ? [{ label: post, href: `/blog/${post.toLowerCase().replace(/\s+/g, '-')}`, current: true }] : [])
  ],
  
  researchLab: (article?: string): BreadcrumbItem[] => [
    { label: 'Research Lab', href: '/research-lab' },
    ...(article ? [{ label: article, href: `/research-lab/${article.toLowerCase().replace(/\s+/g, '-')}`, current: true }] : [])
  ],
};

export default Breadcrumb;