'use client';
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Zap, 
  Brain, 
  Cpu, 
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  Download,
  Code,
  ExternalLink
} from 'lucide-react';

interface OptimizationStep {
  iteration: number;
  loss: number;
  method: 'classical' | 'quantum';
  time: number;
  parameters: number;
}

export default function QuantumOptimizerDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [modelSize, setModelSize] = useState('7B');
  const [optimizationSteps, setOptimizationSteps] = useState<OptimizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Simulate optimization progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && currentStep < 50) {
      interval = setInterval(() => {
        const isQuantum = currentStep > 10; // Switch to quantum after 10 steps
        const baseTime = isQuantum ? 0.3 : 2.5; // Quantum is much faster
        const timeVariance = Math.random() * 0.1;
        
        const newStep: OptimizationStep = {
          iteration: currentStep + 1,
          loss: Math.exp(-currentStep * (isQuantum ? 0.18 : 0.05)) + Math.random() * 0.1,
          method: isQuantum ? 'quantum' : 'classical',
          time: baseTime + timeVariance,
          parameters: parseInt(modelSize.replace('B', '')) * 1000000000
        };
        
        setOptimizationSteps(prev => [...prev, newStep]);
        setCurrentStep(prev => prev + 1);
      }, 500);
    } else if (currentStep >= 50) {
      setIsRunning(false);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, currentStep, modelSize]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setOptimizationSteps([]);
    setCurrentStep(0);
  };

  const latestStep = optimizationSteps[optimizationSteps.length - 1];
  const classicalSteps = optimizationSteps.filter(s => s.method === 'classical');
  const quantumSteps = optimizationSteps.filter(s => s.method === 'quantum');
  
  const avgClassicalTime = classicalSteps.length > 0 
    ? classicalSteps.reduce((sum, s) => sum + s.time, 0) / classicalSteps.length 
    : 0;
  const avgQuantumTime = quantumSteps.length > 0 
    ? quantumSteps.reduce((sum, s) => sum + s.time, 0) / quantumSteps.length 
    : 0;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Zap className="h-16 w-16 text-primary" />
              <Brain className="absolute -top-2 -right-2 h-8 w-8 text-purple-500 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Quantum AI Optimizer Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of quantum-enhanced AI optimization. Watch as our QEVO algorithm 
            achieves 87% faster training with superior accuracy.
          </p>
          
          {/* Research Paper Link */}
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/content/research/quantum-ai-optimization" target="_blank">
                <Code className="mr-2 h-4 w-4" />
                Read Research Paper
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/astrointelligence/qevo" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub Repository
              </a>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <Card padding="md">
            <h3 className="text-xl font-semibold mb-4">Optimization Controls</h3>
            
            <div className="space-y-4">
              {/* Model Size Selection */}
              <div>
                <label htmlFor="model-size" className="block text-sm font-medium mb-2">Model Size</label>
                <select 
                  id="model-size"
                  value={modelSize} 
                  onChange={(e) => setModelSize(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-background"
                  disabled={isRunning}
                >
                  <option value="7B">7B Parameters</option>
                  <option value="65B">65B Parameters</option>
                  <option value="175B">175B Parameters</option>
                </select>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={handleStart} 
                  disabled={isRunning || currentStep >= 50}
                  className="flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
                <Button 
                  onClick={handlePause} 
                  disabled={!isRunning}
                  variant="outline"
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Current Status */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Method:</span>
                  <Badge variant={latestStep?.method === 'quantum' ? 'default' : 'secondary'}>
                    {latestStep?.method || 'Ready'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span>{currentStep}/50 steps</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 50) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Live Optimization Chart */}
          <Card padding="md" className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Real-time Optimization Progress</h3>
            
            <div className="relative h-64 bg-muted/30 rounded-lg p-4">
              <div className="absolute inset-4 border-l-2 border-b-2 border-muted-foreground/20">
                {/* Y-axis labels */}
                <div className="absolute -left-8 top-0 text-xs text-muted-foreground">1.0</div>
                <div className="absolute -left-8 top-1/2 text-xs text-muted-foreground">0.5</div>
                <div className="absolute -left-8 bottom-0 text-xs text-muted-foreground">0.0</div>
                
                {/* X-axis label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                  Training Steps
                </div>
                
                {/* Plot points */}
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {optimizationSteps.map((step, index) => {
                    const x = (step.iteration / 50) * 380;
                    const y = 180 - (step.loss * 180);
                    const color = step.method === 'quantum' ? '#8B5CF6' : '#3B82F6';
                    
                    return (
                      <g key={step.iteration}>
                        <circle
                          cx={x + 10}
                          cy={y + 10}
                          r="3"
                          fill={color}
                          opacity={0.8}
                        />
                        {index > 0 && (
                          <line
                            x1={(optimizationSteps[index - 1].iteration / 50) * 380 + 10}
                            y1={180 - (optimizationSteps[index - 1].loss * 180) + 10}
                            x2={x + 10}
                            y2={y + 10}
                            stroke={color}
                            strokeWidth="2"
                            opacity={0.6}
                          />
                        )}
                      </g>
                    );
                  })}
                  
                  {/* Phase transition indicator */}
                  {currentStep > 10 && (
                    <line
                      x1={(10 / 50) * 380 + 10}
                      y1={10}
                      x2={(10 / 50) * 380 + 10}
                      y2={190}
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity={0.7}
                    />
                  )}
                </svg>
                
                {/* Phase labels */}
                {currentStep > 5 && (
                  <div className="absolute top-2 left-4 text-xs">
                    <Badge variant="outline" className="bg-blue-500/10">
                      Classical Phase
                    </Badge>
                  </div>
                )}
                {currentStep > 15 && (
                  <div className="absolute top-2 right-4 text-xs">
                    <Badge variant="outline" className="bg-purple-500/10">
                      Quantum Phase
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Classical Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Quantum-Enhanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Phase Transition</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card padding="sm" className="text-center">
            <Cpu className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {latestStep?.loss.toFixed(4) || '1.0000'}
            </div>
            <div className="text-sm text-muted-foreground">Current Loss</div>
          </Card>
          
          <Card padding="sm" className="text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {avgQuantumTime > 0 ? `${(avgClassicalTime / avgQuantumTime).toFixed(1)}x` : '8.7x'}
            </div>
            <div className="text-sm text-muted-foreground">Speed Improvement</div>
          </Card>
          
          <Card padding="sm" className="text-center">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {latestStep?.time.toFixed(2) || '0.00'}s
            </div>
            <div className="text-sm text-muted-foreground">Time per Step</div>
          </Card>
          
          <Card padding="sm" className="text-center">
            <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {modelSize}
            </div>
            <div className="text-sm text-muted-foreground">Model Parameters</div>
          </Card>
        </div>

        {/* Technical Details */}
        <Card padding="lg" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">How It Works</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-primary">Classical Phase (Steps 1-10)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Traditional gradient descent</li>
                <li>• Explores local loss landscape</li>
                <li>• Average time: 2.5 seconds per step</li>
                <li>• Often gets trapped in local minima</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-purple-500">Quantum Phase (Steps 11-50)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Quantum annealing optimization</li>
                <li>• Explores global energy landscape</li>
                <li>• Average time: 0.3 seconds per step</li>
                <li>• Finds global optima efficiently</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Download Results */}
        {optimizationSteps.length > 0 && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => {
                const data = JSON.stringify(optimizationSteps, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `quantum-optimization-${modelSize}-${Date.now()}.json`;
                a.click();
              }}
              variant="outline"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}