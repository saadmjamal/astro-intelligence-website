import { Metadata } from 'next';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Blog - Astro Intelligence Inc',
  description: 'Insights on AI, DevOps, cloud architecture, and platform engineering from industry experts.',
};

export default function BlogPage() {
  // Sort posts by date
  const posts = allPosts.sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // Get unique tags
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Engineering Insights
          </Heading>
          <Text variant="lead" className="max-w-3xl mx-auto">
            Deep dives into AI, DevOps, and cloud architecture. 
            Learn from real-world implementations and stay ahead of the curve.
          </Text>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="space-y-12">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="group relative bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-8 hover:border-magenta/50 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <Heading as="h2" variant="h3" className="mb-2">
                          <Link 
                            href={post.url} 
                            className="hover:text-magenta transition-colors"
                          >
                            {post.title}
                          </Link>
                        </Heading>
                        <div className="flex items-center gap-4 text-sm text-offwhite/60">
                          <span>{new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                          <span>•</span>
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Text variant="body" className="text-offwhite/70 mb-6">
                      {post.excerpt}
                    </Text>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-magenta/10 text-magenta rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={post.url}>
                          Read More
                          <svg
                            className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
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
                <div className="bg-gradient-to-br from-magenta/10 to-purple-600/10 border border-magenta/20 rounded-2xl p-6">
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
                      className="w-full px-4 py-2 bg-navy border border-offwhite/20 rounded-lg text-offwhite placeholder-offwhite/40 focus:outline-none focus:border-magenta transition-colors"
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
                        className="px-3 py-1 text-sm bg-offwhite/5 text-offwhite/70 rounded-full hover:bg-magenta/20 hover:text-magenta transition-all"
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
                          className="text-sm text-offwhite/70 hover:text-magenta transition-colors"
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