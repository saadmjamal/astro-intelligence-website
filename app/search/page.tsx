'use client';

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet,
  RefinementList,
  Configure,
  Pagination,
  Stats,
} from 'react-instantsearch';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Calendar, Users, FileText, Beaker, Briefcase } from 'lucide-react';

// Force dynamic rendering since search requires client-side functionality
export const dynamic = 'force-dynamic';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'placeholder',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || 'placeholder'
);

function Hit({ hit }: { hit: any }) {
  const getIcon = () => {
    switch (hit.type) {
      case 'post':
        return <FileText className="h-5 w-5" />;
      case 'research':
        return <Beaker className="h-5 w-5" />;
      case 'case-study':
        return <Briefcase className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (hit.type) {
      case 'post':
        return 'Blog Post';
      case 'research':
        return 'Research';
      case 'case-study':
        return 'Case Study';
      default:
        return 'Content';
    }
  };

  return (
    <Link href={hit.url} className="block">
      <Card hover className="card-padding-sm h-full">
        <div className="flex items-start gap-4">
          <div className="shrink-0 text-muted-foreground">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" size="sm">
                {getTypeLabel()}
              </Badge>
              {hit.category && (
                <Badge variant="outline" size="sm">
                  {hit.category}
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2">
              <Highlight attribute="title" hit={hit} />
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              <Snippet attribute="description" hit={hit} />
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(hit.date).toLocaleDateString()}
              </span>
              {(hit.author || hit.authors) && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {hit.author || hit.authors?.join(', ')}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Search</h1>
        
        <InstantSearch
          searchClient={searchClient}
          indexName="astro_intelligence"
        >
          <Configure hitsPerPage={10} />
          
          <div className="mb-8">
            <SearchBox
              placeholder="Search blog posts, research, and case studies..."
              classNames={{
                root: 'relative',
                form: 'relative',
                input: 'w-full px-4 py-3 pr-12 text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background',
                submit: 'absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors',
                reset: 'absolute right-20 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground',
              }}
            />
          </div>

          <div className="grid lg:grid-cols-4 grid-gap-md">
            <aside className="lg:col-span-1">
              <div className="sticky top-24 stack-md">
                <div>
                  <h3 className="font-semibold mb-3">Content Type</h3>
                  <RefinementList
                    attribute="type"
                    classNames={{
                      root: 'space-y-2',
                      item: 'flex items-center',
                      checkbox: 'mr-2 rounded border-border',
                      label: 'text-sm cursor-pointer hover:text-primary transition-colors',
                      count: 'ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded',
                    }}
                    transformItems={(items) =>
                      items.map((item) => ({
                        ...item,
                        label: item.label
                          .replace('post', 'Blog Posts')
                          .replace('research', 'Research')
                          .replace('case-study', 'Case Studies'),
                      }))
                    }
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <RefinementList
                    attribute="category"
                    classNames={{
                      root: 'space-y-2',
                      item: 'flex items-center',
                      checkbox: 'mr-2 rounded border-border',
                      label: 'text-sm cursor-pointer hover:text-primary transition-colors',
                      count: 'ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded',
                    }}
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <RefinementList
                    attribute="tags"
                    limit={10}
                    showMore
                    classNames={{
                      root: 'space-y-2',
                      item: 'flex items-center',
                      checkbox: 'mr-2 rounded border-border',
                      label: 'text-sm cursor-pointer hover:text-primary transition-colors',
                      count: 'ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded',
                      showMore: 'text-sm text-primary hover:underline mt-2',
                    }}
                  />
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-4">
                <Stats
                  classNames={{
                    root: 'text-sm text-muted-foreground',
                  }}
                  translations={{
                    rootElementText: {
                      zero: '0 results found',
                      one: '1 result found',
                      other: (count: number) => `${count} results found`,
                    } as any,
                  }}
                />
              </div>

              <Hits
                hitComponent={Hit}
                classNames={{
                  root: 'space-y-4',
                  emptyRoot: 'text-center py-12 text-muted-foreground',
                }}
              />

              <div className="mt-8 flex justify-center">
                <Pagination
                  classNames={{
                    root: 'flex gap-1',
                    item: 'px-3 py-1 rounded border border-border hover:bg-muted transition-colors',
                    selectedItem: 'bg-primary text-white border-primary',
                    disabledItem: 'opacity-50 cursor-not-allowed',
                    link: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}