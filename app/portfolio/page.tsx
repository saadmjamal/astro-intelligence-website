export const dynamic = 'force-dynamic'

export default function PortfolioPage() {
  return (
    <main className="py-12 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">This page is temporarily simplified to ensure build stability. Case studies will return soon.</p>
    </main>
  )
}

// Metadata moved to separate server component file

// Portfolio data placeholder — replace with real cases when available
const portfolioStats = [
  { value: 1, suffix: '–2', label: 'Detailed Cases', subtext: 'Publishing soon' },
  { value: 3, suffix: '–5', label: 'Quick Wins', subtext: 'Per teardown' },
  { value: 6, suffix: '–12', label: 'Weeks', subtext: 'Pilot to production' },
  { value: 0, suffix: '%', label: 'Inflated Claims', subtext: 'We publish only what’s real' }
];

const filters = ['All', 'Enterprise AI', 'Cloud Optimization', 'Platform Engineering', 'Digital Transformation'];

const projects: Array<{
  id: string;
  title: string;
  category: string;
  client?: string;
  description: string;
  image?: string;
  metrics?: Array<{ label: string; value: string; subtext?: string }>;
  technologies?: string[];
  architectureHighlights?: string[];
  caseStudyUrl?: string;
}> = [
  {
    id: 'case-coming-soon',
    title: 'Cost Teardown → Pilot → Production',
    category: 'Methodology',
    description: 'We publish only attributable outcomes. First anonymized case (with architecture notes) is being prepared.',
    metrics: [
      { label: 'Stage 1', value: 'Teardown', subtext: 'Savings plan' },
      { label: 'Stage 2', value: 'Pilot', subtext: 'Guardrails + HIL' },
      { label: 'Stage 3', value: 'Production', subtext: 'Telemetry + ROI' },
      { label: 'Timeline', value: '6–12 weeks' }
    ],
    technologies: ['Azure/AWS/GCP', 'M365/ServiceNow', 'Snowflake/Databricks'],
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
              Case Studies
            </Heading>
            <Text variant="lead" className="mx-auto mb-8 max-w-4xl">
              We share only verifiable outcomes. Our first anonymized case is being prepared. Meanwhile, explore our delivery approach and request a teardown.
            </Text>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="xl" prominence="critical" asChild>
                <Link href="/contact?type=cost-teardown&source=portfolio">
                  Book a Cost Teardown
                </Link>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <Link href="#case-studies">View Approach</Link>
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
              Case studies will be published as permissions are granted.
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
              Thought Leadership
            </Heading>
            <Text variant="lead" className="mx-auto max-w-3xl text-secondary-foreground">
              Until client quotes can be published, read our research and implementation notes in the Lab and Blog.
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-glass-strong to-glass-tech backdrop-blur-sm rounded-2xl card-padding border border-tech-green/30"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="body" className="text-secondary-foreground leading-relaxed">
                We do not publish testimonials without permission. Credibility first.
              </Text>
            </motion.div>
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
              Publishing timeline
            </Heading>
            <Text variant="lead" className="mx-auto max-w-3xl text-secondary-foreground">
              Case preparation, privacy checks, and legal review. We’ll publish what’s real—nothing else.
            </Text>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-glass-medium to-glass-strong backdrop-blur-sm rounded-2xl card-padding border border-tech-green/20">
                  <Text className="text-2xl font-bold text-tech-green">{event.year}</Text>
                  <Heading as="h4" variant="h6" className="mb-1">
                    {event.title}
                  </Heading>
                  <Text variant="small" className="text-muted-foreground">
                    {event.description}
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
                Want a credible teardown first?
              </Heading>
              <Text variant="lead" className="mb-12 max-w-4xl mx-auto">
                We’ll analyze your environment, propose safe changes, and publish results only when attributable and approved.
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
                <Text className="text-2xl font-bold text-tech-green">1–2</Text>
                <Text variant="small" className="text-muted-foreground">Initial Cases</Text>
              </div>
              <div>
                <Text className="text-2xl font-bold text-tech-green">Screenshots</Text>
                <Text variant="small" className="text-muted-foreground">Architecture & KPIs</Text>
              </div>
              <div>
                <Text className="text-2xl font-bold text-tech-green">Guardrails</Text>
                <Text variant="small" className="text-muted-foreground">Approvals & Audit</Text>
              </div>
              <div>
                <Text className="text-2xl font-bold text-tech-green">6–12 weeks</Text>
                <Text variant="small" className="text-muted-foreground">Pilot → Production</Text>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}