'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Code2, Cloud, Zap, CheckCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  longDescription: string
  icon: React.ElementType
  benefits: string[]
  keyFeatures: string[]
  results: {
    metric: string
    value: string
    description: string
  }
  gradient: string
  href: string
  popular?: boolean
}

const services: Service[] = [
  {
    id: 'smart-ai-workflow',
    title: 'Smart AI Workflow Integration',
    description: 'Boost productivity by 75% with intelligent workflows that adapt to your business needs.',
    longDescription: 'Transform chaotic business processes into streamlined AI-powered workflows. Our intelligent automation learns from your team\'s patterns, eliminates bottlenecks, and ensures critical tasks never fall through the cracks. Generate measurable ROI within 30 days through reduced manual work and improved decision-making speed.',
    icon: Brain,
    benefits: [
      '75% faster task completion',
      'Eliminate process bottlenecks',
      'Intelligent task prioritization',
      'Real-time workflow optimization'
    ],
    keyFeatures: [
      'Adaptive Workflow Engine',
      'Smart Task Routing',
      'Predictive Process Analytics',
      'Cross-Platform Integration'
    ],
    results: {
      metric: 'Productivity Gain',
      value: '75%',
      description: 'Increase in team efficiency'
    },
    gradient: 'from-purple-500 to-blue-600',
    href: '/services/smart-ai-workflow',
    popular: true
  },
  {
    id: 'autonomous-l1-servicedesk',
    title: 'Autonomous L1 AI Service Desk',
    description: 'Reduce support costs by 60% while improving response times and customer satisfaction.',
    longDescription: 'Replace expensive L1 support teams with AI agents that handle 90% of routine inquiries instantly. Our autonomous service desk integrates with your existing tools, learns your documentation, and escalates complex issues seamlessly to human experts when needed.',
    icon: Code2,
    benefits: [
      '90% of tickets resolved instantly',
      '24/7 consistent support quality',
      '60% reduction in support costs',
      'Seamless human handoff'
    ],
    keyFeatures: [
      'Multi-Channel Support',
      'Knowledge Base Integration',
      'Intelligent Escalation',
      'Performance Analytics'
    ],
    results: {
      metric: 'Cost Reduction',
      value: '60%',
      description: 'Savings on support operations'
    },
    gradient: 'from-green-500 to-teal-600',
    href: '/services/autonomous-service-desk'
  },
  {
    id: 'ai-infrastructure-monitoring',
    title: 'Custom AI Infrastructure Monitoring',
    description: 'Prevent 95% of outages with predictive monitoring that knows your systems better than you do.',
    longDescription: 'Stop playing whack-a-mole with infrastructure issues. Our AI monitoring learns your system\'s unique patterns, predicts failures before they happen, and automatically resolves common problems. Deliver guaranteed uptime while reducing operational overhead.',
    icon: Cloud,
    benefits: [
      'Predict failures 4-6 hours early',
      'Auto-remediate common issues',
      'Custom alerts for your context',
      'Zero false positive guarantee'
    ],
    keyFeatures: [
      'Predictive Failure Detection',
      'Automated Issue Resolution',
      'Custom Anomaly Detection',
      'Intelligent Alert Filtering'
    ],
    results: {
      metric: 'Outage Prevention',
      value: '95%',
      description: 'Reduction in unplanned downtime'
    },
    gradient: 'from-blue-500 to-cyan-600',
    href: '/services/ai-infrastructure-monitoring'
  },
  {
    id: 'ai-cloud-cost-optimization',
    title: 'AI-Driven Cloud Cost Optimization',
    description: 'Cut cloud spend by 40-70% without compromising performance through intelligent resource management.',
    longDescription: 'Turn cloud cost optimization from a monthly chore into an automated competitive advantage. Our AI continuously analyzes usage patterns, right-sizes resources in real-time, and identifies savings opportunities you never knew existed.',
    icon: Zap,
    benefits: [
      'Automated rightsizing decisions',
      'Reserved instance optimization',
      'Unused resource elimination',
      'Real-time cost alerts'
    ],
    keyFeatures: [
      'Dynamic Resource Scaling',
      'Cost Anomaly Detection',
      'Multi-Cloud Optimization',
      'Usage Pattern Analysis'
    ],
    results: {
      metric: 'Cost Savings',
      value: '40-70%',
      description: 'Reduction in cloud spending'
    },
    gradient: 'from-yellow-500 to-orange-600',
    href: '/services/ai-cloud-cost-optimization'
  },
  {
    id: 'unified-multicloud-dashboard',
    title: 'Unified Multi-Cloud Intelligence Dashboard',
    description: 'Get complete visibility across AWS, Azure, and GCP with AI-powered insights that drive decisions.',
    longDescription: 'Stop juggling multiple cloud consoles and spreadsheets. Our unified dashboard gives you actionable insights across all cloud providers, with AI recommendations that help you optimize performance, costs, and security from a single pane of glass.',
    icon: TrendingUp,
    benefits: [
      'Single view of all cloud assets',
      'AI-powered cost recommendations',
      'Security posture monitoring',
      'Performance optimization insights'
    ],
    keyFeatures: [
      'Multi-Cloud Asset Discovery',
      'Intelligent Cost Analytics',
      'Security Risk Assessment',
      'Performance Benchmarking'
    ],
    results: {
      metric: 'Management Efficiency',
      value: '85%',
      description: 'Reduction in cloud admin time'
    },
    gradient: 'from-indigo-500 to-purple-600',
    href: '/services/unified-multicloud-dashboard'
  },
  {
    id: 'enterprise-ai-orchestration',
    title: 'Enterprise AI Orchestration Platform',
    description: 'Scale AI initiatives across your organization with governance, security, and ROI tracking built-in.',
    longDescription: 'Move from AI pilots to enterprise-wide deployment with confidence. Our orchestration platform provides the governance, security, and operational framework needed to scale AI initiatives while maintaining compliance and demonstrating clear business value.',
    icon: CheckCircle,
    benefits: [
      'Centralized AI governance',
      'Compliance and audit trails',
      'ROI tracking and reporting',
      'Scalable deployment framework'
    ],
    keyFeatures: [
      'AI Model Lifecycle Management',
      'Compliance Automation',
      'Performance Monitoring',
      'Cost Attribution'
    ],
    results: {
      metric: 'AI Project Success',
      value: '90%',
      description: 'Projects delivered on time/budget'
    },
    gradient: 'from-emerald-500 to-green-600',
    href: '/services/enterprise-ai-orchestration'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.000] as const
    }
  }
}

