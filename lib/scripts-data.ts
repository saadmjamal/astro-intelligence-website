export interface Script {
  id: string;
  title: string;
  description: string;
  category: 'automation' | 'data-analysis' | 'ml-pipeline' | 'deployment';
  language: string;
  price: number; // in cents
  features: string[];
  downloadUrl: string;
  thumbnailUrl: string;
  isPremium: boolean;
}

export const scripts: Script[] = [
  {
    id: 'auto-deploy-vercel',
    title: 'Auto Deploy to Vercel',
    description: 'Automated deployment pipeline for Vercel with rollback capabilities and environment management.',
    category: 'deployment',
    language: 'TypeScript',
    price: 4900,
    features: [
      'Zero-downtime deployments',
      'Automatic rollback on failure',
      'Environment variable management',
      'Slack notifications',
      'Performance monitoring'
    ],
    downloadUrl: '/api/scripts/download/auto-deploy-vercel',
    thumbnailUrl: '/images/scripts/vercel-deploy.png',
    isPremium: true
  },
  {
    id: 'data-pipeline-etl',
    title: 'Data Pipeline ETL Framework',
    description: 'Production-ready ETL pipeline for processing large datasets with fault tolerance.',
    category: 'data-analysis',
    language: 'Python',
    price: 9900,
    features: [
      'Distributed processing',
      'Error handling & retries',
      'Data validation',
      'Multiple data sources',
      'Real-time monitoring'
    ],
    downloadUrl: '/api/scripts/download/data-pipeline-etl',
    thumbnailUrl: '/images/scripts/etl-pipeline.png',
    isPremium: true
  },
  {
    id: 'ml-model-trainer',
    title: 'ML Model Training Pipeline',
    description: 'Comprehensive ML pipeline with hyperparameter tuning and experiment tracking.',
    category: 'ml-pipeline',
    language: 'Python',
    price: 14900,
    features: [
      'AutoML capabilities',
      'Experiment tracking',
      'Model versioning',
      'A/B testing framework',
      'Production deployment'
    ],
    downloadUrl: '/api/scripts/download/ml-model-trainer',
    thumbnailUrl: '/images/scripts/ml-trainer.png',
    isPremium: true
  },
  {
    id: 'api-test-suite',
    title: 'API Testing Suite',
    description: 'Comprehensive API testing framework with load testing and contract validation.',
    category: 'automation',
    language: 'JavaScript',
    price: 3900,
    features: [
      'Contract testing',
      'Load testing',
      'Mock server',
      'CI/CD integration',
      'Detailed reporting'
    ],
    downloadUrl: '/api/scripts/download/api-test-suite',
    thumbnailUrl: '/images/scripts/api-testing.png',
    isPremium: true
  },
  {
    id: 'cloud-cost-optimizer',
    title: 'Cloud Cost Optimizer',
    description: 'Automatically analyze and optimize cloud costs across AWS, GCP, and Azure.',
    category: 'automation',
    language: 'Go',
    price: 7900,
    features: [
      'Multi-cloud support',
      'Resource recommendations',
      'Automated cleanup',
      'Cost forecasting',
      'Slack/email alerts'
    ],
    downloadUrl: '/api/scripts/download/cloud-cost-optimizer',
    thumbnailUrl: '/images/scripts/cloud-optimizer.png',
    isPremium: true
  },
  {
    id: 'basic-logger',
    title: 'Basic Logger Utility',
    description: 'Simple logging utility with file rotation and basic formatting.',
    category: 'automation',
    language: 'Python',
    price: 0,
    features: [
      'File rotation',
      'Multiple log levels',
      'JSON formatting',
      'Console output'
    ],
    downloadUrl: '/api/scripts/download/basic-logger',
    thumbnailUrl: '/images/scripts/logger.png',
    isPremium: false
  }
];

export function getScriptById(id: string): Script | undefined {
  return scripts.find(script => script.id === id);
}

export function getScriptsByCategory(category: Script['category']): Script[] {
  return scripts.filter(script => script.category === category);
}

export function getPremiumScripts(): Script[] {
  return scripts.filter(script => script.isPremium);
}

export function getFreeScripts(): Script[] {
  return scripts.filter(script => !script.isPremium);
}