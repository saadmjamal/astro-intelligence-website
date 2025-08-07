import { Metadata } from 'next';
import Link from 'next/link';
import { allCaseStudies } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MetricCounter } from '@/components/ui/MetricCounter';
import { PageLayout } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Portfolio - Astro Intelligence Inc',
  description:
    'Success stories and case studies showcasing our impact on enterprise transformation.',
};

export default function PortfolioPage() {
  // Sort case studies by date
  const caseStudies = allCaseStudies.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // Calculate aggregate metrics
  const aggregateMetrics = {
    clientsServed: 50,
    projectsCompleted: 200,
    costSavings: 125,
    uptimeAchieved: 99.99,
  };

  const relatedContent = [
    {
      id: 'cloud-engineering',
      title: 'Cloud Engineering Services',
      excerpt: 'Learn about our comprehensive cloud solutions',
      href: '/services/cloud-engineering',
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      excerpt: 'Discover our AI transformation capabilities',
      href: '/services/ai-machine-learning',
    },
    {
      id: 'start-project',
      title: 'Start Your Project',
      excerpt: 'Schedule a consultation to discuss your needs',
      href: '/book-call',
    },
  ];

  return (
    <PageLayout relatedContent={relatedContent}>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Success Stories
          </Heading>
          <Text variant="lead" className="mx-auto mb-12 max-w-3xl">
            Real transformations, measurable impact. Explore how we've helped enterprises
            revolutionize their technology infrastructure.
          </Text>

          {/* Metrics */}
          <div className="mt-16 grid grid-cols-2 grid-gap-md md:grid-cols-4">
            <MetricCounter
              value={aggregateMetrics.clientsServed}
              suffix="+"
              label="Clients Served"
              duration={2}
            />
            <MetricCounter
              value={aggregateMetrics.projectsCompleted}
              suffix="+"
              label="Projects Completed"
              duration={2.5}
            />
            <MetricCounter
              value={aggregateMetrics.costSavings}
              prefix="$"
              suffix="M+"
              label="Total Savings"
              duration={3}
            />
            <MetricCounter
              value={aggregateMetrics.uptimeAchieved}
              suffix="%"
              label="Average Uptime"
              duration={2}
            />
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-gap-md md:grid-cols-2">
            {caseStudies.map((study) => (
              <article
                key={study._id}
                className="group from-bg-card to-transparent border-subtle hover:border-magenta/50 relative overflow-hidden rounded-2xl border bg-gradient-to-br transition-all duration-300"
              >
                <div className="card-padding">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <div className="text-magenta mb-2 text-sm font-semibold">
                        {study.industry}
                      </div>
                      <Heading as="h2" variant="h3" className="mb-2">
                        <Link href={study.url} className="hover:text-magenta transition-colors">
                          {study.title}
                        </Link>
                      </Heading>
                      <Text variant="body" className="text-muted-foreground">
                        {study.client}
                      </Text>
                    </div>
                  </div>

                  {/* Description */}
                  <Text variant="body" className="text-muted-foreground mb-6">
                    {study.excerpt}
                  </Text>

                  {/* Key Metrics */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    {Object.entries(study.metrics)
                      .slice(0, 2)
                      .map(([key, metric]: [string, any]) => (
                        <div key={key} className="rounded-lg bg-black/30 p-4">
                          <div className="text-magenta mb-1 text-2xl font-bold">
                            {metric.improvement || metric.value}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Services Used */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="bg-card text-muted-foreground rounded-full px-3 py-1 text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button variant="ghost" size="sm" asChild className="w-full justify-center">
                    <Link href={study.url}>
                      Read Full Case Study
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </Button>
                </div>

                {/* Gradient Overlay */}
                <div className="from-magenta/0 to-magenta/5 pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </article>
            ))}
          </div>

          {/* More Case Studies Coming Soon */}
          <div className="mt-12 text-center">
            <div className="from-magenta/10 inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r to-purple-600/10 px-6 py-4">
              <span className="text-3xl">🚀</span>
              <div className="text-left">
                <Heading as="h3" variant="h5" className="mb-1">
                  More Success Stories Coming Soon
                </Heading>
                <Text variant="small" className="text-muted-foreground">
                  We're documenting more transformations. Check back regularly!
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Industries We Transform
          </Heading>

          <div className="grid grid-gap md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Financial Services', icon: '🏦' },
              { name: 'Healthcare', icon: '🏥' },
              { name: 'E-Commerce', icon: '🛒' },
              { name: 'Media & Entertainment', icon: '🎬' },
              { name: 'SaaS', icon: '☁️' },
              { name: 'Gaming', icon: '🎮' },
            ].map((industry) => (
              <div
                key={industry.name}
                className="from-bg-card to-transparent border-subtle hover:border-magenta/50 rounded-2xl border bg-gradient-to-br card-padding-sm text-center transition-colors"
              >
                <div className="mb-3 text-4xl">{industry.icon}</div>
                <Text variant="small" className="font-medium">
                  {industry.name}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-magenta-500/10 bg-gradient-to-r to-purple-600/10 section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Achieve Similar Results?
          </Heading>
          <Text variant="lead" className="mb-8">
            Join companies achieving 30% cost reduction and 5× faster deployment. 
            Let's discuss how we can transform your operations.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact?type=consultation">Schedule Your Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
          <Text variant="small" className="mt-6 text-muted-foreground">
            Free consultation • ROI assessment included • No commitment required
          </Text>
        </div>
      </section>
    </PageLayout>
  );
}
