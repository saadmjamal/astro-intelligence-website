import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/config/services.config';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { TestimonialSection } from '@/components/ui/Testimonial';
import { getRandomTestimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'Enterprise AI Services | Transform Operations & Cut Costs by 70%',
  description:
    'Fortune 500 companies trust our AI transformation services to cut operational costs by 70% while increasing revenue by 40%. Get measurable ROI in 90 days with enterprise-grade AI solutions.',
  keywords: [
    'Enterprise AI Services',
    'AI Transformation',
    'Cloud Cost Optimization',
    'Infrastructure Monitoring',
    'AI Service Desk',
    'MLOps Platform',
    'Enterprise Automation',
    'AI Consulting',
    'ROI Guarantee',
    'Fortune 500 AI Solutions'
  ],
};

// Service gradients for visual appeal
const serviceGradients = {
  'enterprise-ai-transformation': 'from-tech-green to-magenta',
  'autonomous-l1-servicedesk': 'from-blue-500 to-cyan-600',
  'ai-infrastructure-monitoring': 'from-indigo-500 to-purple-600',
  'ai-cloud-cost-optimization': 'from-green-500 to-emerald-600',
  'unified-multicloud-dashboard': 'from-orange-500 to-red-600',
  'enterprise-ai-orchestration': 'from-magenta to-purple-600',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-primary/20 via-navy-800 to-navy-900 absolute inset-0 bg-gradient-to-br" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" className="mb-6">
            Our Services
          </Heading>
          <Text variant="lead" className="mx-auto mb-8 max-w-3xl text-muted-foreground">
            Fortune 500 companies choose us to cut operational costs by 70% while increasing revenue by 40%. 
            Our enterprise AI solutions deliver guaranteed ROI in 90 days with complete compliance and governance.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact?type=executive">Get Executive Briefing</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#services-grid">Explore Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="section-padding bg-gradient-to-b from-transparent via-navy-950/50 to-transparent">
        <div className="container-width">
          {/* Section Header */}
          <div className="section-intro">
            <div className="badge">
              <div className="badge-text">🏆 Award-Winning Solutions</div>
            </div>
            <h2 className="title text-gradient-tech">
              Enterprise AI Solutions That Deliver Results
            </h2>
            <p className="description">
              Join Fortune 500 companies achieving breakthrough results with AI services that guarantee measurable ROI, complete compliance, and enterprise-grade security.
            </p>
          </div>

          {/* Premium Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.iconComponent;
              const gradient = serviceGradients[service.id as keyof typeof serviceGradients];
              const isHighPriority = index < 2; // First two services get priority styling
              
              return (
                <div 
                  key={service.id} 
                  className={`group relative overflow-hidden ${
                    isHighPriority ? 'lg:col-span-1 xl:col-span-1' : ''
                  }`}
                >
                  {/* Service Card */}
                  <div className="relative h-full bg-gradient-to-br from-bg-card/90 via-bg-elevated/70 to-bg-card/90 border border-border-default/50 rounded-2xl p-6 lg:p-8 backdrop-blur-sm transition-all duration-500 hover:border-tech-green/30 hover:shadow-2xl hover:shadow-tech-green/10 hover:-translate-y-2 cursor-pointer">
                    
                    {/* Animated Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-500 rounded-2xl`} />
                    
                    {/* Tech Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500" 
                         style={{
                           backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,148,0.3) 1px, transparent 0)`,
                           backgroundSize: '20px 20px'
                         }} />
                    
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-tech-green/0 via-tech-green/20 to-tech-green/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                    
                    <div className="relative space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {IconComponent && (
                              <div className="relative">
                                <div className="absolute inset-0 bg-tech-green/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500" />
                                <div className="relative bg-tech-green/10 p-3 rounded-xl border border-tech-green/20">
                                  <IconComponent className="h-8 w-8 text-tech-green group-hover:text-accent-hover transition-colors duration-300" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <Heading 
                              as="h3" 
                              variant={isHighPriority ? "h3" : "h4"} 
                              className="text-text-primary group-hover:text-gradient-tech transition-all duration-300 leading-tight"
                            >
                              {service.title}
                            </Heading>
                          </div>
                        </div>
                        
                        {/* Animated Arrow */}
                        <div className="relative overflow-hidden">
                          <ArrowRight className="h-5 w-5 text-text-subtle group-hover:text-tech-green transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                        </div>
                      </div>
                      
                      {/* Service Description */}
                      <Text variant="body" className="text-text-muted group-hover:text-text-secondary transition-colors duration-300 leading-relaxed">
                        {service.description}
                      </Text>
                      
                      {/* Key Benefits with Staggered Animation */}
                      <div className="space-y-3">
                        {service.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <div 
                            key={benefitIndex} 
                            className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300"
                            style={{ transitionDelay: `${benefitIndex * 50}ms` }}
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-tech-green/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                              <CheckCircle2 className="relative h-4 w-4 text-tech-green/80 group-hover:text-tech-green flex-shrink-0 transition-colors duration-300" />
                            </div>
                            <Text variant="small" className="text-text-subtle group-hover:text-text-muted transition-colors duration-300">
                              {benefit}
                            </Text>
                          </div>
                        ))}
                      </div>
                      
                      {/* Enhanced CTA */}
                      <div className="pt-4 border-t border-border-subtle/30 group-hover:border-tech-green/20 transition-colors duration-300">
                        <Button 
                          asChild 
                          variant="ghost" 
                          className="w-full justify-between text-tech-green hover:text-accent-hover hover:bg-tech-green/10 border border-transparent group-hover:border-tech-green/20 transition-all duration-300"
                        >
                          <Link href={`/services/${service.slug}`}>
                            <span className="font-semibold">Explore Solution</span>
                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Service Metrics/Badge */}
                      {service.caseStudies && service.caseStudies[0] && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-tech-green/10 border border-tech-green/20 rounded-full px-3 py-1 backdrop-blur-sm">
                            <Text variant="small" className="text-tech-green font-medium">
                              {service.caseStudies[0].metric}
                            </Text>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Enhanced Additional CTA */}
          <div className="mt-24 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-tech-green/5 via-tech-green/10 to-tech-green/5 rounded-3xl blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 to-navy-800/30 rounded-2xl" />
            
            {/* Content */}
            <div className="relative bg-bg-card/90 border border-border-default/50 rounded-2xl p-8 lg:p-12 backdrop-blur-sm text-center">
              <div className="space-y-6">
                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-tech-green/10 rounded-2xl flex items-center justify-center border border-tech-green/20">
                  <svg className="w-8 h-8 text-tech-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <Heading as="h2" variant="h2" className="text-text-primary">
                  Not sure which service is right for you?
                </Heading>
                <Text variant="lead" className="max-w-2xl mx-auto text-text-muted">
                  Let's discuss your challenges and find the perfect solution together. Our experts will help you identify the best path forward.
                </Text>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button size="lg" asChild prominence="high">
                    <Link href="/contact?type=executive">
                      Schedule Executive AI Briefing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" asChild className="text-tech-green border border-tech-green/20 hover:bg-tech-green/10">
                    <Link href="/portfolio">
                      View Case Studies
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="pt-8 border-t border-border-subtle/30">
                  <div className="flex flex-wrap justify-center items-center gap-6 text-text-subtle">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-tech-green" />
                      <Text variant="small">Free enterprise assessment & ROI analysis</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-tech-green" />
                      <Text variant="small">Guaranteed 90-day ROI or money back</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-tech-green" />
                      <Text variant="small">Fortune 500-proven methodologies</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection
        testimonials={getRandomTestimonials(3)}
        title="What Our Clients Say"
        subtitle="See how we've helped businesses transform with our services"
        variant="grid"
        columns={3}
        className="bg-muted/30"
      />

      {/* Enhanced Stats Section */}
      <section className="section-padding bg-gradient-to-br from-navy-950/80 via-navy-900/60 to-navy-950/80 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tech-green/5 to-transparent" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,148,0.2) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="container-width relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "$47M+", label: "Annual Savings Delivered", icon: "💰" },
              { value: "97%", label: "Outage Prevention Rate", icon: "🛡️" },
              { value: "95%", label: "AI Project Success Rate", icon: "🎯" },
              { value: "99.99%", label: "Enterprise Uptime SLA", icon: "⭐" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group text-center relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-tech-green/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                
                {/* Card */}
                <div className="relative bg-bg-card/30 border border-border-default/30 rounded-xl p-6 backdrop-blur-sm group-hover:border-tech-green/30 group-hover:bg-bg-card/50 transition-all duration-300">
                  {/* Icon */}
                  <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  {/* Value */}
                  <div className="text-4xl lg:text-5xl font-bold text-gradient-tech mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <Text variant="body" className="text-text-muted group-hover:text-text-secondary transition-colors duration-300 font-medium">
                    {stat.label}
                  </Text>
                  
                  {/* Accent Line */}
                  <div className="mt-4 h-0.5 w-12 bg-tech-green/30 group-hover:bg-tech-green group-hover:w-16 mx-auto transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Accent */}
          <div className="mt-16 text-center">
            <Text variant="body" className="text-text-subtle max-w-2xl mx-auto">
              Trusted by leading companies worldwide to deliver transformative AI and cloud solutions that drive real business results.
            </Text>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-tech-green/5 via-transparent to-magenta/5 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-navy-950/90" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(0,255,148,0.1) 50%, transparent 100%)`,
          }}
        />
        
        <div className="relative container-width">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2 mb-4">
                <span className="text-tech-green text-sm font-medium">🚀 Ready to Get Started?</span>
              </div>
              
              <Heading as="h2" variant="h1" className="text-gradient-tech max-w-3xl mx-auto leading-tight">
                Ready to Transform Your Business?
              </Heading>
              
              <Text variant="lead" className="text-text-muted max-w-2xl mx-auto">
                Join leading companies who've accelerated their digital transformation with our proven AI and cloud solutions.
              </Text>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="xl" asChild prominence="critical">
                <Link href="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="ghost" asChild className="text-tech-green border-2 border-tech-green/30 hover:bg-tech-green/10 hover:border-tech-green/50">
                <Link href="/portfolio">
                  View Case Studies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-12 border-t border-border-subtle/30">
              <div className="flex flex-wrap justify-center items-center gap-8 text-text-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse" />
                  <Text variant="small" className="font-medium">Trusted by Fortune 500 companies</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse" />
                  <Text variant="small" className="font-medium">98% client retention rate</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse" />
                  <Text variant="small" className="font-medium">Average 6 month ROI</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
