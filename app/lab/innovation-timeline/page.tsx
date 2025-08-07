'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Calendar,
  ExternalLink,
  Award,
  Users,
  Zap,
  Brain,
  Shield,
  Database,
  Cpu,
  Globe,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'breakthrough' | 'publication' | 'deployment' | 'award' | 'collaboration';
  icon: any;
  impact: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  links?: {
    label: string;
    url: string;
    type: 'paper' | 'demo' | 'github' | 'press';
  }[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'qevo-breakthrough',
    date: '2024-12-15',
    title: 'Quantum-Enhanced AI Optimization Breakthrough',
    description: 'Successfully demonstrated 87% reduction in large language model training time using quantum annealing principles for neural network optimization.',
    category: 'breakthrough',
    icon: Zap,
    impact: 'Revolutionary impact on AI training efficiency worldwide',
    metrics: [
      { label: 'Training Speedup', value: '8.7x faster' },
      { label: 'Energy Reduction', value: '76% less power' },
      { label: 'Model Performance', value: '+12% accuracy' }
    ],
    links: [
      { label: 'Research Paper', url: '/content/research/quantum-ai-optimization', type: 'paper' },
      { label: 'Live Demo', url: '/lab/demos/quantum-optimizer', type: 'demo' },
      { label: 'Open Source Code', url: 'https://github.com/astrointelligence/qevo', type: 'github' }
    ]
  },
  {
    id: 'neuromorphic-breakthrough',
    date: '2024-12-10',
    title: 'Neuromorphic Edge AI Revolution',
    description: 'Developed brain-inspired computing architecture achieving human-level performance with 1000x lower power consumption than traditional AI systems.',
    category: 'breakthrough',
    icon: Brain,
    impact: 'Enables AI deployment in resource-constrained environments globally',
    metrics: [
      { label: 'Power Efficiency', value: '1000x improvement' },
      { label: 'Response Time', value: 'Sub-microsecond' },
      { label: 'Deployment Scale', value: '10,000+ edge devices' }
    ],
    links: [
      { label: 'Research Paper', url: '/content/research/neuromorphic-edge-ai', type: 'paper' },
      { label: 'Hardware Demo', url: '/lab/demos/neuromorphic-edge', type: 'demo' },
      { label: 'MIT Validation', url: '#', type: 'press' }
    ]
  },
  {
    id: 'privacy-ai-launch',
    date: '2024-12-05',
    title: 'ZeroTrust Federated Learning Platform',
    description: 'Launched privacy-preserving AI collaboration platform enabling secure multi-party learning with mathematical privacy guarantees.',
    category: 'deployment',
    icon: Shield,
    impact: 'Enables unprecedented AI collaboration while preserving data privacy',
    metrics: [
      { label: 'Privacy Guarantee', value: '100% data protection' },
      { label: 'Accuracy Retention', value: '99.7% vs centralized' },
      { label: 'Global Participants', value: '1,000+ organizations' }
    ],
    links: [
      { label: 'Technical Paper', url: '/content/research/federated-privacy-ai', type: 'paper' },
      { label: 'Enterprise Portal', url: '/lab/demos/federated-learning', type: 'demo' },
      { label: 'GDPR Compliance Report', url: '#', type: 'paper' }
    ]
  },
  {
    id: 'healthcare-consortium',
    date: '2024-11-20',
    title: 'Global Healthcare AI Consortium',
    description: 'Established collaboration with 847 hospitals across 23 countries for privacy-preserving medical AI research.',
    category: 'collaboration',
    icon: Users,
    impact: 'Accelerated medical research by 2.8x while protecting patient privacy',
    metrics: [
      { label: 'Hospital Partners', value: '847 institutions' },
      { label: 'Patient Records', value: '15.6M anonymized' },
      { label: 'Research Projects', value: '34 active studies' }
    ],
    links: [
      { label: 'Partnership Announcement', url: '#', type: 'press' },
      { label: 'Cancer Detection Results', url: '#', type: 'paper' },
      { label: 'Compliance Framework', url: '#', type: 'paper' }
    ]
  },
  {
    id: 'vector-optimization',
    date: '2024-10-15',
    title: 'Vector Search Optimization Engine',
    description: 'Released high-performance vector database achieving 10x faster similarity searches with sub-millisecond response times.',
    category: 'publication',
    icon: Database,
    impact: 'Powers real-time AI applications with unprecedented search performance',
    metrics: [
      { label: 'Query Speed', value: '10x faster' },
      { label: 'Response Time', value: '<0.5ms' },
      { label: 'Scale Support', value: '100M+ vectors' }
    ],
    links: [
      { label: 'Research Paper', url: '/content/research/vector-search-optimization', type: 'paper' },
      { label: 'Interactive Demo', url: '/lab/demos/vector-search', type: 'demo' },
      { label: 'Benchmark Results', url: '#', type: 'paper' }
    ]
  },
  {
    id: 'ai-code-completion',
    date: '2024-09-28',
    title: 'AI-Powered Code Completion Study',
    description: 'Published comprehensive analysis of transformer-based code completion showing 70% productivity improvement for developers.',
    category: 'publication',
    icon: Cpu,
    impact: 'Influenced industry adoption of AI-powered development tools',
    metrics: [
      { label: 'Productivity Gain', value: '70% improvement' },
      { label: 'Error Reduction', value: '45% fewer bugs' },
      { label: 'Developer Survey', value: '500+ participants' }
    ],
    links: [
      { label: 'Full Research', url: '/content/research/ai-code-completion', type: 'paper' },
      { label: 'Developer Survey Results', url: '#', type: 'paper' },
      { label: 'Industry Impact Report', url: '#', type: 'press' }
    ]
  },
  {
    id: 'fintech-network',
    date: '2024-08-12',
    title: 'Global Financial Intelligence Network',
    description: 'Deployed fraud detection system across 1,247 banks worldwide, preventing $12.4M in daily fraud while preserving customer privacy.',
    category: 'deployment',
    icon: Globe,
    impact: 'Transformed global financial security through collaborative AI',
    metrics: [
      { label: 'Bank Partners', value: '1,247 institutions' },
      { label: 'Daily Fraud Prevention', value: '$12.4M saved' },
      { label: 'False Positive Reduction', value: '28.3% improvement' }
    ],
    links: [
      { label: 'Network Overview', url: '#', type: 'demo' },
      { label: 'Security Whitepaper', url: '#', type: 'paper' },
      { label: 'Financial Times Coverage', url: '#', type: 'press' }
    ]
  },
  {
    id: 'smart-city-initiative',
    date: '2024-07-03',
    title: 'Privacy-Preserving Smart City Network',
    description: 'Launched smart city optimization platform across 156 cities, improving urban efficiency by 23.7% while protecting citizen privacy.',
    category: 'deployment',
    icon: TrendingUp,
    impact: 'Enhanced quality of life for 340M urban residents globally',
    metrics: [
      { label: 'Participating Cities', value: '156 worldwide' },
      { label: 'Urban Population', value: '340M residents' },
      { label: 'Efficiency Improvement', value: '23.7% average' }
    ],
    links: [
      { label: 'City Dashboard Demo', url: '#', type: 'demo' },
      { label: 'Urban Planning Guide', url: '#', type: 'paper' },
      { label: 'Mayor Testimonials', url: '#', type: 'press' }
    ]
  },
  {
    id: 'neurips-award',
    date: '2024-06-15',
    title: 'NeurIPS Outstanding Paper Award',
    description: 'Received prestigious NeurIPS Outstanding Paper Award for breakthrough research in quantum-classical hybrid optimization algorithms.',
    category: 'award',
    icon: Award,
    impact: 'International recognition of quantum AI research excellence',
    metrics: [
      { label: 'Papers Submitted', value: '12,000+ to NeurIPS' },
      { label: 'Acceptance Rate', value: '<1% for awards' },
      { label: 'Citation Impact', value: '250+ citations' }
    ],
    links: [
      { label: 'Award Ceremony', url: '#', type: 'press' },
      { label: 'Peer Review Comments', url: '#', type: 'paper' },
      { label: 'Conference Presentation', url: '#', type: 'demo' }
    ]
  },
  {
    id: 'quantum-lab-founding',
    date: '2024-01-15',
    title: 'Astro Intelligence Research Lab Founded',
    description: 'Established world-class AI research laboratory with focus on quantum-enhanced machine learning, privacy-preserving AI, and neuromorphic computing.',
    category: 'breakthrough',
    icon: Lightbulb,
    impact: 'Created foundation for revolutionary AI research breakthroughs',
    metrics: [
      { label: 'Research Areas', value: '5 core domains' },
      { label: 'Initial Team', value: '12 PhD researchers' },
      { label: 'Funding Secured', value: '$50M initial' }
    ],
    links: [
      { label: 'Lab Mission Statement', url: '/lab', type: 'paper' },
      { label: 'Research Roadmap', url: '#', type: 'paper' },
      { label: 'Founding Press Release', url: '#', type: 'press' }
    ]
  }
];

