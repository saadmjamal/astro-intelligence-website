'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Heading, Text } from './Typography';
import { Button } from './Button';

export interface RelatedItem {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  author?: string;
  publishDate?: string;
  readTime?: string;
  category?: string;
  tags?: string[];
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
  className?: string;
  variant?: 'grid' | 'list' | 'carousel';
  showImages?: boolean;
  showMeta?: boolean;
  maxItems?: number;
}

export function RelatedContent({
  items,
  title = 'Related Content',
  className,
  variant = 'grid',
  showImages = true,
  showMeta = true,
  maxItems = 3,
}: RelatedContentProps) {
  const displayItems = items.slice(0, maxItems);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-8', className)} aria-labelledby="related-content-title">
      <div className="mb-6">
        <Heading id="related-content-title" variant="h2" className="mb-2">
          {title}
        </Heading>
        <div className="h-1 w-12 bg-magenta rounded-full" />
      </div>

      <div
        className={cn({
          'grid gap-6 md:grid-cols-2 lg:grid-cols-3': variant === 'grid',
          'space-y-6': variant === 'list',
          'flex gap-6 overflow-x-auto pb-4': variant === 'carousel',
        })}
      >
        {displayItems.map((item, index) => (
          <RelatedItem
            key={item.id}
            item={item}
            variant={variant}
            showImages={showImages}
            showMeta={showMeta}
            priority={index < 2} // Prioritize loading first 2 images
          />
        ))}
      </div>
    </section>
  );
}

interface RelatedItemProps {
  item: RelatedItem;
  variant: 'grid' | 'list' | 'carousel';
  showImages: boolean;
  showMeta: boolean;
  priority?: boolean;
}

function RelatedItem({ item, variant, showImages, showMeta, priority = false }: RelatedItemProps) {
  const isHorizontal = variant === 'list';
  const isCarousel = variant === 'carousel';

  return (
    <article
      className={cn(
        'group border border-subtle rounded-lg overflow-hidden bg-navy/30 hover:bg-navy/50 transition-all duration-300 hover:border-magenta/20',
        {
          'flex gap-4': isHorizontal,
          'min-w-[300px]': isCarousel,
        }
      )}
    >
      {showImages && item.image && (
        <div
          className={cn('relative overflow-hidden', {
            'aspect-video': variant === 'grid' || isCarousel,
            'w-24 h-24 flex-shrink-0': isHorizontal,
          })}
        >
          <Image
            src={item.image}
            alt={`Cover image for ${item.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
          />
          {item.category && (
            <span className="absolute top-2 left-2 bg-magenta text-navy text-xs font-medium px-2 py-1 rounded">
              {item.category}
            </span>
          )}
        </div>
      )}

      <div className={cn('p-4 flex-1', { 'py-2': isHorizontal })}>
        {showMeta && (item.author || item.publishDate || item.readTime) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            {item.author && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {item.author}
              </span>
            )}
            {item.publishDate && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.publishDate}
              </span>
            )}
            {item.readTime && (
              <span>{item.readTime}</span>
            )}
          </div>
        )}

        <Heading
          variant={isHorizontal ? 'h4' : 'h3'}
          className="mb-2 group-hover:text-magenta transition-colors line-clamp-2"
        >
          <Link
            href={item.href}
            className="focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-navy rounded-sm"
          >
            {item.title}
          </Link>
        </Heading>

        <Text
          variant={isHorizontal ? 'small' : 'body'}
          className="text-muted-foreground mb-4 line-clamp-2"
        >
          {item.excerpt}
        </Text>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto font-medium group/btn"
          asChild
        >
          <Link href={item.href}>
            Read more
            <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

// Utility function to generate related content based on current page
export function generateRelatedContent(
  currentPath: string,
  allContent: RelatedItem[]
): RelatedItem[] {
  // Simple algorithm - can be enhanced with more sophisticated matching
  const pathSegments = currentPath.split('/').filter(Boolean);
  const currentCategory = pathSegments[0];

  return allContent
    .filter((item) => {
      // Don't include current page
      if (item.href === currentPath) return false;
      
      // Prefer items from same category
      const itemSegments = item.href.split('/').filter(Boolean);
      return itemSegments[0] === currentCategory;
    })
    .slice(0, 6); // Return up to 6 related items
}

export default RelatedContent;