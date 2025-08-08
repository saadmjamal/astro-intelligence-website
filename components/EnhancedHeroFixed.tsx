'use client'

import React, { useRef, useEffect, useState } from 'react'
import { ArrowRight, CheckCircle, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface EnhancedHeroProps {
  className?: string
}

const EnhancedHeroFixed: React.FC<EnhancedHeroProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  // Fixed particle values to prevent hydration mismatch
  const particles = [
    { id: 0, x: 15, y: 20, z: -10, size: 4, duration: 12, delay: 0, opacity: 0.5 },
    { id: 1, x: 80, y: 30, z: 15, size: 3, duration: 14, delay: 0.3, opacity: 0.4 },
    { id: 2, x: 25, y: 70, z: -5, size: 5, duration: 10, delay: 0.6, opacity: 0.6 },
    { id: 3, x: 70, y: 80, z: 20, size: 3, duration: 15, delay: 0.9, opacity: 0.3 },
    { id: 4, x: 40, y: 10, z: 0, size: 4, duration: 13, delay: 1.2, opacity: 0.5 },
    { id: 5, x: 90, y: 50, z: -15, size: 3, duration: 11, delay: 1.5, opacity: 0.4 }
  ]

  return (
    <section 
      ref={containerRef} 
      className={`relative min-h-screen overflow-hidden bg-black ${className}`}
      style={{ marginBottom: '-2rem' }}
    >
      {/* Static Gradient Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            opacity: 0.6,
            backgroundImage: `
              radial-gradient(at 20% 80%, #00FF94 0px, transparent 50%),
              radial-gradient(at 80% 20%, #B794F4 0px, transparent 50%),
              radial-gradient(at 40% 40%, #00D9FF 0px, transparent 50%),
              radial-gradient(at 90% 60%, #FF0080 0px, transparent 50%)
            `,
            backgroundSize: '200% 200%'
          }}
        />
        
        {/* Static Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,148,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,255,148,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* 3D floating particles - only animate after mount */}
        {mounted && particles.map((particle) => (
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
              opacity: particle.opacity
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
            }}
            transition={{
              y: {
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: particle.delay
              },
              x: {
                duration: particle.duration * 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: particle.delay
              }
            }}
          />
        ))}
        
        {/* Mouse glow effect - only show after mount */}
        {mounted && (
          <div 
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #00FF94 0%, transparent 70%)',
              filter: 'blur(120px)',
              left: mousePosition.x - 300,
              top: mousePosition.y - 300,
              opacity: 0.3,
              transition: 'left 0.3s ease-out, top 0.3s ease-out'
            }}
          />
        )}
        
        {/* Ambient light effects */}
        <div 
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,148,0.2) 0%, transparent 70%)',
            animationName: mounted ? 'pulse' : 'none',
            animationDuration: mounted ? '4s' : '0s',
            animationTimingFunction: mounted ? 'ease-in-out' : 'ease',
            animationIterationCount: mounted ? 'infinite' : '1'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(183,148,244,0.2) 0%, transparent 70%)',
            animationName: mounted ? 'pulse' : 'none',
            animationDuration: mounted ? '4s' : '0s',
            animationTimingFunction: mounted ? 'ease-in-out' : 'ease',
            animationIterationCount: mounted ? 'infinite' : '1',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium mb-8 uppercase tracking-widest"
               style={{ 
                 backgroundImage: 'linear-gradient(to right, #00FF94, #00D9FF)',
                 WebkitBackgroundClip: 'text',
                 backgroundClip: 'text',
                 color: 'transparent'
               }}>
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
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
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

          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-3"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px'
              }}
            >
              <motion.div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ 
                        background: '#00FF94',
                        animationName: mounted ? 'ping' : 'none',
                        animationDuration: mounted ? '1.5s' : '0s',
                        animationTimingFunction: mounted ? 'cubic-bezier(0, 0, 0.2, 1)' : 'ease',
                        animationIterationCount: mounted ? 'infinite' : '1'
                      }} />
                <span className="relative inline-flex rounded-full h-3 w-3"
                      style={{ 
                        backgroundImage: 'linear-gradient(to right, #00FF94, #00D9FF)'
                      }} />
              </motion.div>
              <span className="text-sm font-bold uppercase tracking-wider"
                    style={{ 
                      backgroundImage: 'linear-gradient(to right, #00FF94, #00D9FF, #B794F4)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}>
                AI Revolution 2025
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="block text-white mb-2">Cut run‑rate costs</span>
                <motion.span 
                  className="block"
                  style={{ 
                    backgroundImage: 'linear-gradient(to right, #00FF94, #00D9FF, #B794F4)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                  animate={mounted ? { 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                  } : undefined}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  20–40% in 90 days
                </motion.span>
              </h1>
              
              {/* Success Badge */}
              <motion.div
                className="inline-block mt-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="px-6 py-3"
                     style={{
                       backgroundImage: 'linear-gradient(to right, rgba(255,0,128,0.2), rgba(255,229,0,0.2))',
                       border: '1px solid rgba(255,0,128,0.3)',
                       borderRadius: '0.75rem',
                       backdropFilter: 'blur(20px)',
                       WebkitBackdropFilter: 'blur(20px)'
                     }}>
                  <span className="text-2xl font-bold"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #FF0080, #FFE500)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}>
                    45% Cost Reduction • 60 Days
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Production‑grade copilots and automation on your cloud (Azure/AWS/GCP) with SOC 2 guardrails, telemetry,
                and executive ROI dashboards. From pilot to production in 6–12 weeks.
              </p>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto">
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
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '1rem',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <div className="p-4">
                      <benefit.icon className="w-8 h-8 mx-auto mb-2" style={{ color: benefit.color }} />
                      <div className="text-2xl font-black" style={{ color: benefit.color }}>{benefit.metric}</div>
                      <div className="text-sm text-gray-400">{benefit.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/contact?plan=6-weeks"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto overflow-hidden rounded-2xl font-bold text-lg"
                  >
                    <div className="absolute inset-0"
                          style={{ backgroundImage: 'linear-gradient(to right, #00FF94, #00D9FF, #B794F4)', backgroundSize: '200% 100%' }} />
                    <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">See 6‑Week Plan</span>
                    <ArrowRight className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/contact?asset=roi-model"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-2xl font-semibold border border-white/20 text-white hover:bg-white/10 transition"
                  >
                    Get ROI Model (5 min)
                  </Link>
                </motion.div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 rounded-full"
                       style={{ 
                         background: '#00FF94',
                         animationName: mounted ? 'pulse' : 'none',
                         animationDuration: mounted ? '2s' : '0s',
                         animationTimingFunction: mounted ? 'cubic-bezier(0.4, 0, 0.6, 1)' : 'ease',
                         animationIterationCount: mounted ? 'infinite' : '1'
                       }} />
                  <span className="text-sm text-gray-400">No credit card required</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 rounded-full"
                       style={{ 
                         background: '#00D9FF',
                         animationName: mounted ? 'pulse' : 'none',
                         animationDuration: mounted ? '2s' : '0s',
                         animationTimingFunction: mounted ? 'cubic-bezier(0.4, 0, 0.6, 1)' : 'ease',
                         animationIterationCount: mounted ? 'infinite' : '1',
                         animationDelay: '0.5s'
                       }} />
                  <span className="text-sm text-gray-400">Deploy in 12 weeks</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 rounded-full"
                       style={{ 
                         background: '#B794F4',
                         animationName: mounted ? 'pulse' : 'none',
                         animationDuration: mounted ? '2s' : '0s',
                         animationTimingFunction: mounted ? 'cubic-bezier(0.4, 0, 0.6, 1)' : 'ease',
                         animationIterationCount: mounted ? 'infinite' : '1',
                         animationDelay: '1s'
                       }} />
                  <span className="text-sm text-gray-400">100% success rate</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}

export default EnhancedHeroFixed