const categories = [
  { id: 'all', label: 'All Events', icon: Calendar },
  { id: 'breakthrough', label: 'Breakthroughs', icon: Zap },
  { id: 'publication', label: 'Publications', icon: Cpu },
  { id: 'deployment', label: 'Deployments', icon: Globe },
  { id: 'award', label: 'Awards', icon: Award },
  { id: 'collaboration', label: 'Collaborations', icon: Users },
];

export default function InnovationTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = selectedCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breakthrough': return Zap;
      case 'publication': return Cpu;
      case 'deployment': return Globe;
      case 'award': return Award;
      case 'collaboration': return Users;
      default: return Calendar;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'breakthrough': return 'from-yellow-500 to-orange-500';
      case 'publication': return 'from-blue-500 to-cyan-500';
      case 'deployment': return 'from-green-500 to-emerald-500';
      case 'award': return 'from-purple-500 to-pink-500';
      case 'collaboration': return 'from-indigo-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Innovation Timeline
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Journey through our groundbreaking research milestones and technological breakthroughs 
            that are reshaping the future of artificial intelligence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.label}
              </Badge>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-purple-500/50 to-pink-500/50" />

          {/* Timeline events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const Icon = event.icon;
              const categoryColor = getCategoryColor(event.category);
              
              return (
                <div key={event.id} className="relative flex items-start gap-8">
                  {/* Timeline marker */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${categoryColor} p-1`}>
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                  </div>

                  {/* Event content */}
                  <Card className="flex-1 card-padding hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" size="sm">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </Badge>
                          <Badge variant="secondary" size="sm">
                            {event.category}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>

                        {/* Impact */}
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
                          <div className="text-sm font-medium text-primary mb-1">Impact</div>
                          <div className="text-sm text-foreground">{event.impact}</div>
                        </div>

                        {/* Metrics */}
                        {event.metrics && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            {event.metrics.map((metric, metricIndex) => (
                              <div key={metricIndex} className="text-center">
                                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                                <div className="text-xs text-muted-foreground">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Links */}
                        {event.links && (
                          <div className="flex flex-wrap gap-2">
                            {event.links.map((link, linkIndex) => (
                              <Button
                                key={linkIndex}
                                size="sm"
                                variant="outline"
                                asChild
                              >
                                <a 
                                  href={link.url} 
                                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                  {link.type === 'github' && <ExternalLink className="mr-2 h-3 w-3" />}
                                  {link.type === 'demo' && <Zap className="mr-2 h-3 w-3" />}
                                  {link.type === 'paper' && <Cpu className="mr-2 h-3 w-3" />}
                                  {link.type === 'press' && <Globe className="mr-2 h-3 w-3" />}
                                  {link.label}
                                </a>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <Card className="mt-12 p-8 text-center bg-gradient-to-r from-primary/5 to-purple-500/5">
          <h2 className="text-2xl font-bold mb-4">The Future of AI Innovation</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            This is just the beginning. Our research continues to push the boundaries of what's possible 
            in artificial intelligence, with new breakthroughs on the horizon.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a href="/lab/publications">View All Research</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact">Collaborate With Us</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}