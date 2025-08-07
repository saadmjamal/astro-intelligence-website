import { notFound } from 'next/navigation';
import { allResearchArticles } from '@/.contentlayer/generated';
import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MDXContent } from '@/components/MDXContent';
import { ArrowLeft, Calendar, Users, Tag, Share2, Github } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';

export async function generateStaticParams() {
  return allResearchArticles.map((article) => ({
    slug: article.slug.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = allResearchArticles.find(
    (article) => article.slug === slug.join('/')
  );

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Research Lab`,
    description: article.abstract,
    openGraph: {
      title: article.title,
      description: article.abstract,
      type: 'article',
      publishedTime: article.date,
      authors: article.authors,
    },
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const article = allResearchArticles.find(
    (article) => article.slug === slug.join('/')
  );

  if (!article) {
    notFound();
  }

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Research Lab', href: '/lab' },
    { label: article.title, href: `/lab/${slug.join('/')}` },
  ];

  // Get related articles
  const relatedArticles = allResearchArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3)
    .map((a) => ({
      id: a._id,
      title: a.title,
      excerpt: a.abstract,
      href: a.url,
      publishDate: a.date,
      author: a.authors.join(', '),
      tags: a.tags,
    }));

  return (
    <PageLayout breadcrumbItems={breadcrumbItems} relatedContent={relatedArticles}>
      <div className="py-12 px-4">
      <div className="container content-width">
        {/* Back Navigation */}
        <Link
          href="/lab"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Research Lab
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(article.date), 'MMMM d, yyyy')}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-6">
            <Users className="h-4 w-4" />
            <span>{article.authors.join(', ')}</span>
          </div>

          <div className="card-padding-sm bg-muted/50 rounded-lg border border-border">
            <h2 className="font-semibold mb-2">Abstract</h2>
            <p className="text-muted-foreground">{article.abstract}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://github.com/astrointelligence/research/blob/main/${article.slug}.mdx`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View Source
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent code={article.body.code} />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex flex-col md:flex-row grid-gap-md justify-between">
            <div>
              <h3 className="font-semibold mb-2">Cite this article</h3>
              <p className="text-sm text-muted-foreground font-mono">
                {article.authors.join(', ')} ({new Date(article.date).getFullYear()}). 
                "{article.title}". Astro Intelligence Research Lab.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Questions?</h3>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact the authors</Link>
              </Button>
            </div>
          </div>
        </footer>

      </div>
      </div>
    </PageLayout>
  );
}