import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Heading, Text } from '@/components/ui/Typography';
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Code2, 
  Package,
  Zap,
  Shield,
  Database,
  Cloud
} from 'lucide-react';

const projects = [
  {
    name: 'AI Pipeline Orchestrator',
    description: 'A Kubernetes-native workflow engine designed specifically for ML pipelines with built-in experiment tracking and model versioning.',
    github: 'https://github.com/astrointelligence/ai-pipeline-orchestrator',
    stars: 1234,
    forks: 156,
    language: 'Go',
    topics: ['kubernetes', 'ml-ops', 'workflow', 'orchestration'],
    icon: Zap,
    color: 'text-yellow-500',
  },
  {
    name: 'Secure Model Registry',
    description: 'Enterprise-grade model registry with built-in security scanning, vulnerability detection, and compliance tracking for AI models.',
    github: 'https://github.com/astrointelligence/secure-model-registry',
    stars: 856,
    forks: 92,
    language: 'Python',
    topics: ['security', 'ml-models', 'registry', 'compliance'],
    icon: Shield,
    color: 'text-green-500',
  },
  {
    name: 'Vector DB Optimizer',
    description: 'High-performance optimization layer for vector databases, improving query performance by up to 10x for similarity search operations.',
    github: 'https://github.com/astrointelligence/vector-db-optimizer',
    stars: 2103,
    forks: 312,
    language: 'Rust',
    topics: ['vector-search', 'database', 'optimization', 'performance'],
    icon: Database,
    color: 'text-blue-500',
  },
  {
    name: 'Cloud Cost Predictor',
    description: 'ML-powered tool for predicting and optimizing cloud infrastructure costs across AWS, GCP, and Azure.',
    github: 'https://github.com/astrointelligence/cloud-cost-predictor',
    stars: 567,
    forks: 78,
    language: 'TypeScript',
    topics: ['cloud', 'cost-optimization', 'finops', 'ml'],
    icon: Cloud,
    color: 'text-purple-500',
  },
  {
    name: 'LLM Test Suite',
    description: 'Comprehensive testing framework for Large Language Models including prompt injection detection, hallucination testing, and bias evaluation.',
    github: 'https://github.com/astrointelligence/llm-test-suite',
    stars: 3421,
    forks: 456,
    language: 'Python',
    topics: ['llm', 'testing', 'ai-safety', 'evaluation'],
    icon: Package,
    color: 'text-pink-500',
  },
  {
    name: 'Distributed Training Framework',
    description: 'Simplified framework for distributed ML training across heterogeneous hardware with automatic optimization and fault tolerance.',
    github: 'https://github.com/astrointelligence/distributed-training',
    stars: 1892,
    forks: 234,
    language: 'C++',
    topics: ['distributed-computing', 'ml-training', 'gpu', 'optimization'],
    icon: Code2,
    color: 'text-orange-500',
  },
];

const languageColors: Record<string, string> = {
  Go: 'bg-cyan-500',
  Python: 'bg-blue-500',
  Rust: 'bg-orange-500',
  TypeScript: 'bg-blue-600',
  'C++': 'bg-pink-500',
};

export default function OpenSourcePage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Heading as="h1" variant="h1" className="mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Open Source Projects
          </Heading>
          <Text variant="lead" className="max-w-2xl mx-auto mb-8">
            We believe in open collaboration. Explore our collection of open-source tools and frameworks 
            designed to accelerate AI and cloud development.
          </Text>
          <Button size="lg" asChild>
            <a href="https://github.com/astrointelligence" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-gap mb-12 max-w-4xl mx-auto">
          <Card className="card-padding-sm text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {projects.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </Card>
          <Card className="card-padding-sm text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {projects.reduce((acc, p) => acc + p.stars, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">GitHub Stars</div>
          </Card>
          <Card className="card-padding-sm text-center">
            <div className="text-3xl font-bold text-pink-500 mb-2">
              {projects.reduce((acc, p) => acc + p.forks, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Forks</div>
          </Card>
          <Card className="card-padding-sm text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              150+
            </div>
            <div className="text-sm text-muted-foreground">Contributors</div>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Card key={project.name} hover className="card-padding-sm">
                <div className="stack">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${project.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Heading as="h3" variant="h4">{project.name}</Heading>
                    </div>
                  </div>

                  {/* Description */}
                  <Text variant="body" className="text-muted-foreground">{project.description}</Text>

                  {/* Language and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${languageColors[project.language]}`} />
                      <span className="text-sm text-muted-foreground">{project.language}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {project.forks}
                      </div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1">
                    {project.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" size="sm">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="default" className="flex-1" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`${project.github}/issues`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 card-padding text-center bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
          <Heading as="h2" variant="h2" className="mb-4">Contribute to Our Projects</Heading>
          <Text variant="body" className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We welcome contributions from developers around the world. Whether it's fixing bugs, 
            adding features, or improving documentation, your help makes a difference.
          </Text>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a href="https://github.com/astrointelligence/contributing" target="_blank" rel="noopener noreferrer">
                Read Contributing Guide
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}