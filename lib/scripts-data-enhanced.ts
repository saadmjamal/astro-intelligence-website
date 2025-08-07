export interface Script {
  id: string;
  title: string;
  description: string;
  category: 'cloud-infrastructure' | 'ai-ml' | 'data-engineering' | 'devops-automation' | 'security-compliance' | 'monitoring-observability';
  language: string;
  price: number; // in cents
  features: string[];
  downloadUrl: string;
  thumbnailUrl?: string;
  isPremium: boolean;
  featured?: boolean;
  downloads?: number;
  version?: string;
  lastUpdated?: string;
  requirements?: string[];
  documentation?: string;
}

export const scripts: Script[] = [
  // Cloud Infrastructure Scripts
  {
    id: 'multi-cloud-terraform',
    title: 'Multi-Cloud Terraform Framework',
    description: 'Production-ready Terraform modules for AWS, Azure, and GCP with unified interface and best practices.',
    category: 'cloud-infrastructure',
    language: 'HCL/Terraform',
    price: 19900,
    features: [
      'Multi-cloud provider abstraction',
      'Security-first design patterns',
      'Cost optimization built-in',
      'Automated state management',
      'Compliance validation',
      'Drift detection and remediation'
    ],
    downloadUrl: '/api/scripts/download/multi-cloud-terraform',
    isPremium: true,
    featured: true,
    downloads: 450,
    version: '2.1.0',
    lastUpdated: '2025-07-15',
    requirements: ['Terraform >= 1.0', 'Cloud provider credentials'],
    documentation: '/docs/scripts/multi-cloud-terraform'
  },
  {
    id: 'eks-autoscaler-ai',
    title: 'AI-Powered EKS Autoscaler',
    description: 'Intelligent Kubernetes autoscaling for AWS EKS with predictive scaling and cost optimization.',
    category: 'cloud-infrastructure',
    language: 'Go/Python',
    price: 14900,
    features: [
      'Predictive scaling with ML',
      'Multi-dimensional metrics',
      'Cost-aware scaling decisions',
      'Spot instance integration',
      'Real-time monitoring dashboard'
    ],
    downloadUrl: '/api/scripts/download/eks-autoscaler-ai',
    isPremium: true,
    featured: true,
    downloads: 320,
    version: '1.8.0',
    lastUpdated: '2025-07-20'
  },
  {
    id: 'cloud-cost-analyzer',
    title: 'Cloud Cost Analyzer & Optimizer',
    description: 'Comprehensive cloud cost analysis across AWS, Azure, and GCP with automated optimization recommendations.',
    category: 'cloud-infrastructure',
    language: 'Python',
    price: 9900,
    features: [
      'Multi-cloud cost analysis',
      'Resource rightsizing recommendations',
      'Reserved instance planning',
      'Cost anomaly detection',
      'Automated cleanup of unused resources',
      'Executive reporting dashboards'
    ],
    downloadUrl: '/api/scripts/download/cloud-cost-analyzer',
    isPremium: true,
    downloads: 580,
    version: '3.2.0',
    lastUpdated: '2025-07-25'
  },

  // AI & Machine Learning Scripts
  {
    id: 'mlops-pipeline-framework',
    title: 'Enterprise MLOps Pipeline Framework',
    description: 'Complete MLOps pipeline with model versioning, A/B testing, and automated deployment to production.',
    category: 'ai-ml',
    language: 'Python',
    price: 24900,
    features: [
      'End-to-end ML pipeline automation',
      'Model versioning and registry',
      'A/B testing framework',
      'Automated model monitoring',
      'Drift detection and retraining',
      'Multi-framework support (TF, PyTorch, XGBoost)'
    ],
    downloadUrl: '/api/scripts/download/mlops-pipeline-framework',
    isPremium: true,
    featured: true,
    downloads: 280,
    version: '2.0.0',
    lastUpdated: '2025-07-18'
  },
  {
    id: 'ai-data-quality-validator',
    title: 'AI Data Quality Validator',
    description: 'Automated data quality validation for ML pipelines with anomaly detection and data profiling.',
    category: 'ai-ml',
    language: 'Python',
    price: 7900,
    features: [
      'Automated data profiling',
      'Anomaly detection in datasets',
      'Data drift monitoring',
      'Quality score calculation',
      'Integration with ML frameworks'
    ],
    downloadUrl: '/api/scripts/download/ai-data-quality-validator',
    isPremium: true,
    downloads: 410,
    version: '1.5.0',
    lastUpdated: '2025-07-22'
  },
  {
    id: 'llm-fine-tuning-toolkit',
    title: 'LLM Fine-Tuning Toolkit',
    description: 'Enterprise toolkit for fine-tuning large language models with distributed training support.',
    category: 'ai-ml',
    language: 'Python',
    price: 29900,
    features: [
      'Support for GPT, BERT, T5 models',
      'Distributed training orchestration',
      'Automatic hyperparameter tuning',
      'Model evaluation suite',
      'Deployment to inference endpoints'
    ],
    downloadUrl: '/api/scripts/download/llm-fine-tuning-toolkit',
    isPremium: true,
    featured: true,
    downloads: 190,
    version: '1.2.0',
    lastUpdated: '2025-07-28'
  },

  // Data Engineering Scripts
  {
    id: 'real-time-etl-framework',
    title: 'Real-Time ETL Framework',
    description: 'Scalable real-time ETL framework with support for streaming data and complex transformations.',
    category: 'data-engineering',
    language: 'Python/Scala',
    price: 17900,
    features: [
      'Real-time stream processing',
      'Complex event processing',
      'Data quality monitoring',
      'Automatic schema evolution',
      'Multi-source integration',
      'Fault tolerance and recovery'
    ],
    downloadUrl: '/api/scripts/download/real-time-etl-framework',
    isPremium: true,
    downloads: 340,
    version: '2.5.0',
    lastUpdated: '2025-07-19'
  },
  {
    id: 'data-lake-orchestrator',
    title: 'Data Lake Orchestrator',
    description: 'Automated data lake management with cataloging, lineage tracking, and governance.',
    category: 'data-engineering',
    language: 'Python',
    price: 12900,
    features: [
      'Automated data cataloging',
      'Data lineage tracking',
      'Access control management',
      'Data quality rules engine',
      'Metadata management'
    ],
    downloadUrl: '/api/scripts/download/data-lake-orchestrator',
    isPremium: true,
    downloads: 260,
    version: '1.7.0',
    lastUpdated: '2025-07-16'
  },

  // DevOps Automation Scripts
  {
    id: 'gitops-deployment-engine',
    title: 'GitOps Deployment Engine',
    description: 'Complete GitOps implementation with ArgoCD/Flux integration and progressive delivery.',
    category: 'devops-automation',
    language: 'Go/YAML',
    price: 15900,
    features: [
      'GitOps workflow automation',
      'Progressive delivery strategies',
      'Automated rollback capabilities',
      'Multi-environment management',
      'Secret management integration',
      'Compliance validation'
    ],
    downloadUrl: '/api/scripts/download/gitops-deployment-engine',
    isPremium: true,
    featured: true,
    downloads: 420,
    version: '2.3.0',
    lastUpdated: '2025-07-21'
  },
  {
    id: 'ci-cd-pipeline-generator',
    title: 'CI/CD Pipeline Generator',
    description: 'Automatically generate optimized CI/CD pipelines for any technology stack.',
    category: 'devops-automation',
    language: 'TypeScript',
    price: 8900,
    features: [
      'Multi-platform support (GitHub, GitLab, Jenkins)',
      'Automatic dependency detection',
      'Security scanning integration',
      'Performance optimization',
      'Cost-aware pipeline design'
    ],
    downloadUrl: '/api/scripts/download/ci-cd-pipeline-generator',
    isPremium: true,
    downloads: 520,
    version: '3.1.0',
    lastUpdated: '2025-07-17'
  },

  // Security & Compliance Scripts
  {
    id: 'security-compliance-scanner',
    title: 'Enterprise Security & Compliance Scanner',
    description: 'Comprehensive security scanning and compliance validation for cloud infrastructure.',
    category: 'security-compliance',
    language: 'Go',
    price: 21900,
    features: [
      'CIS benchmark validation',
      'GDPR/HIPAA/SOC2 compliance checks',
      'Vulnerability scanning',
      'Configuration drift detection',
      'Automated remediation scripts',
      'Executive compliance reports'
    ],
    downloadUrl: '/api/scripts/download/security-compliance-scanner',
    isPremium: true,
    featured: true,
    downloads: 380,
    version: '3.0.0',
    lastUpdated: '2025-07-23'
  },
  {
    id: 'secrets-rotation-manager',
    title: 'Automated Secrets Rotation Manager',
    description: 'Enterprise-grade secrets rotation with zero-downtime deployment support.',
    category: 'security-compliance',
    language: 'Python',
    price: 11900,
    features: [
      'Automatic secret rotation',
      'Multi-provider support',
      'Zero-downtime rotation',
      'Audit trail and logging',
      'Integration with CI/CD pipelines'
    ],
    downloadUrl: '/api/scripts/download/secrets-rotation-manager',
    isPremium: true,
    downloads: 290,
    version: '1.9.0',
    lastUpdated: '2025-07-14'
  },

  // Monitoring & Observability Scripts
  {
    id: 'observability-stack-deployer',
    title: 'Full Observability Stack Deployer',
    description: 'Deploy complete observability stack with Prometheus, Grafana, and distributed tracing.',
    category: 'monitoring-observability',
    language: 'HCL/YAML',
    price: 13900,
    features: [
      'One-click observability deployment',
      'Pre-configured dashboards',
      'Alert rule templates',
      'Distributed tracing setup',
      'Log aggregation configuration',
      'Custom metrics integration'
    ],
    downloadUrl: '/api/scripts/download/observability-stack-deployer',
    isPremium: true,
    downloads: 460,
    version: '2.2.0',
    lastUpdated: '2025-07-26'
  },
  {
    id: 'intelligent-alert-manager',
    title: 'Intelligent Alert Manager',
    description: 'AI-powered alert management with noise reduction and intelligent routing.',
    category: 'monitoring-observability',
    language: 'Python',
    price: 9900,
    features: [
      'AI-powered alert correlation',
      'Noise reduction algorithms',
      'Intelligent alert routing',
      'Automated incident creation',
      'Runbook automation'
    ],
    downloadUrl: '/api/scripts/download/intelligent-alert-manager',
    isPremium: true,
    downloads: 310,
    version: '1.6.0',
    lastUpdated: '2025-07-24'
  },

  // Free Scripts
  {
    id: 'basic-terraform-validator',
    title: 'Basic Terraform Validator',
    description: 'Simple validation tool for Terraform configurations with basic security checks.',
    category: 'cloud-infrastructure',
    language: 'Python',
    price: 0,
    features: [
      'Syntax validation',
      'Basic security checks',
      'Resource naming validation',
      'Simple reporting'
    ],
    downloadUrl: '/api/scripts/download/basic-terraform-validator',
    isPremium: false,
    downloads: 1200,
    version: '1.0.0',
    lastUpdated: '2025-07-10'
  },
  {
    id: 'log-parser-utility',
    title: 'Log Parser Utility',
    description: 'Parse and analyze common log formats with basic filtering and search.',
    category: 'monitoring-observability',
    language: 'Python',
    price: 0,
    features: [
      'Multiple log format support',
      'Basic filtering',
      'Search functionality',
      'CSV export'
    ],
    downloadUrl: '/api/scripts/download/log-parser-utility',
    isPremium: false,
    downloads: 890,
    version: '1.2.0',
    lastUpdated: '2025-07-05'
  },
  {
    id: 'docker-cleanup-script',
    title: 'Docker Cleanup Script',
    description: 'Clean up unused Docker images, containers, and volumes to free up disk space.',
    category: 'devops-automation',
    language: 'Bash',
    price: 0,
    features: [
      'Remove unused images',
      'Clean stopped containers',
      'Prune unused volumes',
      'Disk space reporting'
    ],
    downloadUrl: '/api/scripts/download/docker-cleanup-script',
    isPremium: false,
    downloads: 1450,
    version: '1.1.0',
    lastUpdated: '2025-07-01'
  },
  {
    id: 'basic-backup-script',
    title: 'Basic Backup Script',
    description: 'Simple backup script with rotation and compression for small deployments.',
    category: 'devops-automation',
    language: 'Bash',
    price: 0,
    features: [
      'File and directory backup',
      'Compression support',
      'Rotation policies',
      'Basic scheduling'
    ],
    downloadUrl: '/api/scripts/download/basic-backup-script',
    isPremium: false,
    downloads: 760,
    version: '1.0.0',
    lastUpdated: '2025-06-28'
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

export function getFeaturedScripts(): Script[] {
  return scripts.filter(script => script.featured);
}

export function getRelatedScripts(scriptId: string, limit: number = 3): Script[] {
  const script = getScriptById(scriptId);
  if (!script) return [];
  
  return scripts
    .filter(s => s.id !== scriptId && s.category === script.category)
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, limit);
}