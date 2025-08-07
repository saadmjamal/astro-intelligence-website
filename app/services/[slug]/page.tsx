import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

import { services, getServiceBySlug } from '@/lib/config/services.config';
import { generateSEOMetadata } from '@/lib/utils/metadata';
import { ServicePageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { ServiceStructuredData } from '@/components/SEO/StructuredData';
import { RelatedItem } from '@/components/ui/RelatedContent';
import { ArrowRight, CheckCircle2, Zap, TrendingUp, Calculator, Play, Star, Award, Clock, Users, Target, BarChart3, Shield } from 'lucide-react';
import { TestimonialSection } from '@/components/ui/Testimonial';
import { getTestimonialsByProject } from '@/data/testimonials';
import { LazyMetricCounter } from '@/components/ui/LazyMetricCounter';
import { InteractivePricing } from '@/components/ui/InteractivePricing';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return generateSEOMetadata({
    title: service.title,
    description: service.description,
    keywords: [
      service.title,
      'AI',
      'Cloud',
      'DevOps',
      'Enterprise',
      ...service.features.slice(0, 3),
    ],
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = service.iconComponent;

  // Generate related services (other services excluding current one)
  const relatedServices: RelatedItem[] = services
    .filter(s => s.slug !== service.slug)
    .slice(0, 3)
    .map(s => ({
      id: s.id,
      title: s.title,
      excerpt: s.description,
      href: `/services/${s.slug}`,
      category: 'Service',
      tags: s.features.slice(0, 2),
    }));

  const heroSection = (
    <section className="relative overflow-hidden section-padding bg-gradient-to-br from-navy-950/90 via-navy-900/80 to-navy-950/90">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-green/5 via-magenta/5 to-tech-green/5" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,148,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      <div className="relative container-width">
        <div className="text-center space-y-8">
          {/* Enhanced Icon with Glow Effect */}
          <div className="relative flex justify-center">
            {IconComponent && (
              <div className="relative">
                <div className="absolute inset-0 bg-tech-green/20 rounded-3xl blur-2xl scale-150" />
                <div className="relative bg-gradient-to-br from-tech-green/10 to-magenta/10 p-6 rounded-3xl border border-tech-green/20 backdrop-blur-sm">
                  <IconComponent className="h-24 w-24 text-tech-green" />
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Title with Gradient */}
          <div className="space-y-4">
            <Heading as="h1" variant="hero" className="text-gradient-tech leading-tight">
              {service.title}
            </Heading>
            <Text variant="hero-lead" className="mx-auto max-w-4xl text-text-secondary leading-relaxed">
              {service.description}
            </Text>
          </div>
          
          {/* Value Proposition Badges */}
          {service.caseStudies && service.caseStudies.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {service.caseStudies.slice(0, 2).map((study, index) => (
                <div key={index} className="bg-tech-green/10 border border-tech-green/20 rounded-full px-6 py-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-tech-green" />
                    <Text variant="small" className="text-tech-green font-semibold">
                      {study.metric}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Button size="xl" prominence="critical" asChild>
              <Link href={`${service.cta.href}?service=${service.slug}&type=executive`}>
                <Star className="mr-2 h-5 w-5" />
                Get Executive Briefing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="ghost" className="border-2 border-tech-green/30 text-tech-green hover:bg-tech-green/10" asChild>
              <Link href="#calculator">
                <Calculator className="mr-2 h-5 w-5" />
                ROI Calculator
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-border-subtle/30">
            <div className="flex items-center gap-2 text-text-subtle">
              <CheckCircle2 className="h-4 w-4 text-tech-green" />
              <Text variant="small">Free consultation</Text>
            </div>
            <div className="flex items-center gap-2 text-text-subtle">
              <Shield className="h-4 w-4 text-tech-green" />
              <Text variant="small">No commitment required</Text>
            </div>
            <div className="flex items-center gap-2 text-text-subtle">
              <Clock className="h-4 w-4 text-tech-green" />
              <Text variant="small">Response within 24h</Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const bodySection = (
    <>
      {/* Enhanced Value Proposition */}
      <section className="section-padding bg-gradient-to-br from-transparent via-navy-950/30 to-transparent">
        <div className="container-width">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2">
                <Target className="h-4 w-4 text-tech-green" />
                <span className="text-tech-green text-sm font-medium">Business Impact</span>
              </div>
              <Heading as="h2" variant="display" className="text-gradient-tech">
                Transform Your Business
              </Heading>
            </div>
            <div className="max-w-4xl mx-auto">
              <Text variant="body-large" className="text-text-secondary leading-relaxed whitespace-pre-line">
                {service.longDescription}
              </Text>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive ROI Calculator */}
      <section id="calculator" className="section-padding bg-gradient-to-br from-tech-green/5 via-transparent to-magenta/5">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2 mb-4">
                <Calculator className="h-4 w-4 text-tech-green" />
                <span className="text-tech-green text-sm font-medium">ROI Calculator</span>
              </div>
              <Heading as="h2" variant="title" className="text-gradient-tech mb-4">
                Calculate Your Potential Savings
              </Heading>
              <Text variant="lead" className="text-text-muted max-w-2xl mx-auto">
                See how much you could save with our {service.title.toLowerCase()} solutions.
              </Text>
            </div>
            
            {/* Interactive Calculator Component */}
            <Card variant="glass" padding="xl" className="backdrop-blur-sm border border-tech-green/20">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="bg-tech-green/10 p-4 rounded-2xl inline-flex mb-4">
                        <Users className="h-8 w-8 text-tech-green" />
                      </div>
                      <Heading as="h3" variant="h4" className="mb-2">Team Size</Heading>
                      <div className="text-4xl font-bold text-gradient-tech">
                        <LazyMetricCounter value={25} duration={2} suffix="+" label="developers" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="bg-magenta/10 p-4 rounded-2xl inline-flex mb-4">
                        <Clock className="h-8 w-8 text-magenta" />
                      </div>
                      <Heading as="h3" variant="h4" className="mb-2">Time Saved</Heading>
                      <div className="text-4xl font-bold text-gradient-tech">
                        <LazyMetricCounter value={80} duration={2} suffix="%" label="Time Saved" />
                      </div>
                      <Text variant="small" className="text-text-muted">weekly hours</Text>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="bg-tech-green/10 p-4 rounded-2xl inline-flex mb-4">
                        <BarChart3 className="h-8 w-8 text-tech-green" />
                      </div>
                      <Heading as="h3" variant="h4" className="mb-2">Annual Savings</Heading>
                      <div className="text-4xl font-bold text-gradient-tech">
                        $<LazyMetricCounter value={450} duration={2} suffix="K" label="Annual Savings" />
                      </div>
                      <Text variant="small" className="text-text-muted">estimated</Text>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-8 border-t border-border-subtle/30">
                  <Button size="lg" prominence="high" asChild>
                    <Link href={`${service.cta.href}?service=${service.slug}&calculator=true`}>
                      Get Detailed ROI Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <div className="mt-4">
                    <Text variant="small" className="text-text-subtle">
                      * Based on average enterprise implementations
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features with Interactive Elements */}
      <section id="features" className="section-padding bg-gradient-to-br from-navy-950/50 via-navy-900/30 to-navy-950/50">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2 mb-4">
              <Zap className="h-4 w-4 text-tech-green" />
              <span className="text-tech-green text-sm font-medium">Key Features</span>
            </div>
            <Heading as="h2" variant="title" className="text-gradient-tech mb-4">
              Powerful Capabilities
            </Heading>
            <Text variant="lead" className="text-text-muted max-w-3xl mx-auto">
              Everything you need to transform your business with cutting-edge {service.title.toLowerCase()}.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <Card key={index} variant="glass" hover className="group h-full border border-tech-green/10 hover:border-tech-green/30 transition-all duration-500">
                <div className="relative">
                  {/* Background Glow */}
                  <div className="absolute -inset-1 bg-tech-green/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-tech-green/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500" />
                        <div className="relative bg-gradient-to-br from-tech-green/10 to-magenta/5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-tech-green/20 group-hover:border-tech-green/40 transition-all duration-300">
                          <span className="text-tech-green font-bold text-lg group-hover:scale-110 transition-transform duration-300">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <Text variant="body" className="font-semibold text-text-primary group-hover:text-gradient-tech transition-all duration-300 leading-relaxed">
                          {feature}
                        </Text>
                      </div>
                    </div>
                    
                    {/* Feature Enhancement Indicator */}
                    <div className="pt-4 border-t border-border-subtle/20 group-hover:border-tech-green/20 transition-colors duration-300">
                      <div className="flex items-center justify-between text-text-subtle group-hover:text-tech-green transition-colors duration-300">
                        <Text variant="small" className="font-medium">
                          Enterprise Ready
                        </Text>
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Feature Demo CTA */}
          <div className="text-center mt-16">
            <Button size="lg" variant="ghost" className="border-2 border-tech-green/30 text-tech-green hover:bg-tech-green/10" asChild>
              <Link href={`${service.cta.href}?service=${service.slug}&demo=features`}>
                <Play className="mr-2 h-5 w-5" />
                Request Live Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits with Visual Impact */}
      <section className="section-padding bg-gradient-to-br from-transparent via-tech-green/5 to-transparent">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2 mb-4">
              <TrendingUp className="h-4 w-4 text-tech-green" />
              <span className="text-tech-green text-sm font-medium">Business Benefits</span>
            </div>
            <Heading as="h2" variant="title" className="text-gradient-tech mb-4">
              Measurable Business Impact
            </Heading>
            <Text variant="lead" className="text-text-muted max-w-3xl mx-auto">
              Real results that drive growth and competitive advantage.
            </Text>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-bg-card/30 border border-border-default/30 hover:border-tech-green/30 hover:bg-bg-card/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-tech-green/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <CheckCircle2 className="relative h-6 w-6 text-tech-green group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <Text variant="body" className="font-medium text-text-primary group-hover:text-text-secondary transition-colors duration-300 leading-relaxed">
                      {benefit}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Benefits CTA */}
          <div className="text-center mt-16">
            <div className="space-y-6">
              <Text variant="body-large" className="text-text-muted max-w-2xl mx-auto">
                Ready to see these benefits in action?
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" prominence="high" asChild>
                  <Link href={`${service.cta.href}?service=${service.slug}&benefits=true`}>
                    Get Custom Business Case
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" className="text-tech-green border border-tech-green/20 hover:bg-tech-green/10" asChild>
                  <Link href="#case-studies">
                    View Success Stories
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Approach */}
      {service.technicalApproach && (
        <section className="dark:bg-navy-800/50 bg-gray-50 section-padding">
          <div className="container-width">
            <Heading as="h2" variant="h2" className="mb-12 text-center">
              Technical Approach
            </Heading>
            <div className="grid grid-gap md:grid-cols-2 lg:grid-cols-3">
              {service.technicalApproach.map((tech, index) => (
                <Card key={index} variant="elevated" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="bg-navy-800/10 dark:bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <Text variant="body" className="font-medium">
                      {tech}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Process with Timeline */}
      {service.process && (
        <section className="section-padding bg-gradient-to-br from-navy-950/50 via-navy-900/30 to-navy-950/50">
          <div className="container-width">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2 mb-4">
                <Target className="h-4 w-4 text-tech-green" />
                <span className="text-tech-green text-sm font-medium">Our Methodology</span>
              </div>
              <Heading as="h2" variant="title" className="text-gradient-tech mb-4">
                Proven Implementation Process
              </Heading>
              <Text variant="lead" className="text-text-muted max-w-3xl mx-auto">
                Our battle-tested methodology ensures successful delivery and measurable results.
              </Text>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-16 bottom-16 w-0.5 bg-gradient-to-b from-tech-green via-magenta to-tech-green opacity-30" />
                
                <div className="space-y-12">
                  {service.process.map((step, index) => (
                    <div 
                      key={index} 
                      className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                    >
                      {/* Step Number - Center */}
                      <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                        <div className="relative">
                          <div className="absolute inset-0 bg-tech-green/20 rounded-full blur-lg scale-150" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-tech-green/20 to-magenta/20 border-2 border-tech-green/30 backdrop-blur-sm">
                            <span className="text-tech-green text-xl font-bold">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} pl-24 md:pl-0`}>
                        <Card 
                          variant="glass" 
                          className={`group border border-tech-green/10 hover:border-tech-green/30 transition-all duration-500 ${
                            index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                          }`}
                        >
                          <div className="relative">
                            {/* Background Glow */}
                            <div className="absolute -inset-1 bg-tech-green/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                            
                            <div className="relative p-6 space-y-4">
                              <div className="space-y-2">
                                <Heading as="h3" variant="h4" className="text-gradient-tech group-hover:scale-105 transition-transform duration-300">
                                  {step.step}
                                </Heading>
                                <div className="h-1 w-16 bg-gradient-to-r from-tech-green to-magenta rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              
                              <Text variant="body" className="text-text-muted group-hover:text-text-secondary transition-colors duration-300 leading-relaxed">
                                {step.description}
                              </Text>
                              
                              {/* Step Indicator */}
                              <div className="pt-4 border-t border-border-subtle/20 group-hover:border-tech-green/20 transition-colors duration-300">
                                <div className="flex items-center gap-2 text-tech-green">
                                  <Clock className="h-4 w-4" />
                                  <Text variant="small" className="font-medium">
                                    Phase {index + 1} of {service.process?.length || 0}
                                  </Text>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Process CTA */}
            <div className="text-center mt-16">
              <div className="space-y-6">
                <Text variant="body-large" className="text-text-muted max-w-2xl mx-auto">
                  Want to discuss how this process applies to your specific needs?
                </Text>
                <Button size="lg" prominence="high" asChild>
                  <Link href={`${service.cta.href}?service=${service.slug}&process=true`}>
                    Schedule Process Review
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Case Studies with Impact Metrics */}
      {service.caseStudies && service.caseStudies.length > 0 && (
        <section id="case-studies" className="section-padding bg-gradient-to-br from-transparent via-magenta/5 to-transparent">
          <div className="container-width">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2 mb-4">
                <Award className="h-4 w-4 text-tech-green" />
                <span className="text-tech-green text-sm font-medium">Success Stories</span>
              </div>
              <Heading as="h2" variant="title" className="text-gradient-tech mb-4">
                Proven Results
              </Heading>
              <Text variant="lead" className="text-text-muted max-w-3xl mx-auto">
                Real companies achieving extraordinary results with our {service.title.toLowerCase()} solutions.
              </Text>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {service.caseStudies.map((study, index) => (
                <Card key={index} variant="glass" hover className="group h-full border border-tech-green/10 hover:border-tech-green/30 transition-all duration-500">
                  <Link href={study.link} className="block h-full">
                    <div className="relative h-full">
                      {/* Background Effects */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-tech-green/5 to-magenta/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-br from-tech-green/[0.02] to-magenta/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      <div className="relative p-8 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <Heading as="h3" variant="h4" className="text-text-primary group-hover:text-gradient-tech transition-all duration-300 mb-2 leading-tight">
                              {study.title}
                            </Heading>
                            <div className="h-1 w-12 bg-gradient-to-r from-tech-green to-magenta rounded-full opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300" />
                          </div>
                          <div className="ml-4">
                            <div className="bg-tech-green/10 p-2 rounded-lg group-hover:bg-tech-green/20 transition-colors duration-300">
                              <ArrowRight className="h-5 w-5 text-tech-green group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Impact Metric */}
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="bg-gradient-to-br from-tech-green/10 to-magenta/5 p-6 rounded-2xl border border-tech-green/20 group-hover:border-tech-green/40 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="bg-tech-green/20 p-2 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-tech-green" />
                              </div>
                              <Text variant="small" className="text-tech-green font-semibold uppercase tracking-wide">
                                Key Result
                              </Text>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-3xl font-bold text-gradient-tech group-hover:scale-105 transition-transform duration-300">
                                {study.metric}
                              </div>
                              <Text variant="body" className="text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                                Achieved through our {service.title.toLowerCase()} implementation
                              </Text>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-border-subtle/20 group-hover:border-tech-green/20 transition-colors duration-300">
                          <div className="flex items-center justify-between">
                            <Text variant="small" className="text-tech-green font-medium">
                              View Full Case Study
                            </Text>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-tech-green fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
            
            {/* Case Studies CTA */}
            <div className="text-center mt-16">
              <div className="space-y-6">
                <Text variant="body-large" className="text-text-muted max-w-2xl mx-auto">
                  Want to become our next success story?
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" prominence="high" asChild>
                    <Link href={`${service.cta.href}?service=${service.slug}&case-study=true`}>
                      Start Your Success Story
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="text-tech-green border border-tech-green/20 hover:bg-tech-green/10" asChild>
                    <Link href="/portfolio">
                      View All Case Studies
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {(() => {
        const projectTestimonials = getTestimonialsByProject(service.title);
        return projectTestimonials.length > 0 ? (
          <section className="section-padding bg-gradient-to-br from-navy-950/50 via-navy-900/30 to-navy-950/50">
            <TestimonialSection
              testimonials={projectTestimonials}
              title="Client Success Stories"
              subtitle={`Real feedback from companies transformed by our ${service.title} solutions`}
              variant="carousel"
              className="border-t border-b border-tech-green/10"
            />
          </section>
        ) : null;
      })()}
      
      {/* Interactive Pricing Section */}
      <section className="section-padding bg-gradient-to-br from-transparent via-navy-950/30 to-transparent">
        <div className="container-width">
          <Suspense fallback={
            <div className="text-center py-12">
              <Text variant="body" className="text-text-muted">Loading pricing options...</Text>
            </div>
          }>
            <InteractivePricing 
              serviceTitle={service.title} 
              serviceSlug={service.slug}
            />
          </Suspense>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-navy-950/50 via-navy-900/30 to-navy-950/50">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2 mb-4">
              <Target className="h-4 w-4 text-tech-green" />
              <span className="text-tech-green text-sm font-medium">Common Questions</span>
            </div>
            <Heading as="h2" variant="title" className="text-gradient-tech mb-4">
              Frequently Asked Questions
            </Heading>
            <Text variant="lead" className="text-text-muted max-w-3xl mx-auto">
              Get answers to common questions about our {service.title.toLowerCase()} services.
            </Text>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: `How quickly can we see results from ${service.title}?`,
                answer: `Most clients see initial improvements within 2-4 weeks, with full implementation benefits realized within 60-90 days. Our proven methodology ensures rapid deployment and immediate value delivery.`
              },
              {
                question: "What makes your approach different?",
                answer: "We combine deep technical expertise with business strategy, focusing on measurable ROI rather than just technology implementation. Our team has delivered successful transformations across industries."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, all our packages include comprehensive support, training, and optimization. We believe in long-term partnerships and ensure your team has everything needed for continued success."
              },
              {
                question: "How do you ensure project success?",
                answer: "We use a proven methodology with clear milestones, regular checkpoints, and success metrics. Our guarantee-backed approach means we're committed to your success from day one."
              }
            ].map((faq, index) => (
              <Card key={index} variant="glass" className="group border border-tech-green/10 hover:border-tech-green/30 transition-all duration-500">
                <div className="relative">
                  <div className="absolute -inset-1 bg-tech-green/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  
                  <div className="relative p-6 space-y-4">
                    <Heading as="h3" variant="h5" className="text-text-primary group-hover:text-gradient-tech transition-all duration-300">
                      {faq.question}
                    </Heading>
                    <Text variant="body" className="text-text-muted group-hover:text-text-secondary transition-colors duration-300 leading-relaxed">
                      {faq.answer}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* FAQ CTA */}
          <div className="text-center mt-12">
            <div className="space-y-4">
              <Text variant="body-large" className="text-text-muted">
                Still have questions?
              </Text>
              <Button size="lg" variant="ghost" className="text-tech-green border border-tech-green/20 hover:bg-tech-green/10" asChild>
                <Link href={`${service.cta.href}?service=${service.slug}&faq=true`}>
                  Get Personalized Answers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Assessment CTA */}
      <section className="section-padding bg-gradient-to-br from-tech-green/5 via-transparent to-magenta/5">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Card variant="glass" className="border border-tech-green/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-tech-green/10 to-magenta/10 rounded-2xl blur-xl opacity-50" />
                
                <div className="relative p-8 text-center space-y-6">
                  <div className="space-y-4">
                    <div className="mx-auto bg-tech-green/10 p-4 rounded-2xl w-fit">
                      <Shield className="h-12 w-12 text-tech-green" />
                    </div>
                    <Heading as="h3" variant="h3" className="text-gradient-tech">
                      Free Security & Readiness Assessment
                    </Heading>
                    <Text variant="lead" className="text-text-muted max-w-2xl mx-auto">
                      Get a comprehensive analysis of your current infrastructure and readiness for {service.title.toLowerCase()}.
                    </Text>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                    {[
                      { title: "Security Audit", desc: "Infrastructure & compliance review" },
                      { title: "Readiness Score", desc: "Technical capability assessment" },
                      { title: "ROI Projection", desc: "Estimated timeline & investment" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="bg-tech-green/10 p-2 rounded-lg inline-flex">
                          <CheckCircle2 className="h-5 w-5 text-tech-green" />
                        </div>
                        <div className="space-y-1">
                          <Text variant="body" className="font-semibold text-text-primary">
                            {item.title}
                          </Text>
                          <Text variant="small" className="text-text-muted">
                            {item.desc}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <Button size="xl" prominence="high" asChild>
                      <Link href={`${service.cta.href}?service=${service.slug}&assessment=true`}>
                        <Shield className="mr-2 h-5 w-5" />
                        Get Free Assessment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    
                    <div className="flex flex-wrap justify-center items-center gap-6 text-text-subtle pt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-tech-green" />
                        <Text variant="small">No obligation</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-tech-green" />
                        <Text variant="small">Results in 48 hours</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-tech-green" />
                        <Text variant="small">Actionable recommendations</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );

  const ctaSection = (
    <section className="section-padding bg-gradient-to-br from-tech-green/10 via-magenta/5 to-tech-green/10 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/80 to-navy-950/90" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,148,0.2) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="relative container-width">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2">
              <Target className="h-4 w-4 text-tech-green" />
              <span className="text-tech-green text-sm font-medium">Ready to Get Started?</span>
            </div>
            
            <Heading as="h2" variant="hero" className="text-gradient-tech leading-tight">
              Transform Your Operations Today
            </Heading>
            
            <Text variant="hero-lead" className="text-text-secondary max-w-3xl mx-auto">
              Join industry leaders achieving breakthrough results with our {service.title.toLowerCase()} solutions.
            </Text>
          </div>
          
          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Clock, title: "Fast Implementation", desc: "Results in 30 days" },
              { icon: Shield, title: "Risk-Free Trial", desc: "30-day guarantee" },
              { icon: Users, title: "Expert Support", desc: "24/7 dedicated team" }
            ].map((item, index) => (
              <div key={index} className="group">
                <Card variant="glass" className="h-full border border-tech-green/10 group-hover:border-tech-green/30 transition-all duration-500">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-tech-green/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                    
                    <div className="relative p-6 text-center space-y-4">
                      <div className="mx-auto bg-tech-green/10 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-8 w-8 text-tech-green" />
                      </div>
                      <div className="space-y-1">
                        <Text variant="body" className="font-semibold text-text-primary">
                          {item.title}
                        </Text>
                        <Text variant="small" className="text-tech-green">
                          {item.desc}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Enhanced CTAs */}
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row justify-center gap-6 items-center">
              <Button size="xl" prominence="critical" asChild>
                <Link href={`${service.cta.href}?service=${service.slug}&priority=high`}>
                  <Star className="mr-2 h-5 w-5" />
                  Schedule Executive Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="xl" variant="ghost" className="border-2 border-tech-green/30 text-tech-green hover:bg-tech-green/10" asChild>
                <Link href={`${service.cta.href}?service=${service.slug}&type=demo`}>
                  <Play className="mr-2 h-5 w-5" />
                  Watch 5-Min Demo
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border-subtle/30">
              <div className="flex flex-wrap justify-center items-center gap-8 text-text-subtle">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tech-green" />
                  <Text variant="small">Free consultation & ROI assessment</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-tech-green" />
                  <Text variant="small">No commitment required</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-tech-green" />
                  <Text variant="small">Response within 24 hours</Text>
                </div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="bg-tech-green/5 border border-tech-green/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex flex-wrap justify-center items-center gap-6 text-text-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse" />
                  <Text variant="small" className="font-medium">Trusted by Fortune 500 companies</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse" />
                  <Text variant="small" className="font-medium">98% client satisfaction rate</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-tech-green rounded-full animate-pulse" />
                  <Text variant="small" className="font-medium">Average 6-month ROI</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <ServiceStructuredData 
        serviceName={service.title} 
        serviceDescription={service.description} 
      />
      <ServicePageLayout
        serviceName={service.title}
        relatedContent={relatedServices}
        className="bg-background-light dark:bg-background-dark"
      >
        {heroSection}
        {bodySection}
        {ctaSection}
      </ServicePageLayout>
    </>
  );
}
