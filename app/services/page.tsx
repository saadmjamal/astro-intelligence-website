import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services - Astro Intelligence Inc',
  description: 'Cutting-edge AI and cloud services for modern enterprises. From AI-enhanced orchestration to microservices architecture.',
};

const services = [
  {
    id: 'ai-enhanced-orchestration',
    title: 'AI-Enhanced Orchestration',
    description: 'Revolutionize your infrastructure with intelligent automation that learns, adapts, and optimizes.',
    features: [
      'Predictive scaling based on ML models',
      'Intelligent resource allocation',
      'Self-healing infrastructure',
      'Cost optimization algorithms'
    ],
    benefits: [
      '68% reduction in resource waste',
      '45% improvement in performance',
      '82% faster incident resolution'
    ],
    icon: '🤖',
    gradient: 'from-magenta to-purple-600',
  },
  {
    id: 'devops-as-a-service',
    title: 'DevOps as a Service',
    description: 'End-to-end DevOps implementation and management, letting you focus on innovation.',
    features: [
      'CI/CD pipeline automation',
      'Infrastructure as Code',
      'Monitoring and observability',
      '24/7 expert support'
    ],
    benefits: [
      '10x faster deployments',
      '95% reduction in manual tasks',
      '99.99% uptime SLA'
    ],
    icon: '⚡',
    gradient: 'from-blue-500 to-magenta',
  },
  {
    id: 'platform-engineering',
    title: 'Platform Engineering',
    description: 'Build self-service developer platforms that accelerate innovation and maintain governance.',
    features: [
      'Internal developer portals',
      'Golden path templates',
      'Automated compliance',
      'Developer experience optimization'
    ],
    benefits: [
      '3x developer productivity',
      '75% faster onboarding',
      '90% governance compliance'
    ],
    icon: '🏗️',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 'microservices-architecture',
    title: 'Microservices Architecture',
    description: 'Design and implement cloud-native microservices for maximum flexibility and scale.',
    features: [
      'Service mesh implementation',
      'API gateway design',
      'Event-driven architecture',
      'Distributed tracing'
    ],
    benefits: [
      'Infinite scalability',
      '80% faster feature delivery',
      'Zero-downtime deployments'
    ],
    icon: '🔧',
    gradient: 'from-orange-500 to-red-600',
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Our Services
          </Heading>
          <Text variant="lead" className="max-w-3xl mx-auto mb-8">
            Transforming enterprises with cutting-edge AI and cloud solutions. 
            We don't just implement technology—we architect your future.
          </Text>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`relative ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex items-center gap-12`}
              >
                {/* Service Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{service.icon}</span>
                    <Heading as="h2" variant="h2">
                      {service.title}
                    </Heading>
                  </div>
                  
                  <Text variant="lead" className="text-offwhite/80">
                    {service.description}
                  </Text>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Heading as="h3" variant="h5" className="mb-4">
                        Key Features
                      </Heading>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="text-magenta mt-1">✓</span>
                            <Text variant="body" className="text-offwhite/70">
                              {feature}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Heading as="h3" variant="h5" className="mb-4">
                        Business Impact
                      </Heading>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <span className="text-magenta mt-1">→</span>
                            <Text variant="body" className="text-offwhite/70 font-semibold">
                              {benefit}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild>
                      <Link href={`/services/${service.id}`}>
                        Learn More
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/contact">
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="flex-1 relative">
                  <div className={`aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br ${service.gradient} p-8 opacity-20`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[200px] opacity-10">
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/10 to-purple-600/10">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Transform Your Infrastructure?
          </Heading>
          <Text variant="lead" className="mb-8">
            Let's discuss how our services can accelerate your digital transformation journey.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book-call">
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portfolio">
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}