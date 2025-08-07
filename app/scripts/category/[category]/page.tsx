import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { getScriptsByCategory } from '@/lib/scripts-data-enhanced';
import { 
  ArrowLeft, 
  ArrowRight,
  Download, 
  Code, 
  Zap,
  Cloud,
  BarChart3,
  Lock,
  CheckCircle
} from 'lucide-react';

type Props = {
  params: Promise<{ category: string }>;
};

const categoryInfo = {
  'cloud-infrastructure': {
    name: 'Cloud Infrastructure',
    description: 'Terraform modules, CloudFormation templates, and multi-cloud automation scripts for modern infrastructure management',
    icon: Cloud,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    features: [
      'Multi-cloud support (AWS, Azure, GCP)',
      'Infrastructure as Code best practices',
      'Cost optimization built-in',
      'Security and compliance focused',
      'Production-ready templates',
      'Automated deployment pipelines'
    ]
  },
  'ai-ml': {
    name: 'AI & Machine Learning',
    description: 'ML pipelines, model training frameworks, and AI automation tools for enterprise-scale machine learning',
    icon: Zap,
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    features: [
      'End-to-end ML pipelines',
      'Model versioning and registry',
      'Automated hyperparameter tuning',
      'Distributed training support',
      'Production deployment ready',
      'Monitoring and drift detection'
    ]
  },
  'data-engineering': {
    name: 'Data Engineering',
    description: 'ETL pipelines, data processing frameworks, and analytics automation for scalable data workflows',
    icon: BarChart3,
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
    features: [
      'Real-time stream processing',
      'Batch ETL frameworks',
      'Data quality validation',
      'Schema evolution support',
      'Multi-source integration',
      'Automated data cataloging'
    ]
  },
  'devops-automation': {
    name: 'DevOps Automation',
    description: 'CI/CD pipelines, deployment automation, and infrastructure management tools for modern DevOps',
    icon: Code,
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    features: [
      'GitOps workflows',
      'Progressive deployment',
      'Automated rollbacks',
      'Multi-environment support',
      'Container orchestration',
      'Pipeline optimization'
    ]
  },
  'security-compliance': {
    name: 'Security & Compliance',
    description: 'Security scanning, compliance automation, and vulnerability management for enterprise security',
    icon: Lock,
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    features: [
      'Automated security scanning',
      'Compliance validation (SOC2, HIPAA, GDPR)',
      'Vulnerability remediation',
      'Secret rotation automation',
      'Access control management',
      'Audit trail generation'
    ]
  },
  'monitoring-observability': {
    name: 'Monitoring & Observability',
    description: 'Monitoring setup, alerting frameworks, and observability tools for comprehensive system insights',
    icon: CheckCircle,
    color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    features: [
      'Full-stack observability',
      'Intelligent alerting',
      'Distributed tracing',
      'Log aggregation',
      'Custom dashboards',
      'SLO/SLA tracking'
    ]
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = categoryParam as keyof typeof categoryInfo;
  const info = categoryInfo[category];
  
  if (!info) {
    return {
      title: 'Category Not Found | Astro Intelligence Scripts',
    };
  }

  return {
    title: `${info.name} Scripts | Astro Intelligence`,
    description: info.description,
    openGraph: {
      title: `${info.name} Automation Scripts`,
      description: info.description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categoryParam } = await params;
  const category = categoryParam as keyof typeof categoryInfo;
  const info = categoryInfo[category];
  
  if (!info) {
    notFound();
  }

  const categoryScripts = getScriptsByCategory(category as any);
  const Icon = info.icon;

  // Sort scripts by featured status and downloads
  const sortedScripts = [...categoryScripts].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (b.downloads || 0) - (a.downloads || 0);
  });

  const premiumScripts = sortedScripts.filter(s => s.isPremium);
  const freeScripts = sortedScripts.filter(s => !s.isPremium);

  const relatedContent = [
    {
      id: 'all-scripts',
      title: 'All Scripts',
      excerpt: 'Browse our complete catalog',
      href: '/scripts',
    },
    {
      id: 'documentation',
      title: 'Documentation',
      excerpt: 'Learn how to use our scripts',
      href: '/docs/scripts',
    },
    {
      id: 'support',
      title: 'Get Support',
      excerpt: 'Need help? Our experts are here',
      href: '/contact?type=script-support',
    },
  ];

  return (
    <PageLayout relatedContent={relatedContent}>
      {/* Breadcrumb */}
      <section className="section-padding-sm">
        <div className="container-width">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/scripts" className="hover:text-foreground transition-colors">
              Scripts
            </Link>
            <span>/</span>
            <span className="text-foreground">{info.name}</span>
          </nav>
        </div>
      </section>

      {/* Category Header */}
      <section className="section-padding bg-gradient-to-br from-navy-700/20 to-navy-900/20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex p-4 rounded-2xl mb-6 ${info.color}`}>
              <Icon className="h-12 w-12" />
            </div>
            
            <Heading as="h1" variant="h1" className="mb-4">
              {info.name}
            </Heading>
            
            <Text variant="lead" className="text-muted-foreground mb-8">
              {info.description}
            </Text>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Code className="h-4 w-4 mr-2" />
                {categoryScripts.length} Scripts Available
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                {premiumScripts.length} Premium
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Download className="h-4 w-4 mr-2" />
                {freeScripts.length} Free
              </Badge>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {info.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <Text variant="small">{feature}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Scripts */}
      {premiumScripts.length > 0 && (
        <section className="section-padding">
          <div className="container-width">
            <div className="mb-8">
              <Heading as="h2" variant="h2" className="mb-2">
                Premium {info.name} Scripts
              </Heading>
              <Text variant="lead" className="text-muted-foreground">
                Production-ready scripts built by experts
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
              {premiumScripts.map((script) => (
                <Card key={script.id} hover className="flex flex-col">
                  <div className="card-padding flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        {script.featured && (
                          <Badge variant="default">
                            <Zap className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
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
                      {script.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <Text variant="small">{feature}</Text>
                        </div>
                      ))}
                      {script.features.length > 3 && (
                        <Text variant="small" className="text-muted-foreground pl-6">
                          +{script.features.length - 3} more features
                        </Text>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-subtle flex items-center justify-between">
                      <div>
                        <Heading as="h4" variant="h4" className="font-bold">
                          ${(script.price / 100).toFixed(0)}
                        </Heading>
                        <Text variant="caption" className="text-muted-foreground">
                          one-time
                        </Text>
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Free Scripts */}
      {freeScripts.length > 0 && (
        <section className="section-padding bg-muted/20">
          <div className="container-width">
            <div className="mb-8">
              <Heading as="h2" variant="h2" className="mb-2">
                Free {info.name} Scripts
              </Heading>
              <Text variant="lead" className="text-muted-foreground">
                Open-source scripts to get you started
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
              {freeScripts.map((script) => (
                <Card key={script.id} hover>
                  <Link href={`/scripts/${script.id}`} className="flex items-center gap-4 card-padding">
                    <div className={`p-3 rounded-lg ${info.color} shrink-0`}>
                      <Code className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <Heading as="h4" variant="h5" className="mb-1">
                        {script.title}
                      </Heading>
                      <Text variant="small" className="text-muted-foreground mb-2">
                        {script.description}
                      </Text>
                      <div className="flex items-center gap-4">
                        <Badge variant="success">Free</Badge>
                        <Badge variant="outline">{script.language}</Badge>
                        {script.downloads && (
                          <Text variant="caption" className="text-muted-foreground">
                            {script.downloads}+ downloads
                          </Text>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <Card className="bg-gradient-to-r from-magenta-500/10 to-purple-600/10 border-magenta/20">
            <div className="card-padding text-center">
              <Heading as="h2" variant="h3" className="mb-4">
                Need a Custom {info.name} Script?
              </Heading>
              <Text variant="body" className="mb-6 max-w-2xl mx-auto">
                Our team specializes in {info.name.toLowerCase()} automation. We can build custom scripts 
                tailored to your specific requirements and infrastructure.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact?type=custom-script">
                    Request Custom Script
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/scripts">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Browse All Scripts
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}