import { Metadata } from 'next';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { PageLayout } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Enterprise AI & Cloud Insights Blog | Astro Intelligence Inc',
  description:
    'Learn how to reduce cloud costs by 30% and deploy 5× faster. Real-world insights on AI, DevOps, and cloud architecture from proven experts.',
};

export default function BlogPage() {
  // Sort posts by date
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  // Get unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  const relatedContent = [
    {
      id: 'research-lab',
      title: 'Research Lab',
      excerpt: 'Explore our latest research and experiments',
      href: '/research-lab',
    },
    {
      id: 'technical-services',
      title: 'Technical Services',
      excerpt: 'Professional development and consulting services',
      href: '/services',
    },
    {
      id: 'newsletter',
      title: 'Join Newsletter',
      excerpt: 'Get insights delivered to your inbox',
      href: '#newsletter',
    },
  ];

  return (
    <PageLayout relatedContent={relatedContent}>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Enterprise AI & Cloud Insights
          </Heading>
          <Text variant="lead" className="mx-auto mb-8 max-w-3xl">
            Learn how Fortune 500 companies cut cloud costs by 30% and deploy 5× faster. 
            Real implementation guides from proven experts.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact?source=blog">Get Your Free Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#latest-insights">Browse Latest Insights</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="latest-insights" className="section-padding">
        <div className="container-width">
          <div className="grid grid-gap-lg lg:grid-cols-4">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="stack-xl">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="group from-bg-card to-transparent border-subtle hover:border-magenta/50 relative rounded-2xl border bg-gradient-to-br card-padding transition-all duration-300"
                  >
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Heading as="h2" variant="h3" className="mb-2">
                          <Link href={post.url} className="hover:text-magenta transition-colors">
                            {post.title}
                          </Link>
                        </Heading>
                        <div className="text-muted-foreground flex items-center gap-4 text-sm">
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

                    <Text variant="body" className="text-muted-foreground mb-6">
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
              <div className="sticky top-24 stack-lg">
                {/* Executive Insights CTA */}
                <div className="from-magenta/10 border-magenta/20 rounded-2xl border bg-gradient-to-br to-purple-600/10 card-padding-sm">
                  <Heading as="h3" variant="h4" className="mb-3">
                    Get Executive Insights
                  </Heading>
                  <Text variant="small" className="text-muted-foreground mb-4">
                    Join 500+ IT leaders receiving actionable insights on cutting cloud costs and accelerating deployment.
                  </Text>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-navy border-default text-offwhite placeholder-text-subtle focus:border-magenta w-full rounded-lg border px-4 py-2 transition-colors focus:outline-none"
                    />
                    <Button size="sm" className="w-full">
                      Get Weekly Insights
                    </Button>
                  </form>
                  <Text variant="caption" className="text-subtle-foreground mt-3 text-center">
                    Unsubscribe anytime • Privacy respected
                  </Text>
                </div>

                {/* Consultation CTA */}
                <div className="border-subtle rounded-2xl border bg-gradient-to-br from-navy-800/50 to-navy-900/50 card-padding-sm">
                  <Heading as="h3" variant="h5" className="mb-3">
                    Need Immediate Help?
                  </Heading>
                  <Text variant="small" className="text-muted-foreground mb-4">
                    Our experts can help you implement these strategies immediately.
                  </Text>
                  <Button size="sm" variant="secondary" asChild className="w-full">
                    <Link href="/contact?type=consultation&source=blog">
                      Schedule Free Consultation
                    </Link>
                  </Button>
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
                        className="bg-card text-muted-foreground hover:bg-magenta/20 hover:text-magenta rounded-full px-3 py-1 text-sm transition-all"
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
                          className="text-muted-foreground hover:text-magenta text-sm transition-colors"
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

      {/* CTA Section */}
      <section className="from-magenta-500/10 bg-gradient-to-r to-purple-600/10 section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Transform Your Infrastructure?
          </Heading>
          <Text variant="lead" className="mb-8">
            Don't just read about it—implement these strategies with expert guidance. 
            Join companies achieving 30% cost reduction and 5× faster deployment.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact?type=consultation&source=blog">Schedule Free Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portfolio">View Success Stories</Link>
            </Button>
          </div>
          <Text variant="small" className="mt-6 text-muted-foreground">
            30-minute call • Custom roadmap • No commitment required
          </Text>
        </div>
      </section>
    </PageLayout>
  );
}
