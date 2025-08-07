'use client';

import { useState, useRef, useEffect } from 'react';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MetricCounter } from '@/components/ui/MetricCounter';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Mobile-optimized portfolio data
const portfolioStats = [
  { value: 30, suffix: '%', label: 'Cost Reduction', icon: '💰' },
  { value: 5, suffix: '×', label: 'Deployment Speed', icon: '⚡' },
  { value: 98, suffix: '%', label: 'Client Success', icon: '🎯' },
  { value: 2, suffix: 'B+', label: 'Savings Generated', icon: '📈' }
];

const mobileProjects = [
  {
    id: 'fintech-mobile',
    title: 'FinTech Platform',
    category: 'Enterprise AI',
    client: 'Fortune 500',
    shortDescription: '40% cost reduction, 275% performance gain',
    metrics: [
      { label: 'Cost Saved', value: '40%', color: 'text-tech-green' },
      { label: 'Performance', value: '275%', color: 'text-magenta' }
    ],
    technologies: ['AI/ML', 'K8s', 'Cloud'],
    testimonial: {
      quote: "40% cost reduction in just 3 months with zero downtime.",
      author: "Sarah Chen, CTO"
    },
    awards: ['AWS Excellence', 'AI Innovation']
  },
  {
    id: 'healthcare-mobile', 
    title: 'Healthcare AI',
    category: 'Data Processing',
    client: 'Healthcare Leader',
    shortDescription: '10M+ records daily, 99.9% accuracy',
    metrics: [
      { label: 'Processing', value: '500%', color: 'text-tech-green' },
      { label: 'Accuracy', value: '99.9%', color: 'text-magenta' }
    ],
    technologies: ['Kafka', 'TensorFlow', 'FHIR'],
    testimonial: {
      quote: "500% speed increase while maintaining perfect compliance.",
      author: "Dr. Rodriguez, CMO"
    },
    awards: ['HIMSS Innovation', 'Healthcare AI']
  },
  {
    id: 'retail-mobile',
    title: 'E-commerce Scale',
    category: 'Cloud Optimization', 
    client: 'Retail Chain',
    shortDescription: '10M+ users, zero downtime, 25% savings',
    metrics: [
      { label: 'Traffic', value: '10M+', color: 'text-tech-green' },
      { label: 'Uptime', value: '99.99%', color: 'text-magenta' }
    ],
    technologies: ['AWS', 'CDN', 'Auto-scale'],
    testimonial: {
      quote: "Black Friday handled flawlessly with 25% lower costs.",
      author: "Jennifer Park, VP"
    },
    awards: ['AWS Retail', 'Cloud Excellence']
  }
];

const mobileTestimonials = [
  {
    quote: "AstroIntelligence delivered 40% cost reduction in 3 months with zero disruption.",
    author: "Sarah Chen",
    role: "CTO, Fortune 500 Financial",
    metrics: ["40% Cost Cut", "3 Month ROI"],
    rating: 5
  },
  {
    quote: "500% speed increase while maintaining 100% HIPAA compliance.",
    author: "Dr. Rodriguez", 
    role: "CMO, Healthcare Provider",
    metrics: ["500% Speed", "100% Compliance"],
    rating: 5
  }
];