const CoreServices: React.FC = () => {
  const [activeService, setActiveService] = React.useState<string | null>(null)

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900" style={{ paddingTop: '4rem' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(45deg,_var(--tech-green)_0px,_transparent_1px),_linear-gradient(-45deg,_var(--tech-green)_0px,_transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-muted border border-tech-green/20 rounded-full mb-6">
            <TrendingUp className="h-4 w-4 text-tech-green" />
            <span className="text-sm font-medium text-tech-green">
              Core Capabilities
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Services That <span className="text-gradient-tech">Drive Results</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Transform your business with our comprehensive suite of AI-powered solutions, 
            custom-built for enterprise scale and performance.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon
            const isActive = activeService === service.id
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative"
                onHoverStart={() => setActiveService(service.id)}
                onHoverEnd={() => setActiveService(null)}
              >
                <div className="relative h-full bg-bg-card/30 backdrop-blur-sm border border-border-subtle rounded-3xl p-8 transition-all duration-500 hover:border-tech-green/50 hover:shadow-2xl">
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-3 left-8 px-4 py-1 bg-gradient-to-r from-tech-green to-accent-hover text-black text-sm font-bold rounded-full">
                      Most Popular
                    </div>
                  )}

                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-10 border border-tech-green/20`}>
                        <Icon className="h-8 w-8 text-tech-green" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-text-secondary">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Results Metric */}
                  <div className="bg-accent-muted p-4 rounded-xl mb-6 border border-tech-green/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-tech-green">{service.results.value}</div>
                        <div className="text-sm text-text-secondary">{service.results.metric}</div>
                      </div>
                      <div className="text-xs text-text-muted max-w-32">
                        {service.results.description}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isActive ? 'auto' : '120px',
                      opacity: isActive ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {/* Long Description */}
                    <p className="text-text-muted leading-relaxed mb-6">
                      {service.longDescription}
                    </p>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3">Key Benefits:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-tech-green flex-shrink-0" />
                            <span className="text-sm text-text-secondary">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.keyFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-border-subtle mt-6">
                    <Link 
                      href={service.href}
                      className="group/cta inline-flex items-center gap-2 text-tech-green hover:text-accent-hover font-semibold transition-colors duration-200"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20 p-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-lg">
            Every business is unique. Let's discuss how we can create a tailored solution 
            that addresses your specific challenges and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-tech-green hover:bg-accent-hover text-black font-bold text-lg rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/services"
              className="px-8 py-4 bg-transparent border-2 border-tech-green text-tech-green hover:bg-tech-green hover:text-black font-semibold text-lg rounded-lg transition-all duration-200"
            >
              View All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoreServices