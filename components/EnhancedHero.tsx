'use client'

import React, { useRef, useEffect, useState } from 'react'
import { ArrowRight, CheckCircle, Star, Users, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface EnhancedHeroProps {
  className?: string
}

const EnhancedHero: React.FC<EnhancedHeroProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D transformation based on mouse position
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Enhanced particle system for dynamic 3D effect
  // Use stable values to avoid hydration mismatch
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 5 + 10) % 100,
    y: (i * 7 + 15) % 100,
    z: ((i * 3) % 50) - 25,
    size: 2 + (i % 3) * 2,
    duration: 10 + (i % 5) * 2,
    delay: i * 0.3,
    opacity: 0.3 + (i % 3) * 0.2
  }))

  return (
    <section 
      ref={containerRef} 
      className={`relative min-h-screen mobile-section-lg overflow-hidden bg-black safe-area-top safe-area-bottom ${className}`}
    >
      {/* Dynamic Gradient Background with 3D Depth */}
      <div className="absolute inset-0">
        {/* Vibrant gradient mesh */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(at 20% 80%, #00FF94 0px, transparent 50%),
              radial-gradient(at 80% 20%, #B794F4 0px, transparent 50%),
              radial-gradient(at 40% 40%, #00D9FF 0px, transparent 50%),
              radial-gradient(at 90% 60%, #FF0080 0px, transparent 50%)
            `,
            backgroundSize: '200% 200%',
            animationName: 'mesh-animation',
            animationDuration: '20s',
            animationTimingFunction: 'ease',
            animationIterationCount: 'infinite'
          }}
        />
        
        {/* 3D Grid Pattern */}
        <div className="absolute inset-0" style={{ perspective: '1000px' }}>
          <motion.div 
            className="h-full w-full"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,255,148,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,148,0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
          />
        </div>
        
        {/* Enhanced 3D floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, #00FF94 0%, #00D9FF 50%, transparent 70%)`,
              boxShadow: `0 0 ${particle.size * 4}px #00FF94`,
              transform: `translateZ(${particle.z}px)`
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
              scale: [1, 1.5, 1],
              rotateZ: [0, 360]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Dynamic glow effects */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #00FF94 0%, transparent 70%)',
            filter: 'blur(120px)',
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            opacity: 0.3
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ambient light effects */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#00FF94]/20 via-[#00D9FF]/10 to-transparent rounded-full blur-3xl" style={{ animationName: 'pulse', animationDuration: '2s', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)', animationIterationCount: 'infinite' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#B794F4]/20 via-[#FF0080]/10 to-transparent rounded-full blur-3xl" style={{ animationName: 'pulse', animationDuration: '2s', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)', animationIterationCount: 'infinite', animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Dynamic Trust Indicators with 3D Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00D9FF] mb-8 uppercase tracking-widest">
              Trusted by Industry Leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {[
                { label: 'Enterprise Ready', icon: Shield, color: '#00FF94' },
                { label: '250+ AI Models', icon: Sparkles, color: '#00D9FF' },
                { label: '99.9% Uptime', icon: TrendingUp, color: '#B794F4' },
                { label: 'SOC 2 Type II', icon: CheckCircle, color: '#FF0080' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:translate-y-[-2px] hover:shadow-xl"
                >
                  <div className="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: item.color }} />
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="mobile-flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Content Column */}
            <div className="space-y-6 sm:space-y-8 mobile-text-center lg:text-left">
              {/* Dynamic Status Badge with Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
              >
                <motion.div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-[#00FF94] to-[#00D9FF]"></span>
                </motion.div>
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FF94] via-[#00D9FF] to-[#B794F4] uppercase tracking-wider">
                  AI Revolution 2025
                </span>
              </motion.div>

              {/* Bold Typography with 3D Effects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ 
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
                className="transform-gpu"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
                  <span className="block text-white mb-2">YOUR AI</span>
                  <motion.span 
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00FF94] via-[#00D9FF] to-[#B794F4] bg-[length:200%_100%]"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  >
                    ADVANTAGE
                  </motion.span>
                  <span className="block text-white mt-2">STARTS NOW</span>
                </h1>
                
                {/* ROI Badge */}
                <motion.div 
                  className="inline-block mt-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="px-6 py-3 bg-gradient-to-r from-[#FF0080]/20 to-[#FFE500]/20 border border-[#FF0080]/30 rounded-xl backdrop-blur-xl">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0080] to-[#FFE500]">
                      45% Cost Reduction • 60 Days
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Value Proposition with Dynamic Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Stop watching competitors leverage AI while you wait. We deliver{' '}
                  <span className="text-neon-green font-bold">production-ready AI systems</span> that transform 
                  your operations in weeks, not years.
                </p>
                
                {/* Interactive Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { icon: TrendingUp, metric: '250%', label: 'ROI Increase', color: '#00FF94' },
                    { icon: Zap, metric: '12 Weeks', label: 'Time to Deploy', color: '#00D9FF' },
                    { icon: Shield, metric: '99.9%', label: 'Uptime SLA', color: '#B794F4' }
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:translate-y-[-2px] hover:shadow-xl text-center"
                    >
                      <div className="p-4">
                        <benefit.icon className="w-8 h-8 mx-auto mb-2" style={{ color: benefit.color }} />
                        <div className="text-2xl font-black" style={{ color: benefit.color }}>{benefit.metric}</div>
                        <div className="text-sm text-white/70">{benefit.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced CTA with 3D Effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full sm:w-auto"
                >
                  <Link 
                    href="/contact"
                    className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 w-full sm:w-auto overflow-hidden rounded-2xl font-bold text-lg"
                  >
                    {/* Gradient Background with Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94] via-[#00D9FF] to-[#B794F4] bg-[length:200%_100%]" />
                    
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
                      Start Your AI Journey
                    </span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <ArrowRight className="h-6 w-6 text-black group-hover:text-white transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse" />
                    <span className="text-sm text-white/80">No credit card required</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" />
                    <span className="text-sm text-white/80">Deploy in 12 weeks</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-[#B794F4] rounded-full animate-pulse" />
                    <span className="text-sm text-white/80">100% success rate</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
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

            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
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

                {/* Mock Chart */}
                <div className="h-24 sm:h-32 bg-bg-card rounded-lg border border-border-subtle flex items-end justify-center p-2 sm:p-4 gap-1 sm:gap-2">
                  {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                    <div 
                      key={i} 
                      className="bg-gradient-to-t from-tech-green to-accent-hover rounded-t"
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
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group desktop-only"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
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
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-tech-green/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.div>
        
        {/* Scroll text */}
        <motion.p 
          className="text-xs text-tech-green/60 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.5 }}
        >
          Explore
        </motion.p>
      </motion.div>
    </section>
  )
}

export default EnhancedHero