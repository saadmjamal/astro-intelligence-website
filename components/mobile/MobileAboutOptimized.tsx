'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Award, 
  Users, 
  Globe,
  Heart,
  Target,
  Rocket,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MetricCounter } from '@/components/ui/MetricCounter';

// Mobile-optimized data structures
const mobileStats = [
  { value: 2020, label: 'Founded', icon: '🚀', color: 'text-tech-green' },
  { value: 50, suffix: '+', label: 'Clients', icon: '🤝', color: 'text-magenta' },
  { value: 15, suffix: '+', label: 'Countries', icon: '🌍', color: 'text-tech-green' },
  { value: 200, suffix: '+', label: 'Team', icon: '👥', color: 'text-magenta' }
];

const mobileValues = [
  {
    icon: '🎯',
    title: 'Innovation First',
    description: 'We push boundaries and challenge conventions to deliver breakthrough solutions for mobile-first enterprises.',
    expandedContent: 'Our innovation-first approach means we constantly explore emerging technologies like edge AI, 5G optimization, and mobile-native cloud architectures to give our clients competitive advantages.',
    gradient: 'from-tech-green/20 to-tech-green/5'
  },
  {
    icon: '🤝',
    title: 'Ethical by Design', 
    description: 'Every solution we build prioritizes fairness, transparency, and human benefit in mobile experiences.',
    expandedContent: 'We believe ethical AI is not optional. Our mobile solutions include bias detection, transparent decision-making, and privacy-by-design principles that protect user data while delivering intelligence.',
    gradient: 'from-magenta/20 to-magenta/5'
  },
  {
    icon: '🚀',
    title: 'Client Success',
    description: 'Your mobile transformation success is our mission. We measure ourselves by the value we create.',
    expandedContent: 'We partner closely with clients throughout their mobile journey, providing 24/7 support, continuous optimization, and success metrics that align with your business objectives.',
    gradient: 'from-tech-green/20 to-tech-green/5'
  },
  {
    icon: '🌍',
    title: 'Global Impact',
    description: 'We build mobile solutions that scale globally while respecting local needs and cultures.',
    expandedContent: 'Our global perspective includes mobile-first markets in Asia, offline-first capabilities for emerging economies, and cultural adaptation that makes our solutions truly universal.',
    gradient: 'from-magenta/20 to-magenta/5'
  }
];

const mobileTeam = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former Google AI researcher specializing in mobile ML with 15+ years experience.',
    expertise: ['Mobile AI Strategy', 'Edge Computing', 'AI Ethics'],
    image: '👩‍💼',
    achievement: 'Led mobile AI initiatives serving 2B+ users',
    quote: 'The future is mobile-first AI that enhances human capability.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder', 
    bio: 'Ex-AWS principal engineer, architect of billion-scale mobile platforms.',
    expertise: ['Mobile Architecture', 'Edge Infrastructure', 'DevOps'],
    image: '👨‍💻',
    achievement: 'Built systems handling 10M+ mobile requests/second',
    quote: 'Great mobile experiences require invisible infrastructure.'
  },
  {
    name: 'Alex Thompson',
    role: 'VP Mobile Engineering',
    bio: 'Mobile platform expert who led transformations at Fortune 500 companies.',
    expertise: ['Mobile Platforms', 'Developer Experience', 'Cross-platform'],
    image: '🧑‍💻',
    achievement: 'Reduced mobile deployment time by 80% across teams',
    quote: 'Mobile development should be fast, reliable, and joyful.'
  },
  {
    name: 'Dr. Priya Patel',
    role: 'Head of Mobile AI',
    bio: 'PhD in Computer Science from MIT, published researcher in mobile AI optimization.',
    expertise: ['Mobile ML', 'AI Optimization', 'Research'],
    image: '👩‍🔬',
    achievement: '50+ papers on mobile AI with 10K+ citations',
    quote: 'Mobile AI must be efficient, ethical, and accessible to all.'
  }
];

const mobileMilestones = [
  { 
    year: '2020', 
    event: 'Founded with vision to democratize mobile AI for enterprises',
    impact: 'Established mobile-first development philosophy',
    icon: '🌟'
  },
  { 
    year: '2021', 
    event: 'First major mobile transformation: Fortune 500 financial services',
    impact: '40% mobile performance improvement, 60% cost reduction',
    icon: '🏆'
  },
  { 
    year: '2022', 
    event: 'Expanded globally with mobile expertise centers in London and Singapore',
    impact: '24/7 mobile support across time zones, 50+ clients',
    icon: '🌏'
  },
  { 
    year: '2023', 
    event: 'Launched Mobile AI-Enhanced Orchestration platform',
    impact: 'Enabled edge-to-cloud AI for enterprise mobile apps',
    icon: '🧠'
  },
  { 
    year: '2024', 
    event: 'Achieved mobile AI leadership with 100+ successful deployments',
    impact: 'Industry recognition for mobile-first AI solutions',
    icon: '🚀'
  },
  { 
    year: '2025', 
    event: 'Setting standards for ethical mobile AI implementation',
    impact: 'Leading responsible mobile AI adoption worldwide',
    icon: '🛡️'
  }
];

export default function MobileAboutOptimized() {
  const [expandedValue, setExpandedValue] = useState<number | null>(null);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const toggleValue = (index: number) => {
    setExpandedValue(expandedValue === index ? null : index);
  };

  const toggleMilestone = (index: number) => {
    setActiveMilestone(activeMilestone === index ? null : index);
  };

  const handleTeamSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeTeamMember < mobileTeam.length - 1) {
      setActiveTeamMember(prev => prev + 1);
    } else if (direction === 'right' && activeTeamMember > 0) {
      setActiveTeamMember(prev => prev - 1);
    }
  };

  useEffect(() => {
    // Preload team member assets
    const preloadTeamAssets = () => {
      mobileTeam.forEach(member => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = `/about/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`;
        document.head.appendChild(link);
      });
    };
    preloadTeamAssets();
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
          className="absolute bottom-10 right-5 w-40 h-40 bg-tech-green/15 rounded-full blur-2xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative mobile-container">
          <motion.div 
            className="text-center"
            style={{ opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mobile-hero-text bg-gradient-to-r from-tech-green via-magenta to-tech-green bg-clip-text text-transparent mb-4">
              The Mobile AI Experts Behind Your Success
            </h1>
            <p className="mobile-subheading text-muted-foreground mb-6 leading-relaxed max-w-lg mx-auto">
              We're the enterprise mobile AI team helping Fortune 500s cut costs by 30% and deploy 5× faster with mobile-first solutions.
            </p>
            
            <div className="flex flex-col gap-3 mb-8">
              <Button 
                size="lg" 
                className="mobile-button-primary mobile-haptic-medium" 
                asChild
              >
                <Link href="/contact?type=mobile-executive&source=about">
                  Schedule Mobile Strategy Call
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="mobile-button-secondary mobile-haptic-light" 
                asChild
              >
                <Link href="/portfolio">View Mobile Results</Link>
              </Button>
            </div>

            {/* Mobile Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              {mobileStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="mobile-card-enhanced text-center mobile-haptic-light"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <MetricCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    className={`text-lg font-bold ${stat.color} mb-1`}
                    duration={1.5 + index * 0.3}
                  />
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Our Story */}
      <section className="mobile-section-enhanced">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mobile-subheading mb-4">Our Mobile-First Story</h2>
            <p className="mobile-body-text text-muted-foreground max-w-md mx-auto">
              Born from the belief that mobile AI should enhance human potential, not replace it.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-6 text-secondary-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mobile-card-enhanced">
              <p className="mobile-body-text leading-relaxed">
                Astro Intelligence was born from a simple observation: while AI and mobile technologies held immense promise, most enterprises struggled to implement them effectively, ethically, and at scale on mobile platforms.
              </p>
            </div>

            <div className="mobile-card-enhanced">
              <p className="mobile-body-text leading-relaxed">
                Our founders, having led transformative mobile projects at tech giants and witnessed both the potential and pitfalls of mobile AI, came together with a shared vision: to bridge the gap between cutting-edge mobile innovation and practical business value.
              </p>
            </div>

            <div className="mobile-card-enhanced">
              <p className="mobile-body-text leading-relaxed">
                What started as mobile AI consultancy quickly evolved into something more profound. We realized that true mobile transformation required not just technical expertise, but a fundamental rethinking of how technology serves human needs on the devices they use most.
              </p>
            </div>

            <div className="mobile-card-enhanced bg-gradient-to-r from-magenta/10 to-tech-green/10 border-tech-green/20">
              <p className="mobile-body-text leading-relaxed">
                This led us to develop our core philosophy: 
                <span className="text-magenta font-semibold block mt-2 text-center">
                  "Mobile Intelligence with Integrity"
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Values */}
      <section className="mobile-section-enhanced bg-gradient-to-r from-magenta/5 to-tech-green/5">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mobile-subheading mb-4">Our Mobile Values</h2>
            <p className="mobile-body-text text-muted-foreground max-w-md mx-auto">
              The principles that guide our mobile-first approach to AI and cloud solutions.
            </p>
          </motion.div>

          <div className="space-y-4">
            {mobileValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="mobile-card-enhanced mobile-haptic-light"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full text-left"
                  onClick={() => toggleValue(index)}
                  aria-expanded={expandedValue === index}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{value.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {value.title}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedValue === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-tech-green" />
                    </motion.div>
                  </div>
                </button>
                
                <p className="mobile-body-text text-muted-foreground mt-3 leading-relaxed">
                  {value.description}
                </p>

                <AnimatePresence>
                  {expandedValue === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-4 p-4 rounded-lg bg-gradient-to-r ${value.gradient} border border-tech-green/20`}>
                        <p className="mobile-body-text text-secondary-foreground leading-relaxed">
                          {value.expandedContent}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Team */}
      <section className="mobile-section-enhanced">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mobile-subheading mb-4">Mobile Leadership Team</h2>
            <p className="mobile-body-text text-muted-foreground max-w-md mx-auto">
              Visionaries and mobile experts united by passion for transformative mobile technology.
            </p>
          </motion.div>

          {/* Mobile Team Carousel */}
          <div className="relative">
            <div className="mobile-swipeable overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeTeamMember * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {mobileTeam.map((member, index) => (
                  <div key={member.name} className="w-full flex-shrink-0 px-2">
                    <motion.div
                      className="mobile-card-enhanced mobile-haptic-medium text-center"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-6xl mb-4">{member.image}</div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-magenta mb-2 font-semibold">
                        {member.role}
                      </p>
                      <p className="mobile-body-text text-muted-foreground mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                      
                      {/* Achievement Badge */}
                      <div className="bg-gradient-to-r from-tech-green/10 to-magenta/10 border border-tech-green/20 rounded-lg p-3 mb-4">
                        <p className="text-xs text-tech-green font-semibold mb-1">Key Achievement:</p>
                        <p className="text-sm text-secondary-foreground">
                          {member.achievement}
                        </p>
                      </div>

                      {/* Quote */}
                      <div className="bg-glass-subtle rounded-lg p-3 mb-4">
                        <p className="text-sm text-secondary-foreground italic">
                          "{member.quote}"
                        </p>
                      </div>

                      {/* Expertise */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Team Navigation */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                className="w-10 h-10 bg-glass-medium backdrop-blur-sm rounded-full flex items-center justify-center text-tech-green mobile-haptic-medium disabled:opacity-50"
                onClick={() => handleTeamSwipe('right')}
                disabled={activeTeamMember === 0}
                aria-label="Previous team member"
              >
                ←
              </button>

              <div className="flex gap-2">
                {mobileTeam.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all mobile-haptic-light ${
                      index === activeTeamMember 
                        ? 'bg-tech-green w-6' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    onClick={() => setActiveTeamMember(index)}
                    aria-label={`View team member ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="w-10 h-10 bg-glass-medium backdrop-blur-sm rounded-full flex items-center justify-center text-tech-green mobile-haptic-medium disabled:opacity-50"
                onClick={() => handleTeamSwipe('left')}
                disabled={activeTeamMember === mobileTeam.length - 1}
                aria-label="Next team member"
              >
                →
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="mobile-body-text text-muted-foreground mb-4">
                And 200+ talented mobile engineers, designers, and innovators worldwide
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  variant="secondary" 
                  className="mobile-button-secondary mobile-haptic-light" 
                  asChild
                >
                  <Link href="/careers">Join Our Mobile Team</Link>
                </Button>
                <Button 
                  className="mobile-button-primary mobile-haptic-medium" 
                  asChild
                >
                  <Link href="/contact?type=mobile-team-assessment&source=about">
                    Get Mobile Team Assessment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Timeline */}
      <section className="mobile-section-enhanced bg-gradient-to-r from-magenta/5 to-tech-green/5">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mobile-subheading mb-4">Our Mobile Journey</h2>
            <p className="mobile-body-text text-muted-foreground max-w-md mx-auto">
              From startup to mobile AI leader—see how we've grown while delivering consistent mobile results.
            </p>
          </motion.div>

          <div className="space-y-4">
            {mobileMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="mobile-card-enhanced mobile-haptic-light"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full text-left"
                  onClick={() => toggleMilestone(index)}
                  aria-expanded={activeMilestone === index}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-tech-green to-magenta rounded-full flex items-center justify-center text-black font-black text-sm">
                        {milestone.year}
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl mb-1">{milestone.icon}</div>
                        <p className="text-sm text-secondary-foreground">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeMilestone === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-tech-green" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {activeMilestone === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 ml-16 p-4 bg-gradient-to-r from-tech-green/10 to-magenta/10 border border-tech-green/20 rounded-lg">
                        <p className="text-sm text-tech-green font-semibold mb-1">Impact:</p>
                        <p className="mobile-body-text text-secondary-foreground">
                          {milestone.impact}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            <h2 className="mobile-subheading bg-gradient-to-r from-tech-green via-magenta to-tech-green bg-clip-text text-transparent mb-6">
              Ready to Lead Mobile Transformation?
            </h2>
            <p className="mobile-body-text mb-8 max-w-md mx-auto text-secondary-foreground">
              Let our proven mobile team help you achieve 30% cost reduction and 5× faster deployment on mobile platforms.
            </p>
            
            <div className="flex flex-col gap-4">
              <Button 
                size="lg" 
                className="mobile-button-primary mobile-haptic-medium" 
                asChild
              >
                <Link href="/contact?type=mobile-consultation&source=about">
                  Get Free Mobile Consultation
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
                <span>✓ 30-min mobile strategy session</span>
                <span>✓ Mobile ROI roadmap included</span>
              </div>
              <div className="flex justify-center gap-4">
                <span>✓ No obligation required</span>
                <span>✓ Mobile-first approach</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}