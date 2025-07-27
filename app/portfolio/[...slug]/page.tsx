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
  const study = allCaseStudies.find(
    (study) => study.slug === params.slug.join('/')
  );

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
  h1: ({ children }: any) => (
    <Heading as="h1" variant="h1" className="mb-6 mt-12">
      {children}
    </Heading>
  ),
  h2: ({ children }: any) => (
    <Heading as="h2" variant="h2" className="mb-4 mt-10">
      {children}
    </Heading>
  ),
  h3: ({ children }: any) => (
    <Heading as="h3" variant="h3" className="mb-3 mt-8">
      {children}
    </Heading>
  ),
  p: ({ children }: any) => (
    <Text variant="body" className="mb-6 text-offwhite/80">
      {children}
    </Text>
  ),
  ul: ({ children }: any) => (
    <ul className="mb-6 space-y-2 list-disc list-inside text-offwhite/80">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="mb-6 space-y-2 list-decimal list-inside text-offwhite/80">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="ml-4">
      <Text variant="body" as="span" className="text-offwhite/80">
        {children}
      </Text>
    </li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-magenta pl-6 py-2 mb-6 italic text-offwhite/70">
      {children}
    </blockquote>
  ),
  pre: ({ children }: any) => (
    <pre className="mb-6 p-6 bg-black/50 rounded-xl overflow-x-auto">
      {children}
    </pre>
  ),
  code: ({ children }: any) => (
    <code className="px-2 py-1 bg-black/30 rounded text-magenta text-sm">
      {children}
    </code>
  ),
  table: ({ children }: any) => (
    <div className="mb-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-offwhite/20">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-offwhite/5">{children}</thead>
  ),
  th: ({ children }: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-offwhite uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-offwhite/80">
      {children}
    </td>
  ),
  a: ({ href, children }: any) => (
    <Link href={href} className="text-magenta hover:text-magenta/80 underline transition-colors">
      {children}
    </Link>
  ),
  hr: () => <hr className="my-12 border-offwhite/20" />,
};

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = allCaseStudies.find(
    (study) => study.slug === params.slug.join('/')
  );

  if (!study) {
    notFound();
  }

  const MDXContent = useMDXComponent(study.body.code);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-navy to-black" />
        <div className="relative mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="px-4 py-2 bg-magenta/10 text-magenta rounded-full text-sm font-medium">
                  {study.industry}
                </span>
                <span className="px-4 py-2 bg-offwhite/10 text-offwhite rounded-full text-sm">
                  {study.client}
                </span>
              </div>
              
              <Heading as="h1" variant="h1" className="mb-6">
                {study.title}
              </Heading>
              
              <Text variant="lead" className="mb-8 text-offwhite/80">
                {study.excerpt}
              </Text>

              <div className="flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 text-xs bg-offwhite/5 text-offwhite/60 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(study.metrics).map(([key, metric]: [string, any]) => (
                <div 
                  key={key}
                  className="bg-gradient-to-br from-offwhite/10 to-offwhite/5 rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-magenta mb-2">
                    {metric.improvement || metric.after || metric.value}
                  </div>
                  <div className="text-sm text-offwhite/80 font-medium mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {metric.before && (
                    <div className="text-xs text-offwhite/60">
                      Previously: {metric.before}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <MDXContent components={mdxComponents} />
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-5xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Transformation Impact
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📈</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Performance
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                Dramatic improvements in speed, reliability, and scalability
              </Text>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Cost Efficiency
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                Significant reduction in operational costs and resource waste
              </Text>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Transform Your Business?
          </Heading>
          <Text variant="lead" className="mb-8">
            Let's discuss how we can help you achieve similar results.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book-call">
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portfolio">
                View More Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}