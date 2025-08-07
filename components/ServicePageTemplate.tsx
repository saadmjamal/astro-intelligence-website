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
  ctaDescription = "Let's discuss how this service can transform your business.",
  children,
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className={`absolute inset-0 bg-gradient-to-br ${heroGradient}`} />
        <div className="relative container-width">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-6xl">{icon}</span>
            <Heading as="h1" variant="h1" color="gradient">
              {title}
            </Heading>
          </div>
          <Text variant="lead" className="mb-8 max-w-3xl">
            {description}
          </Text>
          <div className="flex flex-col gap-4 sm:flex-row">
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
      <section className="section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Key Features & Capabilities
          </Heading>

          <div className="grid grid-gap-md md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="from-bg-card to-transparent border-subtle hover:border-magenta/50 rounded-2xl border bg-gradient-to-br card-padding-sm transition-colors"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <Heading as="h3" variant="h4" className="mb-3">
                  {feature.title}
                </Heading>
                <Text variant="body" className="text-muted-foreground mb-4">
                  {feature.description}
                </Text>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="text-magenta mt-1">•</span>
                      <Text variant="small" className="text-muted-foreground">
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
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Real-World Applications
          </Heading>

          <div className="grid grid-gap-md lg:grid-cols-2">
            {useCases.map((useCase) => (
              <div
                key={useCase.industry}
                className="from-bg-card to-transparent border-subtle rounded-2xl border bg-gradient-to-br card-padding"
              >
                <div className="text-magenta mb-2 text-sm font-semibold">{useCase.industry}</div>
                <Heading as="h3" variant="h4" className="mb-4">
                  {useCase.scenario}
                </Heading>
                <Text variant="body" className="text-muted-foreground mb-6">
                  {useCase.solution}
                </Text>
                <div className="space-y-2">
                  <Text variant="small" className="text-offwhite/90 font-semibold">
                    Key Results:
                  </Text>
                  {useCase.results.map((result) => (
                    <div key={result} className="flex items-center gap-2">
                      <span className="text-magenta">✓</span>
                      <Text variant="small" className="text-muted-foreground">
                        {result}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-magenta/10 bg-gradient-to-r to-purple-600/10 section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            {ctaTitle}
          </Heading>
          <Text variant="lead" className="mb-8">
            {ctaDescription}
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
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
