'use client'

import React, { memo, useMemo, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
    id: 'ai-solutions',
    title: 'AI & Machine Learning',
    description: 'Transform operations with intelligent automation and predictive analytics.',
    longDescription: 'Deploy enterprise-grade AI solutions that learn from your data, automate complex processes, and provide actionable insights for strategic decision-making.',
    icon: Brain,
    benefits: [
      'Reduce manual tasks by 80%',
      'Predictive analytics for better decisions',
      'Custom AI models for your industry',
      'Real-time insights and recommendations'
    ],
    keyFeatures: [
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Modeling',
      'Process Automation'
    ],
    results: {
      metric: 'Automation Rate',
      value: '80%',
      description: 'Average reduction in manual tasks'
    },
    gradient: 'from-purple-500 to-blue-600',
    href: '/services/ai-machine-learning',
    popular: true
  },
  {
    id: 'web-development',
    title: 'Enterprise Web Development',
    description: 'High-performance web applications built for scale and security.',
    longDescription: 'Full-stack development using cutting-edge technologies to create scalable, secure, and performant web applications that grow with your business.',
    icon: Code2,
    benefits: [
      'Lightning-fast performance',
      'Scalable architecture',
      'Mobile-responsive design',
      'Enterprise security standards'
    ],
    keyFeatures: [
      'React/Next.js Development',
      'Progressive Web Apps',
      'API Development',
      'Database Design'
    ],
    results: {
      metric: 'Performance Score',
      value: '95+',
      description: 'Average Core Web Vitals score'
    },
    gradient: 'from-green-500 to-teal-600',
    href: '/services/web-development'
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    description: 'Optimize costs and performance with intelligent cloud management.',
    longDescription: 'Strategic cloud migration and optimization services that reduce costs while improving reliability, security, and scalability across AWS, Azure, and GCP.',
    icon: Cloud,
    benefits: [
      'Reduce cloud costs by 45%',
      '99.9% uptime guarantee',
      'Auto-scaling capabilities',
      'Multi-cloud flexibility'
    ],
    keyFeatures: [
      'Cloud Migration',
      'DevOps Automation',
      'Kubernetes Orchestration',
      'Infrastructure as Code'
    ],
    results: {
      metric: 'Cost Savings',
      value: '45%',
      description: 'Average cloud cost reduction'
    },
    gradient: 'from-blue-500 to-cyan-600',
    href: '/services/cloud-devops'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Engineering',
    description: 'Maximize speed, efficiency, and reliability across your tech stack.',
    longDescription: 'Comprehensive performance analysis and optimization to ensure your applications run at peak efficiency with minimal resource consumption.',
    icon: Zap,
    benefits: [
      '8× faster load times',
      'Reduced server costs',
      'Better user experience',
      'Improved SEO rankings'
    ],
    keyFeatures: [
      'Performance Auditing',
      'Code Optimization',
      'CDN Implementation',
      'Database Tuning'
    ],
    results: {
      metric: 'Speed Improvement',
      value: '8×',
      description: 'Faster application performance'
    },
    gradient: 'from-yellow-500 to-orange-600',
    href: '/services/technical-consulting'
  }
]

// Memoized service card component for better performance
const ServiceCard = memo(({ 
  service, 
  isActive, 
  onHover, 
  onHoverEnd,
  prefersReducedMotion 
}: { 
  service: Service
  isActive: boolean
  onHover: () => void
  onHoverEnd: () => void
  prefersReducedMotion: boolean | null
}) => {
  const Icon = service.icon
  
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: [0.645, 0.045, 0.355, 1.000] as const
      }
    }
  }), [prefersReducedMotion])

  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-full bg-bg-card/30 backdrop-blur-sm border border-border-subtle rounded-3xl p-8 transition-all duration-300 hover:border-tech-green/50 hover:shadow-2xl">
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
          animate={prefersReducedMotion ? undefined : { 
            height: isActive ? 'auto' : '120px',
            opacity: isActive ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
          style={prefersReducedMotion ? { height: 'auto', opacity: 1 } : undefined}
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

        {/* Hover Gradient Overlay - only if not reduced motion */}
        {!prefersReducedMotion && (
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl pointer-events-none`} />
        )}
      </div>
    </motion.div>
  )
})

ServiceCard.displayName = 'ServiceCard'

const OptimizedCoreServices: React.FC = () => {
  const [activeService, setActiveService] = React.useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Memoized handlers
  const handleServiceHover = useCallback((serviceId: string) => {
    if (!prefersReducedMotion) {
      setActiveService(serviceId)
    }
  }, [prefersReducedMotion])

  const handleServiceHoverEnd = useCallback(() => {
    if (!prefersReducedMotion) {
      setActiveService(null)
    }
  }, [prefersReducedMotion])

  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }), [prefersReducedMotion])

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.6 }
    }
  }), [prefersReducedMotion])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      {/* Background Elements - Static for better performance */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(45deg,_var(--tech-green)_0px,_transparent_1px),_linear-gradient(-45deg,_var(--tech-green)_0px,_transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
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
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={activeService === service.id}
              onHover={() => handleServiceHover(service.id)}
              onHoverEnd={handleServiceHoverEnd}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
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
              className="px-8 py-4 bg-tech-green hover:bg-accent-hover text-black font-bold text-lg rounded-lg transition-all duration-200 hover:scale-[1.02] transform"
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

export default OptimizedCoreServices