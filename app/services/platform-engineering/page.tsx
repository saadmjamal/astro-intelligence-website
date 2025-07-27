import { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Platform Engineering - Astro Intelligence Inc',
  description: 'Build self-service developer platforms that accelerate innovation. Golden paths, internal developer portals, and automated governance.',
};

const features = [
  {
    title: 'Internal Developer Portal',
    description: 'Centralized hub for all developer needs with self-service capabilities.',
    icon: '🏛️',
    details: [
      'Service catalog',
      'Documentation hub',
      'API marketplace',
      'Metrics dashboards'
    ]
  },
  {
    title: 'Golden Path Templates',
    description: 'Pre-configured, production-ready templates that encode best practices.',
    icon: '🛤️',
    details: [
      'Language-specific starters',
      'Security by default',
      'Automated testing',
      'CI/CD pipelines'
    ]
  },
  {
    title: 'Self-Service Infrastructure',
    description: 'Enable developers to provision resources without tickets or delays.',
    icon: '🚀',
    details: [
      'One-click deployments',
      'Resource provisioning',
      'Environment management',
      'Cost visibility'
    ]
  },
  {
    title: 'Automated Governance',
    description: 'Enforce policies and compliance without slowing down development.',
    icon: '⚖️',
    details: [
      'Policy as code',
      'Automated compliance checks',
      'Security scanning',
      'Audit trails'
    ]
  },
  {
    title: 'Developer Experience',
    description: 'Tools and workflows designed with developer productivity in mind.',
    icon: '💻',
    details: [
      'CLI tools',
      'IDE integrations',
      'Local development',
      'Fast feedback loops'
    ]
  },
  {
    title: 'Platform Analytics',
    description: 'Measure and optimize platform adoption and developer satisfaction.',
    icon: '📊',
    details: [
      'Usage metrics',
      'Developer velocity',
      'Platform health',
      'Cost attribution'
    ]
  }
];

const useCases = [
  {
    industry: 'E-Commerce Giant',
    scenario: 'Scaling Developer Productivity',
    solution: 'Built internal platform enabling 500+ developers to deploy services in minutes instead of weeks.',
    results: ['10x deployment frequency', '80% reduction in onboarding time', '92% developer satisfaction']
  },
  {
    industry: 'Global Bank',
    scenario: 'Regulatory Compliance at Speed',
    solution: 'Platform with built-in compliance checks allowing teams to innovate within regulatory boundaries.',
    results: ['100% compliance rate', '75% faster time to market', 'Zero compliance violations']
  },
  {
    industry: 'Tech Startup',
    scenario: 'Rapid Growth Support',
    solution: 'Scalable platform supporting growth from 10 to 200 engineers without productivity loss.',
    results: ['3x developer productivity', 'Linear scaling costs', '5-minute service creation']
  },
  {
    industry: 'Healthcare Provider',
    scenario: 'HIPAA-Compliant Development',
    solution: 'Secure platform with HIPAA compliance baked into every service template and workflow.',
    results: ['Zero security incidents', '60% faster feature delivery', 'Automated compliance reporting']
  }
];

export default function PlatformEngineeringPage() {
  return (
    <ServicePageTemplate
      title="Platform Engineering"
      icon="🏗️"
      description="Transform your development experience with internal platforms that empower developers while maintaining governance. We help you build the foundation that accelerates innovation at scale."
      heroGradient="from-green-500/20 via-navy to-black"
      features={features}
      useCases={useCases}
      ctaTitle="Ready to Empower Your Developers?"
      ctaDescription="Let's build a platform that turns your developers into superheroes."
    >
      {/* Platform Maturity Assessment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Platform Engineering Principles
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                principle: 'Product Thinking',
                description: 'Treat your platform as a product with developers as customers',
                practices: ['User research', 'Feature roadmaps', 'Success metrics']
              },
              {
                principle: 'Self-Service First',
                description: 'Empower developers to help themselves without bottlenecks',
                practices: ['Automated provisioning', 'Clear documentation', 'Intuitive interfaces']
              },
              {
                principle: 'Golden Paths',
                description: 'Provide opinionated defaults while allowing flexibility',
                practices: ['Best practice templates', 'Escape hatches', 'Progressive disclosure']
              }
            ].map((item) => (
              <div key={item.principle} className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-6">
                <Heading as="h3" variant="h4" className="mb-3">
                  {item.principle}
                </Heading>
                <Text variant="body" className="text-offwhite/70 mb-4">
                  {item.description}
                </Text>
                <ul className="space-y-2">
                  {item.practices.map((practice) => (
                    <li key={practice} className="flex items-start gap-2">
                      <span className="text-magenta mt-1">→</span>
                      <Text variant="small" className="text-offwhite/60">
                        {practice}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageTemplate>
  );
}