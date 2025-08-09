"use client";
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { RelatedContent, RelatedItem } from '@/components/ui/RelatedContent';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  relatedContent?: RelatedItem[];
  showBreadcrumbs?: boolean;
  showRelatedContent?: boolean;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  title?: string;
}

export function PageLayout({
  children,
  breadcrumbItems,
  relatedContent,
  showBreadcrumbs = true,
  showRelatedContent = true,
  className,
  maxWidth = '7xl',
  title: _title,
}: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('min-h-screen pt-20', className)}>
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 py-8', maxWidthClasses[maxWidth])}>
        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Related Content */}
        {showRelatedContent && relatedContent && relatedContent.length > 0 && (
          <aside className="mt-16">
            <RelatedContent
              items={relatedContent}
              title="You might also like"
              variant="grid"
              maxItems={3}
            />
          </aside>
        )}
      </div>
    </div>
  );
}

// Preset layouts for common page types
export function ServicePageLayout({ 
  children, 
  serviceName, 
  relatedContent, 
  ...props 
}: Omit<PageLayoutProps, 'breadcrumbItems'> & { serviceName?: string }) {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Services', href: '/services' },
    ...(serviceName ? [{ 
      label: serviceName, 
      href: `/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}`, 
      current: true 
    }] : [])
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems} relatedContent={relatedContent} {...props}>
      {children}
    </PageLayout>
  );
}

export function BlogPageLayout({ 
  children, 
  postTitle, 
  relatedContent, 
  ...props 
}: Omit<PageLayoutProps, 'breadcrumbItems'> & { postTitle?: string }) {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog' },
    ...(postTitle ? [{ 
      label: postTitle, 
      href: `/blog/${postTitle.toLowerCase().replace(/\s+/g, '-')}`, 
      current: true 
    }] : [])
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems} relatedContent={relatedContent} {...props}>
      {children}
    </PageLayout>
  );
}

export function PortfolioPageLayout({ 
  children, 
  projectName, 
  relatedContent, 
  ...props 
}: Omit<PageLayoutProps, 'breadcrumbItems'> & { projectName?: string }) {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Portfolio', href: '/portfolio' },
    ...(projectName ? [{ 
      label: projectName, 
      href: `/portfolio/${projectName.toLowerCase().replace(/\s+/g, '-')}`, 
      current: true 
    }] : [])
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems} relatedContent={relatedContent} {...props}>
      {children}
    </PageLayout>
  );
}

export default PageLayout;