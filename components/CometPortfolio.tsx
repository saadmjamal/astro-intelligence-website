'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Rocket, TrendingUp, X, ChevronLeft, ChevronRight, Filter, ZoomIn } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  longDescription?: string
  impact: string
  impactValue: string
  technologies: string[]
  image: string
  href: string
  color: string
  category: string
  featured?: boolean
  metrics?: {
    label: string
    value: string
  }[]
  gallery?: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fintech-transformation',
    title: 'Digital Banking Revolution',
    client: 'FinTech Innovations Inc.',
    description: 'Transformed a legacy banking system into a modern, AI-powered digital platform serving millions.',
    longDescription: 'Complete digital transformation of a traditional banking infrastructure, implementing microservices architecture, real-time fraud detection, and personalized AI-driven financial insights. The platform now processes over 10M transactions daily with 99.99% uptime.',
    impact: 'Processing Speed',
    impactValue: '300% Faster',
    technologies: ['React', 'Node.js', 'AWS', 'Machine Learning', 'Kubernetes', 'PostgreSQL'],
    image: '/images/case-studies/fintech-transformation.svg',
    href: '/portfolio/fintech-transformation',
    color: 'from-comet-blue to-comet-purple',
    category: 'AI',
    featured: true,
    metrics: [
      { label: 'Daily Transactions', value: '10M+' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Fraud Reduction', value: '78%' }
    ]
  },
  {
    id: '33seconds-dating',
    title: 'AI-Powered Dating App',
    client: '33 Seconds',
    description: 'Built an innovative dating platform using AI matching algorithms and real-time video connections.',
    longDescription: 'Revolutionary dating application featuring computer vision-based compatibility matching, real-time video chat with AR filters, and behavioral analysis for improved match quality. Achieved 85% match success rate through advanced ML algorithms.',
    impact: 'User Engagement',
    impactValue: '85% Match Rate',
    technologies: ['React Native', 'WebRTC', 'TensorFlow', 'Firebase', 'Computer Vision', 'AR Kit'],
    image: '/images/case-studies/33seconds-dating.svg',
    href: '/portfolio/33seconds-dating-app',
    color: 'from-comet-magenta to-comet-purple',
    category: 'Mobile',
    featured: true,
    metrics: [
      { label: 'Active Users', value: '500K+' },
      { label: 'Successful Matches', value: '85%' },
      { label: 'App Store Rating', value: '4.8/5' }
    ]
  },
  {
    id: 'browser-autopilot',
    title: 'Browser Automation Suite',
    client: 'AutoPilot Systems',
    description: 'Developed an enterprise browser automation tool that saves thousands of hours monthly.',
    longDescription: 'Enterprise-grade browser automation platform with intelligent element detection, visual regression testing, and distributed execution across multiple environments. Reduced manual testing time by 90% across development teams.',
    impact: 'Time Saved',
    impactValue: '10,000+ hrs/mo',
    technologies: ['TypeScript', 'Puppeteer', 'Chrome Extensions', 'AI', 'Docker', 'Jenkins'],
    image: '/images/case-studies/browser-autopilot.svg',
    href: '/portfolio/browser-autopilot',
    color: 'from-comet-cyan to-comet-teal',
    category: 'Web',
    metrics: [
      { label: 'Tests Automated', value: '2500+' },
      { label: 'Time Reduction', value: '90%' },
      { label: 'Bug Detection', value: '95%' }
    ]
  },
  {
    id: 'ai-analytics-platform',
    title: 'AI Analytics Platform',
    client: 'DataFlow Systems',
    description: 'Built a comprehensive analytics platform with real-time AI insights and predictive modeling.',
    longDescription: 'Advanced analytics platform processing TB of data daily, featuring real-time ML pipelines, automated anomaly detection, and predictive business intelligence dashboards.',
    impact: 'Data Processing',
    impactValue: '1TB+ Daily',
    technologies: ['Python', 'Apache Spark', 'TensorFlow', 'Elasticsearch', 'Grafana', 'AWS'],
    image: '/images/case-studies/fintech-transformation.svg',
    href: '/portfolio/ai-analytics-platform',
    color: 'from-purple-500 to-blue-600',
    category: 'AI'
  },
  {
    id: 'ecommerce-mobile',
    title: 'E-Commerce Mobile App',
    client: 'ShopSmart Inc.',
    description: 'Created a high-performance mobile shopping experience with AR try-on features.',
    longDescription: 'Full-featured e-commerce mobile application with augmented reality product visualization, voice search, and personalized recommendations.',
    impact: 'Conversion Rate',
    impactValue: '65% Higher',
    technologies: ['React Native', 'ARCore', 'Firebase', 'Stripe', 'Node.js'],
    image: '/images/case-studies/33seconds-dating.svg',
    href: '/portfolio/ecommerce-mobile',
    color: 'from-green-500 to-teal-600',
    category: 'Mobile'
  },
  {
    id: 'corporate-website',
    title: 'Corporate Website Redesign',
    client: 'TechCorp Industries',
    description: 'Complete website overhaul with modern design and performance optimization.',
    longDescription: 'Full website redesign and development featuring modern UX/UI, progressive web app capabilities, and advanced SEO optimization.',
    impact: 'Page Speed',
    impactValue: '90+ Score',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Sanity CMS'],
    image: '/images/case-studies/browser-autopilot.svg',
    href: '/portfolio/corporate-website',
    color: 'from-orange-500 to-red-600',
    category: 'Web'
  }
]

