'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { ChevronDown, Sparkles, Zap, Globe, Code, Brain } from 'lucide-react'
import Link from 'next/link'

// PERFORMANCE FIX: Dynamic import of Framer Motion to reduce initial bundle size
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => mod.motion.div),
  { 
    ssr: false,
    loading: () => <div className="opacity-0" />
  }
)

const MotionH1 = dynamic(
  () => import('framer-motion').then(mod => mod.motion.h1),
  { 
    ssr: false,
    loading: () => <h1 className="opacity-0">Loading...</h1>
  }
)

const MotionP = dynamic(
  () => import('framer-motion').then(mod => mod.motion.p),
  { 
    ssr: false,
    loading: () => <p className="opacity-0">Loading...</p>
  }
)

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

const CometHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // PERFORMANCE FIX: Reduced particles from 20 to 12 for better mobile performance
  const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5
  }))

  // Data streams for animated background
  const dataStreams = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${15 + i * 15}%`,
    delay: i * 0.5,
    duration: 3 + Math.random() * 2
  }))

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-comet-black">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="comet-gradient-hero absolute inset-0" />
        
        {/* Tech Grid */}
        <div className="comet-tech-grid" />
        
        {/* Data Streams */}
        <div className="absolute inset-0">
          {dataStreams.map((stream) => (
            <div
              key={stream.id}
              className="comet-data-stream"
              style={{
                left: stream.left,
                animationDelay: `${stream.delay}s`,
                animationDuration: `${stream.duration}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating Particles - PERFORMANCE OPTIMIZED */}
        {particles.map((particle) => (
          <MotionDiv
            key={particle.id}
            className="comet-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              willChange: 'transform', // GPU acceleration hint
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Status Badge */}
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-comet-border bg-comet-surface px-4 py-2 comet-blur-md"
          >
            <Sparkles className="h-4 w-4 text-comet-neon-blue" />
            <span className="text-sm font-medium text-comet-text-primary">
              AI-Powered Agency Solutions
            </span>
          </MotionDiv>

          {/* Main Heading */}
          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="comet-heading-1 mb-6 text-comet-text-primary"
          >
            Transform Your Vision with{' '}
            <span className="comet-gradient-text">
              Astro Intelligence
            </span>
          </MotionH1>

          {/* Subheading */}
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="comet-body-large mb-12 max-w-3xl mx-auto"
          >
            We craft intelligent digital experiences that propel your business into the future. 
            From AI-driven solutions to stunning web applications, we're your partner in digital innovation.
          </MotionP>

          {/* CTA Buttons */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/contact" className="comet-button comet-button-primary">
              Start Your Project
              <Zap className="ml-2 h-4 w-4 inline" />
            </Link>
            <Link href="/services" className="comet-button comet-button-secondary">
              Explore Services
            </Link>
          </MotionDiv>

          {/* Metrics */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-comet-neon-blue" />
              <div className="comet-heading-3 text-comet-text-primary">50+</div>
              <p className="text-sm text-comet-text-muted">Global Clients</p>
            </div>
            <div className="text-center">
              <Code className="h-8 w-8 mx-auto mb-2 text-comet-neon-purple" />
              <div className="comet-heading-3 text-comet-text-primary">200+</div>
              <p className="text-sm text-comet-text-muted">Projects Delivered</p>
            </div>
            <div className="text-center">
              <Brain className="h-8 w-8 mx-auto mb-2 text-comet-neon-pink" />
              <div className="comet-heading-3 text-comet-text-primary">15+</div>
              <p className="text-sm text-comet-text-muted">AI Solutions</p>
            </div>
          </MotionDiv>
        </MotionDiv>

        {/* Scroll Indicator */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <MotionDiv
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-comet-text-muted" />
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-comet-black via-transparent to-transparent pointer-events-none" />
    </section>
  )
}

export default CometHero