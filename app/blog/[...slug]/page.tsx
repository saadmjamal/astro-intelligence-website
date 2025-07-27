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
  const post = allPosts.find(
    (post) => post.slug === params.slug.join('/')
  );

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
  a: ({ href, children }: any) => (
    <Link href={href} className="text-magenta hover:text-magenta/80 underline transition-colors">
      {children}
    </Link>
  ),
  hr: () => <hr className="my-12 border-offwhite/20" />,
};

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find(
    (post) => post.slug === params.slug.join('/')
  );

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-navy to-black" />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-magenta/10 text-magenta rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Heading as="h1" variant="h1" className="mb-6">
            {post.title}
          </Heading>
          
          <div className="flex items-center gap-6 text-offwhite/60">
            <div className="flex items-center gap-2">
              <span className="text-sm">By</span>
              <span className="text-sm font-medium text-offwhite/80">
                {post.author}
              </span>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <MDXContent components={mdxComponents} />
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-offwhite/10">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-8">
            <Heading as="h3" variant="h4" className="mb-4">
              About the Author
            </Heading>
            <Text variant="body" className="text-offwhite/70 mb-4">
              {post.author} is a technical expert at Astro Intelligence, specializing in 
              cloud architecture and AI-driven solutions. With years of experience in 
              enterprise transformation, they help organizations leverage cutting-edge 
              technology to achieve their business goals.
            </Text>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/about#team">
                View Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Related Articles
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            {allPosts
              .filter((p) => p._id !== post._id)
              .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
              .slice(0, 3)
              .map((relatedPost) => (
                <article
                  key={relatedPost._id}
                  className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-6 hover:border-magenta/50 transition-colors"
                >
                  <Heading as="h3" variant="h5" className="mb-3">
                    <Link
                      href={relatedPost.url}
                      className="hover:text-magenta transition-colors"
                    >
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h3" className="mb-6">
            Ready to Transform Your Infrastructure?
          </Heading>
          <Text variant="lead" className="mb-8">
            Let's discuss how our expertise can help you achieve your goals.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book-call">
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/blog">
                Read More Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}