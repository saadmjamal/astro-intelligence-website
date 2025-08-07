'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Clock, 
  Activity, 
  Brain, 
  Database,
  Target,
  ChevronRight
} from 'lucide-react';
import { Heading, Text } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface MetricData {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: React.ReactNode;
}

interface AIMetricsVisualizationProps {
  className?: string;
  animated?: boolean;
}

export default function AIMetricsVisualization({ 
  className, 
  animated = true 
}: AIMetricsVisualizationProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  // Simulated real-time metrics
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      label: 'Model Accuracy',
      value: 98.7,
      unit: '%',
      trend: 'up',
      color: 'text-green-400',
      icon: <Target className="h-5 w-5" />
    },
    {
      label: 'Response Time',
      value: 127,
      unit: 'ms',
      trend: 'down',
      color: 'text-blue-400',
      icon: <Zap className="h-5 w-5" />
    },
    {
      label: 'Requests/sec',
      value: 12847,
      unit: '',
      trend: 'up',
      color: 'text-purple-400',
      icon: <Activity className="h-5 w-5" />
    },
    {
      label: 'Models Deployed',
      value: 247,
      unit: '',
      trend: 'up',
      color: 'text-cyan-400',
      icon: <Brain className="h-5 w-5" />
    },
    {
      label: 'Data Processed',
      value: 45.2,
      unit: 'TB',
      trend: 'up',
      color: 'text-orange-400',
      icon: <Database className="h-5 w-5" />
    },
    {
      label: 'Uptime',
      value: 99.97,
      unit: '%',
      trend: 'stable',
      color: 'text-emerald-400',
      icon: <Clock className="h-5 w-5" />
    }
  ]);

  // Update metrics with realistic fluctuations
  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setMetrics(prev => prev.map(metric => {
        const variance = Math.random() * 4 - 2; // -2 to +2
        let newValue = metric.value;
        
        switch (metric.label) {
          case 'Model Accuracy':
            newValue = Math.max(95, Math.min(99.9, metric.value + variance * 0.1));
            break;
          case 'Response Time':
            newValue = Math.max(80, Math.min(200, metric.value + variance * 5));
            break;
          case 'Requests/sec':
            newValue = Math.max(8000, Math.min(15000, metric.value + variance * 200));
            break;
          case 'Models Deployed':
            // Models don't fluctuate rapidly
            newValue = metric.value;
            break;
          case 'Data Processed':
            newValue = Math.max(40, Math.min(50, metric.value + variance * 0.5));
            break;
          case 'Uptime':
            newValue = Math.max(99.9, Math.min(100, metric.value + variance * 0.001));
            break;
        }
        
        return {
          ...metric,
          value: parseFloat(newValue.toFixed(metric.unit === 'ms' ? 0 : 2))
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [animated]);

  const formatNumber = (num: number, unit: string) => {
    if (num >= 10000 && unit === '') {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-4">
            <BarChart3 className="h-4 w-4 text-purple-400" />
            <Text variant="caption" className="text-purple-300 font-semibold">
              Real-Time AI Metrics
            </Text>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          
          <Heading as="h2" variant="display" className="comet-gradient-text mb-4">
            Intelligence at Scale
          </Heading>
          
          <Text variant="body-large" hierarchy="muted" className="max-w-3xl mx-auto">
            Monitor our AI infrastructure in real-time. These metrics represent live performance 
            data from our production ML models serving millions of requests daily.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-400"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Last updated: {currentTime.toLocaleTimeString()}</span>
        </motion.div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setActiveMetric(index)}
              onHoverEnd={() => setActiveMetric(null)}
            >
              <Card className="relative overflow-hidden bg-black/20 border-gray-800 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5" />
                
                {/* Active Metric Glow */}
                <AnimatePresence>
                  {activeMetric === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2 rounded-lg bg-gray-900/50", metric.color)}>
                      {metric.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp 
                        className={cn(
                          "h-3 w-3",
                          metric.trend === 'up' ? 'text-green-400 rotate-0' :
                          metric.trend === 'down' ? 'text-red-400 rotate-180' :
                          'text-gray-400 rotate-90'
                        )} 
                      />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="space-y-1">
                    <motion.div
                      key={metric.value}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className={cn("text-3xl font-bold", metric.color)}>
                        {formatNumber(metric.value, metric.unit)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {metric.unit}
                      </span>
                    </motion.div>
                    
                    <Text variant="caption" hierarchy="muted" className="font-medium">
                      {metric.label}
                    </Text>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: metric.label === 'Model Accuracy' || metric.label === 'Uptime' 
                            ? `${metric.value}%` 
                            : `${Math.min(100, (metric.value / (metric.label === 'Response Time' ? 200 : 
                                metric.label === 'Requests/sec' ? 15000 : 
                                metric.label === 'Data Processed' ? 50 : 300)) * 100)}%`
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={cn(
                          "h-full rounded-full",
                          metric.color.replace('text-', 'bg-')
                        )}
                        style={{
                          boxShadow: `0 0 10px ${metric.color.includes('green') ? '#22c55e' :
                            metric.color.includes('blue') ? '#3b82f6' :
                            metric.color.includes('purple') ? '#a855f7' :
                            metric.color.includes('cyan') ? '#06b6d4' :
                            metric.color.includes('orange') ? '#f97316' :
                            '#10b981'}40`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Indicator */}
                <AnimatePresence>
                  {activeMetric === index && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-gray-900/50 to-black/30 border-gray-800 backdrop-blur-sm">
          <div className="p-6 text-center space-y-4">
            <Text variant="body-small" hierarchy="muted" className="uppercase tracking-wider">
              Platform Performance Summary
            </Text>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {metrics[0]?.value}%
                </div>
                <Text variant="caption" hierarchy="muted">Average Accuracy</Text>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {metrics[1]?.value}ms
                </div>
                <Text variant="caption" hierarchy="muted">Avg Response</Text>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {formatNumber(metrics[2]?.value || 0, '')}
                </div>
                <Text variant="caption" hierarchy="muted">Requests/sec</Text>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  {metrics[5]?.value}%
                </div>
                <Text variant="caption" hierarchy="muted">Uptime</Text>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}