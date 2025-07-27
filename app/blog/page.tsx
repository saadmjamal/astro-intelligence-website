import { Metadata } from 'next';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Blog - Astro Intelligence Inc',
  description:
    'Insights on AI, DevOps, cloud architecture, and platform engineering from industry experts.',
};

export default function BlogPage() {
  // Sort posts by date
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  // Get unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Engineering Insights
          </Heading>
          <Text variant="lead" className="mx-auto max-w-3xl">
            Deep dives into AI, DevOps, and cloud architecture. Learn from real-world
            implementations and stay ahead of the curve.
          </Text>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="space-y-12">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="group from-offwhite/5 to-offwhite/0 border-offwhite/10 hover:border-magenta/50 relative rounded-2xl border bg-gradient-to-br p-8 transition-all duration-300"
                  >
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Heading as="h2" variant="h3" className="mb-2">
                          <Link href={post.url} className="hover:text-magenta transition-colors">
                            {post.title}
                          </Link>
                        </Heading>
                        <div className="text-offwhite/60 flex items-center gap-4 text-sm">
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span>•</span>
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>

                    <Text variant="body" className="text-offwhite/70 mb-6">
                      {post.excerpt}
                    </Text>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-magenta/10 text-magenta rounded-full px-3 py-1 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button variant="ghost" size="sm" asChild>
                        <Link href={post.url}>
                          Read More
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
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Newsletter */}
                <div className="from-magenta/10 border-magenta/20 rounded-2xl border bg-gradient-to-br to-purple-600/10 p-6">
                  <Heading as="h3" variant="h4" className="mb-3">
                    Stay Updated
                  </Heading>
                  <Text variant="small" className="text-offwhite/70 mb-4">
                    Get the latest insights on AI and cloud architecture delivered to your inbox.
                  </Text>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-navy border-offwhite/20 text-offwhite placeholder-offwhite/40 focus:border-magenta w-full rounded-lg border px-4 py-2 transition-colors focus:outline-none"
                    />
                    <Button size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </div>

                {/* Tags */}
                <div>
                  <Heading as="h3" variant="h5" className="mb-4">
                    Popular Topics
                  </Heading>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-offwhite/5 text-offwhite/70 hover:bg-magenta/20 hover:text-magenta rounded-full px-3 py-1 text-sm transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div>
                  <Heading as="h3" variant="h5" className="mb-4">
                    Recent Posts
                  </Heading>
                  <ul className="space-y-3">
                    {posts.slice(0, 5).map((post) => (
                      <li key={post._id}>
                        <Link
                          href={post.url}
                          className="text-offwhite/70 hover:text-magenta text-sm transition-colors"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
