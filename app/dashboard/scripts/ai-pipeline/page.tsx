import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { checkUserSubscription } from '@/app/actions/subscription';
import { 
  CloudArrowDownIcon, 
  CheckCircleIcon,
  DocumentTextIcon,
  CpuChipIcon,
  BeakerIcon,
  ChartBarSquareIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';

export default async function AIPipelinePage() {
  const { hasActiveSubscription } = await checkUserSubscription();

  const features = [
    {
      icon: CpuChipIcon,
      title: 'Distributed Training',
      description: 'Scale training across multiple GPUs and nodes with automatic data parallelism.',
    },
    {
      icon: BeakerIcon,
      title: 'Experiment Tracking',
      description: 'Comprehensive MLflow integration for tracking experiments, metrics, and artifacts.',
    },
    {
      icon: CircleStackIcon,
      title: 'Data Pipeline',
      description: 'Automated data preprocessing with support for streaming and batch processing.',
    },
    {
      icon: ChartBarSquareIcon,
      title: 'Model Registry',
      description: 'Version control for models with automated deployment to production endpoints.',
    },
  ];

  const scriptContents = [
    { name: 'pipeline/', size: '156 KB', description: 'Core MLOps pipeline orchestration' },
    { name: 'training/', size: '234 KB', description: 'Distributed training frameworks' },
    { name: 'preprocessing/', size: '89 KB', description: 'Data preprocessing modules' },
    { name: 'deployment/', size: '123 KB', description: 'Model deployment automation' },
    { name: 'monitoring/', size: '67 KB', description: 'Production monitoring tools' },
    { name: 'notebooks/', size: '45 KB', description: 'Example Jupyter notebooks' },
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
            AI Model Training Pipeline
          </Heading>
          <Text variant="lead" className="text-muted-foreground">
            Complete MLOps pipeline for training, tracking, and deploying AI models at scale. 
            Built on industry-standard tools and best practices.
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
                    Your subscription is active. Download the complete pipeline below.
                  </p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex items-center justify-center">
                  <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                  Download Pipeline (v3.1.0)
                </Button>
                <Button size="lg" variant="secondary" className="flex items-center justify-center">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  View Documentation
                </Button>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                Package includes all scripts, notebooks, and documentation. 714 MB total.
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

        {/* Code Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Pipeline Configuration Example
          </h2>
          <div className="rounded-lg bg-gray-900 card-padding-sm font-mono text-sm text-gray-300 overflow-x-auto">
            <pre>{`# config/pipeline.yaml

pipeline:
  name: "production-training"
  version: "3.1.0"
  
  stages:
    - name: "data-preprocessing"
      type: "spark"
      config:
        input_path: "s3://raw-data/train/"
        output_path: "s3://processed-data/train/"
        transformations:
          - normalize
          - augment
          - balance_classes
    
    - name: "model-training"
      type: "distributed"
      config:
        framework: "pytorch"
        nodes: 4
        gpus_per_node: 8
        batch_size: 256
        epochs: 100
        early_stopping: true
        
    - name: "evaluation"
      type: "automated"
      config:
        metrics: ["accuracy", "f1", "auc"]
        test_sets: ["validation", "test", "production"]
        
    - name: "deployment"
      type: "canary"
      config:
        endpoints: ["api.prod.company.com"]
        traffic_split: 0.1
        monitoring_duration: "24h"`}</pre>
          </div>
        </div>

        {/* Supported Frameworks */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Supported Frameworks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['PyTorch', 'TensorFlow', 'JAX', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Hugging Face', 'MLflow'].map((framework) => (
              <div
                key={framework}
                className="text-center p-4 rounded-lg bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700"
              >
                <p className="font-medium text-gray-900 dark:text-white">{framework}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="rounded-xl bg-gray-50 dark:bg-navy-800 card-padding border border-gray-200 dark:border-navy-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Enterprise Support
          </h2>
          <p className="text-muted-foreground mb-4">
            This MLOps pipeline is battle-tested in production environments. Premium subscribers receive:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Quarterly updates with latest ML frameworks</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Custom integration support</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Performance optimization consulting</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}