import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'AI-Enhanced Orchestration - Astro Intelligence Inc',
  description: 'Intelligent infrastructure automation powered by machine learning. Predictive scaling, self-healing systems, and cost optimization.',
};

export default function AIEnhancedOrchestrationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 via-navy to-black" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">🤖</span>
            <Heading as="h1" variant="h1" color="gradient">
              AI-Enhanced Orchestration
            </Heading>
          </div>
          <Text variant="lead" className="max-w-3xl mb-8">
            Transform your infrastructure with intelligent automation that learns, adapts, and optimizes 
            in real-time. Our AI-powered orchestration goes beyond traditional automation to create 
            truly self-managing systems.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/book-call">Get Started</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Intelligent Features That Set Us Apart
          </Heading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Predictive Auto-Scaling',
                description: 'ML models analyze historical patterns to anticipate resource needs before demand spikes.',
                icon: '📈',
                details: [
                  'Time-series forecasting',
                  'Anomaly detection',
                  'Multi-metric optimization'
                ]
              },
              {
                title: 'Self-Healing Infrastructure',
                description: 'Automatically detect and remediate issues before they impact your users.',
                icon: '🔧',
                details: [
                  'Root cause analysis',
                  'Automated remediation',
                  'Incident prevention'
                ]
              },
              {
                title: 'Cost Optimization AI',
                description: 'Continuously optimize resource allocation to minimize costs without sacrificing performance.',
                icon: '💰',
                details: [
                  'Spot instance optimization',
                  'Right-sizing recommendations',
                  'Waste elimination'
                ]
              },
              {
                title: 'Intelligent Load Balancing',
                description: 'AI-driven traffic distribution based on real-time performance metrics.',
                icon: '⚖️',
                details: [
                  'Latency-based routing',
                  'Predictive load distribution',
                  'Failure prediction'
                ]
              },
              {
                title: 'Compliance Automation',
                description: 'Ensure continuous compliance with automated policy enforcement and reporting.',
                icon: '🛡️',
                details: [
                  'Policy as code',
                  'Automated auditing',
                  'Real-time compliance'
                ]
              },
              {
                title: 'Performance Optimization',
                description: 'ML-powered performance tuning that continuously improves your application speed.',
                icon: '🚀',
                details: [
                  'Query optimization',
                  'Cache management',
                  'Resource allocation'
                ]
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-6 hover:border-magenta/50 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <Heading as="h3" variant="h4" className="mb-3">
                  {feature.title}
                </Heading>
                <Text variant="body" className="text-offwhite/70 mb-4">
                  {feature.description}
                </Text>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="text-magenta mt-1">•</span>
                      <Text variant="small" className="text-offwhite/60">
                        {detail}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Our Implementation Process
          </Heading>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery & Analysis',
                description: 'We analyze your current infrastructure, workloads, and pain points to design the optimal AI strategy.'
              },
              {
                step: '02',
                title: 'Model Training',
                description: 'Our ML models learn from your specific patterns and requirements for accurate predictions.'
              },
              {
                step: '03',
                title: 'Gradual Rollout',
                description: 'We implement AI features incrementally, starting with non-critical workloads for safety.'
              },
              {
                step: '04',
                title: 'Continuous Learning',
                description: 'The system continuously improves through feedback loops and model retraining.'
              }
            ].map((phase, index) => (
              <div key={phase.step} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-magenta to-transparent" />
                )}
                <div className="text-magenta text-5xl font-heading mb-4">{phase.step}</div>
                <Heading as="h3" variant="h5" className="mb-3">
                  {phase.title}
                </Heading>
                <Text variant="body" className="text-offwhite/70">
                  {phase.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Real-World Applications
          </Heading>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                industry: 'E-Commerce',
                scenario: 'Black Friday Traffic Surge',
                solution: 'AI predicts traffic patterns weeks in advance, pre-scales resources, and optimizes costs by 67% while maintaining 100% uptime.',
                results: ['Zero downtime', '67% cost savings', '23ms average response time']
              },
              {
                industry: 'FinTech',
                scenario: 'Real-Time Fraud Detection',
                solution: 'ML models process millions of transactions with sub-50ms latency, scaling compute resources based on fraud risk patterns.',
                results: ['99.7% fraud detection', '<50ms latency', '45% infrastructure savings']
              },
              {
                industry: 'Healthcare',
                scenario: 'Medical Image Processing',
                solution: 'Intelligent resource allocation for GPU-intensive workloads, with predictive scaling for batch processing.',
                results: ['3x faster processing', '80% GPU utilization', '$2M annual savings']
              },
              {
                industry: 'Media Streaming',
                scenario: 'Global Content Delivery',
                solution: 'AI-optimized CDN routing and predictive caching based on viewing patterns and regional demand.',
                results: ['45% bandwidth reduction', '99.99% availability', '4K streaming at scale']
              }
            ].map((useCase) => (
              <div key={useCase.industry} className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-8">
                <div className="text-magenta text-sm font-semibold mb-2">{useCase.industry}</div>
                <Heading as="h3" variant="h4" className="mb-4">
                  {useCase.scenario}
                </Heading>
                <Text variant="body" className="text-offwhite/70 mb-6">
                  {useCase.solution}
                </Text>
                <div className="space-y-2">
                  <Text variant="small" className="font-semibold text-offwhite/90">Key Results:</Text>
                  {useCase.results.map((result) => (
                    <div key={result} className="flex items-center gap-2">
                      <span className="text-magenta">✓</span>
                      <Text variant="small" className="text-offwhite/70">{result}</Text>
                    </div>
                  ))}
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
            Ready to Make Your Infrastructure Intelligent?
          </Heading>
          <Text variant="lead" className="mb-8">
            Join industry leaders who have transformed their operations with AI-powered orchestration.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book-call">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/research-lab/ai-orchestration-whitepaper">Download Whitepaper</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}