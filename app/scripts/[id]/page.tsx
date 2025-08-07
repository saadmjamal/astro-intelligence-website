import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { getScriptById, getRelatedScripts } from '@/lib/scripts-data-enhanced';
import { 
  ArrowLeft, 
  Download, 
  Code, 
  CheckCircle, 
  Clock, 
  FileCode,
  Package,
  Shield,
  Zap
} from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const script = getScriptById(id);
  
  if (!script) {
    return {
      title: 'Script Not Found | Astro Intelligence',
    };
  }

  return {
    title: `${script.title} | Astro Intelligence Scripts`,
    description: script.description,
    openGraph: {
      title: script.title,
      description: script.description,
      type: 'website',
    },
  };
}

export default async function ScriptDetailPage({ params }: Props) {
  const { id } = await params;
  const script = getScriptById(id);
  
  if (!script) {
    notFound();
  }

  const relatedScripts = getRelatedScripts(id);

  const categoryColors = {
    'cloud-infrastructure': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'ai-ml': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'data-engineering': 'bg-green-500/10 text-green-500 border-green-500/20',
    'devops-automation': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'security-compliance': 'bg-red-500/10 text-red-500 border-red-500/20',
    'monitoring-observability': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  };

  const categoryNames = {
    'cloud-infrastructure': 'Cloud Infrastructure',
    'ai-ml': 'AI & Machine Learning',
    'data-engineering': 'Data Engineering',
    'devops-automation': 'DevOps Automation',
    'security-compliance': 'Security & Compliance',
    'monitoring-observability': 'Monitoring & Observability',
  };

  const relatedContent = [
    {
      id: 'documentation',
      title: 'Documentation',
      excerpt: 'Complete setup and usage guide',
      href: script.documentation || `/docs/scripts/${script.id}`,
    },
    {
      id: 'support',
      title: 'Get Support',
      excerpt: 'Need help? Our experts are here',
      href: '/contact?type=script-support',
    },
    {
      id: 'all-scripts',
      title: 'Browse Scripts',
      excerpt: 'Explore our full catalog',
      href: '/scripts',
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
            <Link 
              href={`/scripts/category/${script.category}`} 
              className="hover:text-foreground transition-colors"
            >
              {categoryNames[script.category]}
            </Link>
            <span>/</span>
            <span className="text-foreground">{script.title}</span>
          </nav>
        </div>
      </section>

      {/* Script Details */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-gap-lg">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className={categoryColors[script.category]}>
                    {categoryNames[script.category]}
                  </Badge>
                  {script.featured && (
                    <Badge variant="default">
                      <Zap className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <Heading as="h1" variant="h1" className="mb-4">
                  {script.title}
                </Heading>
                
                <Text variant="lead" className="text-muted-foreground mb-6">
                  {script.description}
                </Text>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    <span>{script.language}</span>
                  </div>
                  {script.version && (
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>v{script.version}</span>
                    </div>
                  )}
                  {script.lastUpdated && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Updated {new Date(script.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  )}
                  {script.downloads && (
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>{script.downloads}+ downloads</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <Card>
                <div className="card-padding">
                  <Heading as="h2" variant="h3" className="mb-6">
                    Key Features
                  </Heading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {script.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <Text variant="body">{feature}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Requirements */}
              {script.requirements && script.requirements.length > 0 && (
                <Card>
                  <div className="card-padding">
                    <Heading as="h2" variant="h3" className="mb-6">
                      Requirements
                    </Heading>
                    <ul className="space-y-2">
                      {script.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <Text variant="body">{req}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}

              {/* What's Included */}
              <Card>
                <div className="card-padding">
                  <Heading as="h2" variant="h3" className="mb-6">
                    What's Included
                  </Heading>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-magenta shrink-0 mt-0.5" />
                      <div>
                        <Text variant="body" className="font-medium mb-1">
                          Source Code
                        </Text>
                        <Text variant="small" className="text-muted-foreground">
                          Full source code with comments and documentation
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-magenta shrink-0 mt-0.5" />
                      <div>
                        <Text variant="body" className="font-medium mb-1">
                          Dependencies
                        </Text>
                        <Text variant="small" className="text-muted-foreground">
                          All required dependencies and setup instructions
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-magenta shrink-0 mt-0.5" />
                      <div>
                        <Text variant="body" className="font-medium mb-1">
                          License
                        </Text>
                        <Text variant="small" className="text-muted-foreground">
                          Commercial license for use in your projects
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Related Scripts */}
              {relatedScripts.length > 0 && (
                <div>
                  <Heading as="h2" variant="h3" className="mb-6">
                    Related Scripts
                  </Heading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedScripts.map((relatedScript) => (
                      <Card key={relatedScript.id} hover>
                        <Link href={`/scripts/${relatedScript.id}`} className="block card-padding">
                          <Heading as="h4" variant="h5" className="mb-2">
                            {relatedScript.title}
                          </Heading>
                          <Text variant="small" className="text-muted-foreground mb-3">
                            {relatedScript.description}
                          </Text>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" size="sm">
                              {relatedScript.language}
                            </Badge>
                            <Text variant="small" className="font-medium">
                              {relatedScript.isPremium ? `$${(relatedScript.price / 100).toFixed(0)}` : 'Free'}
                            </Text>
                          </div>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <Card className="border-magenta/20">
                  <div className="card-padding">
                    <div className="text-center mb-6">
                      {script.isPremium ? (
                        <>
                          <Heading as="h2" variant="h2" className="mb-2">
                            ${(script.price / 100).toFixed(0)}
                          </Heading>
                          <Text variant="small" className="text-muted-foreground">
                            One-time purchase
                          </Text>
                        </>
                      ) : (
                        <>
                          <Heading as="h2" variant="h2" className="text-green-500 mb-2">
                            Free
                          </Heading>
                          <Text variant="small" className="text-muted-foreground">
                            No credit card required
                          </Text>
                        </>
                      )}
                    </div>

                    {script.isPremium ? (
                      <Button asChild size="lg" className="w-full mb-3">
                        <Link href={`/auth/sign-in?redirect=/dashboard/scripts/${script.id}`}>
                          Purchase Script
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size="lg" className="w-full mb-3">
                        <Link href={script.downloadUrl}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Free
                        </Link>
                      </Button>
                    )}

                    <div className="space-y-3 pt-3 border-t border-subtle">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Text variant="small">Instant download</Text>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Text variant="small">Full source code</Text>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Text variant="small">Free updates</Text>
                      </div>
                      {script.isPremium && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Text variant="small">30-day money back</Text>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Support Card */}
                <Card>
                  <div className="card-padding text-center">
                    <Shield className="h-8 w-8 text-magenta mx-auto mb-3" />
                    <Heading as="h3" variant="h5" className="mb-2">
                      Need Help?
                    </Heading>
                    <Text variant="small" className="text-muted-foreground mb-4">
                      Get expert support for implementation and customization
                    </Text>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/contact?type=script-support">
                        Contact Support
                      </Link>
                    </Button>
                  </div>
                </Card>

                {/* Back to Scripts */}
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/scripts">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Scripts
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}