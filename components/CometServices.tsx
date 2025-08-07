'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Cpu, 
  Globe, 
  Palette, 
  Shield, 
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ElementType
  features: string[]
  gradient: string
  href: string
}

const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications built with cutting-edge technologies for optimal performance and scalability.',
    icon: Code2,
    features: ['React/Next.js', 'Full-Stack Solutions', 'Progressive Web Apps'],
    gradient: 'from-comet-blue to-comet-cyan',
    href: '/services/web-development'
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Intelligent automation and machine learning solutions that transform your business operations.',
    icon: Cpu,
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
    gradient: 'from-comet-purple to-comet-magenta',
    href: '/services/ai-machine-learning'
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions with enterprise-grade security and performance optimization.',
    icon: Globe,
    features: ['AWS/Azure/GCP', 'DevOps Automation', 'Kubernetes'],
    gradient: 'from-comet-cyan to-comet-teal',
    href: '/services/cloud-devops'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
    icon: Palette,
    features: ['User Research', 'Prototyping', 'Design Systems'],
    gradient: 'from-comet-magenta to-comet-purple',
    href: '/services/custom-software-development'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
    icon: Shield,
    features: ['Security Audits', 'Penetration Testing', 'Compliance'],
    gradient: 'from-comet-teal to-comet-blue',
    href: '/services/cybersecurity'
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Maximize speed and efficiency with our performance engineering expertise.',
    icon: Zap,
    features: ['Load Testing', 'Code Optimization', 'CDN Setup'],
    gradient: 'from-comet-blue to-comet-purple',
    href: '/services/technical-consulting'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as any
    }
  }
}

const CometServices: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-comet-darker">
      {/* Background Pattern */}
      <div className="absolute inset-0 comet-tech-grid opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-comet-border bg-comet-surface px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-comet-neon-blue" />
            <span className="text-sm font-medium text-comet-text-primary">
              Our Expertise
            </span>
          </div>
          
          <h2 className="comet-heading-2 text-comet-text-primary mb-4">
            Services That <span className="comet-gradient-text">Elevate</span> Your Business
          </h2>
          
          <p className="comet-body-large max-w-3xl mx-auto">
            From concept to deployment, we provide end-to-end solutions that drive innovation and growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {services.map((service) => {
            const Icon = service.icon
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={service.href} className="block h-full">
                  <div className="comet-card h-full p-6 group-hover:scale-[1.02] transition-transform duration-300 flex flex-col">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-10 mb-4`}>
                      <Icon className="h-6 w-6 text-comet-text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-comet-text-primary mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-comet-text-secondary mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6 flex-grow">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-comet-neon-blue" />
                          <span className="text-sm text-comet-text-muted">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-comet-text-primary group-hover:text-comet-neon-blue transition-colors">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-comet-text-secondary mb-6">
            Need something specific? We can help with custom solutions.
          </p>
          <Link href="/contact" className="comet-button comet-button-primary">
            Discuss Your Project
            <ArrowRight className="ml-2 h-4 w-4 inline" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CometServices