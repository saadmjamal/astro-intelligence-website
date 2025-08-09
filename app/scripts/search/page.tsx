'use client';
export const dynamic = 'force-dynamic'

import { useState, useMemo } from 'react';
import Link from 'next/link';
let PageLayout: any, Heading: any, Text: any, Input: any, Button: any, Badge: any, Card: any;
try {
  PageLayout = require('@/components/layout/PageLayout').PageLayout || require('@/components/layout/PageLayout').default;
  ({ Heading, Text } = require('@/components/ui/Typography'));
  Input = require('@/components/ui/Input').default;
  Button = require('@/components/ui/Button').default;
  Badge = require('@/components/ui/Badge').default || require('@/components/ui/Badge');
  Card = require('@/components/ui/Card').default;
} catch {}
import { scripts } from '@/lib/scripts-data-enhanced';
import { 
  Search, 
  Filter,
  ArrowRight,
  Code,
  CheckCircle,
  X
} from 'lucide-react';

const categoryInfo = {
  'cloud-infrastructure': {
    name: 'Cloud Infrastructure',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  'ai-ml': {
    name: 'AI & Machine Learning',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  'data-engineering': {
    name: 'Data Engineering',
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  'devops-automation': {
    name: 'DevOps Automation',
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  },
  'security-compliance': {
    name: 'Security & Compliance',
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  'monitoring-observability': {
    name: 'Monitoring & Observability',
    color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  },
};

export default function ScriptSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');

  // Get unique languages
  const languages = useMemo(() => {
    const langs = new Set(scripts.map(s => s.language));
    return Array.from(langs).sort();
  }, []);

  // Filter scripts based on all criteria
  const filteredScripts = useMemo(() => {
    return scripts.filter(script => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          script.title.toLowerCase().includes(query) ||
          script.description.toLowerCase().includes(query) ||
          script.features.some(f => f.toLowerCase().includes(query)) ||
          script.category.toLowerCase().includes(query) ||
          script.language.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(script.category)) {
        return false;
      }

      // Price filter
      if (priceFilter === 'free' && script.isPremium) return false;
      if (priceFilter === 'premium' && !script.isPremium) return false;

      // Language filter
      if (languageFilter !== 'all' && script.language !== languageFilter) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, priceFilter, languageFilter]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceFilter('all');
    setLanguageFilter('all');
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || priceFilter !== 'all' || languageFilter !== 'all';

  const relatedContent = [
    {
      id: 'all-scripts',
      title: 'Browse All Scripts',
      excerpt: 'View our complete catalog',
      href: '/scripts',
    },
    {
      id: 'documentation',
      title: 'Script Documentation',
      excerpt: 'Learn how to use our scripts',
      href: '/docs/scripts',
    },
    {
      id: 'custom',
      title: 'Custom Scripts',
      excerpt: 'Need something specific?',
      href: '/contact?type=custom-script',
    },
  ];

  return (
    <PageLayout relatedContent={relatedContent}>
      {/* Header */}
      <section className="section-padding-sm">
        <div className="container-width">
          <div className="text-center mb-8">
            <Heading as="h1" variant="h1" className="mb-4">
              Search Scripts
            </Heading>
            <Text variant="lead" className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect automation script for your needs
            </Text>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search scripts by name, feature, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding-sm bg-muted/20">
        <div className="container-width">
          <div className="space-y-6">
            {/* Category Filters */}
            <div>
              <Text variant="body" className="font-medium mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
              </Text>
              <div className="flex flex-wrap gap-2">
                {Object.entries(categoryInfo).map(([key, info]) => (
                  <Badge
                    key={key}
                    variant={selectedCategories.includes(key) ? 'default' : 'outline'}
                    className={selectedCategories.includes(key) ? info.color : ''}
                    onClick={() => toggleCategory(key)}
                    style={{ cursor: 'pointer' }}
                  >
                    {info.name}
                    {selectedCategories.includes(key) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price and Language Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text variant="body" className="font-medium mb-3">
                  Price
                </Text>
                <div className="flex gap-2">
                  <Button
                    variant={priceFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={priceFilter === 'free' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('free')}
                  >
                    Free
                  </Button>
                  <Button
                    variant={priceFilter === 'premium' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('premium')}
                  >
                    Premium
                  </Button>
                </div>
              </div>

              <div>
                <Text variant="body" className="font-medium mb-3">
                  Language
                </Text>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-subtle bg-background text-foreground"
                >
                  <option value="all">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear All Filters
                  <X className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding">
        <div className="container-width">
          <div className="mb-6 flex items-center justify-between">
            <Text variant="body" className="text-muted-foreground">
              Found {filteredScripts.length} script{filteredScripts.length !== 1 ? 's' : ''}
            </Text>
          </div>

          {filteredScripts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
              {filteredScripts.map((script) => {
                const catInfo = categoryInfo[script.category];
                
                return (
                  <Card key={script.id} hover className="flex flex-col">
                    <div className="card-padding flex-1 flex flex-col">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className={catInfo.color}>
                            {catInfo.name}
                          </Badge>
                          <Badge variant="outline">
                            {script.language}
                          </Badge>
                        </div>
                        
                        <Heading as="h3" variant="h4" className="mb-2">
                          {script.title}
                        </Heading>
                        
                        <Text variant="small" className="text-muted-foreground mb-4">
                          {script.description}
                        </Text>
                      </div>

                      <div className="space-y-2 mb-6">
                        {script.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <Text variant="small">{feature}</Text>
                          </div>
                        ))}
                        {script.features.length > 2 && (
                          <Text variant="small" className="text-muted-foreground pl-6">
                            +{script.features.length - 2} more features
                          </Text>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-subtle flex items-center justify-between">
                        <div>
                          <Heading as="h4" variant="h4" className="font-bold">
                            {script.isPremium ? `$${(script.price / 100).toFixed(0)}` : 'Free'}
                          </Heading>
                          {script.isPremium && (
                            <Text variant="caption" className="text-muted-foreground">
                              one-time
                            </Text>
                          )}
                        </div>
                        <Button asChild size="sm">
                          <Link href={`/scripts/${script.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="text-center py-16">
              <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <Heading as="h3" variant="h3" className="mb-2">
                No scripts found
              </Heading>
              <Text variant="body" className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse all scripts
              </Text>
              <Button asChild>
                <Link href="/scripts">
                  Browse All Scripts
                </Link>
              </Button>
            </Card>
          )}
        </div>
      </section>
    </PageLayout>
  );
}