'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Eye, 
  MessageSquare, 
  BarChart3, 
  ArrowRight, 
  Zap,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface AIFeature {
  id: string
  title: string
  description: string
  icon: React.ElementType
  metric: {
    value: string
    label: string
    description: string
  }
  keyBenefits: string[]
  gradient: string
}

const aiFeatures: AIFeature[] = [
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Advanced conversational AI that understands context, generates human-like responses, and processes complex queries with 96.3% accuracy.',
    icon: MessageSquare,
    metric: {
      value: '96.3%',
      label: 'Accuracy Rate',
      description: 'Language understanding precision'
    },
    keyBenefits: [
      'Multi-language support (47 languages)',
      'Real-time sentiment analysis',
      'Context-aware conversations',
      'Custom domain adaptation'
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Cutting-edge image and video analysis with object detection, medical imaging, and quality control capabilities.',
    icon: Eye,
    metric: {
      value: '99.7%',
      label: 'Detection Rate',
      description: 'Object recognition accuracy'
    },
    keyBenefits: [
      'Real-time object detection (60 FPS)',
      'Medical image analysis',
      'Quality control automation',
      '10K+ object classifications'
    ],
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'machine-learning',
    title: 'Predictive Analytics',
    description: 'Custom ML models that forecast trends, predict behaviors, and automate decision-making with enterprise-grade reliability.',
    icon: Brain,
    metric: {
      value: '89.2%',
      label: 'Prediction Accuracy',
      description: 'Forecasting precision'
    },
    keyBenefits: [
      'Customer churn prediction',
      'Fraud detection (15ms response)',
      'Personalized recommendations',
      'Risk assessment automation'
    ],
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'data-analytics',
    title: 'Real-time Intelligence',
    description: 'Process massive data streams with sub-second latency, delivering actionable insights and anomaly detection.',
    icon: BarChart3,
    metric: {
      value: '2.3M/sec',
      label: 'Event Processing',
      description: 'Real-time data throughput'
    },
    keyBenefits: [
      'Sub-second latency (12ms)',
      'Anomaly detection',
      'Business intelligence',
      '47 data source integrations'
    ],
    gradient: 'from-orange-500/20 to-red-500/20'
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

const AIShowcase: React.FC = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black" style={{ paddingTop: '4rem' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tech-green)_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
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
            <Sparkles className="h-4 w-4 text-tech-green" />
            <span className="text-sm font-medium text-tech-green">
              AI Intelligence Platform
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Advanced <span className="text-gradient-tech">AI Capabilities</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Harness the power of cutting-edge artificial intelligence with battle-tested systems 
            that deliver measurable results for enterprise clients.
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {aiFeatures.map((feature, _index) => {
            const Icon = feature.icon
            
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-full bg-bg-card/30 backdrop-blur-sm border border-border-subtle rounded-3xl p-8 transition-all duration-500 hover:border-tech-green/50 hover:shadow-2xl">
                  {/* Feature Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-tech-green/20`}>
                        <Icon className="h-8 w-8 text-tech-green" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Key Metric */}
                  <div className="bg-accent-muted p-4 rounded-xl mb-6 border border-tech-green/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-tech-green">{feature.metric.value}</div>
                        <div className="text-sm text-text-secondary">{feature.metric.label}</div>
                      </div>
                      <div className="text-xs text-text-muted max-w-32 text-right">
                        {feature.metric.description}
                      </div>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Key Capabilities:</h4>
                    <div className="space-y-2">
                      {feature.keyBenefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-tech-green flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center p-6 bg-bg-card/50 backdrop-blur-sm border border-border-subtle rounded-2xl">
            <div className="inline-flex p-3 bg-accent-muted rounded-xl mb-4">
              <TrendingUp className="h-6 w-6 text-tech-green" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">247</div>
            <div className="text-sm text-text-secondary mb-1">AI Models</div>
            <p className="text-xs text-text-muted">Production ready</p>
          </div>
          
          <div className="text-center p-6 bg-bg-card/50 backdrop-blur-sm border border-border-subtle rounded-2xl">
            <div className="inline-flex p-3 bg-accent-muted rounded-xl mb-4">
              <Zap className="h-6 w-6 text-tech-green" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">&lt;50ms</div>
            <div className="text-sm text-text-secondary mb-1">Response Time</div>
            <p className="text-xs text-text-muted">Average latency</p>
          </div>
          
          <div className="text-center p-6 bg-bg-card/50 backdrop-blur-sm border border-border-subtle rounded-2xl">
            <div className="inline-flex p-3 bg-accent-muted rounded-xl mb-4">
              <Target className="h-6 w-6 text-tech-green" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">99.7%</div>
            <div className="text-sm text-text-secondary mb-1">Uptime SLA</div>
            <p className="text-xs text-text-muted">Enterprise grade</p>
          </div>
          
          <div className="text-center p-6 bg-bg-card/50 backdrop-blur-sm border border-border-subtle rounded-2xl">
            <div className="inline-flex p-3 bg-accent-muted rounded-xl mb-4">
              <Brain className="h-6 w-6 text-tech-green" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-text-secondary mb-1">Clients</div>
            <p className="text-xs text-text-muted">Enterprise scale</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-8 bg-gradient-to-r from-tech-green/10 to-accent-hover/10 border border-tech-green/20 rounded-3xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Experience AI Intelligence in Action
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-lg">
            See how our AI solutions can transform your business operations. 
            Try our interactive demos and discover the power of intelligent automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/ai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-tech-green hover:bg-accent-hover text-black font-bold text-lg rounded-lg transition-all duration-200 hover:scale-[1.02] group"
            >
              <span>Explore AI Demos</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-tech-green text-tech-green hover:bg-tech-green hover:text-black font-semibold text-lg rounded-lg transition-all duration-200"
            >
              Schedule AI Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AIShowcase