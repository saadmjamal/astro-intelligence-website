import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { services, getServiceBySlug } from '@/lib/config/services.config';
import { generateSEOMetadata } from '@/lib/utils/metadata';
import { MarketingPageTemplate } from '@/components/templates/MarketingPageTemplate';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return generateSEOMetadata({
    title: service.title,
    description: service.description,
    keywords: [
      service.title,
      'AI',
      'Cloud',
      'DevOps',
      'Enterprise',
      ...service.features.slice(0, 3),
    ],
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const heroSection = (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="from-magenta-500/20 via-navy-800 to-navy-900 absolute inset-0 bg-gradient-to-br" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-6 text-6xl">{service.icon}</div>
          <Heading as="h1" variant="h1" className="mb-6">
            {service.title}
          </Heading>
          <Text variant="lead" className="mx-auto mb-8 max-w-3xl">
            {service.description}
          </Text>
          <Button size="lg" asChild>
            <Link href={service.cta.href}>{service.cta.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );

  const bodySection = (
    <>
      {/* Overview */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Heading as="h2" variant="h2" className="mb-8 text-center">
            Transform Your Business
          </Heading>
          <Text variant="lead" className="text-center text-gray-600 dark:text-gray-300">
            {service.longDescription}
          </Text>
        </div>
      </section>

      {/* Features */}
      <section className="dark:bg-navy-800/50 bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Key Features
          </Heading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <Card key={index} variant="elevated" className="h-full">
                <div className="flex items-start gap-4">
                  <div className="bg-magenta-500/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                    <span className="text-magenta-500 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <Text variant="body" className="font-semibold">
                      {feature}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Business Benefits
          </Heading>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <svg
                  className="text-magenta-500 h-6 w-6 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Text variant="body">{benefit}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const ctaSection = (
    <section className="from-magenta-500/10 bg-gradient-to-r to-purple-600/10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <Heading as="h2" variant="h2" className="mb-6">
          Ready to Get Started?
        </Heading>
        <Text variant="lead" className="mb-8">
          Let's discuss how {service.title} can transform your business.
        </Text>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={service.cta.href}>Schedule a Consultation</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/portfolio">View Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  );

  return <MarketingPageTemplate hero={heroSection} body={bodySection} cta={ctaSection} />;
}
