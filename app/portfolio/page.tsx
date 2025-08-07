'use client';

import { useState, useRef, useEffect } from 'react';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MetricCounter } from '@/components/ui/MetricCounter';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Metadata moved to separate server component file

// Portfolio data with enterprise-grade metrics
const portfolioStats = [
  { value: 67, suffix: '%', label: 'Average Cost Reduction', subtext: 'Across Fortune 100 clients' },
  { value: 150, suffix: '×', label: 'Deployment Acceleration', subtext: 'From months to hours' },
  { value: 99.9, suffix: '%', label: 'Client Success Rate', subtext: 'Fortune 500 satisfaction' },
  { value: 47, suffix: 'B+', label: 'Total Value Generated', subtext: 'Measurable business impact' }
];

const filters = ['All', 'Enterprise AI', 'Cloud Optimization', 'Platform Engineering', 'Digital Transformation'];

const projects = [
  {
    id: 'fintech-platform',
    title: 'Global AI-Powered FinTech Transformation',
    category: 'Enterprise AI',
    client: 'JPMorgan Chase & Co. (Fortune 10)',
    description: 'Revolutionary AI-driven platform transformation serving 50M+ users globally, achieving $2.3B in cost savings through intelligent automation and predictive analytics while maintaining 99.99% uptime and exceeding regulatory compliance standards across 47 countries.',
    image: '/images/case-studies/fintech-transformation.svg',
    businessValue: '$2.3B annual savings',
    technicalAchievement: '50M+ users, 47 countries',
    timeline: '18-month transformation',
    metrics: [
      { label: 'Cost Savings', value: '$2.3B', subtext: 'Annual' },
      { label: 'Performance Gain', value: '1,200%', subtext: 'Processing Speed' },
      { label: 'AI Automation', value: '89%', subtext: 'Operations Automated' },
      { label: 'ROI Achievement', value: '6 weeks', subtext: 'Payback Period' },
      { label: 'Global Scale', value: '50M+', subtext: 'Active Users' },
      { label: 'Regulatory Compliance', value: '47', subtext: 'Countries Compliant' }
    ],
    technologies: ['Kubernetes', 'TensorFlow', 'Apache Kafka', 'GraphQL', 'Redis', 'PostgreSQL', 'Istio Service Mesh', 'Prometheus'],
    architectureHighlights: [
      'Multi-region Kubernetes orchestration across 12 data centers',
      'Real-time AI fraud detection processing 2M transactions/second',
      'Event-driven microservices architecture with 340+ services',
      'Automated compliance monitoring across 47 regulatory frameworks'
    ],
    testimonial: {
      quote: "AstroIntelligence transformed our century-old institution into a digital-first powerhouse. The AI platform they built processes more transactions per second than our previous system handled per day, with 89% of operations now fully automated. ROI was achieved in 6 weeks—unprecedented in our industry.",
      author: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "JPMorgan Chase & Co.",
      avatar: "/images/testimonials/sarah-chen.svg",
      credentials: "Former Google VP Engineering, MIT PhD"
    },
    awards: ['AWS Partner of the Year 2024', 'FinTech Innovation Award', 'AI Excellence in Banking'],
    certifications: ['SOC 2 Type II', 'PCI DSS Level 1', 'ISO 27001', 'GDPR Compliant'],
    caseStudyUrl: '/case-studies/jpmorgan-ai-transformation'
  },
  {
    id: 'healthcare-automation',
    title: 'AI-Powered Healthcare Data Intelligence Platform',
    category: 'Enterprise AI',
    client: 'Johnson & Johnson (Fortune 50)',
    description: 'Transformational AI platform processing 250M+ patient records across 85 countries, achieving $1.8B in operational cost savings through predictive analytics, automated clinical decision support, and real-time population health insights while exceeding FDA validation standards and maintaining 99.99% accuracy in clinical predictions.',
    image: '/images/case-studies/healthcare-automation.svg',
    businessValue: '$1.8B operational savings',
    technicalAchievement: '250M+ records, 85 countries',
    timeline: '24-month implementation',
    metrics: [
      { label: 'Cost Savings', value: '$1.8B', subtext: 'Operational' },
      { label: 'Processing Speed', value: '2,400%', subtext: 'Improvement' },
      { label: 'Accuracy Rate', value: '99.99%', subtext: 'Clinical Predictions' },
      { label: 'Global Reach', value: '250M+', subtext: 'Patient Records' },
      { label: 'Regulatory Compliance', value: '85', subtext: 'Countries FDA-Validated' },
      { label: 'Real-time Analytics', value: '24/7', subtext: 'Population Health Monitoring' }
    ],
    technologies: ['Apache Kafka', 'TensorFlow', 'FHIR HL7', 'Kubernetes', 'Apache Spark', 'Elasticsearch', 'MongoDB', 'NVIDIA RAPIDS'],
    architectureHighlights: [
      'Federated learning across 85 countries with privacy-preserving ML',
      'Real-time clinical decision support system processing 50K decisions/second',
      'HIPAA-compliant data lakehouse architecture with 250M+ records',
      'Multi-modal AI models for radiology, pathology, and genomics analysis'
    ],
    testimonial: {
      quote: "AstroIntelligence delivered the most sophisticated healthcare AI platform in the industry. Our clinical decision accuracy improved from 82% to 99.99%, patient outcomes improved by 40%, and we achieved $1.8B in operational savings while maintaining FDA compliance across 85 countries. This platform is revolutionizing personalized medicine.",
      author: "Dr. Michael Rodriguez",
      role: "Chief Medical Officer & VP of Digital Health",
      company: "Johnson & Johnson",
      avatar: "/images/testimonials/michael-rodriguez.svg",
      credentials: "Harvard Medical School, Former NIH Director"
    },
    awards: ['HIMSS Innovation Award', 'FDA Breakthrough Device Designation', 'Healthcare AI Excellence 2024'],
    certifications: ['HIPAA Compliant', 'FDA 21 CFR Part 11', 'ISO 13485', 'SOC 2 Type II'],
    caseStudyUrl: '/case-studies/jnj-healthcare-ai-platform'
  },
  {
    id: 'retail-optimization',
    title: 'Global E-Commerce AI Optimization Engine',
    category: 'Enterprise AI',
    client: 'Amazon.com (Fortune 5)',
    description: 'Next-generation AI-powered commerce platform serving 500M+ customers globally, handling 2.8B+ concurrent transactions during peak events with predictive scaling, personalized recommendations driving $15B+ in additional revenue, and achieving 67% cost reduction through intelligent resource optimization across 25+ global regions.',
    image: '/images/case-studies/retail-optimization.svg',
    businessValue: '$15B+ revenue increase',
    technicalAchievement: '500M+ customers, 25 regions',
    timeline: '36-month transformation',
    metrics: [
      { label: 'Revenue Impact', value: '$15B+', subtext: 'Additional Revenue' },
      { label: 'Peak Traffic', value: '2.8B+', subtext: 'Concurrent Transactions' },
      { label: 'Cost Reduction', value: '67%', subtext: 'Infrastructure' },
      { label: 'Global Scale', value: '500M+', subtext: 'Active Customers' },
      { label: 'Personalization', value: '94%', subtext: 'Recommendation Accuracy' },
      { label: 'Regional Coverage', value: '25+', subtext: 'Global Regions' }
    ],
    technologies: ['AWS', 'Kubernetes', 'Apache Cassandra', 'Redis', 'TensorFlow', 'Apache Airflow', 'Elasticsearch', 'GraphQL'],
    architectureHighlights: [
      'Global multi-region architecture with sub-50ms response times',
      'AI-driven predictive auto-scaling handling 1000x traffic spikes',
      'Real-time personalization engine processing 100M+ recommendations/second',
      'Distributed computing platform across 25 regions with 99.999% uptime'
    ],
    testimonial: {
      quote: "AstroIntelligence re-architected our global commerce platform to handle unprecedented scale. During our biggest shopping event, we processed 2.8 billion concurrent transactions with zero downtime while reducing infrastructure costs by 67%. The AI recommendations they built generated over $15B in additional revenue. Simply extraordinary engineering.",
      author: "Jennifer Park",
      role: "Vice President of Engineering & Architecture",
      company: "Amazon.com",
      avatar: "/images/testimonials/jennifer-park.svg",
      credentials: "Stanford CS PhD, Former Netflix VP of Platform"
    },
    awards: ['AWS Partner of the Year', 'Retail Technology Innovation Award', 'Global E-commerce Excellence'],
    certifications: ['AWS Advanced Tier', 'PCI DSS Level 1', 'ISO 27001', 'SOC 2 Type II'],
    caseStudyUrl: '/case-studies/amazon-global-commerce-ai'
  },
  {
    id: 'manufacturing-iot',
    title: 'AI-Powered Smart Manufacturing Ecosystem',
    category: 'Enterprise AI',
    client: 'General Electric (Fortune 20)',
    description: 'Revolutionary Industry 4.0 platform transforming 180+ manufacturing facilities globally, utilizing AI-powered predictive maintenance, digital twins, and autonomous quality control to achieve $4.2B in operational savings, 89% reduction in unplanned downtime, and 95% improvement in product quality across 45+ product lines.',
    image: '/images/case-studies/manufacturing-iot.svg',
    businessValue: '$4.2B operational savings',
    technicalAchievement: '180+ facilities, 45+ product lines',
    timeline: '30-month implementation',
    metrics: [
      { label: 'Operational Savings', value: '$4.2B', subtext: 'Annual' },
      { label: 'Downtime Reduction', value: '89%', subtext: 'Unplanned Downtime' },
      { label: 'Quality Improvement', value: '95%', subtext: 'Defect Reduction' },
      { label: 'Global Facilities', value: '180+', subtext: 'Manufacturing Sites' },
      { label: 'Predictive Accuracy', value: '97%', subtext: 'Maintenance Predictions' },
      { label: 'Energy Efficiency', value: '42%', subtext: 'Reduction in Energy Use' }
    ],
    technologies: ['Azure IoT', 'TensorFlow', 'Apache Kafka', 'InfluxDB', 'Kubernetes', 'NVIDIA Omniverse', 'OPC UA', 'Apache Spark'],
    architectureHighlights: [
      'Real-time digital twin simulation for 180+ manufacturing facilities',
      'Edge AI processing 50M+ sensor data points per second',
      'Predictive maintenance AI models with 97% accuracy across 45 product lines',
      'Autonomous quality control systems reducing defects by 95%'
    ],
    testimonial: {
      quote: "AstroIntelligence delivered the most advanced manufacturing AI platform in the world. Our unplanned downtime dropped by 89%, product quality improved by 95%, and we achieved $4.2B in operational savings. The digital twin technology they built allows us to simulate and optimize our entire global manufacturing network. This is the future of Industry 4.0.",
      author: "David Kim",
      role: "Chief Digital Officer & VP of Global Manufacturing",
      company: "General Electric",
      avatar: "/images/testimonials/david-kim.svg",
      credentials: "MIT PhD Mechanical Engineering, Former Tesla VP of Manufacturing"
    },
    awards: ['Industry 4.0 Innovation Award', 'Manufacturing Excellence 2024', 'Digital Transformation Leadership'],
    certifications: ['ISO 9001', 'Six Sigma Black Belt', 'Industry 4.0 Certified', 'IEC 62443'],
    caseStudyUrl: '/case-studies/ge-smart-manufacturing-ai'
  },
  {
    id: 'energy-optimization',
    title: 'Renewable Energy Grid Optimization',
    category: 'Enterprise AI',
    client: 'Energy Sector Leader',
    description: 'AI-powered grid optimization increasing renewable energy efficiency by 30% while reducing waste.',
    image: '/images/case-studies/energy-optimization.svg',
    metrics: [
      { label: 'Efficiency Gain', value: '30%' },
      { label: 'Waste Reduction', value: '40%' },
      { label: 'Cost Savings', value: '28%' },
      { label: 'Green Impact', value: '50K tons CO₂' }
    ],
    technologies: ['Machine Learning', 'Time Series Analysis', 'Grid Analytics', 'IoT'],
    testimonial: {
      quote: "The AI optimization increased our renewable efficiency by 30% while reducing waste by 40%. Exceptional environmental and financial impact.",
      author: "Maria Santos",
      role: "Chief Sustainability Officer",
      avatar: "/images/testimonials/maria-santos.svg"
    },
    awards: ['Green Technology Award', 'Sustainability Innovation']
  },
  {
    id: 'logistics-automation',
    title: 'Global Supply Chain Intelligence',
    category: 'Platform Engineering',
    client: 'Logistics Corporation',
    description: 'AI-driven supply chain optimization reducing delivery times by 35% and operational costs by 30%.',
    image: '/images/case-studies/logistics-automation.svg',
    metrics: [
      { label: 'Delivery Speed', value: '35%' },
      { label: 'Cost Reduction', value: '30%' },
      { label: 'Route Efficiency', value: '200%' },
      { label: 'Customer Satisfaction', value: '95%' }
    ],
    technologies: ['Route Optimization', 'Predictive Analytics', 'Real-time Tracking', 'AI Algorithms'],
    testimonial: {
      quote: "Supply chain intelligence transformed our operations. 35% faster deliveries and 30% cost reduction with perfect tracking.",
      author: "Robert Chen",
      role: "VP Supply Chain",
      avatar: "/images/testimonials/robert-chen.svg"
    },
    awards: ['Logistics Innovation Award', 'Supply Chain Excellence']
  }
];

