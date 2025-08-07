import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Brain,
  BarChart3, 
  ArrowRight, 
  Play,
  Users,
  Award,
  Target,
  Rocket,
  ChevronDown
} from 'lucide-react';
import { Heading, Text } from '@/components/ui/Typography';
import { Section, SectionHeader, SectionContent } from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import ChatInterface from '@/components/ai/ChatInterface';
import RecommendationEngine from '@/components/ai/RecommendationEngine';
import ContentGenerator from '@/components/ai/ContentGenerator';
import AIMetricsVisualization from '@/components/ai/AIMetricsVisualization';
import CosmicParticleField from '@/components/ai/CosmicParticleField';
import AICapabilitiesShowcase from '@/components/ai/AICapabilitiesShowcase';
import AICaseStudies from '@/components/ai/AICaseStudies';
import AITechStack from '@/components/ai/AITechStack';

export const metadata: Metadata = {
  title: 'AI Intelligence Platform | AstroIntelligence - Advanced AI Solutions',
  description: 'Experience cutting-edge AI solutions with real-time metrics, interactive demos, and proven results. Transform your business with our advanced ML models, computer vision, and natural language processing capabilities.',
  keywords: 'AI solutions, machine learning, computer vision, NLP, artificial intelligence, ML models, AI metrics, deep learning, neural networks, AI automation',
};

