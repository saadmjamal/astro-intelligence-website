'use client';
export const dynamic = 'force-dynamic'

import { useState } from 'react';
import Link from 'next/link';
import { allResearchArticles } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ArrowRight, Calendar, Users, Tag, Brain, Sparkles, Zap } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';

export default function LabPage() {
  const sortedArticles = allResearchArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const featuredArticles = sortedArticles.slice(0, 2);
  const categories = Array.from(new Set(sortedArticles.map(a => a.category)));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = selectedCategory
    ? sortedArticles.filter(article => article.category === selectedCategory)
    : sortedArticles;

  const relatedContent = [
    {
      id: 'open-source',
      title: 'Open Source Projects',
      excerpt: 'Explore our open source contributions',
      href: '/lab/open-source',
    },
    {
      id: 'demos',
      title: 'Interactive Demos',
      excerpt: 'Try our research in action',
      href: '/lab/demos',
    },
    {
      id: 'publications',
      title: 'Publications',
      excerpt: 'Academic papers and research findings',
      href: '/lab/publications',
    },
  ];

  return (
    <PageLayout relatedContent={relatedContent}>
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Brain className="h-20 w-20 text-primary" />
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-purple-500 animate-pulse" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Research Lab
            </h1>
            <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
              Focused research aligned with delivery: LLM‑driven orchestration, predictive autoscaling, anomaly detection, and ethical AI governance.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 grid-gap-md max-w-2xl mx-auto mb-10">
              <div>
                <div className="text-3xl font-bold text-primary">{sortedArticles.length}</div>
                <div className="text-sm text-muted-foreground">Research Papers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-500">Active</div>
                <div className="text-sm text-muted-foreground">Open Source Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-500">On‑mission</div>
                <div className="text-sm text-muted-foreground">Topics only</div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <a href="#experiments">
                  Explore Research
                  <Zap className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/lab/publications">
                  View Publications
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Research</h2>
          <div className="grid md:grid-cols-2 grid-gap-md">
            {featuredArticles.map((article) => (
              <Card key={article.slug} hover className="card-padding-sm">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  <Link href={article.url} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4">{article.abstract}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {article.authors.join(', ')}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={article.url}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Research */}
      <section id="experiments" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">All Research</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"} 
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedCategory(null)}
            >
              All ({sortedArticles.length})
            </Badge>
            {categories.map((category) => {
              const count = sortedArticles.filter(a => a.category === category).length;
              return (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"} 
                  className="cursor-pointer transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Badge>
              );
            })}
          </div>

          {/* Research Grid */}
          <div className="grid grid-gap">
            {filteredArticles.map((article) => (
              <Card key={article.slug} hover className="card-padding-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" size="sm">{article.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <Link href={article.url} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{article.abstract}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {article.authors.join(', ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        <div className="flex gap-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="shrink-0">
                    <Link href={article.url}>
                      Read Article <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Collaborate on Research</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented researchers and engineers to collaborate on 
              cutting-edge projects. Join us in pushing the boundaries of what's possible.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/astrointelligence" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}