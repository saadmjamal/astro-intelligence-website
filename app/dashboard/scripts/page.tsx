import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { checkUserSubscription } from '@/app/actions/subscription';
import { LockClosedIcon } from '@heroicons/react/24/outline';

interface Script {
  id: string;
  title: string;
  description: string;
  slug: string;
  features: string[];
}

const scripts: Script[] = [
  {
    id: 'k8s-orchestration',
    title: 'Kubernetes Orchestration Suite',
    description: 'Advanced K8s automation scripts for deployment, scaling, and monitoring.',
    slug: 'k8s-orchestration',
    features: [
      'Automated deployment pipelines',
      'Resource scaling algorithms',
      'Health monitoring & alerts',
      'Multi-cluster management',
    ],
  },
  {
    id: 'ai-pipeline',
    title: 'AI Model Training Pipeline',
    description: 'Complete MLOps pipeline for training and deploying AI models at scale.',
    slug: 'ai-pipeline',
    features: [
      'Data preprocessing automation',
      'Distributed training support',
      'Model versioning & registry',
      'A/B testing framework',
    ],
  },
  {
    id: 'cloud-optimizer',
    title: 'Cloud Cost Optimizer',
    description: 'Automated scripts to analyze and reduce cloud infrastructure costs.',
    slug: 'cloud-optimizer',
    features: [
      'Resource usage analysis',
      'Cost forecasting',
      'Automated rightsizing',
      'Multi-cloud support',
    ],
  },
];

export default async function ScriptsPage() {
  const { hasActiveSubscription } = await checkUserSubscription();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container-width">
        <div className="mb-8">
          <Heading as="h1" variant="h1" className="mb-4">
            Premium Scripts
          </Heading>
          <Text variant="body" className="text-muted-foreground">
            Access our collection of enterprise-grade automation scripts and tools.
          </Text>
        </div>

        {/* Subscription Banner */}
        {!hasActiveSubscription && (
          <div className="mb-8 rounded-xl bg-gradient-to-r from-magenta/10 to-purple-600/10 border border-magenta/20 card-padding-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LockClosedIcon className="h-6 w-6 text-magenta" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Unlock Premium Scripts
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Subscribe to download and use all premium automation scripts.
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link href="/dashboard/billing">
                  Subscribe Now
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Scripts Grid */}
        <div className="grid grid-gap-md md:grid-cols-2 lg:grid-cols-3">
          {scripts.map((script) => (
            <div
              key={script.id}
              className="group relative rounded-xl bg-white dark:bg-navy-800 card-padding-sm shadow-lg border border-gray-200 dark:border-navy-700 hover:border-magenta/50 transition-all duration-200"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {script.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {script.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Features
                  </h4>
                  <ul className="space-y-1">
                    {script.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-magenta mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-magenta">Premium</span>
                <Button 
                  size="sm" 
                  variant={hasActiveSubscription ? "primary" : "secondary"}
                  asChild
                >
                  <Link href={`/dashboard/scripts/${script.slug}`}>
                    {hasActiveSubscription ? 'View Details' : 'Learn More'}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}