export default function AIPage() {
  return (
    <div className="min-h-screen bg-comet-black">
      {/* Revolutionary Hero Section */}
      <Section size="xl" className="relative overflow-hidden min-h-screen flex items-center">
        {/* Cosmic Background */}
        <div className="absolute inset-0">
          <CosmicParticleField particleCount={80} />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(147,51,234,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(147,51,234,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        <div className="relative z-10 w-full">
          <SectionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              {/* Hero Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <Text variant="caption" className="text-purple-300 font-semibold tracking-wide">
                      NEXT-GENERATION AI PLATFORM
                    </Text>
                  </div>

                  {/* Main Headline */}
                  <div className="space-y-4">
                    <Heading 
                      as="h1" 
                      className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tight comet-gradient-text"
                    >
                      Intelligence 
                      <br />
                      <span className="relative">
                        Unleashed
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-2xl opacity-30 animate-pulse" />
                      </span>
                    </Heading>

                    <Text variant="body-large" className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                      Transform your business with cutting-edge AI solutions. Experience 
                      <span className="text-cyan-400 font-semibold"> real-time intelligence</span>, 
                      <span className="text-purple-400 font-semibold"> predictive analytics</span>, and 
                      <span className="text-green-400 font-semibold"> autonomous decision making</span> 
                      at unprecedented scale.
                    </Text>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">99.7%</div>
                      <Text variant="caption" hierarchy="muted">Model Accuracy</Text>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-1">&lt;50ms</div>
                      <Text variant="caption" hierarchy="muted">Response Time</Text>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-1">247</div>
                      <Text variant="caption" hierarchy="muted">Models Deployed</Text>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                    asChild
                  >
                    <Link href="#demo">
                      <Play className="h-5 w-5 mr-2" />
                      Experience AI Demo
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/10 px-8 py-4"
                    asChild
                  >
                    <Link href="#metrics">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      View Live Metrics
                    </Link>
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <Text variant="caption" hierarchy="muted">
                      Trusted by 500+ enterprises
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <Text variant="caption" hierarchy="muted">
                      Industry leader in AI innovation
                    </Text>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="relative z-10">
                  <Card className="bg-gradient-to-br from-gray-900/80 to-black/60 border-gray-700 backdrop-blur-xl p-8 shadow-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                          <Text variant="caption" className="text-green-400 font-semibold">
                            AI SYSTEM ACTIVE
                          </Text>
                        </div>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          Real-time
                        </Badge>
                      </div>

                      {/* Simulated AI Interface */}
                      <div className="space-y-4 font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <div className="text-cyan-400">$</div>
                          <div className="text-gray-300">initializing neural networks...</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-green-400">✓</div>
                          <div className="text-gray-300">247 models loaded successfully</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-blue-400">◇</div>
                          <div className="text-gray-300">processing 12.4K requests/sec</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-purple-400">⚡</div>
                          <div className="text-gray-300">anomaly detected in sector 7</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-yellow-400">⟳</div>
                          <div className="text-gray-300">auto-scaling to handle load spike</div>
                        </div>
                      </div>

                      {/* Mini Metrics */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                        <div>
                          <div className="text-lg font-bold text-green-400">99.97%</div>
                          <Text variant="caption" hierarchy="muted">Uptime</Text>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-400">47.2TB</div>
                          <Text variant="caption" hierarchy="muted">Data Processed</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-3xl" />
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-8 w-8 text-gray-400" />
            </div>
          </SectionContent>
        </div>
      </Section>

      {/* Real-Time AI Metrics */}
      <Section size="lg" id="metrics" className="bg-gradient-to-b from-gray-900/50 to-transparent">
        <SectionContent>
          <AIMetricsVisualization />
        </SectionContent>
      </Section>

      {/* AI Capabilities Showcase */}
      <Section size="lg" id="demo" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10" />
        <SectionContent className="relative z-10">
          <AICapabilitiesShowcase />
        </SectionContent>
      </Section>

      {/* Interactive Chat Demo */}
      <Section size="lg" className="bg-gradient-to-br from-gray-900/30 to-black/20">
        <SectionHeader
          overline={
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full border border-green-500/30">
              <Bot className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">Live AI Assistant</span>
            </div>
          }
          title="Experience Conversational AI"
          description="Interact with AstroAI, our advanced conversational AI system. Get instant answers about our services, technical capabilities, and business solutions."
          titleVariant="display"
          className="text-center text-white mb-12"
        />
        <SectionContent>
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-gray-900/80 to-black/60 border-gray-700 backdrop-blur-sm p-8">
                  <Heading as="h3" variant="h5" className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    AI Conversation Features
                  </Heading>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <Text variant="body-small" className="font-medium mb-1">Context-Aware Responses</Text>
                        <Text variant="caption" hierarchy="muted">Understands your business context and provides personalized recommendations</Text>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <Text variant="body-small" className="font-medium mb-1">Technical Expertise</Text>
                        <Text variant="caption" hierarchy="muted">Deep knowledge of AI/ML technologies, cloud platforms, and DevOps practices</Text>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Rocket className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <Text variant="body-small" className="font-medium mb-1">Real-Time Processing</Text>
                        <Text variant="caption" hierarchy="muted">Sub-second response times with streaming capabilities</Text>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Start Topics */}
                <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 p-6">
                  <Text variant="body-small" className="font-semibold mb-3">Try asking about:</Text>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="secondary" className="justify-center bg-gray-800/50">AI Capabilities</Badge>
                    <Badge variant="secondary" className="justify-center bg-gray-800/50">Pricing Models</Badge>
                    <Badge variant="secondary" className="justify-center bg-gray-800/50">Implementation</Badge>
                    <Badge variant="secondary" className="justify-center bg-gray-800/50">Case Studies</Badge>
                  </div>
                </Card>
              </div>
              
              <div>
                <ChatInterface
                  userProfile={{
                    industry: 'technology',
                    companySize: 'enterprise',
                    currentChallenges: ['ai implementation', 'scalability', 'cost optimization'],
                    interests: ['machine learning', 'automation', 'performance']
                  }}
                />
              </div>
            </div>
          </div>
        </SectionContent>
      </Section>

      {/* Smart Recommendations Demo */}
      <Section size="lg">
        <SectionHeader
          title="AI-Powered Service Recommendations"
          description="Our recommendation engine analyzes your specific needs and suggests optimal solutions with proven ROI"
          titleVariant="display"
          className="text-center text-white mb-12"
        />
        <SectionContent>
          <RecommendationEngine
            userProfile={{
              industry: 'fintech',
              companySize: 'enterprise',
              currentChallenges: ['ai integration', 'compliance', 'cost optimization'],
              interests: ['machine learning', 'automation', 'security'],
              techStack: ['aws', 'kubernetes', 'python', 'react']
            }}
            maxRecommendations={3}
            showTitle={false}
          />
        </SectionContent>
      </Section>

      {/* Client Success Stories */}
      <Section size="lg" className="bg-gradient-to-b from-transparent to-gray-900/30">
        <SectionContent>
          <AICaseStudies />
        </SectionContent>
      </Section>

      {/* Technology Stack */}
      <Section size="lg" className="bg-gradient-to-br from-gray-900/50 to-black/30">
        <SectionContent>
          <AITechStack />
        </SectionContent>
      </Section>

      {/* Content Generation Demo */}
      <Section size="lg" className="bg-gradient-to-r from-gray-900/20 to-black/20">
        <SectionHeader
          overline={
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-300">Content AI</span>
            </div>
          }
          title="AI-Powered Content Generation"
          description="Generate professional content tailored to your audience and objectives with our advanced language models"
          titleVariant="display"
          className="text-center text-white mb-12"
        />
        <SectionContent>
          <ContentGenerator />
        </SectionContent>
      </Section>

      {/* Final CTA Section */}
      <Section size="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(120,119,198,0.2),transparent)]" />
        
        <SectionContent className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <Heading as="h2" variant="display" className="comet-gradient-text">
                Ready to Transform with AI?
              </Heading>
              
              <Text variant="body-large" hierarchy="muted" className="text-xl leading-relaxed">
                Join 500+ enterprises already using our AI solutions to drive innovation, 
                reduce costs, and accelerate growth. Experience the future of intelligent automation.
              </Text>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                className="border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/10 px-8 py-4"
                asChild
              >
                <Link href="/services">
                  Explore All Services
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">99.7%</div>
                <Text variant="caption" hierarchy="muted">Client Satisfaction</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">500+</div>
                <Text variant="caption" hierarchy="muted">Enterprise Clients</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">24/7</div>
                <Text variant="caption" hierarchy="muted">AI Support</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">247</div>
                <Text variant="caption" hierarchy="muted">AI Models</Text>
              </div>
            </div>
          </div>
        </SectionContent>
      </Section>
    </div>
  );
}