export default function MobilePortfolioOptimized() {
  const [activeProject, setActiveProject] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Mobile swipe handling
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeProject < mobileProjects.length - 1) {
      setActiveProject(prev => prev + 1);
    } else if (direction === 'right' && activeProject > 0) {
      setActiveProject(prev => prev - 1);
    }
  };

  useEffect(() => {
    // Preload critical images for mobile
    const preloadImages = () => {
      mobileProjects.forEach(project => {
        const img = new window.Image();
        img.src = `/images/case-studies/${project.id}.webp`;
      });
    };
    preloadImages();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen mobile-optimized">
      {/* Mobile Hero Section */}
      <section className="relative overflow-hidden mobile-section-enhanced">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-navy to-black" />
        
        {/* Mobile-optimized background elements */}
        <motion.div 
          className="absolute top-10 left-5 w-32 h-32 bg-magenta/20 rounded-full blur-2xl"
          style={{ y }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-5 w-48 h-48 bg-tech-green/15 rounded-full blur-2xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-25, 25]) }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative mobile-container">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h1" className="mobile-hero-text text-center bg-gradient-to-r from-tech-green via-magenta to-tech-green bg-clip-text text-transparent mb-4">
              Proven Results for Mobile Leaders
            </Heading>
            <Text className="mobile-subheading mx-auto mb-6 max-w-xl text-secondary-foreground">
              Fortune 500 companies trust our mobile-first AI solutions for 30% cost reduction and 5× faster deployment.
            </Text>
            
            {/* Mobile CTA Buttons */}
            <div className="flex flex-col gap-3 mb-12">
              <Button 
                size="lg" 
                prominence="critical" 
                className="mobile-button-primary mobile-haptic-medium"
                asChild
              >
                <Link href="/contact?type=roi-mobile&source=portfolio">
                  Get Mobile ROI Analysis
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="mobile-button-secondary mobile-haptic-light"
                asChild
              >
                <Link href="#mobile-cases">View Success Stories</Link>
              </Button>
            </div>
          </motion.div>

          {/* Mobile Portfolio Metrics Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {portfolioStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="mobile-card-enhanced text-center mobile-haptic-light"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <MetricCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  className="text-2xl font-black text-tech-green mb-1"
                />
                <Text className="text-xs text-muted-foreground font-medium">
                  {stat.label}
                </Text>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile Project Carousel */}
      <section id="mobile-cases" className="mobile-section-enhanced">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" className="mobile-subheading mb-4">
              Client Success Stories
            </Heading>
            <Text className="mobile-body-text text-secondary-foreground max-w-md mx-auto">
              Real transformations from industry leaders who trust our mobile-optimized solutions.
            </Text>
          </motion.div>

          {/* Mobile Project Cards with Swipe */}
          <div className="relative">
            <div className="mobile-swipeable overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeProject * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {mobileProjects.map((project, index) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-2">
                    <motion.div
                      className="mobile-card-enhanced mobile-haptic-medium"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                    >
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Text className="text-xs text-tech-green font-semibold bg-tech-green/10 px-2 py-1 rounded-full inline-block mb-2">
                            {project.category}
                          </Text>
                          <Heading as="h3" className="text-lg font-bold text-white mb-1">
                            {project.title}
                          </Heading>
                          <Text className="text-xs text-muted-foreground">
                            {project.client}
                          </Text>
                        </div>
                        <div className="flex gap-1">
                          {project.awards.slice(0, 1).map((_, idx) => (
                            <div key={idx} className="text-lg">🏆</div>
                          ))}
                        </div>
                      </div>

                      {/* Visual Impact Placeholder */}
                      <div className="h-24 bg-gradient-to-br from-magenta/20 to-tech-green/20 rounded-lg mb-4 flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-tech-green to-magenta rounded-lg flex items-center justify-center">
                          <Text className="text-lg font-black text-black">
                            {project.title.charAt(0)}
                          </Text>
                        </div>
                      </div>
                      
                      <Text className="mobile-body-text text-muted-foreground mb-4">
                        {project.shortDescription}
                      </Text>

                      {/* Mobile Metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <Text className={`text-lg font-bold ${metric.color}`}>
                              {metric.value}
                            </Text>
                            <Text className="text-xs text-muted-foreground">
                              {metric.label}
                            </Text>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="text-xs bg-glass-tech text-tech-green px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mobile Testimonial */}
                      <div className="bg-glass-subtle rounded-lg p-3 mb-4">
                        <Text className="text-xs text-secondary-foreground mb-2 italic">
                          "{project.testimonial.quote}"
                        </Text>
                        <Text className="text-xs text-tech-green font-semibold">
                          — {project.testimonial.author}
                        </Text>
                      </div>

                      {/* Mobile CTA */}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        fullWidth
                        className="mobile-haptic-light group-hover:bg-tech-green group-hover:text-black transition-all"
                      >
                        View Full Case Study →
                      </Button>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {mobileProjects.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all mobile-haptic-light ${
                    index === activeProject 
                      ? 'bg-tech-green w-6' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setActiveProject(index)}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Navigation Arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-glass-medium backdrop-blur-sm rounded-full flex items-center justify-center text-tech-green mobile-haptic-medium"
              onClick={() => handleSwipe('right')}
              disabled={activeProject === 0}
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-glass-medium backdrop-blur-sm rounded-full flex items-center justify-center text-tech-green mobile-haptic-medium"
              onClick={() => handleSwipe('left')}
              disabled={activeProject === mobileProjects.length - 1}
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Testimonials */}
      <section className="mobile-section-enhanced bg-gradient-to-r from-magenta/5 to-tech-green/5">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" className="mobile-subheading mb-4">
              What Leaders Say
            </Heading>
            <Text className="mobile-body-text text-secondary-foreground max-w-md mx-auto">
              Hear directly from executives who've experienced mobile transformation.
            </Text>
          </motion.div>

          <div className="space-y-4">
            {mobileTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="mobile-card-enhanced mobile-haptic-light"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-tech-green text-lg">★</span>
                  ))}
                </div>
                
                {/* Quote */}
                <Text className="mobile-body-text text-secondary-foreground text-center mb-4 italic">
                  "{testimonial.quote}"
                </Text>

                {/* Metrics */}
                <div className="flex justify-center gap-3 mb-4">
                  {testimonial.metrics.map((metric, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-tech-green/20 text-tech-green px-3 py-1 rounded-full font-semibold"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className="text-center">
                  <Text className="text-sm font-semibold text-white">
                    {testimonial.author}
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Final CTA */}
      <section className="mobile-section-enhanced">
        <div className="mobile-container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" className="mobile-subheading bg-gradient-to-r from-tech-green via-magenta to-tech-green bg-clip-text text-transparent mb-6">
              Ready to Transform Your Mobile Strategy?
            </Heading>
            <Text className="mobile-body-text mb-8 max-w-md mx-auto text-secondary-foreground">
              Join the executives achieving 30% cost reduction and 5× faster deployment with our mobile-optimized solutions.
            </Text>
            
            <div className="flex flex-col gap-4">
              <Button 
                size="lg" 
                prominence="critical" 
                className="mobile-button-primary mobile-haptic-medium"
                asChild
              >
                <Link href="/contact?type=mobile-transformation&source=portfolio">
                  Start Mobile Transformation
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="mobile-button-secondary mobile-haptic-light"
                asChild
              >
                <Link href="/services">Explore Mobile Solutions</Link>
              </Button>
            </div>
            
            <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex justify-center gap-4">
                <span>✓ Mobile ROI Assessment</span>
                <span>✓ 30-Min Strategy Call</span>
              </div>
              <div className="flex justify-center gap-4">
                <span>✓ Custom Mobile Roadmap</span>
                <span>✓ No Obligation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}