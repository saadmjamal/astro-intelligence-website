'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersonalization, UserPersona } from './AIPersonalizationProvider'
import { TrendingUp, Rocket, Code, Briefcase, Star } from 'lucide-react'

interface PersonalizedHeroContent {
  badge: string
  headline: string[]
  subheadline: string
  metrics: { value: string; label: string }[]
  ctaText: string
  icon: React.ElementType
}

const heroContentVariants: Record<UserPersona, PersonalizedHeroContent> = {
  enterprise: {
    badge: 'Enterprise AI Solutions',
    headline: ['SCALE YOUR', 'ENTERPRISE', 'WITH AI'],
    subheadline: 'Join Fortune 500 companies leveraging our proven AI systems for 45% cost reduction and 3x operational efficiency.',
    metrics: [
      { value: '$12M+', label: 'Annual Savings' },
      { value: '500+', label: 'Enterprise Clients' },
      { value: '99.99%', label: 'Uptime SLA' }
    ],
    ctaText: 'Schedule Enterprise Demo',
    icon: Briefcase
  },
  startup: {
    badge: 'Startup Acceleration',
    headline: ['SHIP AI', 'PRODUCTS', '10X FASTER'],
    subheadline: 'From idea to production in 12 weeks. Build AI-powered MVPs that attract investors and delight users.',
    metrics: [
      { value: '12 Weeks', label: 'Time to Market' },
      { value: '$50K', label: 'Average Saved' },
      { value: '250%', label: 'Growth Rate' }
    ],
    ctaText: 'Start Building Today',
    icon: Rocket
  },
  technical: {
    badge: 'Developer First',
    headline: ['CUTTING-EDGE', 'AI MODELS', 'THAT SCALE'],
    subheadline: 'State-of-the-art ML engineering with PyTorch, TensorFlow, and custom architectures. Built for performance.',
    metrics: [
      { value: '95%+', label: 'Model Accuracy' },
      { value: '<10ms', label: 'Inference Time' },
      { value: '1B+', label: 'Daily Predictions' }
    ],
    ctaText: 'Explore Our Tech Stack',
    icon: Code
  },
  executive: {
    badge: 'Strategic AI Transformation',
    headline: ['TURN AI INTO', 'COMPETITIVE', 'ADVANTAGE'],
    subheadline: 'Data-driven insights for C-suite leaders. Maximize ROI with AI strategies proven across 200+ implementations.',
    metrics: [
      { value: '300%', label: 'Average ROI' },
      { value: '60%', label: 'Cost Reduction' },
      { value: '4.8x', label: 'Revenue Growth' }
    ],
    ctaText: 'Get Executive Brief',
    icon: TrendingUp
  },
  default: {
    badge: 'AI Innovation Leader',
    headline: ['YOUR AI', 'ADVANTAGE', 'STARTS NOW'],
    subheadline: 'Transform your business with production-ready AI systems that deliver measurable results in weeks, not years.',
    metrics: [
      { value: '250%', label: 'ROI Increase' },
      { value: '12 Weeks', label: 'Time to Deploy' },
      { value: '99.9%', label: 'Uptime SLA' }
    ],
    ctaText: 'Start Your AI Journey',
    icon: Star
  }
}

export function DynamicPersonalizedContent() {
  const { personalization } = usePersonalization()
  const content = heroContentVariants[personalization.persona]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={personalization.persona}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Dynamic Badge */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-3 px-5 py-3 glass-morphism rounded-full"
        >
          <content.icon className="w-5 h-5 text-neon-green" />
          <span className="text-sm font-bold text-gradient-flow uppercase tracking-wider">
            {content.badge}
          </span>
        </motion.div>

        {/* Dynamic Headline */}
        <div className="space-y-2">
          {content.headline.map((line, index) => (
            <motion.h1
              key={line}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="heading-mega font-black tracking-tighter leading-[0.85]"
            >
              <span className={index === 1 ? 'text-gradient-flow' : 'text-white'}>
                {line}
              </span>
            </motion.h1>
          ))}
        </div>

        {/* Dynamic Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl"
        >
          {content.subheadline}
        </motion.p>

        {/* Dynamic Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4"
        >
          {content.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
              className="card-3d hover-morph text-center p-4"
            >
              <div className="text-2xl font-black text-neon-green">
                {metric.value}
              </div>
              <div className="text-sm text-white/70">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Personalized Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <p className="text-sm text-white/60 uppercase tracking-wider">
            Recommended for you:
          </p>
          <div className="flex flex-wrap gap-2">
            {personalization.recommendations.map((rec, index) => (
              <motion.span
                key={rec}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="px-3 py-1 text-xs glass-morphism rounded-full text-white/80"
              >
                {rec}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Export the variants for use in other components
export { heroContentVariants }