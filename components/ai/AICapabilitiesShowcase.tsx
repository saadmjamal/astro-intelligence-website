'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Eye, 
  MessageSquare, 
  BarChart3, 
  Zap,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { Heading, Text } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface AICapability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  demos: {
    title: string;
    description: string;
    example: string;
    metrics: {
      label: string;
      value: string;
    }[];
  }[];
}

interface AICapabilitiesShowcaseProps {
  className?: string;
}

export default function AICapabilitiesShowcase({ className }: AICapabilitiesShowcaseProps) {
  const [activeCapability, setActiveCapability] = useState(0);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const capabilities: AICapability[] = [
    {
      id: 'nlp',
      title: 'Natural Language Processing',
      description: 'Advanced text understanding, generation, and conversation AI',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'text-blue-400',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      demos: [
        {
          title: 'Sentiment Analysis',
          description: 'Real-time emotion and sentiment detection',
          example: 'Input: "This product exceeded all my expectations!"\nOutput: Positive (96.3% confidence) - Joy, Satisfaction',
          metrics: [
            { label: 'Accuracy', value: '96.3%' },
            { label: 'Speed', value: '23ms' },
            { label: 'Languages', value: '47' }
          ]
        },
        {
          title: 'Text Summarization',
          description: 'Extract key insights from large documents',
          example: 'Processed 15-page report → Generated 3 key insights + action items in 0.8 seconds',
          metrics: [
            { label: 'Compression', value: '85%' },
            { label: 'Accuracy', value: '94.1%' },
            { label: 'Processing', value: '800ms' }
          ]
        },
        {
          title: 'Code Generation',
          description: 'Generate production-ready code from descriptions',
          example: 'Input: "Create a REST API for user authentication"\nOutput: Complete Node.js + TypeScript implementation',
          metrics: [
            { label: 'Success Rate', value: '92%' },
            { label: 'Languages', value: '15+' },
            { label: 'Frameworks', value: '25+' }
          ]
        }
      ]
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      description: 'Advanced image and video analysis, object detection, and recognition',
      icon: <Eye className="h-6 w-6" />,
      color: 'text-purple-400',
      gradient: 'from-purple-500/20 to-pink-500/20',
      demos: [
        {
          title: 'Object Detection',
          description: 'Real-time identification and classification of objects',
          example: 'Detected: 47 objects, 12 people, 3 vehicles, 8 signs (confidence: 98.7%)',
          metrics: [
            { label: 'mAP Score', value: '84.2%' },
            { label: 'FPS', value: '60' },
            { label: 'Objects', value: '10K+' }
          ]
        },
        {
          title: 'Medical Imaging',
          description: 'Advanced medical image analysis and diagnostics',
          example: 'Analyzed chest X-ray: No anomalies detected (94.8% confidence)',
          metrics: [
            { label: 'Accuracy', value: '97.3%' },
            { label: 'Sensitivity', value: '95.1%' },
            { label: 'Specificity', value: '98.2%' }
          ]
        },
        {
          title: 'Quality Control',
          description: 'Automated defect detection in manufacturing',
          example: 'Scanned 1000 units: 3 defects detected, 0 false positives',
          metrics: [
            { label: 'Detection Rate', value: '99.7%' },
            { label: 'False Positive', value: '0.1%' },
            { label: 'Speed', value: '50ms/item' }
          ]
        }
      ]
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description: 'Custom ML models, predictive analytics, and automated decision making',
      icon: <Brain className="h-6 w-6" />,
      color: 'text-green-400',
      gradient: 'from-green-500/20 to-emerald-500/20',
      demos: [
        {
          title: 'Predictive Analytics',
          description: 'Forecast trends and behaviors with high accuracy',
          example: 'Predicted customer churn: 847 at-risk customers identified (89.2% accuracy)',
          metrics: [
            { label: 'Accuracy', value: '89.2%' },
            { label: 'Precision', value: '91.7%' },
            { label: 'Recall', value: '87.3%' }
          ]
        },
        {
          title: 'Fraud Detection',
          description: 'Real-time transaction monitoring and risk assessment',
          example: 'Processed 1.2M transactions: 127 fraudulent cases blocked (0 false positives)',
          metrics: [
            { label: 'Detection Rate', value: '99.3%' },
            { label: 'False Positive', value: '0.02%' },
            { label: 'Response Time', value: '15ms' }
          ]
        },
        {
          title: 'Recommendation Engine',
          description: 'Personalized recommendations using collaborative filtering',
          example: 'Generated 10M+ personalized recommendations, 34% conversion increase',
          metrics: [
            { label: 'Click Rate', value: '12.4%' },
            { label: 'Conversion', value: '+34%' },
            { label: 'Relevance', value: '92.8%' }
          ]
        }
      ]
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'Advanced data processing, pattern recognition, and business intelligence',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-orange-400',
      gradient: 'from-orange-500/20 to-red-500/20',
      demos: [
        {
          title: 'Real-time Analytics',
          description: 'Process massive data streams with sub-second latency',
          example: 'Processing 2.3M events/sec: Anomaly detected in user behavior patterns',
          metrics: [
            { label: 'Throughput', value: '2.3M/sec' },
            { label: 'Latency', value: '12ms' },
            { label: 'Accuracy', value: '94.7%' }
          ]
        },
        {
          title: 'Business Intelligence',
          description: 'Automated insights and strategic recommendations',
          example: 'Analyzed Q4 data: Revenue opportunity of $2.4M identified in untapped segments',
          metrics: [
            { label: 'Data Sources', value: '47' },
            { label: 'Insights/day', value: '156' },
            { label: 'Accuracy', value: '91.3%' }
          ]
        },
        {
          title: 'Anomaly Detection',
          description: 'Identify unusual patterns and potential issues',
          example: 'System health monitoring: 3 performance anomalies detected before impact',
          metrics: [
            { label: 'Detection Time', value: '2.3min' },
            { label: 'Precision', value: '96.1%' },
            { label: 'Recall', value: '93.8%' }
          ]
        }
      ]
    }
  ];

  const activeDemo = capabilities[activeCapability]?.demos[activeDemoIndex];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-4">
            <Zap className="h-4 w-4 text-blue-400" />
            <Text variant="caption" className="text-blue-300 font-semibold">
              AI Capabilities Demo
            </Text>
          </div>
          
          <Heading as="h2" variant="display" className="comet-gradient-text mb-4">
            Advanced AI in Action
          </Heading>
          
          <Text variant="body-large" hierarchy="muted" className="max-w-3xl mx-auto">
            Experience our cutting-edge AI capabilities through interactive demonstrations. 
            Each system is battle-tested in production environments.
          </Text>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Capability Selection */}
        <div className="lg:col-span-4 space-y-4">
          <Heading as="h3" variant="h5" className="mb-4">
            Select Capability
          </Heading>
          
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 border-gray-800 bg-black/20 backdrop-blur-sm hover:border-gray-600",
                  activeCapability === index && "border-purple-500/50 bg-gradient-to-r " + capability.gradient
                )}
                onClick={() => {
                  setActiveCapability(index);
                  setActiveDemoIndex(0);
                }}
              >
                <div className="p-4 flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg bg-gray-900/50", capability.color)}>
                    {capability.icon}
                  </div>
                  <div className="flex-1">
                    <Text variant="body-small" className="font-semibold mb-1">
                      {capability.title}
                    </Text>
                    <Text variant="caption" hierarchy="muted" className="text-xs">
                      {capability.description}
                    </Text>
                  </div>
                  {activeCapability === index && (
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Demo Showcase */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCapability}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Demo Controls */}
              <div className="flex items-center justify-between">
                <Heading as="h3" variant="h5">
                  {capabilities[activeCapability]?.title} Demos
                </Heading>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                </div>
              </div>

              {/* Demo Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {capabilities[activeCapability]?.demos.map((demo, index) => (
                  <Button
                    key={index}
                    variant={activeDemoIndex === index ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveDemoIndex(index)}
                    className="whitespace-nowrap"
                  >
                    {demo.title}
                  </Button>
                ))}
              </div>

              {/* Active Demo */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/60 border-gray-700 backdrop-blur-sm">
                <div className="p-6 space-y-6">
                  <div>
                    <Heading as="h4" variant="h6" className="mb-2">
                      {activeDemo?.title}
                    </Heading>
                    <Text variant="body-small" hierarchy="muted">
                      {activeDemo?.description}
                    </Text>
                  </div>

                  {/* Demo Example */}
                  <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-green-400">
                      {activeDemo?.example}
                    </pre>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {activeDemo?.metrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-center p-3 bg-gray-800/30 rounded-lg"
                      >
                        <div className={cn("text-xl font-bold mb-1", capabilities[activeCapability]?.color)}>
                          {metric.value}
                        </div>
                        <Text variant="caption" hierarchy="muted">
                          {metric.label}
                        </Text>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}