'use client'

import React, { useRef, useMemo, useCallback } from 'react'
import { ArrowRight, CheckCircle, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

interface OptimizedEnhancedHeroProps {
  className?: string
}

// Optimized particle system with reduced count and better performance
const OptimizedEnhancedHero: React.FC<OptimizedEnhancedHeroProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Reduce particle count for better performance - from 12 to 6
  const particles = useMemo(() => 
    Array.from({ length: prefersReducedMotion ? 0 : 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 1.5, // Smaller particles
      duration: 15 + Math.random() * 10, // Slower animation
      delay: i * 0.8,
      opacity: 0.15 + Math.random() * 0.25 // Lower opacity
    })), [prefersReducedMotion]
  )

  // Memoized scroll handler
  const handleScrollClick = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }, [])

  // Optimized animation variants
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), [])

  const stagger = useMemo(() => ({
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }), [])

  return (
    <section 
      ref={containerRef} 
      className={`relative min-h-screen mobile-section-lg overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black safe-area-top safe-area-bottom ${className}`}
    >
      {/* Optimized Background Effects */}
      <div className="absolute inset-0">
        {/* Static grid pattern for better performance */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tech-green)_0px,_transparent_1px)] bg-[length:80px_80px]"></div>
        </div>
        
        {/* Static gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-tech-green/3 via-transparent to-transparent"></div>
        
        {/* Reduced particle system */}
        {!prefersReducedMotion && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-tech-green rounded-full will-change-transform"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
            animate={{
              y: [-10, 10],
              x: [-3, 3],
              opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Static ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tech-green/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Trust Bar - Customer Logos */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm text-text-muted mb-6 mobile-text-center">Powering enterprise transformation</p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 opacity-70 mobile-overflow-scroll">
              <div className="text-xs text-tech-green px-3 py-2 sm:px-4 border border-tech-green/30 rounded bg-tech-green/5 flex-shrink-0">Enterprise Ready</div>
              <div className="text-xs text-tech-green px-3 py-2 sm:px-4 border border-tech-green/30 rounded bg-tech-green/5 flex-shrink-0">Fortune 500</div>
              <div className="text-xs text-tech-green px-3 py-2 sm:px-4 border border-tech-green/30 rounded bg-tech-green/5 flex-shrink-0 desktop-only">Global Scale</div>
              <div className="text-xs text-tech-green px-3 py-2 sm:px-4 border border-tech-green/30 rounded bg-tech-green/5 flex-shrink-0 desktop-only">SOC 2 Certified</div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mobile-flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            {/* Content Column */}
            <div className="space-y-6 sm:space-y-8 mobile-text-center lg:text-left">
              {/* Status Badge */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mobile-padding-sm bg-accent-muted border border-tech-green/20 rounded-full"
              >
                <Star className="h-4 w-4 text-tech-green fill-current" />
                <span className="text-sm font-medium text-tech-green">
                  Trusted by Fortune 500 Companies
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
                <h1 className="text-mobile-h1 lg:text-7xl font-black leading-tight text-white mb-4 sm:mb-6">
                  Transform Enterprise Operations{' '}
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  with <span className="text-gradient-tech">AI Precision</span>
                  <br />
                  <span className="text-3xl lg:text-5xl text-gray-300 font-bold">
                    Reduce Costs by 45%
                  </span>
                </h1>
              </motion.div>

              {/* Value Proposition */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <p className="text-mobile-body sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  The future of enterprise AI is here. AstroIntelligence delivers ethical, measurable AI solutions
                  that Fortune 500 companies trust for their most critical operations. Transform complexity into competitive advantage.
                </p>
                
                {/* Key Benefits */}
                <div className="mobile-grid gap-3 pt-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <CheckCircle className="h-5 w-5 text-tech-green flex-shrink-0" />
                    <span className="text-text-secondary text-sm sm:text-base">45% cost reduction in 30 days</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <CheckCircle className="h-5 w-5 text-tech-green flex-shrink-0" />
                    <span className="text-text-secondary text-sm sm:text-base">8× faster deployment velocity</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <CheckCircle className="h-5 w-5 text-tech-green flex-shrink-0" />
                    <span className="text-text-secondary text-sm sm:text-base">Enterprise-grade security (SOC 2)</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <CheckCircle className="h-5 w-5 text-tech-green flex-shrink-0" />
                    <span className="text-text-secondary text-sm sm:text-base">Risk-free implementation</span>
                  </div>
                </div>
              </motion.div>

              {/* Single Primary CTA */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <Link 
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 mobile-button-lg lg:px-8 lg:py-4 bg-tech-green hover:bg-accent-hover text-black font-bold text-base sm:text-lg rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl w-full sm:w-auto touch-target-lg"
                >
                  Start Your AI Transformation
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-text-subtle">
                  <span>✓ No commitment required</span>
                  <span>✓ 15-minute setup</span>
                  <span className="hidden sm:inline">✓ Enterprise-grade security</span>
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-tech-green to-accent-hover rounded-full border-2 border-black flex items-center justify-center text-xs font-bold text-black"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-text-secondary ml-2 sm:ml-3">
                    <span className="font-semibold text-white">500+</span> enterprises trust us
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-tech-green fill-current" />
                  ))}
                  <span className="text-xs sm:text-sm text-text-secondary ml-1 sm:ml-2">4.9/5 rating</span>
                </div>
              </motion.div>
            </div>

            {/* Visual Column - Optimized with Next.js Image */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="relative mt-8 lg:mt-0 order-first lg:order-last"
            >
              {/* Dashboard Preview Mockup */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mobile-card-lg border border-gray-700 shadow-2xl">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-tech-green rounded-lg flex items-center justify-center">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">AstroIntelligence</h3>
                      <p className="text-text-muted text-xs sm:text-sm">Cloud Management</p>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-tech-green rounded-full"></div>
                  </div>
                </div>

                {/* Mock Metrics */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-bg-card mobile-padding-sm rounded-lg border border-border-subtle">
                    <p className="text-text-muted text-xs sm:text-sm">Cost Savings</p>
                    <p className="text-lg sm:text-2xl font-bold text-tech-green">$847K</p>
                    <p className="text-xs text-tech-green">↑ 45%</p>
                  </div>
                  <div className="bg-bg-card mobile-padding-sm rounded-lg border border-border-subtle">
                    <p className="text-text-muted text-xs sm:text-sm">Performance</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">98.9%</p>
                    <p className="text-xs text-tech-green">↑ 8x faster</p>
                  </div>
                </div>

                {/* Mock Chart - Simplified */}
                <div className="h-24 sm:h-32 bg-bg-card rounded-lg border border-border-subtle flex items-end justify-center p-2 sm:p-4 gap-1 sm:gap-2">
                  {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                    <div 
                      key={i} 
                      className="bg-gradient-to-t from-tech-green to-accent-hover rounded-t transform transition-all duration-300"
                      style={{ 
                        height: `${height}%`, 
                        width: '14%',
                        opacity: 0.8
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating ROI Badge */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-tech-green text-black mobile-padding-sm rounded-full font-bold text-xs sm:text-sm shadow-lg">
                45% ROI
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Optimized Scroll Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group desktop-only"
          onClick={handleScrollClick}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-12 border-2 border-tech-green/40 rounded-full flex justify-center relative group-hover:border-tech-green/80 transition-colors"
          >
            <motion.div 
              className="w-1 h-2 sm:h-3 bg-tech-green rounded-full mt-1 sm:mt-3"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.p 
            className="text-xs text-tech-green/60 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.5 }}
          >
            Explore
          </motion.p>
        </motion.div>
      )}
    </section>
  )
}

export default OptimizedEnhancedHero