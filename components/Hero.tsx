'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Cloud, Code2, Cpu, Sparkles } from 'lucide-react';
import ChatInterface from '@/components/ai/ChatInterface';

// Dynamic import for motion components to reduce bundle size
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => mod.motion.div),
  { ssr: false }
);

// Import motion for other components
import { motion } from 'framer-motion';

interface HeroProps {
  tagline?: string;
  showPersonalBrand?: boolean;
}

export default function Hero({ tagline, showPersonalBrand = true }: HeroProps) {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden metlab-geometric-bg">
      {/* METLAB-inspired geometric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* High-tech data streams */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="data-stream absolute h-px"
              style={{
                top: `${20 + i * 15}%`,
                left: 0,
                right: 0,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
        {/* Subtle tech grid overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tech-green)_0px,_transparent_1px)] bg-[length:60px_60px]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Suspense fallback={<div className="opacity-0" />}>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
          {showPersonalBrand && (
            <div className="mb-8">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 tech-border tech-glow"
                style={{ background: 'var(--accent-muted)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-tech-accent" />
                <span className="text-sm font-medium text-tech-accent status-online">Enterprise AI Innovation Leader</span>
              </motion.div>
            </div>
          )}

          <Heading as="h1" variant="hero" color="gradient" emphasis="hero" className="mb-8 display-ultra-bold text-gradient-tech gpu-accelerated">
            {showPersonalBrand 
              ? 'Orchestrate Intelligence. Accelerate Innovation.' 
              : 'Astro Intelligence'}
          </Heading>

          <Text variant="hero-lead" hierarchy="secondary" className="mx-auto mb-6 max-w-4xl">
            {showPersonalBrand 
              ? 'Leading enterprises trust AstroIntelligence to optimize cloud infrastructure, reduce operational costs by 30%, and accelerate innovation through ethical AI-driven automation platforms.'
              : tagline
            }
          </Text>

          <Text variant="body-large" hierarchy="muted" className="mx-auto mb-10 max-w-3xl">
            {showPersonalBrand 
              ? 'Our intelligent automation platform transforms how enterprises operate—delivering measurable ROI through advanced AI orchestration, predictive optimization, and human-centered design principles.'
              : null
            }
          </Text>

          {showPersonalBrand && (
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 text-sm text-secondary-foreground">
                <Cloud className="h-4 w-4 text-tech-accent" />
                <span className="font-medium">45% Cost Optimization</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-foreground">
                <Code2 className="h-4 w-4 text-tech-accent" />
                <span className="font-medium">8× Faster Innovation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-foreground">
                <Cpu className="h-4 w-4 text-tech-accent" />
                <span className="font-medium">SOC 2 Compliant</span>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Button size="xl" prominence="critical" className="cta-primary dynamic-scale gpu-accelerated" asChild>
              <Link href="/contact">{showPersonalBrand ? 'Accelerate Your Transformation' : 'Book a Discovery Call'}</Link>
            </Button>
            <Button variant="secondary" size="lg" prominence="medium" className="cta-secondary dynamic-scale" asChild>
              <Link href={showPersonalBrand ? "/case-studies" : "/services"}>
                {showPersonalBrand ? 'Explore Success Stories' : 'Explore Services'}
              </Link>
            </Button>
          </div>

          {showPersonalBrand && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Text variant="caption" hierarchy="subtle" className="space-x-2">
                <span>Enterprise consultation</span>
                <span>•</span>
                <span>No commitment required</span>
                <span>•</span>
                <span>Compliance guaranteed</span>
              </Text>
            </motion.div>
          )}
          </MotionDiv>
        </Suspense>

        {/* Animated particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-magenta/30 absolute h-1 w-1 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* AI Chat Widget */}
      <ChatInterface 
        compact 
        userProfile={{
          industry: 'technology',
          companySize: 'medium',
          currentChallenges: ['cloud costs', 'automation', 'scalability'],
          interests: ['ai', 'cloud optimization', 'devops']
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="text-subtle-foreground h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
