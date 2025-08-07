import { notFound } from 'next/navigation';
import { allCaseStudies } from 'contentlayer/generated';
import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MDXContent } from '@/components/MDXContent';
import { PageLayout } from '@/components/layout/PageLayout';
import { ImageGalleryWrapper as ImageGallery } from '@/components/ui/DynamicImageGallery';
import { BeforeAfterSliderWrapper as BeforeAfterSlider } from '@/components/ui/DynamicBeforeAfterSlider';
import { ProgressiveImage } from '@/components/ui/ProgressiveImage';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return allCaseStudies.map((study) => ({
    slug: study.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = allCaseStudies.find((study) => study.slug === resolvedParams.slug.join('/'));

  if (!study) {
    return {};
  }

  return {
    title: `${study.title} - Astro Intelligence Case Study`,
    description: study.excerpt,
    openGraph: {
      title: study.title,
      description: study.excerpt,
      type: 'article',
      publishedTime: study.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: study.title,
      description: study.excerpt,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const study = allCaseStudies.find((study) => study.slug === resolvedParams.slug.join('/'));

  if (!study) {
    notFound();
  }

  // Generate custom breadcrumb items for this case study
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: study.title, href: `/portfolio/${resolvedParams.slug.join('/')}` },
  ];

  // Get related case studies
  const relatedCaseStudies = allCaseStudies
    .filter((s) => s._id !== study._id)
    .filter((s) => 
      s.industry === study.industry || 
      s.services.some(service => study.services.includes(service))
    )
    .slice(0, 3)
    .map((s) => ({
      id: s._id,
      title: s.title,
      excerpt: s.excerpt,
      href: s.url,
      publishDate: s.date,
      author: 'Saad Jamal',
      tags: [s.industry, ...s.services.slice(0, 2)],
    }));

  return (
    <PageLayout breadcrumbItems={breadcrumbItems} relatedContent={relatedCaseStudies}>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-magenta/10 via-navy absolute inset-0 bg-gradient-to-br to-black" />
        <div className="relative mx-auto max-w-5xl">
          <div className="grid items-center grid-gap-lg lg:grid-cols-2">
            <div>
              <div className="mb-6 flex flex-wrap gap-4">
                <span className="bg-magenta/10 text-magenta rounded-full px-4 py-2 text-sm font-medium">
                  {study.industry}
                </span>
                <span className="bg-gray-800 text-offwhite rounded-full px-4 py-2 text-sm">
                  {study.client}
                </span>
              </div>

              <Heading as="h1" variant="h1" className="mb-6">
                {study.title}
              </Heading>

              <Text variant="lead" className="text-secondary-foreground mb-8">
                {study.excerpt}
              </Text>

              <div className="flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="bg-card text-muted-foreground rounded-full px-3 py-1 text-xs"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 grid-gap">
              {Object.entries(study.metrics).map(([key, metric]: [string, any]) => (
                <div
                  key={key}
                  className="from-offwhite/10 to-offwhite/5 rounded-2xl bg-gradient-to-br card-padding-sm text-center"
                >
                  <div className="text-magenta mb-2 text-3xl font-bold">
                    {metric.improvement || metric.after || metric.value}
                  </div>
                  <div className="text-secondary-foreground mb-1 text-sm font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {metric.before && (
                    <div className="text-muted-foreground text-xs">Previously: {metric.before}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="content-width">
          <div className="prose prose-invert max-w-none">
            <MDXContent code={study.body.code} />
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      {study.beforeAfter && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Heading as="h2" variant="h2" className="mb-12 text-center">
              Architecture Transformation
            </Heading>
            <BeforeAfterSlider
              before={study.beforeAfter.before}
              after={study.beforeAfter.after}
              className="mb-8"
            />
          </div>
        </section>
      )}

      {/* Project Gallery */}
      {study.images && study.images.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-card">
          <div className="container-width">
            <Heading as="h2" variant="h2" className="mb-12 text-center">
              Project Screenshots
            </Heading>
            <ImageGallery
              images={study.images}
              columns={2}
              aspectRatio="16:9"
            />
          </div>
        </section>
      )}

      {/* Architecture Diagrams */}
      {study.architectureDiagrams && study.architectureDiagrams.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="container-width">
            <Heading as="h2" variant="h2" className="mb-12 text-center">
              Technical Architecture
            </Heading>
            <div className="space-y-16">
              {study.architectureDiagrams.map((diagram: any, index: number) => (
                <div key={index} className="grid grid-gap-md lg:grid-cols-2 items-center">
                  <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-subtle">
                      <ProgressiveImage
                        src={diagram.src}
                        alt={diagram.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0} // First image gets priority
                        progressive={true}
                        quality={90} // Higher quality for technical diagrams
                        lazy={index > 0} // Only lazy load images after the first
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                    <Heading as="h3" variant="h3" className="mb-4">
                      {diagram.caption}
                    </Heading>
                    <Text variant="body" className="text-muted-foreground">
                      {diagram.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Summary */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Transformation Impact
          </Heading>

          <div className="grid grid-gap-md md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-5xl">📈</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Performance
              </Heading>
              <Text variant="body" className="text-muted-foreground">
                Dramatic improvements in speed, reliability, and scalability
              </Text>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">💰</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Cost Efficiency
              </Heading>
              <Text variant="body" className="text-muted-foreground">
                Significant reduction in operational costs and resource waste
              </Text>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🚀</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Innovation Speed
              </Heading>
              <Text variant="body" className="text-muted-foreground">
                Faster time to market and improved developer productivity
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Transform Your Business?
          </Heading>
          <Text variant="lead" className="mb-8">
            Let's discuss how we can help you achieve similar results.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/book-call">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portfolio">View More Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
