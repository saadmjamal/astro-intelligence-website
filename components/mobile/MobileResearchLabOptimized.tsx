'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Calendar, 
  Users, 
  Tag, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

// Mobile-optimized research data
const mobileStats = [
  { value: 24, label: 'Research Papers', icon: '📄', color: 'text-tech-green' },
  { value: 15, label: 'Open Source', icon: '🔓', color: 'text-magenta' },
  { value: 87, label: 'Contributors', icon: '👥', color: 'text-tech-green' },
  { value: 5, label: 'Live Demos', icon: '🎮', color: 'text-magenta' }
];

const mobileResearch = [
  {
    id: 'ai-optimization',
    title: 'AI Code Completion',
    category: 'AI/ML',
    date: '2024-12-01',
    authors: ['Dr. Chen', 'M. Rodriguez'],
    abstract: 'Revolutionary AI-powered code completion improving developer productivity by 45%.',
    tags: ['AI', 'Developer Tools', 'Productivity'],
    readTime: '8 min',
    difficulty: 'Intermediate',
    demoAvailable: true,
    impact: 'High',
    downloads: '2.3K'
  },
  {
    id: 'vector-search',
    title: 'Vector Search Optimization', 
    category: 'Data Science',
    date: '2024-11-15',
    authors: ['Dr. Patel', 'A. Thompson'],
    abstract: 'Advanced vector search algorithms reducing query time by 60% in large datasets.',
    tags: ['Vector DB', 'Search', 'Performance'],
    readTime: '12 min',
    difficulty: 'Advanced',
    demoAvailable: true,
    impact: 'Critical',
    downloads: '1.8K'
  },
  {
    id: 'mobile-ml',
    title: 'Mobile ML Inference',
    category: 'Edge Computing',
    date: '2024-10-28',
    authors: ['Team Research'],
    abstract: 'Optimized machine learning inference for mobile devices with 70% battery improvement.',
    tags: ['Mobile', 'ML', 'Edge', 'Performance'],
    readTime: '6 min',
    difficulty: 'Beginner',
    demoAvailable: true,
    impact: 'High',
    downloads: '3.1K'
  }
];

const interactiveDemos = [
  {
    id: 'code-completion',
    title: 'AI Code Assistant',
    description: 'Experience intelligent code completion',
    type: 'Interactive',
    status: 'Live',
    users: '1.2K active'
  },
  {
    id: 'vector-search',
    title: 'Vector Search Engine',
    description: 'Real-time semantic search demo',
    type: 'Simulation',
    status: 'Beta', 
    users: '856 testing'
  },
  {
    id: 'mobile-inference',
    title: 'Edge ML Playground',
    description: 'Mobile-optimized ML models',
    type: 'Playground',
    status: 'Live',
    users: '2.1K experimenting'
  }
];

const researchCategories = ['All', 'AI/ML', 'Data Science', 'Edge Computing', 'Platform Engineering'];