// Filter categories
const categories = ['All', 'AI', 'Web', 'Mobile']

// Particle effect component
const CosmicParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cosmic-comet-blue rounded-full opacity-60"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

// Lightbox Modal Component
interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  project: CaseStudy | null
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])
  
  if (!isOpen || !project) return null
  
  const images = project.gallery || (project.image ? [project.image] : [])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-cosmic-void/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] bg-cosmic-black border border-cosmic-stellar rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-cosmic-black/80 text-cosmic-comet-blue hover:text-cosmic-aurora rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Image Container */}
        <div className="relative h-80 bg-gradient-to-br from-cosmic-midnight to-cosmic-black">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />
          <div className="absolute inset-0 flex items-center justify-center">
            {images[currentImageIndex] && (
              <Image
                src={images[currentImageIndex]}
                alt={project.title}
                width={400}
                height={300}
                className="object-contain max-h-full"
              />
            )}
          </div>
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-cosmic-black/80 text-cosmic-comet-blue hover:text-cosmic-aurora rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-cosmic-black/80 text-cosmic-comet-blue hover:text-cosmic-aurora rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-cosmic-aurora mb-2">{project.client}</p>
            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
            <p className="text-cosmic-text-secondary leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>
          
          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.map((metric, index) => (
                <div key={index} className="text-center p-3 bg-cosmic-surface rounded-lg">
                  <div className="text-lg font-semibold text-cosmic-comet-blue">{metric.value}</div>
                  <div className="text-xs text-cosmic-text-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Technologies */}
          <div>
            <h4 className="text-sm font-medium text-cosmic-text-muted mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cosmic-surface text-cosmic-text-secondary text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="pt-4">
            <Link href={project.href} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora text-white rounded-lg hover:shadow-glow-cosmic-medium transition-all duration-300">
              <span>View Full Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as any
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3
    }
  }
}

const CometPortfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(caseStudies)
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({})
  
  // Filter projects based on category
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(caseStudies)
    } else {
      setFilteredProjects(caseStudies.filter(project => project.category === activeFilter))
    }
  }, [activeFilter])
  
  // Handle image lazy loading
  const handleImageLoad = useCallback((projectId: string) => {
    setImageLoadStates(prev => ({ ...prev, [projectId]: true }))
  }, [])
  
  // Open lightbox
  const openLightbox = useCallback((project: CaseStudy) => {
    setSelectedProject(project)
    setIsLightboxOpen(true)
  }, [])
  
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-cosmic-void overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-br from-cosmic-void via-cosmic-black to-cosmic-midnight opacity-80" />
        <CosmicParticles />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-cosmic-stellar bg-cosmic-black/50 backdrop-blur-sm px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-cosmic-comet-blue" />
            <span className="text-sm font-medium text-white">
              Success Stories
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Transforming Ideas into <span className="bg-gradient-to-r from-cosmic-comet-blue via-cosmic-aurora to-cosmic-pulsar bg-clip-text text-transparent">Reality</span>
          </h2>
          
          <p className="text-xl text-cosmic-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore how we've helped businesses achieve extraordinary results through innovative technology solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-2 p-2 bg-cosmic-black/50 backdrop-blur-sm border border-cosmic-stellar rounded-2xl">
            <Filter className="h-4 w-4 text-cosmic-comet-blue ml-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora text-white shadow-glow-cosmic-subtle'
                    : 'text-cosmic-text-muted hover:text-cosmic-comet-blue hover:bg-cosmic-surface'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Case Studies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
            }}
          >
          {filteredProjects.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              layout
              className="group relative"
            >
              <div className="relative h-full bg-cosmic-black/50 backdrop-blur-sm border border-cosmic-stellar rounded-2xl overflow-hidden group-hover:border-cosmic-comet-blue transition-all duration-500 group-hover:shadow-glow-cosmic-medium">
                {/* Featured Badge */}
                {study.featured && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}
                
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!imageLoadStates[study.id] && (
                      <div className="w-full h-full bg-cosmic-skeleton animate-pulse" />
                    )}
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={300}
                      height={200}
                      className={`object-contain transition-opacity duration-300 ${
                        imageLoadStates[study.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(study.id)}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-cosmic-void/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <button
                        onClick={() => openLightbox(study)}
                        className="p-3 bg-cosmic-comet-blue hover:bg-cosmic-aurora rounded-full transition-colors duration-200"
                      >
                        <ZoomIn className="w-6 h-6 text-white" />
                      </button>
                      <p className="text-white text-sm font-medium">View Details</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-cosmic-surface text-cosmic-comet-blue text-xs font-medium rounded-full">
                        {study.category}
                      </span>
                      <p className="text-sm text-cosmic-aurora">{study.client}</p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cosmic-comet-blue transition-colors duration-300">
                      {study.title}
                    </h3>
                    
                    <p className="text-cosmic-text-secondary leading-relaxed line-clamp-3">
                      {study.description}
                    </p>
                  </div>

                  {/* Impact Metric */}
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-cosmic-surface/50 border border-cosmic-nebula">
                    <TrendingUp className="h-5 w-5 text-cosmic-comet-blue" />
                    <div>
                      <p className="text-xs text-cosmic-text-muted">{study.impact}</p>
                      <p className="text-lg font-semibold text-white">{study.impactValue}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full bg-cosmic-surface/50 text-cosmic-text-secondary border border-cosmic-nebula"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.technologies.length > 4 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-cosmic-surface/50 text-cosmic-text-muted border border-cosmic-nebula">
                        +{study.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center justify-between pt-2">
                    <Link 
                      href={study.href} 
                      className="flex items-center gap-2 text-cosmic-comet-blue hover:text-cosmic-aurora transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">Case Study</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                    
                    <button
                      onClick={() => openLightbox(study)}
                      className="text-cosmic-text-muted hover:text-cosmic-pulsar transition-colors duration-200"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center p-6 bg-cosmic-black/30 backdrop-blur-sm border border-cosmic-stellar rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora bg-clip-text text-transparent mb-2">200+</div>
            <p className="text-sm text-cosmic-text-muted">Projects Delivered</p>
          </div>
          <div className="text-center p-6 bg-cosmic-black/30 backdrop-blur-sm border border-cosmic-stellar rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora bg-clip-text text-transparent mb-2">50+</div>
            <p className="text-sm text-cosmic-text-muted">Happy Clients</p>
          </div>
          <div className="text-center p-6 bg-cosmic-black/30 backdrop-blur-sm border border-cosmic-stellar rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora bg-clip-text text-transparent mb-2">99%</div>
            <p className="text-sm text-cosmic-text-muted">Client Satisfaction</p>
          </div>
          <div className="text-center p-6 bg-cosmic-black/30 backdrop-blur-sm border border-cosmic-stellar rounded-2xl">
            <div className="text-4xl font-bold bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora bg-clip-text text-transparent mb-2">24/7</div>
            <p className="text-sm text-cosmic-text-muted">Support Available</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cosmic-comet-blue to-cosmic-aurora text-white rounded-2xl hover:shadow-glow-cosmic-high transition-all duration-300 group"
          >
            <span className="text-lg font-semibold">Start Your Success Story</span>
            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </motion.div>
        
        {/* Lightbox Modal */}
        <AnimatePresence>
          <Lightbox 
            isOpen={isLightboxOpen} 
            onClose={() => setIsLightboxOpen(false)} 
            project={selectedProject} 
          />
        </AnimatePresence>
      </div>
    </section>
  )
}

export default CometPortfolio