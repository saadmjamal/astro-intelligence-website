import { ReactNode } from 'react';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface Feature {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

interface UseCase {
  industry: string;
  scenario: string;
  solution: string;
  results: string[];
}

interface ServicePageTemplateProps {
  title: string;
  icon: string;
  description: string;
  heroGradient?: string;
  features: Feature[];
  useCases: UseCase[];
  ctaTitle?: string;
  ctaDescription?: string;
  children?: ReactNode;
}

export function ServicePageTemplate({
  title,
  icon,
  description,
  heroGradient = 'from-magenta/20 via-navy to-black',
  features,
  useCases,
  ctaTitle = 'Ready to Get Started?',
  ctaDescription = 'Let\'s discuss how this service can transform your business.',
  children
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${heroGradient}`} />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{icon}</span>
            <Heading as="h1" variant="h1" color="gradient">
              {title}
            </Heading>
          </div>
          <Text variant="lead" className="max-w-3xl mb-8">
            {description}
          </Text>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/book-call">Get Started</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Key Features & Capabilities
          </Heading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-6 hover:border-magenta/50 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <Heading as="h3" variant="h4" className="mb-3">
                  {feature.title}
                </Heading>
                <Text variant="body" className="text-offwhite/70 mb-4">
                  {feature.description}
                </Text>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="text-magenta mt-1">•</span>
                      <Text variant="small" className="text-offwhite/60">
                        {detail}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Content Section */}
      {children}

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Real-World Applications
          </Heading>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.industry} className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-8">
                <div className="text-magenta text-sm font-semibold mb-2">{useCase.industry}</div>
                <Heading as="h3" variant="h4" className="mb-4">
                  {useCase.scenario}
                </Heading>
                <Text variant="body" className="text-offwhite/70 mb-6">
                  {useCase.solution}
                </Text>
                <div className="space-y-2">
                  <Text variant="small" className="font-semibold text-offwhite/90">Key Results:</Text>
                  {useCase.results.map((result) => (
                    <div key={result} className="flex items-center gap-2">
                      <span className="text-magenta">✓</span>
                      <Text variant="small" className="text-offwhite/70">{result}</Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/10 to-purple-600/10">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            {ctaTitle}
          </Heading>
          <Text variant="lead" className="mb-8">
            {ctaDescription}
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book-call">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portfolio">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}