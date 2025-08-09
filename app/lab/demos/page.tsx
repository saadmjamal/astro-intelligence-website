'use client';
export const dynamic = 'force-dynamic'

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Play, 
  Code, 
  ExternalLink, 
  Brain,
  Cpu,
  Database,
  Sparkles,
  LineChart,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

const demos = [
  {
    id: 'vector-search',
    title: 'Vector Search Optimization Demo',
    description: 'Experience our high-performance vector search engine. Upload your dataset and see 10x faster similarity searches in action.',
    category: 'Performance',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    features: ['Real-time search', 'Visual similarity mapping', 'Performance metrics'],
    status: 'live',
    demoUrl: '/lab/demos/vector-search',
    codeUrl: 'https://github.com/astrointelligence/vector-db-optimizer',
  },
  {
    id: 'ai-security-scanner',
    title: 'AI Model Security Scanner',
    description: 'Upload an AI model and watch our scanner detect vulnerabilities, backdoors, and potential security risks in real-time.',
    category: 'Security',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    features: ['Vulnerability detection', 'Compliance checking', 'Risk assessment'],
    status: 'live',
    demoUrl: '/lab/demos/security-scanner',
    codeUrl: 'https://github.com/astrointelligence/secure-model-registry',
  },
  {
    id: 'llm-testing',
    title: 'LLM Testing Playground',
    description: 'Test Large Language Models for prompt injection, hallucination, and bias. Interactive playground with real-time results.',
    category: 'AI Safety',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    features: ['Prompt injection tests', 'Hallucination detection', 'Bias evaluation'],
    status: 'live',
    demoUrl: '/lab/demos/llm-testing',
    codeUrl: 'https://github.com/astrointelligence/llm-test-suite',
  },
  {
    id: 'cost-predictor',
    title: 'Cloud Cost Prediction Engine',
    description: 'Input your infrastructure specs and usage patterns to get ML-powered cost predictions across AWS, GCP, and Azure.',
    category: 'FinOps',
    icon: LineChart,
    color: 'from-orange-500 to-red-500',
    features: ['Multi-cloud support', 'Usage forecasting', 'Optimization suggestions'],
    status: 'live',
    demoUrl: '/lab/demos/cost-predictor',
    codeUrl: 'https://github.com/astrointelligence/cloud-cost-predictor',
  },
  {
    id: 'distributed-training',
    title: 'Distributed Training Visualizer',
    description: 'Watch how our framework distributes ML training across multiple nodes with real-time performance visualization.',
    category: 'ML Infrastructure',
    icon: Cpu,
    color: 'from-indigo-500 to-purple-500',
    features: ['Live training metrics', 'Node distribution view', 'Performance optimization'],
    status: 'coming-soon',
    demoUrl: '#',
    codeUrl: 'https://github.com/astrointelligence/distributed-training',
  },
  {
    id: 'pipeline-orchestrator',
    title: 'AI Pipeline Orchestrator',
    description: 'Design and deploy complex ML pipelines with our visual orchestrator. Drag, drop, and watch your workflows execute.',
    category: 'MLOps',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    features: ['Visual pipeline builder', 'Real-time execution', 'Experiment tracking'],
    status: 'coming-soon',
    demoUrl: '#',
    codeUrl: 'https://github.com/astrointelligence/ai-pipeline-orchestrator',
  },
];

const categories = Array.from(new Set(demos.map(d => d.category)));

export default function DemosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDemos = selectedCategory
    ? demos.filter(demo => demo.category === selectedCategory)
    : demos;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Interactive Demos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience our research in action. These interactive demos showcase the practical applications 
            of our open-source projects and research findings.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All Demos
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

        {/* Demos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
          {filteredDemos.map((demo) => {
            const Icon = demo.icon;
            return (
              <Card 
                key={demo.id} 
                className={`relative overflow-hidden ${
                  demo.status === 'coming-soon' ? 'opacity-75' : ''
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-5`} />
                
                <div className="relative card-padding-sm stack">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${demo.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant={demo.status === 'live' ? 'success' : 'secondary'}>
                      {demo.status === 'live' ? 'Live Demo' : 'Coming Soon'}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{demo.title}</h3>
                    <p className="text-muted-foreground text-sm">{demo.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {demo.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {demo.status === 'live' ? (
                      <>
                        <Button size="sm" className="flex-1" asChild>
                          <a href={demo.demoUrl}>
                            <Play className="mr-2 h-4 w-4" />
                            Try Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={demo.codeUrl} target="_blank" rel="noopener noreferrer">
                            <Code className="h-4 w-4" />
                          </a>
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="flex-1">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Demo Section */}
        <Card className="mt-12 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="card-padding stack">
              <Badge variant="default">Featured Demo</Badge>
              <h2 className="text-3xl font-bold">Vector Search in Action</h2>
              <p className="text-muted-foreground">
                Our most popular demo showcases the power of optimized vector search. 
                Upload your own dataset or use our samples to see how we achieve 10x faster 
                similarity searches compared to traditional methods.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Sub-millisecond query times</span>
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span>Handles millions of vectors</span>
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span>AI-powered optimization</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/lab/demos/vector-search">
                  Try Vector Search Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative bg-gradient-to-br from-primary/20 to-purple-500/20 card-padding flex items-center justify-center">
              <div className="text-center">
                <Database className="h-24 w-24 text-primary mb-4 mx-auto" />
                <p className="text-sm text-muted-foreground">Interactive visualization</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to see more?</h2>
          <p className="text-muted-foreground mb-6">
            We're constantly adding new demos. Follow our research lab for updates.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="https://github.com/astrointelligence" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">
                Read Our Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}