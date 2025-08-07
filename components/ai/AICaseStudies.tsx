'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Heading, Text } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
    icon: React.ReactNode;
    color: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  technologies: string[];
  timeline: string;
  investment: string;
  roi: string;
  featured: boolean;
}

interface AICaseStudiesProps {
  className?: string;
}

export default function AICaseStudies({ className }: AICaseStudiesProps) {
  const [activeStudy, setActiveStudy] = useState(0);

  const caseStudies: CaseStudy[] = [
    {
      id: 'fintech-fraud',
      title: 'AI-Powered Fraud Detection System',
      client: 'Global FinTech Leader',
      industry: 'Financial Services',
      challenge: 'Processing 2M+ daily transactions with 15% false positive rate causing customer friction and $50M annual losses from fraud.',
      solution: 'Deployed real-time ML pipeline using ensemble methods, graph neural networks, and behavioral analytics with 99.7% uptime SLA.',
      results: [
        {
          metric: 'False Positives',
          value: '0.02%',
          improvement: '99.8% reduction',
          icon: <Target className="h-5 w-5" />,
          color: 'text-green-400'
        },
        {
          metric: 'Fraud Detection',
          value: '99.3%',
          improvement: '12.4% increase',
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'text-blue-400'
        },
        {
          metric: 'Annual Savings',
          value: '$47.2M',
          improvement: '94% fraud loss reduction',
          icon: <DollarSign className="h-5 w-5" />,
          color: 'text-emerald-400'
        },
        {
          metric: 'Response Time',
          value: '15ms',
          improvement: '85% faster processing',
          icon: <Zap className="h-5 w-5" />,
          color: 'text-yellow-400'
        }
      ],
      testimonial: {
        quote: "AstroIntelligence transformed our fraud detection capabilities. The 99.8% reduction in false positives has dramatically improved customer experience while saving us millions.",
        author: "Sarah Chen",
        role: "Chief Risk Officer",
        company: "Global FinTech Leader"
      },
      technologies: ['TensorFlow', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Kubernetes', 'Graph Neural Networks'],
      timeline: '4 months',
      investment: '$2.1M',
      roi: '2,247%',
      featured: true
    },
    {
      id: 'ecommerce-recommendation',
      title: 'Personalized Recommendation Engine',
      client: 'E-commerce Giant',
      industry: 'Retail Technology',
      challenge: 'Low conversion rates (2.3%) and poor customer engagement due to generic product recommendations across 50M+ users.',
      solution: 'Built hybrid recommendation system combining collaborative filtering, content-based filtering, and deep learning for real-time personalization.',
      results: [
        {
          metric: 'Conversion Rate',
          value: '8.7%',
          improvement: '278% increase',
          icon: <TrendingUp className="h-5 w-5" />,
          color: 'text-purple-400'
        },
        {
          metric: 'Revenue Increase',
          value: '$127M',
          improvement: 'Annual incremental revenue',
          icon: <DollarSign className="h-5 w-5" />,
          color: 'text-green-400'
        },
        {
          metric: 'User Engagement',
          value: '+156%',
          improvement: 'Time on site increase',
          icon: <Users className="h-5 w-5" />,
          color: 'text-cyan-400'
        },
        {
          metric: 'Click-through Rate',
          value: '12.4%',
          improvement: '340% improvement',
          icon: <Target className="h-5 w-5" />,
          color: 'text-orange-400'
        }
      ],
      testimonial: {
        quote: "The AI recommendation system has completely transformed our customer experience. We're seeing unprecedented engagement levels and our revenue has grown by over $127M annually.",
        author: "Michael Rodriguez",
        role: "VP of Engineering",
        company: "E-commerce Giant"
      },
      technologies: ['PyTorch', 'Apache Spark', 'Elasticsearch', 'Redis Cluster', 'Docker', 'Neural Collaborative Filtering'],
      timeline: '6 months',
      investment: '$3.8M',
      roi: '3,342%',
      featured: true
    },
    {
      id: 'healthcare-diagnostics',
      title: 'AI Medical Image Analysis',
      client: 'Healthcare Network',
      industry: 'Healthcare Technology',
      challenge: 'Radiologists overwhelmed with 40% increase in imaging studies, causing diagnosis delays and potential missed critical cases.',
      solution: 'Deployed computer vision models for automated screening and anomaly detection across CT, MRI, and X-ray imaging with radiologist oversight.',
      results: [
        {
          metric: 'Diagnostic Speed',
          value: '73%',
          improvement: 'Faster initial screening',
          icon: <Clock className="h-5 w-5" />,
          color: 'text-blue-400'
        },
        {
          metric: 'Accuracy Rate',
          value: '97.3%',
          improvement: '4.2% increase vs baseline',
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'text-green-400'
        },
        {
          metric: 'Patient Capacity',
          value: '+2,400',
          improvement: 'Additional patients/month',
          icon: <Users className="h-5 w-5" />,
          color: 'text-purple-400'
        },
        {
          metric: 'Cost Reduction',
          value: '$12.8M',
          improvement: 'Annual operational savings',
          icon: <DollarSign className="h-5 w-5" />,
          color: 'text-emerald-400'
        }
      ],
      testimonial: {
        quote: "This AI system has revolutionized our radiology department. We're now able to serve 40% more patients while maintaining the highest diagnostic accuracy standards.",
        author: "Dr. Emily Watson",
        role: "Chief Medical Officer",
        company: "Regional Healthcare Network"
      },
      technologies: ['TensorFlow Medical', 'DICOM Processing', 'NVIDIA Clara', 'Kubernetes', 'ResNet-50', 'PACS Integration'],
      timeline: '8 months',
      investment: '$4.5M',
      roi: '284%',
      featured: false
    }
  ];

  const activeCase = caseStudies[activeStudy];

  const nextStudy = () => {
    setActiveStudy((prev) => (prev + 1) % caseStudies.length);
  };

  const prevStudy = () => {
    setActiveStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-4">
            <Award className="h-4 w-4 text-green-400" />
            <Text variant="caption" className="text-green-300 font-semibold">
              Client Success Stories
            </Text>
          </div>
          
          <Heading as="h2" variant="display" className="comet-gradient-text mb-4">
            Transforming Industries with AI
          </Heading>
          
          <Text variant="body-large" hierarchy="muted" className="max-w-3xl mx-auto">
            Real results from real clients. See how our AI solutions have delivered 
            measurable impact across diverse industries and use cases.
          </Text>
        </motion.div>
      </div>

      {/* Case Study Navigation */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevStudy}
          className="border border-gray-700 hover:border-gray-600"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStudy(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeStudy === index 
                  ? "bg-purple-500 w-8" 
                  : "bg-gray-600 hover:bg-gray-500"
              )}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextStudy}
          className="border border-gray-700 hover:border-gray-600"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Active Case Study */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStudy}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/60 border-gray-700 backdrop-blur-sm overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Case Study Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {activeCase?.industry}
                    </Badge>
                    {activeCase?.featured && (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <Heading as="h3" variant="h4" className="mb-3">
                    {activeCase?.title}
                  </Heading>
                  
                  <Text variant="body-small" hierarchy="muted" className="mb-2">
                    <span className="font-semibold text-gray-300">Client:</span> {activeCase?.client}
                  </Text>

                  <div className="space-y-3">
                    <div>
                      <Text variant="body-small" className="font-semibold text-red-300 mb-1">
                        Challenge
                      </Text>
                      <Text variant="caption" hierarchy="muted">
                        {activeCase?.challenge}
                      </Text>
                    </div>
                    
                    <div>
                      <Text variant="body-small" className="font-semibold text-green-300 mb-1">
                        Solution
                      </Text>
                      <Text variant="caption" hierarchy="muted">
                        {activeCase?.solution}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <Clock className="h-5 w-5 mx-auto mb-2 text-blue-400" />
                      <Text variant="body-small" className="font-semibold text-blue-400">
                        {activeCase?.timeline}
                      </Text>
                      <Text variant="caption" hierarchy="muted">Timeline</Text>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <DollarSign className="h-5 w-5 mx-auto mb-2 text-green-400" />
                      <Text variant="body-small" className="font-semibold text-green-400">
                        {activeCase?.investment}
                      </Text>
                      <Text variant="caption" hierarchy="muted">Investment</Text>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <TrendingUp className="h-5 w-5 mx-auto mb-2 text-purple-400" />
                      <Text variant="body-small" className="font-semibold text-purple-400">
                        {activeCase?.roi}
                      </Text>
                      <Text variant="caption" hierarchy="muted">ROI</Text>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <Text variant="body-small" className="font-semibold mb-3">
                      Technologies Used
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      {activeCase?.technologies?.map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-gray-800/50 text-gray-300 border-gray-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div>
                <Heading as="h4" variant="h6" className="mb-6 text-center">
                  Measurable Results
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeCase?.results?.map((result, index) => (
                    <motion.div
                      key={result.metric}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="text-center p-6 bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-colors">
                        <div className={cn("inline-flex p-3 rounded-full mb-4", 
                          result.color.replace('text-', 'bg-').replace('400', '400/20'))}>
                          <div className={result.color}>
                            {result.icon}
                          </div>
                        </div>
                        <div className={cn("text-3xl font-bold mb-2", result.color)}>
                          {result.value}
                        </div>
                        <Text variant="body-small" className="font-medium mb-1">
                          {result.metric}
                        </Text>
                        <Text variant="caption" hierarchy="muted">
                          {result.improvement}
                        </Text>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 p-6">
                <div className="text-center space-y-4">
                  <Text variant="body-large" className="italic text-gray-200">
                    "{activeCase?.testimonial?.quote}"
                  </Text>
                  <div>
                    <Text variant="body-small" className="font-semibold text-white">
                      {activeCase?.testimonial?.author}
                    </Text>
                    <Text variant="caption" hierarchy="muted">
                      {activeCase?.testimonial?.role}, {activeCase?.testimonial?.company}
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center space-y-4"
      >
        <Text variant="body-large" hierarchy="muted">
          Ready to achieve similar results for your organization?
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact">
              Start Your AI Transformation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/services">
              Explore Our Services
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}