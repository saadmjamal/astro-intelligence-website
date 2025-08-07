import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { checkUserSubscription } from '@/app/actions/subscription';
import { 
  CloudArrowDownIcon, 
  CheckCircleIcon,
  DocumentTextIcon,
  CommandLineIcon,
  ServerStackIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default async function K8sOrchestrationPage() {
  const { hasActiveSubscription } = await checkUserSubscription();

  const features = [
    {
      icon: ServerStackIcon,
      title: 'Multi-Cluster Management',
      description: 'Manage multiple Kubernetes clusters from a single control plane with unified configuration.',
    },
    {
      icon: ChartBarIcon,
      title: 'Auto-Scaling Algorithms',
      description: 'Intelligent HPA and VPA configurations based on real-time metrics and ML predictions.',
    },
    {
      icon: CommandLineIcon,
      title: 'GitOps Integration',
      description: 'Seamless integration with ArgoCD and Flux for declarative cluster management.',
    },
    {
      icon: DocumentTextIcon,
      title: 'Comprehensive Logging',
      description: 'Centralized logging with ELK stack integration and custom dashboards.',
    },
  ];

  const scriptContents = [
    { name: 'deploy.sh', size: '12.4 KB', description: 'Main deployment orchestration script' },
    { name: 'scale-manager.py', size: '28.7 KB', description: 'Intelligent scaling engine' },
    { name: 'health-monitor.go', size: '45.2 KB', description: 'Real-time health monitoring service' },
    { name: 'config/', size: '156 KB', description: 'Kubernetes manifests and Helm charts' },
    { name: 'docs/', size: '89 KB', description: 'Comprehensive documentation and examples' },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="content-width">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard/scripts"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-gray-700 dark:hover:text-gray-200 mb-4"
          >
            ← Back to Scripts
          </Link>
          
          <Heading as="h1" variant="h1" className="mb-4">
            Kubernetes Orchestration Suite
          </Heading>
          <Text variant="lead" className="text-muted-foreground">
            Enterprise-grade automation scripts for Kubernetes deployment, scaling, and monitoring. 
            Built for production workloads at scale.
          </Text>
        </div>

        {/* Download Section */}
        <div className="mb-12 rounded-xl bg-gradient-to-r from-magenta/10 to-purple-600/10 card-padding border border-magenta/20">
          {hasActiveSubscription ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Download
                  </h2>
                  <p className="text-muted-foreground">
                    Your subscription is active. Download the complete suite below.
                  </p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex items-center justify-center">
                  <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                  Download Suite (v2.4.1)
                </Button>
                <Button size="lg" variant="secondary" className="flex items-center justify-center">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  View Documentation
                </Button>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                Package includes all scripts, configurations, and documentation. 245 MB total.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Premium Script
                  </h2>
                  <p className="text-muted-foreground">
                    Subscribe to access this script and all other premium content.
                  </p>
                </div>
              </div>
              
              <Button size="lg" asChild>
                <Link href="/dashboard/billing">
                  Subscribe to Download
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Key Features
          </h2>
          <div className="grid grid-gap md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-magenta/10 text-magenta">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Script Contents */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            What's Included
          </h2>
          <div className="space-y-3">
            {scriptContents.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-navy-800 p-4 border border-gray-200 dark:border-navy-700"
              >
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{item.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Documentation Preview
          </h2>
          <div className="rounded-lg bg-gray-900 card-padding-sm font-mono text-sm text-gray-300 overflow-x-auto">
            <pre>{`# Kubernetes Orchestration Suite

## Quick Start

1. Configure your clusters in config/clusters.yaml
2. Set up service account credentials
3. Run the deployment script:

   ./deploy.sh --cluster production --namespace app

## Architecture

The suite consists of three main components:

- **Deployment Engine**: Handles rolling updates with zero downtime
- **Scaling Manager**: ML-based predictive scaling algorithms
- **Health Monitor**: Real-time monitoring with automated remediation

## Requirements

- Kubernetes 1.24+
- Helm 3.10+
- Python 3.9+ (for scaling engine)
- Go 1.19+ (for health monitor)

See full documentation after download...`}</pre>
          </div>
        </div>

        {/* Support Section */}
        <div className="rounded-xl bg-gray-50 dark:bg-navy-800 card-padding border border-gray-200 dark:border-navy-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Support & Updates
          </h2>
          <p className="text-muted-foreground mb-4">
            This script suite is actively maintained and updated. Premium subscribers receive:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Lifetime updates and bug fixes</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Priority support via Discord</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Access to beta features</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}