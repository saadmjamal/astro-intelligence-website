import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useMDXComponent } from 'next-contentlayer2/hooks';

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug.join('/'));

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

// MDX Components
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
  a: ({ href, children }: any) => (
    <Link href={href} className="text-magenta hover:text-magenta/80 underline transition-colors">
      {children}
    </Link>
  ),
  hr: () => <hr className="border-offwhite/20 my-12" />,
};

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-magenta/10 via-navy absolute inset-0 bg-gradient-to-br to-black" />
        <div className="relative mx-auto max-w-4xl">
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

          <div className="text-offwhite/60 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm">By</span>
              <span className="text-offwhite/80 text-sm font-medium">{post.author}</span>
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
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <MDXContent components={mdxComponents} />
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="border-offwhite/10 border-t px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="from-offwhite/5 to-offwhite/0 border-offwhite/10 rounded-2xl border bg-gradient-to-br p-8">
            <Heading as="h3" variant="h4" className="mb-4">
              About the Author
            </Heading>
            <Text variant="body" className="text-offwhite/70 mb-4">
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

      {/* Related Posts */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Related Articles
          </Heading>

          <div className="grid gap-8 md:grid-cols-3">
            {allPosts
              .filter((p) => p._id !== post._id)
              .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
              .slice(0, 3)
              .map((relatedPost) => (
                <article
                  key={relatedPost._id}
                  className="from-offwhite/5 to-offwhite/0 border-offwhite/10 hover:border-magenta/50 rounded-2xl border bg-gradient-to-br p-6 transition-colors"
                >
                  <Heading as="h3" variant="h5" className="mb-3">
                    <Link href={relatedPost.url} className="hover:text-magenta transition-colors">
                      {relatedPost.title}
                    </Link>
                  </Heading>
                  <Text variant="small" className="text-offwhite/60 mb-4">
                    {new Date(relatedPost.date).toLocaleDateString()}
                  </Text>
                  <Text variant="small" className="text-offwhite/70">
                    {relatedPost.excerpt}
                  </Text>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h3" className="mb-6">
            Ready to Transform Your Infrastructure?
          </Heading>
          <Text variant="lead" className="mb-8">
            Let's discuss how our expertise can help you achieve your goals.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/book-call">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
