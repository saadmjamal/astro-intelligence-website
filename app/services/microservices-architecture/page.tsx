import { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Microservices Architecture - Astro Intelligence Inc',
  description: 'Design and implement cloud-native microservices for maximum flexibility and scale. Service mesh, API gateways, and event-driven architecture.',
};

const features = [
  {
    title: 'Service Mesh Implementation',
    description: 'Advanced networking for secure, reliable service-to-service communication.',
    icon: '🕸️',
    details: [
      'Istio/Linkerd deployment',
      'mTLS encryption',
      'Traffic management',
      'Observability'
    ]
  },
  {
    title: 'API Gateway Design',
    description: 'Unified entry point for all microservices with enterprise features.',
    icon: '🚪',
    details: [
      'Rate limiting',
      'Authentication/Authorization',
      'Request routing',
      'API versioning'
    ]
  },
  {
    title: 'Event-Driven Architecture',
    description: 'Loosely coupled services communicating through events.',
    icon: '📡',
    details: [
      'Event streaming (Kafka)',
      'CQRS patterns',
      'Event sourcing',
      'Saga orchestration'
    ]
  },
  {
    title: 'Distributed Data Management',
    description: 'Strategies for managing data across multiple services.',
    icon: '💾',
    details: [
      'Database per service',
      'Data consistency patterns',
      'Distributed transactions',
      'Cache strategies'
    ]
  },
  {
    title: 'Resilience Patterns',
    description: 'Build services that gracefully handle failures.',
    icon: '🛡️',
    details: [
      'Circuit breakers',
      'Retry mechanisms',
      'Bulkheads',
      'Timeout handling'
    ]
  },
  {
    title: 'Observability Stack',
    description: 'Complete visibility into your distributed system.',
    icon: '🔍',
    details: [
      'Distributed tracing',
      'Centralized logging',
      'Metrics aggregation',
      'Service dependency mapping'
    ]
  }
];

const useCases = [
  {
    industry: 'Streaming Platform',
    scenario: 'Global Scale Video Delivery',
    solution: 'Microservices architecture handling millions of concurrent streams with regional failover.',
    results: ['99.99% availability', '50ms global latency', '10M+ concurrent users']
  },
  {
    industry: 'Financial Trading',
    scenario: 'High-Frequency Trading System',
    solution: 'Ultra-low latency microservices processing millions of trades per second.',
    results: ['<10μs latency', '1M trades/second', 'Zero data loss']
  },
  {
    industry: 'Social Media',
    scenario: 'Real-Time Feed Generation',
    solution: 'Event-driven microservices personalizing feeds for 100M+ users in real-time.',
    results: ['Real-time updates', 'Infinite scalability', '95% engagement increase']
  },
  {
    industry: 'IoT Platform',
    scenario: 'Device Data Processing',
    solution: 'Microservices processing billions of IoT events daily with real-time analytics.',
    results: ['10B events/day', 'Sub-second processing', 'Auto-scaling by 1000x']
  }
];

export default function MicroservicesArchitecturePage() {
  return (
    <ServicePageTemplate
      title="Microservices Architecture"
      icon="🔧"
      description="Break free from monolithic constraints with cloud-native microservices. We design and implement distributed systems that scale infinitely while maintaining reliability and performance."
      heroGradient="from-orange-500/20 via-navy to-black"
      features={features}
      useCases={useCases}
      ctaTitle="Ready to Embrace Microservices?"
      ctaDescription="Let's architect a system that scales with your ambitions."
    >
      {/* Architecture Patterns */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Common Architecture Patterns
          </Heading>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                pattern: 'API Gateway Pattern',
                description: 'Single entry point for all client requests with cross-cutting concerns.',
                benefits: ['Simplified client interface', 'Centralized security', 'Request routing'],
                diagram: '🌐 → 🚪 → [🔧🔧🔧]'
              },
              {
                pattern: 'Saga Pattern',
                description: 'Manage distributed transactions across multiple services.',
                benefits: ['Data consistency', 'Failure handling', 'Business process modeling'],
                diagram: '📋 → 🔄 → ✅'
              },
              {
                pattern: 'CQRS Pattern',
                description: 'Separate read and write models for optimal performance.',
                benefits: ['Scalable reads', 'Complex queries', 'Event sourcing compatible'],
                diagram: '✍️ → 📤 | 📥 ← 👁️'
              },
              {
                pattern: 'Strangler Fig Pattern',
                description: 'Gradually migrate from monolith to microservices.',
                benefits: ['Risk reduction', 'Incremental migration', 'Zero downtime'],
                diagram: '🏢 → 🌱 → 🌳'
              }
            ].map((item) => (
              <div key={item.pattern} className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-6">
                <Heading as="h3" variant="h4" className="mb-3">
                  {item.pattern}
                </Heading>
                <Text variant="body" className="text-offwhite/70 mb-4">
                  {item.description}
                </Text>
                <div className="text-2xl text-center py-4 mb-4 bg-black/30 rounded-lg font-mono">
                  {item.diagram}
                </div>
                <div className="space-y-2">
                  <Text variant="small" className="font-semibold text-offwhite/90">Benefits:</Text>
                  {item.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <span className="text-magenta mt-1">•</span>
                      <Text variant="small" className="text-offwhite/60">
                        {benefit}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Strategy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-4xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Monolith to Microservices Journey
          </Heading>
          
          <div className="space-y-8">
            {[
              {
                phase: 'Assessment',
                description: 'Analyze your monolith to identify service boundaries and dependencies.',
                duration: '2-4 weeks'
              },
              {
                phase: 'Foundation',
                description: 'Set up CI/CD, service mesh, monitoring, and other infrastructure.',
                duration: '4-6 weeks'
              },
              {
                phase: 'Extraction',
                description: 'Extract first services using strangler fig pattern, starting with least risky.',
                duration: '2-3 months'
              },
              {
                phase: 'Acceleration',
                description: 'Ramp up extraction pace with proven patterns and automation.',
                duration: '6-12 months'
              },
              {
                phase: 'Optimization',
                description: 'Fine-tune performance, consolidate services, and optimize costs.',
                duration: 'Ongoing'
              }
            ].map((phase, index) => (
              <div key={phase.phase} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-magenta to-purple-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Heading as="h3" variant="h5" className="mb-2">
                        {phase.phase}
                      </Heading>
                      <Text variant="body" className="text-offwhite/70">
                        {phase.description}
                      </Text>
                    </div>
                    <Text variant="small" className="text-magenta whitespace-nowrap ml-4">
                      {phase.duration}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageTemplate>
  );
}