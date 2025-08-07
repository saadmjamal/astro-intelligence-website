'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { scripts } from '@/lib/scripts-data-enhanced';
import { 
  ArrowRight,
  Check,
  Plus,
  Package,
  Download,
  Clock,
  AlertCircle
} from 'lucide-react';

const categoryInfo = {
  'cloud-infrastructure': 'Cloud Infrastructure',
  'ai-ml': 'AI & Machine Learning',
  'data-engineering': 'Data Engineering',
  'devops-automation': 'DevOps Automation',
  'security-compliance': 'Security & Compliance',
  'monitoring-observability': 'Monitoring & Observability',
};

export default function ScriptComparePage() {
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const toggleScript = (scriptId: string) => {
    setSelectedScripts(prev => {
      if (prev.includes(scriptId)) {
        return prev.filter(id => id !== scriptId);
      }
      if (prev.length < 3) {
        return [...prev, scriptId];
      }
      return prev;
    });
  };

  const selectedScriptObjects = selectedScripts
    .map(id => scripts.find(s => s.id === id))
    .filter(Boolean) as typeof scripts;

  const displayScripts = showOnlySelected 
    ? scripts.filter(s => selectedScripts.includes(s.id))
    : scripts;

  const relatedContent = [
    {
      id: 'all-scripts',
      title: 'Browse All Scripts',
      excerpt: 'View our complete catalog',
      href: '/scripts',
    },
    {
      id: 'search',
      title: 'Search Scripts',
      excerpt: 'Find specific scripts',
      href: '/scripts/search',
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
              Compare Scripts
            </Heading>
            <Text variant="lead" className="text-muted-foreground max-w-2xl mx-auto">
              Compare features, pricing, and capabilities of different scripts side by side
            </Text>
          </div>

          {/* Instructions */}
          <Card className="max-w-2xl mx-auto mb-8">
            <div className="card-padding flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-magenta shrink-0 mt-0.5" />
              <div>
                <Text variant="body" className="mb-2">
                  Select up to 3 scripts to compare their features and pricing.
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  Click on any script card below to add it to your comparison.
                </Text>
              </div>
            </div>
          </Card>

          {/* Selected Count */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                {selectedScripts.length} of 3 selected
              </Badge>
              {selectedScripts.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedScripts([])}
                >
                  Clear Selection
                </Button>
              )}
            </div>
            {selectedScripts.length >= 2 && (
              <Button
                size="sm"
                onClick={() => setShowOnlySelected(!showOnlySelected)}
              >
                {showOnlySelected ? 'Show All Scripts' : 'Show Only Selected'}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Script Selection Grid */}
      {(!showOnlySelected || selectedScripts.length < 2) && (
        <section className="section-padding bg-muted/20">
          <div className="container-width">
            <Heading as="h2" variant="h3" className="mb-6">
              Select Scripts to Compare
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
              {displayScripts.map((script) => {
                const isSelected = selectedScripts.includes(script.id);
                const canSelect = selectedScripts.length < 3 || isSelected;
                
                return (
                  <Card
                    key={script.id}
                    hover={canSelect}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-magenta' : ''
                    } ${!canSelect ? 'opacity-50' : ''}`}
                    onClick={() => canSelect && toggleScript(script.id)}
                  >
                    <div className="card-padding">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary">
                          {categoryInfo[script.category]}
                        </Badge>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-magenta border-magenta' : 'border-subtle'
                        }`}>
                          {isSelected && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                      
                      <Heading as="h3" variant="h5" className="mb-2">
                        {script.title}
                      </Heading>
                      
                      <Text variant="small" className="text-muted-foreground mb-3">
                        {script.description}
                      </Text>
                      
                      <div className="flex items-center justify-between">
                        <Text variant="body" className="font-bold">
                          {script.isPremium ? `$${(script.price / 100).toFixed(0)}` : 'Free'}
                        </Text>
                        <Badge variant="outline" size="sm">
                          {script.language}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      {selectedScripts.length >= 2 && (
        <section className="section-padding">
          <div className="container-width">
            <Heading as="h2" variant="h2" className="mb-8 text-center">
              Script Comparison
            </Heading>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b border-subtle">Feature</th>
                    {selectedScriptObjects.map((script) => (
                      <th key={script.id} className="text-left p-4 border-b border-subtle">
                        <div>
                          <Text variant="body" className="font-semibold mb-1">
                            {script.title}
                          </Text>
                          <Badge variant="outline" size="sm">
                            {script.language}
                          </Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-subtle">
                    <td className="p-4 font-medium">Category</td>
                    {selectedScriptObjects.map((script) => (
                      <td key={script.id} className="p-4">
                        <Badge variant="secondary">
                          {categoryInfo[script.category]}
                        </Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr className="border-b border-subtle bg-muted/20">
                    <td className="p-4 font-medium">Price</td>
                    {selectedScriptObjects.map((script) => (
                      <td key={script.id} className="p-4">
                        <Heading as="h4" variant="h4" className="font-bold">
                          {script.isPremium ? `$${(script.price / 100).toFixed(0)}` : 'Free'}
                        </Heading>
                      </td>
                    ))}
                  </tr>

                  {/* Downloads */}
                  <tr className="border-b border-subtle">
                    <td className="p-4 font-medium">Downloads</td>
                    {selectedScriptObjects.map((script) => (
                      <td key={script.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <Text variant="body">{script.downloads || 'N/A'}</Text>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Version */}
                  <tr className="border-b border-subtle bg-muted/20">
                    <td className="p-4 font-medium">Version</td>
                    {selectedScriptObjects.map((script) => (
                      <td key={script.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <Text variant="body">v{script.version || '1.0.0'}</Text>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Last Updated */}
                  <tr className="border-b border-subtle">
                    <td className="p-4 font-medium">Last Updated</td>
                    {selectedScriptObjects.map((script) => (
                      <td key={script.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Text variant="body">
                            {script.lastUpdated 
                              ? new Date(script.lastUpdated).toLocaleDateString()
                              : 'N/A'
                            }
                          </Text>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Features */}
                  <tr>
                    <td className="p-4 font-medium align-top">Features</td>
                    {selectedScriptObjects.map((script) => (
                      <td key={script.id} className="p-4">
                        <ul className="space-y-2">
                          {script.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <Text variant="small">{feature}</Text>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center">
              <div className="flex flex-wrap gap-4">
                {selectedScriptObjects.map((script) => (
                  <Button key={script.id} asChild>
                    <Link href={`/scripts/${script.id}`}>
                      View {script.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {selectedScripts.length < 2 && (
        <section className="section-padding">
          <div className="container-width">
            <Card className="text-center py-16">
              <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <Heading as="h3" variant="h3" className="mb-2">
                Select Scripts to Compare
              </Heading>
              <Text variant="body" className="text-muted-foreground max-w-md mx-auto">
                Choose at least 2 scripts from the grid above to see a detailed comparison
              </Text>
            </Card>
          </div>
        </section>
      )}
    </PageLayout>
  );
}