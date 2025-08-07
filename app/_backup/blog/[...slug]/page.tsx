import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MDXContent } from '@/components/MDXContent';
import { PageLayout } from '@/components/layout/PageLayout';

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = allPosts.find((post) => post.slug === resolvedParams.slug.join('/'));

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Astro Intelligence Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = allPosts.find((post) => post.slug === resolvedParams.slug.join('/'));

  if (!post) {
    notFound();
  }

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${resolvedParams.slug.join('/')}` },
  ];

  // Get related posts
  const relatedPosts = allPosts
    .filter((p) => p._id !== post._id)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)
    .map((p) => ({
      id: p._id,
      title: p.title,
      excerpt: p.excerpt,
      href: p.url,
      publishDate: p.date,
      author: p.author,
      tags: p.tags,
    }));

  return (
    <PageLayout breadcrumbItems={breadcrumbItems} relatedContent={relatedPosts}>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-magenta/10 via-navy absolute inset-0 bg-gradient-to-br to-black" />
        <div className="relative content-width">
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-magenta/10 text-magenta rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <Heading as="h1" variant="h1" className="mb-6">
            {post.title}
          </Heading>

          <div className="text-muted-foreground flex items-center grid-gap">
            <div className="flex items-center gap-2">
              <span className="text-sm">By</span>
              <span className="text-secondary-foreground text-sm font-medium">{post.author}</span>
            </div>
            <span>•</span>
            <time className="text-sm" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="content-width">
          <div className="prose prose-invert max-w-none">
            <MDXContent code={post.body.code} />
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="border-subtle border-t section-padding-sm">
        <div className="content-width">
          <div className="from-bg-card to-transparent border-subtle rounded-2xl border bg-gradient-to-br card-padding">
            <Heading as="h3" variant="h4" className="mb-4">
              About the Author
            </Heading>
            <Text variant="body" className="text-muted-foreground mb-4">
              {post.author} is a technical expert at Astro Intelligence, specializing in cloud
              architecture and AI-driven solutions. With years of experience in enterprise
              transformation, they help organizations leverage cutting-edge technology to achieve
              their business goals.
            </Text>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/about#team">View Profile</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Newsletter CTA */}
      <section className="section-padding-sm">
        <div className="content-width">
          <div className="from-magenta/10 border-magenta/20 rounded-2xl border bg-gradient-to-br to-purple-600/10 card-padding text-center">
            <Heading as="h3" variant="h3" className="mb-4">
              Get More Insights Like This
            </Heading>
            <Text variant="body" className="text-secondary-foreground mb-6 max-w-2xl mx-auto">
              Join 500+ IT leaders receiving weekly insights on cutting cloud costs by 30% and deploying 5× faster.
            </Text>
            <form className="max-w-md mx-auto stack">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-navy border-default text-offwhite placeholder-text-subtle focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
              />
              <Button size="lg" className="w-full">
                Subscribe to Weekly Insights
              </Button>
            </form>
            <Text variant="caption" className="text-subtle-foreground mt-4">
              Unsubscribe anytime • Privacy respected
            </Text>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="from-magenta-500/10 bg-gradient-to-r to-purple-600/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Implement These Strategies?
          </Heading>
          <Text variant="lead" className="mb-8">
            Don't leave money on the table. Our experts can help you achieve similar results—30% cost reduction and 5× faster deployment.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact?type=consultation&source=blog-article">Get Your Free Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portfolio">View Client Results</Link>
            </Button>
          </div>
          <Text variant="small" className="mt-6 text-muted-foreground">
            30-minute strategy call • ROI assessment included • No commitment required
          </Text>
        </div>
      </section>
    </PageLayout>
  );
}
