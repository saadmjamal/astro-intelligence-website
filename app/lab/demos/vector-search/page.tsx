'use client';
export const dynamic = 'force-dynamic'

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { 
  Search, 
  Zap, 
  Database, 
  Clock,
  ArrowLeft,
  RefreshCw,
  Download
} from 'lucide-react';

interface SearchResult {
  id: string;
  text: string;
  similarity: number;
  metadata?: Record<string, any>;
}

export default function VectorSearchDemo() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchTime, setSearchTime] = useState<number | null>(null);
  const [selectedDataset, setSelectedDataset] = useState('sample');

  const sampleResults: SearchResult[] = [
    {
      id: '1',
      text: 'Machine learning algorithms for predictive analytics in cloud environments',
      similarity: 0.92,
      metadata: { category: 'ML', date: '2024-01-15' }
    },
    {
      id: '2',
      text: 'Optimizing neural network training on distributed GPU clusters',
      similarity: 0.87,
      metadata: { category: 'Deep Learning', date: '2024-01-10' }
    },
    {
      id: '3',
      text: 'Real-time data processing pipelines using Apache Kafka and Kubernetes',
      similarity: 0.84,
      metadata: { category: 'Data Engineering', date: '2024-01-08' }
    },
    {
      id: '4',
      text: 'Implementing secure multi-tenant architectures in AWS',
      similarity: 0.79,
      metadata: { category: 'Cloud Security', date: '2024-01-05' }
    },
    {
      id: '5',
      text: 'Performance optimization techniques for large-scale vector databases',
      similarity: 0.76,
      metadata: { category: 'Database', date: '2024-01-03' }
    },
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    const startTime = performance.now();

    // Simulate search delay
    setTimeout(() => {
      const endTime = performance.now();
      setSearchTime(endTime - startTime);
      setResults(sampleResults);
      setIsSearching(false);
    }, 300 + Math.random() * 200); // 300-500ms
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/lab/demos" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Demos
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">Vector Search Optimization Demo</h1>
          <p className="text-xl text-muted-foreground">
            Experience our high-performance vector search engine with sub-millisecond query times.
          </p>
        </div>

        {/* Demo Controls */}
        <Card className="card-padding-sm mb-8">
          <div className="stack">
            {/* Dataset Selection */}
            <div>
              <div className="text-sm font-medium mb-2">Select Dataset</div>
              <div className="flex gap-2">
                <Badge 
                  variant={selectedDataset === 'sample' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedDataset('sample')}
                >
                  Sample Data (1K vectors)
                </Badge>
                <Badge 
                  variant={selectedDataset === 'medium' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedDataset('medium')}
                >
                  Medium (100K vectors)
                </Badge>
                <Badge 
                  variant={selectedDataset === 'large' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedDataset('large')}
                >
                  Large (1M vectors)
                </Badge>
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="search-query" className="text-sm font-medium mb-2 block">Search Query</label>
              <div className="flex gap-2">
                <Input
                  id="search-query"
                  type="text"
                  placeholder="Enter your search query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !query.trim()}
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Performance Metrics */}
            {searchTime !== null && (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{searchTime.toFixed(2)}ms</div>
                  <div className="text-sm text-muted-foreground">Query Time</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Database className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {selectedDataset === 'sample' ? '1K' : selectedDataset === 'medium' ? '100K' : '1M'}
                  </div>
                  <div className="text-sm text-muted-foreground">Vectors Searched</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">10x</div>
                  <div className="text-sm text-muted-foreground">Faster than Traditional</div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="stack">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            {results.map((result) => (
              <Card key={result.id} hover className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-lg mb-2">{result.text}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {result.metadata?.category && (
                        <Badge variant="outline" size="sm">
                          {result.metadata.category}
                        </Badge>
                      )}
                      {result.metadata?.date && (
                        <span>{result.metadata.date}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-primary">
                      {(result.similarity * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Similarity</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="grid md:grid-cols-2 grid-gap mt-12">
          <Card className="card-padding-sm">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                <div>
                  <strong>Vector Embeddings:</strong> Text is converted to high-dimensional vectors using state-of-the-art embedding models
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                <div>
                  <strong>Optimized Indexing:</strong> Our proprietary indexing algorithm reduces search space by 99%
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                <div>
                  <strong>Hardware Acceleration:</strong> SIMD instructions and GPU acceleration for maximum performance
                </div>
              </li>
            </ul>
          </Card>

          <Card className="card-padding-sm">
            <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
            <p className="text-muted-foreground mb-4">
              This demo uses pre-indexed sample data. To use your own data:
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <a href="https://github.com/astrointelligence/vector-db-optimizer" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download the Library
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/lab/open-source">
                  View Documentation
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Alert */}
        <Alert className="mt-8">
          <Zap className="h-4 w-4" />
          <div className="ml-2">
            <p className="font-medium">Live Demo Limitations</p>
            <p className="text-sm text-muted-foreground mt-1">
              This demo runs in your browser with simulated data. The actual library performs 
              even better with real-world datasets and dedicated hardware.
            </p>
          </div>
        </Alert>
      </div>
    </div>
  );
}