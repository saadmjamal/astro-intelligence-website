'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, TrendingUp, Shield, Zap } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  metric?: {
    label: string
    value: string
    change: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow Industries',
    content: 'AstroIntelligence transformed our cloud infrastructure. We reduced costs by 52% while improving performance by 8x. Their AI-driven optimization is remarkable.',
    rating: 5,
    avatar: '/images/testimonials/sarah-chen.svg',
    metric: {
      label: 'Cost Reduction',
      value: '52%',
      change: '+8x performance'
    }
  },
  {
    id: '2',
    name: 'David Park',
    role: 'VP of Engineering',
    company: 'DataStream Corp',
    content: 'The ROI was immediate. Within 30 days, we saw substantial cost savings and our deployment speed increased dramatically. Best investment we made this year.',
    rating: 5,
    avatar: '/images/testimonials/david-park.svg',
    metric: {
      label: 'ROI Timeline',
      value: '30 days',
      change: 'Immediate impact'
    }
  },
  {
    id: '3',
    name: 'Rachel Green',
    role: 'Head of DevOps',
    company: 'ScaleUp Solutions',
    content: 'Security and compliance were our biggest concerns. AstroIntelligence delivered SOC 2 compliance while maintaining the flexibility we needed to innovate.',
    rating: 5,
    avatar: '/images/testimonials/rachel-green.svg',
    metric: {
      label: 'Compliance',
      value: 'SOC 2',
      change: 'Type II certified'
    }
  }
]

const stats = [
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Enterprise Clients',
    description: 'Fortune 500 companies trust our platform'
  },
  {
    icon: Shield,
    value: '99.9%',
    label: 'Uptime SLA',
    description: 'Enterprise-grade reliability guarantee'
  },
  {
    icon: Zap,
    value: '45%',
    label: 'Average Savings',
    description: 'Typical cost reduction in first quarter'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.000] as const
    }
  }
}

const TrustSection: React.FC = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900" style={{ paddingTop: '4rem' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tech-green)_0px,_transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-muted border border-tech-green/20 rounded-full mb-6">
            <Star className="h-4 w-4 text-tech-green fill-current" />
            <span className="text-sm font-medium text-tech-green">
              Trusted by Industry Leaders
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Join <span className="text-gradient-tech">500+ Companies</span> 
            <br />Transforming with AI
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See why enterprise leaders choose AstroIntelligence for their digital transformation journey.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-bg-card/50 backdrop-blur-sm border border-border-subtle rounded-2xl hover:border-tech-green/30 transition-all duration-300"
              >
                <div className="inline-flex p-4 bg-accent-muted rounded-2xl mb-4">
                  <Icon className="h-8 w-8 text-tech-green" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-text-secondary mb-2">{stat.label}</div>
                <p className="text-sm text-text-muted">{stat.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative bg-bg-card/30 backdrop-blur-sm border border-border-subtle rounded-2xl p-6 hover:border-tech-green/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-tech-green/60 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 text-tech-green fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-text-secondary leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Metric */}
              {testimonial.metric && (
                <div className="bg-accent-muted p-4 rounded-lg mb-6">
                  <div className="text-2xl font-bold text-tech-green">{testimonial.metric.value}</div>
                  <div className="text-sm text-text-secondary">{testimonial.metric.label}</div>
                  <div className="text-xs text-text-muted">{testimonial.metric.change}</div>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-tech-green to-accent-hover rounded-full flex items-center justify-center">
                  <span className="font-bold text-black text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-text-muted">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-tech-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-tech-green/10 to-accent-hover/10 border border-tech-green/20 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join These Success Stories?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Get your free ROI assessment and discover how much you could save with AstroIntelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="px-8 py-4 bg-tech-green hover:bg-accent-hover text-black font-bold rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Start Your Success Story
            </a>
            <a 
              href="/case-studies"
              className="px-8 py-4 bg-transparent border-2 border-tech-green text-tech-green hover:bg-tech-green hover:text-black font-semibold rounded-lg transition-all duration-200"
            >
              View All Case Studies
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustSection