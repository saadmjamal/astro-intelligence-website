import React from 'react';
import { cn } from '@/lib/utils';

interface MarketingPageTemplateProps {
  hero?: React.ReactNode;
  body?: React.ReactNode;
  cta?: React.ReactNode;
  className?: string;
}

export function MarketingPageTemplate({ hero, body, cta, className }: MarketingPageTemplateProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      {hero && <section className="hero-section">{hero}</section>}
      {body && <section className="body-section">{body}</section>}
      {cta && <section className="cta-section">{cta}</section>}
    </div>
  );
}
