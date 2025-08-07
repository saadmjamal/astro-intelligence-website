'use client';

import { useState } from 'react';
import { Heading, Text } from './Typography';
import { Button } from './Button';
import Card from './Card';
import { CheckCircle2, ArrowRight, Zap, Star, Shield } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  recommended?: boolean;
  cta: {
    text: string;
    href: string;
  };
}

interface InteractivePricingProps {
  serviceTitle: string;
  serviceSlug: string;
  className?: string;
}

export function InteractivePricing({ serviceTitle, serviceSlug, className }: InteractivePricingProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  // Generate dynamic pricing tiers based on service
  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: `Essential ${serviceTitle.toLowerCase()} for small teams`,
      price: {
        monthly: 2500,
        annual: 25000,
      },
      features: [
        'Initial consultation & assessment',
        'Basic implementation setup',
        'Up to 3 integration points',
        'Email support',
        '30-day guarantee'
      ],
      cta: {
        text: 'Start Free Trial',
        href: `/contact?service=${serviceSlug}&tier=starter`,
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      description: `Complete ${serviceTitle.toLowerCase()} for growing companies`,
      price: {
        monthly: 7500,
        annual: 75000,
      },
      features: [
        'Comprehensive strategy & roadmap',
        'Full implementation & deployment',
        'Unlimited integrations',
        'Custom development included',
        'Priority support & training',
        'Performance monitoring',
        '60-day guarantee'
      ],
      recommended: true,
      cta: {
        text: 'Schedule Consultation',
        href: `/contact?service=${serviceSlug}&tier=professional`,
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: `Enterprise ${serviceTitle.toLowerCase()} with dedicated support`,
      price: {
        monthly: 15000,
        annual: 150000,
      },
      features: [
        'Executive strategy sessions',
        'Enterprise-grade implementation',
        'Dedicated team & account manager',
        'Custom SLAs & compliance',
        '24/7 support & maintenance',
        'Ongoing optimization',
        'Success guarantee'
      ],
      cta: {
        text: 'Contact Sales',
        href: `/contact?service=${serviceSlug}&tier=enterprise&type=executive`,
      },
    },
  ];

  return (
    <div className={cn('space-y-12', className)}>
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-tech-green/10 border border-tech-green/20 rounded-full px-4 py-2">
            <Zap className="h-4 w-4 text-tech-green" />
            <span className="text-tech-green text-sm font-medium">Transparent Pricing</span>
          </div>
          <Heading as="h2" variant="title" className="text-gradient-tech">
            Investment Options
          </Heading>
          <Text variant="lead" className="text-text-muted max-w-3xl mx-auto">
            Flexible pricing designed to scale with your business needs and deliver measurable ROI.
          </Text>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <Text variant="body" className={cn('transition-colors duration-200', billing === 'monthly' ? 'text-text-primary' : 'text-text-muted')}>
            Monthly
          </Text>
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-tech-green focus:ring-offset-2',
              billing === 'annual' ? 'bg-tech-green' : 'bg-border-default'
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                billing === 'annual' ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
          <div className="flex items-center gap-2">
            <Text variant="body" className={cn('transition-colors duration-200', billing === 'annual' ? 'text-text-primary' : 'text-text-muted')}>
              Annual
            </Text>
            <div className="bg-tech-green/10 border border-tech-green/20 rounded-full px-2 py-1">
              <Text variant="small" className="text-tech-green font-semibold">
                Save 17%
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.id}
            variant="glass"
            className={cn(
              'relative h-full border transition-all duration-500 hover:shadow-2xl',
              tier.recommended
                ? 'border-tech-green/40 shadow-lg shadow-tech-green/20 scale-105'
                : 'border-tech-green/10 hover:border-tech-green/30'
            )}
          >
            {/* Recommended Badge */}
            {tier.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-tech-green to-magenta text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="relative">
              {/* Background Glow */}
              {tier.recommended && (
                <div className="absolute -inset-1 bg-gradient-to-br from-tech-green/20 to-magenta/20 rounded-2xl blur-xl opacity-50" />
              )}

              <div className="relative p-8 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Heading as="h3" variant="h3" className="text-text-primary">
                      {tier.name}
                    </Heading>
                    <Text variant="body" className="text-text-muted">
                      {tier.description}
                    </Text>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gradient-tech">
                        ${(tier.price[billing] / (billing === 'annual' ? 12 : 1)).toLocaleString()}
                      </span>
                      <span className="text-text-muted">/month</span>
                    </div>
                    {billing === 'annual' && (
                      <Text variant="small" className="text-tech-green">
                        Billed annually (${tier.price.annual.toLocaleString()}/year)
                      </Text>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <Text variant="body" className="font-semibold text-text-primary">
                    What's included:
                  </Text>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-tech-green flex-shrink-0 mt-0.5" />
                        <Text variant="body" className="text-text-muted">
                          {feature}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-border-subtle/30">
                  <Button
                    size="lg"
                    fullWidth
                    variant={tier.recommended ? 'primary' : 'outline'}
                    prominence={tier.recommended ? 'high' : 'medium'}
                    asChild
                  >
                    <Link href={tier.cta.href}>
                      {tier.id === 'enterprise' ? <Shield className="mr-2 h-5 w-5" /> : <Zap className="mr-2 h-5 w-5" />}
                      {tier.cta.text}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Money-back guarantee */}
                <div className="text-center pt-4">
                  <div className="flex items-center justify-center gap-2 text-tech-green">
                    <Shield className="h-4 w-4" />
                    <Text variant="small" className="font-medium">
                      {tier.features.find(f => f.includes('guarantee'))} 
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-6">
        <div className="bg-tech-green/5 border border-tech-green/20 rounded-2xl p-8 backdrop-blur-sm max-w-3xl mx-auto">
          <div className="space-y-4">
            <Text variant="body-large" className="text-text-primary font-semibold">
              Need a custom solution?
            </Text>
            <Text variant="body" className="text-text-muted">
              We create tailored packages for unique requirements and multi-service implementations.
            </Text>
            <Button size="lg" variant="ghost" className="text-tech-green border border-tech-green/20 hover:bg-tech-green/10" asChild>
              <Link href={`/contact?service=${serviceSlug}&type=custom`}>
                Discuss Custom Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-text-subtle">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-tech-green" />
            <Text variant="small">No setup fees</Text>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-tech-green" />
            <Text variant="small">Cancel anytime</Text>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-tech-green" />
            <Text variant="small">Money-back guarantee</Text>
          </div>
        </div>
      </div>
    </div>
  );
}