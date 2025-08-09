'use client';
export const dynamic = 'force-dynamic'

import { useState } from 'react';
import Link from 'next/link';
import { allResearchArticles } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Calendar,
  Users,
  Tag,
  Search,
  Filter
} from 'lucide-react';

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sortedArticles = allResearchArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // Extract unique years and categories
  const years = Array.from(new Set(sortedArticles.map(a => new Date(a.date).getFullYear().toString())));
  const categories = Array.from(new Set(sortedArticles.map(a => a.category)));

  // Filter articles
  const filteredArticles = sortedArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesYear = !selectedYear || new Date(article.date).getFullYear().toString() === selectedYear;
    const matchesCategory = !selectedCategory || article.category === selectedCategory;

    return matchesSearch && matchesYear && matchesCategory;
  });

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Publications
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our complete collection of research papers, technical reports, and conference proceedings.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 stack">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, abstract, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
            </div>
            
            {/* Year Filter */}
            <div className="flex gap-2">
              <Badge
                variant={selectedYear === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedYear(null)}
              >
                All Years
              </Badge>
              {years.map(year => (
                <Badge
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </Badge>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Badge>
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredArticles.length} of {sortedArticles.length} publications
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredArticles.map((article) => (
            <Card key={article.slug} hover className="card-padding-sm">
              <div className="stack">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link href={article.url} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {article.authors.join(', ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{article.category}</Badge>
                </div>

                {/* Abstract */}
                <p className="text-muted-foreground line-clamp-3">
                  {article.abstract}
                </p>

                {/* Tags and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={article.url}>
                        <FileText className="mr-2 h-4 w-4" />
                        Read
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`${article.url}.pdf`} download>
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </a>
                    </Button>
                    {article.externalUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No publications found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedYear(null);
                setSelectedCategory(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}