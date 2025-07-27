import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Scripts Marketplace - Astro Intelligence Inc',
  description:
    'Production-ready automation scripts and tools for DevOps, cloud infrastructure, and AI operations.',
};

const scriptCategories = [
  {
    name: 'Kubernetes Automation',
    icon: '☸️',
    count: 24,
    popular: [
      {
        name: 'k8s-auto-scaler',
        stars: 1250,
        description: 'AI-powered autoscaling for Kubernetes',
      },
      { name: 'k8s-cost-optimizer', stars: 890, description: 'Reduce K8s costs by up to 60%' },
      { name: 'k8s-security-scanner', stars: 720, description: 'Automated security scanning' },
    ],
  },
  {
    name: 'CI/CD Pipelines',
    icon: '🔄',
    count: 18,
    popular: [
      {
        name: 'multi-cloud-deploy',
        stars: 2100,
        description: 'Deploy to AWS, GCP, Azure seamlessly',
      },
      { name: 'smart-rollback', stars: 1450, description: 'AI-driven rollback decisions' },
      { name: 'pipeline-optimizer', stars: 980, description: 'Optimize build times by 70%' },
    ],
  },
  {
    name: 'Infrastructure as Code',
    icon: '📝',
    count: 31,
    popular: [
      { name: 'terraform-modules', stars: 3200, description: 'Production-ready Terraform modules' },
      {
        name: 'crossplane-templates',
        stars: 1100,
        description: 'Cloud-native infrastructure templates',
      },
      { name: 'pulumi-patterns', stars: 850, description: 'Reusable Pulumi patterns' },
    ],
  },
  {
    name: 'Monitoring & Observability',
    icon: '📊',
    count: 15,
    popular: [
      { name: 'unified-dashboards', stars: 1900, description: 'Multi-cloud monitoring dashboards' },
      { name: 'smart-alerts', stars: 1200, description: 'ML-based alert optimization' },
      { name: 'trace-analyzer', stars: 780, description: 'Distributed trace analysis' },
    ],
  },
];

const pricingTiers = [
  {
    name: 'Open Source',
    price: 'Free',
    features: [
      'Access to community scripts',
      'Basic documentation',
      'GitHub integration',
      'Community support',
    ],
    cta: 'Browse Free Scripts',
    variant: 'secondary' as const,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    features: [
      'All open source scripts',
      'Premium script library',
      'Priority support',
      'Custom modifications',
      'Commercial license',
    ],
    cta: 'Start Free Trial',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Custom script development',
      'SLA guarantees',
      'Dedicated support',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    variant: 'secondary' as const,
  },
];

export default function ScriptsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="via-navy absolute inset-0 bg-gradient-to-br from-purple-600/20 to-black" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Scripts Marketplace
          </Heading>
          <Text variant="lead" className="mx-auto mb-8 max-w-3xl">
            Production-ready automation scripts built by experts. Save weeks of development time
            with battle-tested solutions for Kubernetes, CI/CD, and cloud infrastructure.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#categories">Browse Scripts</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="https://github.com/astro-intelligence">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-offwhite/10 border-y px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-magenta text-3xl font-bold">88+</div>
              <Text variant="small" className="text-offwhite/70">
                Premium Scripts
              </Text>
            </div>
            <div>
              <div className="text-magenta text-3xl font-bold">15K+</div>
              <Text variant="small" className="text-offwhite/70">
                GitHub Stars
              </Text>
            </div>
            <div>
              <div className="text-magenta text-3xl font-bold">2.5K+</div>
              <Text variant="small" className="text-offwhite/70">
                Active Users
              </Text>
            </div>
            <div>
              <div className="text-magenta text-3xl font-bold">99.9%</div>
              <Text variant="small" className="text-offwhite/70">
                Success Rate
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Browse by Category
          </Heading>

          <div className="grid gap-8 md:grid-cols-2">
            {scriptCategories.map((category) => (
              <div
                key={category.name}
                className="from-offwhite/5 to-offwhite/0 border-offwhite/10 hover:border-magenta/50 rounded-2xl border bg-gradient-to-br p-8 transition-colors"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <Heading as="h3" variant="h3">
                        {category.name}
                      </Heading>
                      <Text variant="small" className="text-offwhite/60">
                        {category.count} scripts available
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.popular.map((script) => (
                    <div
                      key={script.name}
                      className="flex items-start justify-between rounded-lg bg-black/30 p-4 transition-colors hover:bg-black/40"
                    >
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-3">
                          <Text variant="body" className="font-mono font-semibold">
                            {script.name}
                          </Text>
                          <div className="text-offwhite/60 flex items-center gap-1 text-sm">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {script.stars.toLocaleString()}
                          </div>
                        </div>
                        <Text variant="small" className="text-offwhite/70">
                          {script.description}
                        </Text>
                      </div>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button variant="secondary" className="w-full">
                    View All {category.name} Scripts
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Heading as="h2" variant="h2" className="mb-4">
              Simple, Transparent Pricing
            </Heading>
            <Text variant="lead" className="mx-auto max-w-2xl">
              Start with our open source scripts, upgrade when you need premium features and
              support.
            </Text>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`from-offwhite/5 to-offwhite/0 relative rounded-2xl border bg-gradient-to-br p-8 ${
                  tier.popular ? 'border-magenta shadow-magenta/20 shadow-lg' : 'border-offwhite/10'
                }`}
              >
                {tier.popular && (
                  <div className="bg-magenta text-navy absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6 text-center">
                  <Heading as="h3" variant="h3" className="mb-2">
                    {tier.name}
                  </Heading>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-offwhite/60">{tier.period}</span>}
                  </div>
                </div>

                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-magenta mt-1">✓</span>
                      <Text variant="small" className="text-offwhite/80">
                        {feature}
                      </Text>
                    </li>
                  ))}
                </ul>

                <Button variant={tier.variant} className="w-full" asChild>
                  <Link href={tier.name === 'Enterprise' ? '/contact' : '/scripts/browse'}>
                    {tier.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Accelerate Your DevOps?
          </Heading>
          <Text variant="lead" className="mb-8">
            Join thousands of engineers using our scripts to automate their infrastructure.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/scripts/browse">Browse All Scripts</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/docs/scripts">Read Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
