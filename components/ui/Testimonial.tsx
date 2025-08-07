'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
    image?: string;
  };
  rating?: number;
  project?: string;
  featured?: boolean;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-gradient-to-br from-bg-card to-transparent border border-subtle p-8 transition-all duration-300',
        'hover:border-magenta/50 hover:shadow-xl',
        className
      )}
    >
      {/* Quote Icon */}
      <Quote className="absolute top-6 right-6 h-8 w-8 text-magenta/20" />
      
      {/* Content */}
      <blockquote className="mb-6">
        <Text variant="body" className="text-offwhite/90 italic">
          "{testimonial.content}"
        </Text>
      </blockquote>

      {/* Rating */}
      {testimonial.rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'h-5 w-5',
                i < (testimonial.rating || 0) ? 'text-magenta fill-current' : 'text-offwhite/20'
              )}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-4">
        {testimonial.author.image ? (
          <Image
            src={testimonial.author.image}
            alt={testimonial.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-magenta to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold">
              {testimonial.author.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <div>
          <Text variant="small" className="font-semibold text-offwhite">
            {testimonial.author.name}
          </Text>
          <Text variant="small" className="text-muted-foreground">
            {testimonial.author.title} at {testimonial.author.company}
          </Text>
          {testimonial.project && (
            <Text variant="small" className="text-magenta/80 mt-1">
              {testimonial.project}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialCarousel({
  testimonials,
  className,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <div className={cn('relative', className)}>
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 h-9 w-9"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 h-9 w-9"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'w-8 bg-magenta'
                    : 'w-2 bg-offwhite/20 hover:bg-offwhite/40'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  className?: string;
  columns?: 1 | 2 | 3;
}

export function TestimonialGrid({
  testimonials,
  className,
  columns = 3,
}: TestimonialGridProps) {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  variant?: 'carousel' | 'grid';
  className?: string;
  columns?: 1 | 2 | 3;
}

export function TestimonialSection({
  title = 'What Our Clients Say',
  subtitle,
  testimonials,
  variant = 'carousel',
  className,
  columns = 3,
}: TestimonialSectionProps) {
  return (
    <section className={cn('py-20 px-4 sm:px-6 lg:px-8', className)}>
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-12">
          <Heading as="h2" variant="h2" color="gradient" className="mb-4">
            {title}
          </Heading>
          {subtitle && (
            <Text variant="lead" className="text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </Text>
          )}
        </div>

        {/* Testimonials */}
        {variant === 'carousel' ? (
          <TestimonialCarousel testimonials={testimonials} />
        ) : (
          <TestimonialGrid testimonials={testimonials} columns={columns} />
        )}
      </div>
    </section>
  );
}