export default function MobileResearchLabOptimized() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDemo, setSelectedDemo] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const filteredResearch = activeCategory === 'All' 
    ? mobileResearch 
    : mobileResearch.filter(item => item.category === activeCategory);

  // Touch gesture handling for demos
  const handleDemoSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && selectedDemo < interactiveDemos.length - 1) {
      setSelectedDemo(prev => prev + 1);
    } else if (direction === 'right' && selectedDemo > 0) {
      setSelectedDemo(prev => prev - 1);
    }
  };

  // Demo interaction
  const toggleDemo = () => {
    setDemoPlaying(!demoPlaying);
  };

  useEffect(() => {
    // Preload demo assets for smooth mobile experience
    const preloadDemoAssets = () => {
      interactiveDemos.forEach(demo => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = `/lab/demos/${demo.id}`;
        document.head.appendChild(link);
      });
    };
    preloadDemoAssets();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen mobile-optimized">
      {/* Mobile Hero Section */}
      <section className="relative overflow-hidden mobile-section-enhanced">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />
          <motion.div 
            className="absolute top-10 left-5 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
            style={{ y }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-10 right-5 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"
            style={{ y: useTransform(scrollYProgress, [0, 1], [-15, 15]) }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="mobile-container relative z-10">
          <motion.div 
            className="text-center"
            style={{ opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Brain className="h-12 w-12 text-primary" />
                <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-purple-500 animate-pulse" />
              </div>
            </div>
            
            <h1 className="mobile-hero-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Astro Research Lab
            </h1>
            <p className="mobile-subheading text-muted-foreground mb-6 leading-relaxed">
              Advancing AI and cloud technology through 
              <span className="text-foreground font-semibold"> open research</span> and 
              <span className="text-foreground font-semibold"> mobile innovation</span>
            </p>
            
            {/* Mobile Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
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
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}+</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                size="lg" 
                className="mobile-button-primary mobile-haptic-medium group" 
                asChild
              >
                <Link href="#mobile-demos">
                  Try Interactive Demos
                  <Zap className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="mobile-button-secondary mobile-haptic-light" 
                asChild
              >
                <Link href="#mobile-research">View Research</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Interactive Demos */}
      <section id="mobile-demos" className="mobile-section-enhanced bg-gradient-to-r from-primary/5 to-purple-500/5">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mobile-subheading mb-4">Interactive Demos</h2>
            <p className="mobile-body-text text-muted-foreground max-w-md mx-auto">
              Experience our research in action with touch-optimized interactive demos.
            </p>
          </motion.div>

          {/* Mobile Demo Carousel */}
          <div className="relative">
            <div className="mobile-swipeable overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${selectedDemo * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {interactiveDemos.map((demo, index) => (
                  <div key={demo.id} className="w-full flex-shrink-0 px-2">
                    <motion.div
                      className="mobile-card-enhanced mobile-haptic-medium relative"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Demo Status */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge 
                          variant={demo.status === 'Live' ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {demo.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {demo.users}
                        </span>
                      </div>

                      {/* Demo Preview Area */}
                      <div className="h-32 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        {/* Animated background for demo */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                          animate={{ 
                            x: demoPlaying && index === selectedDemo ? ['-100%', '100%'] : '0%' 
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: demoPlaying && index === selectedDemo ? Infinity : 0,
                            ease: "linear" 
                          }}
                        />
                        
                        {/* Play/Pause Button */}
                        <button
                          className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary mobile-haptic-medium z-10"
                          onClick={toggleDemo}
                          aria-label={demoPlaying ? "Pause demo" : "Play demo"}
                        >
                          {demoPlaying && index === selectedDemo ? 
                            <Pause className="h-5 w-5" /> : 
                            <Play className="h-5 w-5 ml-0.5" />
                          }
                        </button>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">
                        {demo.title}
                      </h3>
                      <p className="mobile-body-text text-muted-foreground mb-4">
                        {demo.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {demo.type}
                        </span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="mobile-haptic-light"
                          asChild
                        >
                          <Link href={`/lab/demos/${demo.id}`}>
                            Try Demo <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Demo Navigation */}
            <div className="flex justify-between items-center mt-6">
              <button
                className="w-10 h-10 bg-glass-medium backdrop-blur-sm rounded-full flex items-center justify-center text-primary mobile-haptic-medium disabled:opacity-50"
                onClick={() => handleDemoSwipe('right')}
                disabled={selectedDemo === 0}
                aria-label="Previous demo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {interactiveDemos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all mobile-haptic-light ${
                      index === selectedDemo 
                        ? 'bg-primary w-6' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    onClick={() => setSelectedDemo(index)}
                    aria-label={`View demo ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="w-10 h-10 bg-glass-medium backdrop-blur-sm rounded-full flex items-center justify-center text-primary mobile-haptic-medium disabled:opacity-50"
                onClick={() => handleDemoSwipe('left')}
                disabled={selectedDemo === interactiveDemos.length - 1}
                aria-label="Next demo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Research Papers */}
      <section id="mobile-research" className="mobile-section-enhanced">
        <div className="mobile-container">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mobile-subheading mb-4">Latest Research</h2>
            <p className="mobile-body-text text-muted-foreground max-w-md mx-auto">
              Mobile-optimized access to our latest research findings and innovations.
            </p>
          </motion.div>
          
          {/* Mobile Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {researchCategories.map((category) => {
              const count = category === 'All' 
                ? mobileResearch.length 
                : mobileResearch.filter(r => r.category === category).length;
              
              return (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="mobile-haptic-light text-xs"
                  disabled={count === 0}
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>

          {/* Mobile Research Grid */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredResearch.map((research, index) => (
                <motion.div
                  key={research.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="mobile-card-enhanced mobile-haptic-light">
                    <div className="flex flex-col">
                      {/* Research Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {research.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                research.impact === 'Critical' 
                                  ? 'border-red-500 text-red-400' 
                                  : research.impact === 'High' 
                                  ? 'border-orange-500 text-orange-400'
                                  : 'border-green-500 text-green-400'
                              }`}
                            >
                              {research.impact}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {research.title}
                          </h3>
                        </div>
                        {research.demoAvailable && (
                          <div className="text-primary text-xl">🎮</div>
                        )}
                      </div>
                      
                      <p className="mobile-body-text text-muted-foreground mb-4">
                        {research.abstract}
                      </p>

                      {/* Research Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(research.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {research.authors.join(', ')}
                          </div>
                        </div>
                        <div className="text-primary font-medium">
                          {research.downloads} downloads
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {research.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {research.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{research.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 mobile-haptic-light" 
                          asChild
                        >
                          <Link href={`/lab/research/${research.id}`}>
                            Read Paper <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                        {research.demoAvailable && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mobile-haptic-light" 
                            asChild
                          >
                            <Link href={`/lab/demos/${research.id}`}>
                              Demo
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Mobile CTA Section */}
      <section className="mobile-section-enhanced bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="mobile-container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mobile-subheading mb-4">Join Our Research Community</h2>
            <p className="mobile-body-text text-muted-foreground mb-8 max-w-md mx-auto">
              Collaborate with talented researchers and engineers pushing the boundaries of mobile AI and cloud technology.
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                size="lg" 
                className="mobile-button-primary mobile-haptic-medium" 
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="mobile-button-secondary mobile-haptic-light" 
                asChild
              >
                <a href="https://github.com/astrointelligence" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}