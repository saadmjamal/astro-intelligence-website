import { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'DevOps as a Service - Astro Intelligence Inc',
  description: 'End-to-end DevOps implementation and management. CI/CD automation, infrastructure as code, and 24/7 expert support.',
};

const features = [
  {
    title: 'CI/CD Pipeline Automation',
    description: 'Build, test, and deploy with confidence using automated pipelines.',
    icon: '🔄',
    details: [
      'GitOps workflows',
      'Automated testing',
      'Progressive deployments',
      'Rollback capabilities'
    ]
  },
  {
    title: 'Infrastructure as Code',
    description: 'Manage your entire infrastructure through version-controlled code.',
    icon: '📝',
    details: [
      'Terraform automation',
      'Cloud-agnostic templates',
      'Drift detection',
      'Cost tracking'
    ]
  },
  {
    title: 'Monitoring & Observability',
    description: 'Complete visibility into your applications and infrastructure.',
    icon: '📊',
    details: [
      'Real-time dashboards',
      'Custom alerts',
      'Log aggregation',
      'Performance metrics'
    ]
  },
  {
    title: 'Security Integration',
    description: 'Security built into every stage of your development lifecycle.',
    icon: '🔒',
    details: [
      'SAST/DAST scanning',
      'Vulnerability management',
      'Compliance automation',
      'Secret management'
    ]
  },
  {
    title: '24/7 Expert Support',
    description: 'Round-the-clock support from certified DevOps engineers.',
    icon: '🛟',
    details: [
      'Incident response',
      'Performance optimization',
      'Architecture reviews',
      'Best practices guidance'
    ]
  },
  {
    title: 'Cost Optimization',
    description: 'Continuously optimize your cloud spending without sacrificing performance.',
    icon: '💡',
    details: [
      'Resource right-sizing',
      'Reserved instance planning',
      'Waste identification',
      'Budget alerts'
    ]
  }
];

const useCases = [
  {
    industry: 'SaaS Startup',
    scenario: 'Rapid Growth Scaling',
    solution: 'Implemented fully automated CI/CD pipelines and auto-scaling infrastructure, enabling 50+ daily deployments.',
    results: ['10x deployment frequency', '90% reduction in lead time', 'Zero-downtime deployments']
  },
  {
    industry: 'Enterprise Retail',
    scenario: 'Multi-Cloud Migration',
    solution: 'Orchestrated migration of 200+ applications across AWS, Azure, and GCP with unified DevOps practices.',
    results: ['6-month migration', '40% cost reduction', '99.99% uptime maintained']
  },
  {
    industry: 'Financial Services',
    scenario: 'Regulatory Compliance',
    solution: 'Built compliant CI/CD pipelines with automated security scanning and audit trails for SOC2 and PCI-DSS.',
    results: ['100% compliance score', 'Automated audit reports', '75% faster deployments']
  },
  {
    industry: 'Gaming Company',
    scenario: 'Global Game Launch',
    solution: 'Designed auto-scaling infrastructure to handle millions of concurrent players across multiple regions.',
    results: ['10M concurrent users', 'Sub-50ms latency globally', '£2M infrastructure savings']
  }
];

export default function DevOpsAsAServicePage() {
  return (
    <ServicePageTemplate
      title="DevOps as a Service"
      icon="⚡"
      description="Transform your software delivery with end-to-end DevOps implementation and management. We handle the complexity while you focus on innovation. From CI/CD automation to 24/7 monitoring, we've got you covered."
      heroGradient="from-blue-500/20 via-navy to-black"
      features={features}
      useCases={useCases}
      ctaTitle="Ready to Accelerate Your DevOps Journey?"
      ctaDescription="Let our experts design and implement a DevOps strategy tailored to your needs."
    >
      {/* DevOps Maturity Model Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            DevOps Maturity Assessment
          </Heading>
          
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { level: 1, name: 'Initial', description: 'Ad-hoc processes, manual deployments' },
              { level: 2, name: 'Managed', description: 'Basic automation, some standardization' },
              { level: 3, name: 'Defined', description: 'Documented processes, consistent automation' },
              { level: 4, name: 'Quantified', description: 'Metrics-driven, continuous improvement' },
              { level: 5, name: 'Optimized', description: 'Self-healing, AI-powered operations' }
            ].map((stage) => (
              <div key={stage.level} className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold ${
                  stage.level <= 3 ? 'bg-offwhite/10' : 'bg-gradient-to-br from-magenta to-purple-600'
                }`}>
                  {stage.level}
                </div>
                <Heading as="h4" variant="h6" className="mb-2">
                  {stage.name}
                </Heading>
                <Text variant="small" className="text-offwhite/60">
                  {stage.description}
                </Text>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Text variant="body" className="text-offwhite/80">
              Most organizations start at Level 2. We help you reach Level 5 within 12 months.
            </Text>
          </div>
        </div>
      </section>
    </ServicePageTemplate>
  );
}