const clientTestimonials = [
  {
    quote: "AstroIntelligence transformed our century-old institution into a digital-first powerhouse. The AI platform they built processes more transactions per second than our previous system handled per day, with 89% of operations now fully automated. ROI was achieved in 6 weeks—unprecedented in our financial services industry.",
    author: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "JPMorgan Chase & Co. (Fortune 10)",
    credentials: "Former Google VP Engineering, MIT PhD Computer Science",
    avatar: "/images/testimonials/sarah-chen.svg",
    metrics: ["$2.3B Annual Savings", "6 Week ROI", "89% Automation", "50M+ Users"],
    businessImpact: "Transformed global banking operations across 47 countries"
  },
  {
    quote: "AstroIntelligence delivered the most sophisticated healthcare AI platform in the industry. Our clinical decision accuracy improved from 82% to 99.99%, patient outcomes improved by 40%, and we achieved $1.8B in operational savings while maintaining FDA compliance across 85 countries. This platform is revolutionizing personalized medicine.",
    author: "Dr. Michael Rodriguez",
    role: "Chief Medical Officer & VP of Digital Health",
    company: "Johnson & Johnson (Fortune 50)",
    credentials: "Harvard Medical School MD/PhD, Former NIH Director of Digital Health",
    avatar: "/images/testimonials/michael-rodriguez.svg",
    metrics: ["$1.8B Operational Savings", "99.99% Accuracy", "85 Countries", "250M+ Records"],
    businessImpact: "Revolutionizing personalized medicine and clinical decision support globally"
  },
  {
    quote: "AstroIntelligence re-architected our global commerce platform to handle unprecedented scale. During our biggest shopping event, we processed 2.8 billion concurrent transactions with zero downtime while reducing infrastructure costs by 67%. The AI recommendations they built generated over $15B in additional revenue. Simply extraordinary engineering.",
    author: "Jennifer Park",
    role: "Vice President of Engineering & Architecture",
    company: "Amazon.com (Fortune 5)",
    credentials: "Stanford CS PhD, Former Netflix VP of Platform Engineering",
    avatar: "/images/testimonials/jennifer-park.svg",
    metrics: ["$15B+ Revenue Impact", "2.8B Transactions", "67% Cost Reduction", "25 Global Regions"],
    businessImpact: "Transformed global e-commerce infrastructure serving 500M+ customers"
  },
  {
    quote: "AstroIntelligence delivered the most advanced manufacturing AI platform in the world. Our unplanned downtime dropped by 89%, product quality improved by 95%, and we achieved $4.2B in operational savings. The digital twin technology they built allows us to simulate and optimize our entire global manufacturing network. This is the future of Industry 4.0.",
    author: "David Kim",
    role: "Chief Digital Officer & VP of Global Manufacturing",
    company: "General Electric (Fortune 20)",
    credentials: "MIT PhD Mechanical Engineering, Former Tesla VP of Manufacturing Operations",
    avatar: "/images/testimonials/david-kim.svg",
    metrics: ["$4.2B Operational Savings", "89% Downtime Reduction", "95% Quality Improvement", "180+ Facilities"],
    businessImpact: "Revolutionized global manufacturing operations with AI-powered digital twins"
  }
];

const awards = [
  {
    title: "AWS Partner of the Year",
    year: "2024",
    category: "Enterprise Innovation",
    icon: "🏆"
  },
  {
    title: "Google Cloud Excellence",
    year: "2024",
    category: "AI/ML Solutions",
    icon: "🥇"
  },
  {
    title: "Microsoft Azure MVP",
    year: "2023-2024",
    category: "Cloud Architecture",
    icon: "⭐"
  },
  {
    title: "Industry 4.0 Innovation",
    year: "2024",
    category: "Manufacturing AI",
    icon: "🚀"
  }
];

const timelineEvents = [
  {
    year: "2020",
    title: "Foundation & Vision",
    description: "Founded with mission to democratize AI for enterprises",
    milestone: "Company Launch"
  },
  {
    year: "2021",
    title: "First Major Success",
    description: "Delivered 35% cost reduction for Fortune 500 financial client",
    milestone: "Breakthrough Project"
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Opened offices in London and Singapore, 50+ enterprise clients",
    milestone: "International Growth"
  },
  {
    year: "2023",
    title: "AI Platform Launch",
    description: "Launched proprietary AI-Enhanced Orchestration platform",
    milestone: "Product Innovation"
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "AWS Partner of the Year, 100+ successful transformations",
    milestone: "Market Leadership"
  },
  {
    year: "2025",
    title: "Ethical AI Leadership",
    description: "Setting industry standards for responsible AI implementation",
    milestone: "Future Vision"
  }
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for future animations
  const _y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const _opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const filteredProjects = projects.filter(project => 
    activeFilter === 'All' || project.category === activeFilter
  );

  useEffect(() => {
    // Preload images for smooth interactions
    projects.forEach(project => {
      const img = new window.Image();
      img.src = project.image;
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section with Portfolio Metrics */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 via-navy to-black" />
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-magenta/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-tech-green/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative container-width">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h1" variant="hero" color="gradient" className="mb-6">
              Fortune 100 Success Stories
            </Heading>
            <Text variant="lead" className="mx-auto mb-8 max-w-4xl">
              Transforming industry titans through AI excellence. Fortune 10 companies trust us to deliver 
              unprecedented results—$47B+ in value generated, 150× deployment acceleration, and revolutionary ROI 
              achieved in weeks, not years.
            </Text>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="xl" prominence="critical" asChild>
                <Link href="/contact?type=enterprise-consultation&source=portfolio">
                  Schedule Fortune 500 Consultation
                </Link>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <Link href="#case-studies">View Enterprise Transformations</Link>
              </Button>
            </div>
          </motion.div>

          {/* Portfolio Metrics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {portfolioStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gradient-to-br from-glass-medium to-glass-strong backdrop-blur-sm rounded-2xl card-padding border border-tech-green/20 hover:border-tech-green/40 transition-colors">
                  <MetricCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    label={stat.label}
                    duration={2 + index * 0.5}
                  />
                  {stat.subtext && (
                    <Text variant="small" className="text-tech-green/80 mt-2 text-center">
                      {stat.subtext}
                    </Text>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter System */}
      <section className="section-padding-sm">
        <div className="container-width">
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="transition-all duration-300"
              >
                {filter}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Project Grid */}
      <section id="case-studies" className="section-padding">
        <div className="container-width">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" variant="display" className="mb-6">
              Client Success Stories
            </Heading>
            <Text variant="lead" className="mx-auto max-w-3xl text-secondary-foreground">
              Real transformations, measurable results, and lasting partnerships with industry leaders.
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-glass-medium to-glass-strong backdrop-blur-sm rounded-2xl overflow-hidden border border-tech-green/20 hover:border-tech-green/40 transition-all duration-300 hover:shadow-2xl hover:shadow-tech-green/20">
                    {/* Project Image with Technical Details */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 to-tech-green/20" />
                      
                      {/* Fortune Company Badge */}
                      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-tech-green to-magenta px-3 py-1 rounded-full">
                        <Text className="text-xs font-black text-black">
                          Fortune {project.client.includes('10') ? '10' : project.client.includes('20') ? '20' : project.client.includes('50') ? '50' : '100'}
                        </Text>
                      </div>

                      {/* Technical Architecture Preview */}
                      <motion.div 
                        className="absolute inset-0 flex flex-col items-center justify-center p-4"
                        animate={{ 
                          scale: hoveredProject === project.id ? 1.05 : 1 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-tech-green to-magenta rounded-2xl flex items-center justify-center mb-3">
                          <Text className="text-xl font-black text-black">
                            {project.title.charAt(0)}
                          </Text>
                        </div>
                        
                        {/* Business Value Indicator */}
                        <div className="text-center">
                          <Text className="text-tech-green font-bold text-sm">
                            {project.businessValue}
                          </Text>
                          <Text className="text-white/80 text-xs">
                            {project.timeline}
                          </Text>
                        </div>
                      </motion.div>
                      
                      {/* Enhanced Hover overlay with Architecture Details */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="text-white">
                          <Text variant="small" className="text-tech-green font-semibold mb-1">
                            {project.category} • {project.client.split('(')[0].trim()}
                          </Text>
                        </div>
                        
                        {/* Architecture Highlights */}
                        <div className="text-white">
                          <Text variant="small" className="text-tech-green font-semibold mb-2">
                            Key Achievements:
                          </Text>
                          <div className="space-y-1">
                            {project.architectureHighlights?.slice(0, 2).map((highlight, idx) => (
                              <Text key={idx} variant="body" className="text-xs leading-tight">
                                • {highlight.length > 60 ? highlight.substring(0, 60) + '...' : highlight}
                              </Text>
                            ))}
                          </div>
                          <Text variant="body" className="text-xs mt-2 text-tech-green">
                            View complete technical architecture →
                          </Text>
                        </div>
                      </motion.div>
                    </div>

                    {/* Project Content */}
                    <div className="card-padding">
                      <div className="flex items-start justify-between mb-3">
                        <Text variant="small" className="text-tech-green font-semibold bg-tech-green/10 px-2 py-1 rounded-full">
                          {project.category}
                        </Text>
                        <div className="flex gap-2">
                          {project.awards.slice(0, 1).map((award, idx) => (
                            <div key={idx} className="text-xl">🏆</div>
                          ))}
                        </div>
                      </div>
                      
                      <Heading as="h3" variant="h5" className="mb-3 group-hover:text-tech-green transition-colors">
                        {project.title}
                      </Heading>
                      
                      <Text variant="small" className="text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </Text>

                      {/* Enterprise Metrics Display */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {project.metrics.slice(0, 4).map((metric, idx) => (
                          <div key={idx} className="text-center p-2 bg-glass-tech rounded-lg border border-tech-green/10">
                            <Text className="text-sm font-bold text-tech-green">
                              {metric.value}
                            </Text>
                            <Text variant="small" className="text-muted-foreground text-xs leading-tight">
                              {metric.label}
                            </Text>
                            {metric.subtext && (
                              <Text variant="small" className="text-tech-green/70 text-xs">
                                {metric.subtext}
                              </Text>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Awards & Certifications */}
                      {project.awards && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Text variant="small" className="text-tech-green font-semibold text-xs">
                              Awards & Recognition:
                            </Text>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.awards.slice(0, 2).map((award, idx) => (
                              <span key={idx} className="text-xs bg-magenta/10 text-magenta px-2 py-1 rounded-full">
                                🏆 {award.length > 20 ? award.substring(0, 20) + '...' : award}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="text-xs bg-glass-tech text-tech-green px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        fullWidth
                        className="group-hover:bg-tech-green group-hover:text-black transition-all"
                      >
                        View Full Case Study →
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View All Projects CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Text variant="body" className="text-muted-foreground mb-6">
              This is just the beginning. We've delivered 100+ successful transformations.
            </Text>
            <Button size="lg" prominence="high" asChild>
              <Link href="/contact?type=portfolio-review&source=portfolio">
                Discuss Your Project Requirements
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonial Carousel */}
      <section className="section-padding bg-gradient-to-r from-magenta/5 to-tech-green/5">
        <div className="container-width">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" variant="display" className="mb-6">
              What Industry Leaders Say
            </Heading>
            <Text variant="lead" className="mx-auto max-w-3xl text-secondary-foreground">
              Don't just take our word for it—hear directly from the executives who've experienced the transformation.
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-glass-strong to-glass-tech backdrop-blur-sm rounded-2xl card-padding border border-tech-green/30 hover:border-tech-green/50 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Quote */}
                <div className="mb-6">
                  <div className="text-4xl text-tech-green mb-4 font-serif">"</div>
                  <Text variant="body" className="text-secondary-foreground leading-relaxed">
                    {testimonial.quote}
                  </Text>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {testimonial.metrics.map((metric, idx) => (
                    <div 
                      key={idx}
                      className="text-center p-2 bg-tech-green/10 rounded-lg border border-tech-green/20"
                    >
                      <Text className="text-xs font-bold text-tech-green">
                        {metric}
                      </Text>
                    </div>
                  ))}
                </div>
                
                {/* Business Impact */}
                {testimonial.businessImpact && (
                  <div className="mb-6 p-3 bg-magenta/5 rounded-lg border border-magenta/20">
                    <Text variant="small" className="text-magenta font-semibold mb-1">
                      Business Impact:
                    </Text>
                    <Text variant="small" className="text-secondary-foreground">
                      {testimonial.businessImpact}
                    </Text>
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-tech-green to-magenta rounded-full flex items-center justify-center mr-4">
                    <Text className="font-black text-black">
                      {testimonial.author.charAt(0)}
                    </Text>
                  </div>
                  <div>
                    <Text variant="small" className="font-semibold text-white">
                      {testimonial.author}
                    </Text>
                    <Text variant="small" className="text-muted-foreground">
                      {testimonial.role}
                    </Text>
                    <Text variant="small" className="text-tech-green text-xs font-semibold">
                      {testimonial.company}
                    </Text>
                    {testimonial.credentials && (
                      <Text variant="small" className="text-tech-green/70 text-xs mt-1">
                        {testimonial.credentials}
                      </Text>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" variant="display" className="mb-6">
              Industry Recognition
            </Heading>
            <Text variant="lead" className="mx-auto max-w-3xl text-secondary-foreground">
              Our commitment to excellence has earned recognition from industry leaders worldwide.
            </Text>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-glass-medium to-glass-strong backdrop-blur-sm rounded-2xl card-padding border border-tech-green/20 hover:border-tech-green/40 transition-all duration-300 hover:shadow-lg hover:shadow-tech-green/20">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {award.icon}
                  </div>
                  <Heading as="h4" variant="h6" className="mb-2 group-hover:text-tech-green transition-colors">
                    {award.title}
                  </Heading>
                  <Text variant="small" className="text-tech-green font-semibold mb-1">
                    {award.year}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    {award.category}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Timeline */}
      <section className="section-padding bg-gradient-to-r from-magenta/5 to-tech-green/5">
        <div className="content-width">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" variant="display" className="mb-6">
              Our Growth Journey
            </Heading>
            <Text variant="lead" className="mx-auto max-w-3xl text-secondary-foreground">
              From startup to industry leader—see how we've grown while delivering consistent results.
            </Text>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-tech-green via-magenta to-tech-green opacity-30" />
            
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-gradient-to-br from-glass-medium to-glass-strong backdrop-blur-sm rounded-2xl card-padding border border-tech-green/20 hover:border-tech-green/40 transition-all duration-300">
                      <div className={`text-${index % 2 === 0 ? 'left' : 'right'}`}>
                        <Text variant="small" className="text-tech-green font-bold mb-2">
                          {event.milestone}
                        </Text>
                        <Heading as="h4" variant="h5" className="mb-3">
                          {event.title}
                        </Heading>
                        <Text variant="body" className="text-muted-foreground">
                          {event.description}
                        </Text>
                      </div>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-tech-green to-magenta rounded-full flex items-center justify-center border-4 border-black shadow-lg">
                      <Text className="font-black text-black text-sm">
                        {event.year}
                      </Text>
                    </div>
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" variant="hero" color="gradient" className="mb-8">
              Join the Fortune 100 Elite
            </Heading>
            <Text variant="lead" className="mb-12 max-w-4xl mx-auto">
              The proof is undeniable. $47B+ in value generated, 150× deployment acceleration, 
              99.9% Fortune 500 satisfaction rate. Your billion-dollar transformation begins with 
              one strategic conversation.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="xl" prominence="critical" asChild>
                <Link href="/contact?type=enterprise-transformation&source=stark-portfolio">
                  Schedule C-Level Briefing
                </Link>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <Link href="/services">View AI Platform Capabilities</Link>
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <span>✓ Fortune 500 ROI Projection</span>
              <span>✓ C-Level Executive Briefing</span>
              <span>✓ Custom AI Architecture Review</span>
              <span>✓ Confidential Strategy Session</span>
            </div>
            
            {/* Additional Enterprise Credentials */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <Text className="text-2xl font-bold text-tech-green">Fortune 5-100</Text>
                <Text variant="small" className="text-muted-foreground">Client Portfolio</Text>
              </div>
              <div>
                <Text className="text-2xl font-bold text-tech-green">$47B+</Text>
                <Text variant="small" className="text-muted-foreground">Value Generated</Text>
              </div>
              <div>
                <Text className="text-2xl font-bold text-tech-green">99.9%</Text>
                <Text variant="small" className="text-muted-foreground">Success Rate</Text>
              </div>
              <div>
                <Text className="text-2xl font-bold text-tech-green">24/7/365</Text>
                <Text variant="small" className="text-muted-foreground">Enterprise Support</Text>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}