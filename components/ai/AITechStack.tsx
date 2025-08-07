'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Cloud, 
  Zap,
  Shield,
  Monitor,
  Brain,
  Globe,
  ChevronRight
} from 'lucide-react';
import { Heading, Text } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface TechCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  technologies: {
    name: string;
    logo?: string;
    description: string;
    status: 'production' | 'beta' | 'experimental';
    performance: number; // 1-5 stars
    integrations: number;
  }[];
}

interface AITechStackProps {
  className?: string;
  animated?: boolean;
}

export default function AITechStack({ className }: AITechStackProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ml-frameworks');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories: TechCategory[] = [
    {
      id: 'ml-frameworks',
      title: 'ML Frameworks',
      description: 'Core machine learning and deep learning frameworks',
      icon: <Brain className="h-5 w-5" />,
      color: 'text-blue-400',
      technologies: [
        {
          name: 'TensorFlow',
          description: 'Google\'s open-source ML platform for production',
          status: 'production',
          performance: 5,
          integrations: 47
        },
        {
          name: 'PyTorch',
          description: 'Facebook\'s dynamic neural network framework',
          status: 'production',
          performance: 5,
          integrations: 42
        },
        {
          name: 'Hugging Face Transformers',
          description: 'State-of-the-art NLP models and pipelines',
          status: 'production',
          performance: 5,
          integrations: 38
        },
        {
          name: 'Scikit-learn',
          description: 'Python ML library for classical algorithms',
          status: 'production',
          performance: 4,
          integrations: 35
        },
        {
          name: 'XGBoost',
          description: 'Optimized gradient boosting framework',
          status: 'production',
          performance: 5,
          integrations: 28
        },
        {
          name: 'JAX',
          description: 'High-performance ML research framework',
          status: 'beta',
          performance: 4,
          integrations: 12
        }
      ]
    },
    {
      id: 'cloud-platforms',
      title: 'Cloud & Infrastructure',
      description: 'Scalable cloud platforms and infrastructure services',
      icon: <Cloud className="h-5 w-5" />,
      color: 'text-green-400',
      technologies: [
        {
          name: 'AWS SageMaker',
          description: 'Fully managed ML platform on AWS',
          status: 'production',
          performance: 5,
          integrations: 52
        },
        {
          name: 'Google Cloud AI Platform',
          description: 'Google\'s enterprise AI and ML services',
          status: 'production',
          performance: 5,
          integrations: 45
        },
        {
          name: 'Azure Machine Learning',
          description: 'Microsoft\'s cloud-based ML service',
          status: 'production',
          performance: 4,
          integrations: 38
        },
        {
          name: 'NVIDIA Clara',
          description: 'Healthcare AI application framework',
          status: 'production',
          performance: 5,
          integrations: 18
        },
        {
          name: 'Kubernetes',
          description: 'Container orchestration for ML workflows',
          status: 'production',
          performance: 5,
          integrations: 67
        },
        {
          name: 'Apache Spark',
          description: 'Unified analytics engine for big data',
          status: 'production',
          performance: 4,
          integrations: 43
        }
      ]
    },
    {
      id: 'data-processing',
      title: 'Data & Analytics',
      description: 'Data processing, storage, and analytics tools',
      icon: <Database className="h-5 w-5" />,
      color: 'text-purple-400',
      technologies: [
        {
          name: 'Apache Kafka',
          description: 'Distributed event streaming platform',
          status: 'production',
          performance: 5,
          integrations: 58
        },
        {
          name: 'Elasticsearch',
          description: 'Distributed search and analytics engine',
          status: 'production',
          performance: 4,
          integrations: 41
        },
        {
          name: 'Redis',
          description: 'In-memory data structure store',
          status: 'production',
          performance: 5,
          integrations: 49
        },
        {
          name: 'Apache Airflow',
          description: 'Workflow orchestration platform',
          status: 'production',
          performance: 4,
          integrations: 32
        },
        {
          name: 'ClickHouse',
          description: 'Columnar database for analytics',
          status: 'production',
          performance: 5,
          integrations: 25
        },
        {
          name: 'Apache Flink',
          description: 'Stream processing framework',
          status: 'beta',
          performance: 4,
          integrations: 19
        }
      ]
    },
    {
      id: 'monitoring',
      title: 'MLOps & Monitoring',
      description: 'Model operations, monitoring, and deployment tools',
      icon: <Monitor className="h-5 w-5" />,
      color: 'text-orange-400',
      technologies: [
        {
          name: 'MLflow',
          description: 'Open source ML lifecycle management',
          status: 'production',
          performance: 4,
          integrations: 35
        },
        {
          name: 'Weights & Biases',
          description: 'Experiment tracking and model management',
          status: 'production',
          performance: 5,
          integrations: 28
        },
        {
          name: 'Kubeflow',
          description: 'ML workflows on Kubernetes',
          status: 'production',
          performance: 4,
          integrations: 23
        },
        {
          name: 'Prometheus',
          description: 'Monitoring and alerting toolkit',
          status: 'production',
          performance: 5,
          integrations: 67
        },
        {
          name: 'Grafana',
          description: 'Observability and data visualization',
          status: 'production',
          performance: 5,
          integrations: 54
        },
        {
          name: 'Seldon Core',
          description: 'ML deployment on Kubernetes',
          status: 'beta',
          performance: 4,
          integrations: 15
        }
      ]
    }
  ];

  const activeCategory_obj = categories.find(cat => cat.id === activeCategory);

  const getStatusColor = (status: 'production' | 'beta' | 'experimental') => {
    switch (status) {
      case 'production': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'beta': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'experimental': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={cn(
          "w-3 h-3 rounded-sm",
          i < rating ? "bg-yellow-400" : "bg-gray-600"
        )}
      />
    ));
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 mb-4">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <Text variant="caption" className="text-cyan-300 font-semibold">
              Technology Stack
            </Text>
          </div>
          
          <Heading as="h2" variant="display" className="comet-gradient-text mb-4">
            Cutting-Edge AI Infrastructure
          </Heading>
          
          <Text variant="body-large" hierarchy="muted" className="max-w-3xl mx-auto">
            Our technology stack represents the pinnacle of AI and ML tooling, 
            carefully selected for production reliability and cutting-edge capabilities.
          </Text>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Selection */}
        <div className="space-y-4">
          <Heading as="h3" variant="h6" className="mb-4">
            Technology Categories
          </Heading>
          
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 border-gray-800 bg-black/20 backdrop-blur-sm hover:border-gray-600 p-4",
                  activeCategory === category.id && "border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg bg-gray-900/50", category.color)}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <Text variant="body-small" className="font-semibold mb-1">
                      {category.title}
                    </Text>
                    <Text variant="caption" hierarchy="muted" className="text-xs">
                      {category.description}
                    </Text>
                  </div>
                  {activeCategory === category.id && (
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technology Showcase */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("p-2 rounded-lg bg-gray-900/50", activeCategory_obj?.color)}>
                  {activeCategory_obj?.icon}
                </div>
                <div>
                  <Heading as="h3" variant="h5">
                    {activeCategory_obj?.title}
                  </Heading>
                  <Text variant="body-small" hierarchy="muted">
                    {activeCategory_obj?.description}
                  </Text>
                </div>
              </div>

              <div className="grid gap-4">
                {activeCategory_obj?.technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredTech(tech.name)}
                    onHoverEnd={() => setHoveredTech(null)}
                  >
                    <Card className={cn(
                      "p-4 bg-gray-900/30 border-gray-700 backdrop-blur-sm hover:border-gray-600 transition-all duration-300",
                      hoveredTech === tech.name && "border-purple-500/50 bg-gradient-to-r from-purple-500/5 to-blue-500/5"
                    )}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Text variant="body-small" className="font-semibold">
                              {tech.name}
                            </Text>
                            <Badge 
                              variant="secondary" 
                              className={getStatusColor(tech.status)}
                            >
                              {tech.status}
                            </Badge>
                          </div>
                          
                          <Text variant="caption" hierarchy="muted" className="mb-3">
                            {tech.description}
                          </Text>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Text variant="caption" hierarchy="muted" className="text-xs">
                                Performance:
                              </Text>
                              <div className="flex gap-1">
                                {renderStars(tech.performance)}
                              </div>
                            </div>
                            
                            <Text variant="caption" hierarchy="muted" className="text-xs">
                              {tech.integrations} integrations
                            </Text>
                          </div>
                        </div>

                        {/* Performance indicator */}
                        <div className="text-right">
                          <div className={cn(
                            "inline-flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold",
                            tech.performance >= 5 ? "bg-green-500/20 text-green-400" :
                            tech.performance >= 4 ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-red-500/20 text-red-400"
                          )}>
                            {tech.performance}.0
                          </div>
                        </div>
                      </div>

                      {/* Expanded info on hover */}
                      <AnimatePresence>
                        {hoveredTech === tech.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 pt-3 border-t border-gray-700"
                          >
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <Shield className="h-4 w-4 mx-auto mb-1 text-green-400" />
                                <Text variant="caption" hierarchy="muted">
                                  Production Ready
                                </Text>
                              </div>
                              <div>
                                <Zap className="h-4 w-4 mx-auto mb-1 text-yellow-400" />
                                <Text variant="caption" hierarchy="muted">
                                  High Performance
                                </Text>
                              </div>
                              <div>
                                <Globe className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                                <Text variant="caption" hierarchy="muted">
                                  Enterprise Scale
                                </Text>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Category Summary */}
              <Card className="bg-gradient-to-r from-gray-900/50 to-black/30 border-gray-800 backdrop-blur-sm p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Text variant="body-large" className="font-bold text-purple-400">
                      {activeCategory_obj?.technologies.length}
                    </Text>
                    <Text variant="caption" hierarchy="muted">Technologies</Text>
                  </div>
                  <div>
                    <Text variant="body-large" className="font-bold text-green-400">
                      {activeCategory_obj?.technologies.filter(t => t.status === 'production').length}
                    </Text>
                    <Text variant="caption" hierarchy="muted">Production Ready</Text>
                  </div>
                  <div>
                    <Text variant="body-large" className="font-bold text-blue-400">
                      {activeCategory_obj?.technologies.reduce((acc, t) => acc + t.integrations, 0)}
                    </Text>
                    <Text variant="caption" hierarchy="muted">Total Integrations</Text>
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