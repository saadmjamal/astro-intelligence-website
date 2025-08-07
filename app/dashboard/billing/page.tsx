'use client';

import { useState } from 'react';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

// Example pricing - replace with your actual Stripe price IDs
const PLANS = [
  {
    name: 'Starter',
    price: '$29/month',
    priceId: 'price_starter_monthly',
    features: [
      'Access to 10 premium scripts',
      'Monthly updates',
      'Email support',
      'Community access',
    ],
  },
  {
    name: 'Professional',
    price: '$99/month',
    priceId: 'price_professional_monthly',
    features: [
      'Access to all premium scripts',
      'Weekly updates',
      'Priority support',
      'Private Discord channel',
      'Custom script requests',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceId: 'price_enterprise',
    features: [
      'Everything in Professional',
      'Custom integrations',
      'SLA guarantee',
      'Dedicated account manager',
      'On-premise deployment',
    ],
  },
];

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(priceId);

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container-width">
        <div className="text-center mb-12">
          <Heading as="h1" variant="h1" className="mb-4">
            Choose Your Plan
          </Heading>
          <Text variant="body" className="text-muted-foreground max-w-2xl mx-auto">
            Get access to premium automation scripts, AI models, and cloud optimization tools.
            All plans include regular updates and support.
          </Text>
        </div>

        <div className="grid grid-gap-md lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.priceId}
              className={`relative rounded-2xl card-padding ${
                plan.popular
                  ? 'bg-gradient-to-b from-magenta/20 to-purple-600/20 border-2 border-magenta'
                  : 'bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-magenta text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-magenta mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? 'primary' : 'secondary'}
                onClick={() => handleSubscribe(plan.priceId)}
                disabled={loading === plan.priceId || plan.priceId === 'price_enterprise'}
              >
                {loading === plan.priceId
                  ? 'Processing...'
                  : plan.priceId === 'price_enterprise'
                  ? 'Contact Sales'
                  : 'Subscribe'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Text variant="small" className="text-muted-foreground">
            All plans are billed monthly. Cancel anytime. Prices in USD.
          </Text>
        </div>
      </div>
    </div>
  );
}