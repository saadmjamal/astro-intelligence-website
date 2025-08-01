import { notFound } from 'next/navigation';
import { allCaseStudies } from 'contentlayer/generated';
import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useMDXComponent } from 'next-contentlayer2/hooks';

interface CaseStudyPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  return allCaseStudies.map((study) => ({
    slug: study.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const study = allCaseStudies.find((study) => study.slug === params.slug.join('/'));

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

// MDX Components (reuse from blog)
const mdxComponents = {
  // @ts-expect-error - MDX component props
  h1: ({ children }: any) => (
    <Heading as="h1" variant="h1" className="mt-12 mb-6">
      {children}
    </Heading>
  ),
  // @ts-expect-error - MDX component props
  h2: ({ children }: any) => (
    <Heading as="h2" variant="h2" className="mt-10 mb-4">
      {children}
    </Heading>
  ),
  // @ts-expect-error - MDX component props
  h3: ({ children }: any) => (
    <Heading as="h3" variant="h3" className="mt-8 mb-3">
      {children}
    </Heading>
  ),
  // @ts-expect-error - MDX component props
  p: ({ children }: any) => (
    <Text variant="body" className="text-offwhite/80 mb-6">
      {children}
    </Text>
  ),
  // @ts-expect-error - MDX component props
  ul: ({ children }: any) => (
    <ul className="text-offwhite/80 mb-6 list-inside list-disc space-y-2">{children}</ul>
  ),
  // @ts-expect-error - MDX component props
  ol: ({ children }: any) => (
    <ol className="text-offwhite/80 mb-6 list-inside list-decimal space-y-2">{children}</ol>
  ),
  // @ts-expect-error - MDX component props
  li: ({ children }: any) => (
    <li className="ml-4">
      <Text variant="body" as="span" className="text-offwhite/80">
        {children}
      </Text>
    </li>
  ),
  // @ts-expect-error - MDX component props
  blockquote: ({ children }: any) => (
    <blockquote className="border-magenta text-offwhite/70 mb-6 border-l-4 py-2 pl-6 italic">
      {children}
    </blockquote>
  ),
  // @ts-expect-error - MDX component props
  pre: ({ children }: any) => (
    <pre className="mb-6 overflow-x-auto rounded-xl bg-black/50 p-6">{children}</pre>
  ),
  // @ts-expect-error - MDX component props
  code: ({ children }: any) => (
    <code className="text-magenta rounded bg-black/30 px-2 py-1 text-sm">{children}</code>
  ),
  // @ts-expect-error - MDX component props
  table: ({ children }: any) => (
    <div className="mb-6 overflow-x-auto">
      <table className="divide-offwhite/20 min-w-full divide-y">{children}</table>
    </div>
  ),
  // @ts-expect-error - MDX component props
  thead: ({ children }: any) => <thead className="bg-offwhite/5">{children}</thead>,
  // @ts-expect-error - MDX component props
  th: ({ children }: any) => (
    <th className="text-offwhite px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
      {children}
    </th>
  ),
  // @ts-expect-error - MDX component props
  td: ({ children }: any) => (
    <td className="text-offwhite/80 px-6 py-4 text-sm whitespace-nowrap">{children}</td>
  ),
  // @ts-expect-error - MDX component props
  a: ({ href, children }: any) => (
    <Link href={href} className="text-magenta hover:text-magenta/80 underline transition-colors">
      {children}
    </Link>
  ),
  hr: () => <hr className="border-offwhite/20 my-12" />,
};

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = allCaseStudies.find((study) => study.slug === params.slug.join('/'));

  if (!study) {
    notFound();
  }

  const MDXContent = useMDXComponent(study.body.code);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-magenta/10 via-navy absolute inset-0 bg-gradient-to-br to-black" />
        <div className="relative mx-auto max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex flex-wrap gap-4">
                <span className="bg-magenta/10 text-magenta rounded-full px-4 py-2 text-sm font-medium">
                  {study.industry}
                </span>
                <span className="bg-offwhite/10 text-offwhite rounded-full px-4 py-2 text-sm">
                  {study.client}
                </span>
              </div>

              <Heading as="h1" variant="h1" className="mb-6">
                {study.title}
              </Heading>

              <Text variant="lead" className="text-offwhite/80 mb-8">
                {study.excerpt}
              </Text>

              <div className="flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="bg-offwhite/5 text-offwhite/60 rounded-full px-3 py-1 text-xs"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6">
              {/* @ts-expect-error - MDX component props */}
              {Object.entries(study.metrics).map(([key, metric]: [string, any]) => (
                <div
                  key={key}
                  className="from-offwhite/10 to-offwhite/5 rounded-2xl bg-gradient-to-br p-6 text-center"
                >
                  <div className="text-magenta mb-2 text-3xl font-bold">
                    {metric.improvement || metric.after || metric.value}
                  </div>
                  <div className="text-offwhite/80 mb-1 text-sm font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {metric.before && (
                    <div className="text-offwhite/60 text-xs">Previously: {metric.before}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <MDXContent components={mdxComponents} />
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Transformation Impact
          </Heading>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-5xl">📈</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Performance
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                Dramatic improvements in speed, reliability, and scalability
              </Text>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">💰</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Cost Efficiency
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                Significant reduction in operational costs and resource waste
              </Text>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🚀</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Innovation Speed
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                Faster time to market and improved developer productivity
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
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
    </article>
  );
}
