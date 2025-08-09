import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Automation Scripts & Tools | Astro Intelligence',
  description:
    'Download production-ready scripts for cloud automation, AI/ML pipelines, infrastructure management, and DevOps workflows. Accelerate your enterprise transformation.',
};

export default function ScriptsMarketplacePage() {
  const relatedContent = [
    {
      id: 'documentation',
      title: 'Script Documentation',
      excerpt: 'Comprehensive guides for all scripts',
      href: '/docs/scripts',
    },
    {
      id: 'support',
      title: 'Premium Support',
      excerpt: 'Get expert help with implementation',
      href: '/contact?type=script-support',
    },
  ];

  return (
    <PageLayout relatedContent={relatedContent}>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Enterprise Automation Scripts
          </Heading>
          <Text variant="lead" className="mx-auto mb-8 max-w-3xl">
            Production-ready scripts and tools that save weeks of development time. 
            Built by experts who've automated infrastructure for Fortune 500 companies.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/auth/sign-in?redirect=/dashboard/scripts">
                Access Premium Scripts
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Request Custom Script
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta mb-2">MVP</div>
              <Text variant="small" className="text-muted-foreground">Launching with 3–5 scripts</Text>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta mb-2">MIT</div>
              <Text variant="small" className="text-muted-foreground">Permissive licensing</Text>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta mb-2">README</div>
              <Text variant="small" className="text-muted-foreground">Docs + rollback steps</Text>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta mb-2">Notify</div>
              <Text variant="small" className="text-muted-foreground">Get updates by email</Text>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <Heading as="h2" variant="h2" className="mb-4">
              Scripts Library (MVP)
            </Heading>
            <Text variant="lead" className="max-w-2xl mx-auto">
              We’re starting with proven, practical scripts. No inflated adoption numbers—just useful tools with clear docs.
            </Text>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <Code className="h-12 w-12 text-magenta" />
              <div>
                <Heading as="h3" variant="h4" className="mb-2">
                  Enterprise Automation Scripts
                </Heading>
                <Text variant="small" className="text-muted-foreground">
                  Cloud Infrastructure • AI/ML Pipelines • DevOps Automation
                </Text>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-magenta rounded-full"></div>
                <Text>Azure Idle‑VM Shutoff (session‑aware)</Text>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-magenta rounded-full"></div>
                <Text>Citrix Logon Time Analyzer</Text>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-magenta rounded-full"></div>
                <Text>Azure Cost Export + Idle Tagger (DecomCandidate)</Text>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-magenta rounded-full"></div>
                <Text>Autoscale Policy Pack (off‑hours schedules)</Text>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=script-notification">
                  Notify me when new scripts are added
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-magenta-500/10 bg-gradient-to-r to-purple-600/10 section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Need a Custom Script Now?
          </Heading>
          <Text variant="lead" className="mb-8">
            Our team can develop custom automation scripts tailored to your specific requirements. 
            From complex infrastructure automation to specialized AI pipelines.
          </Text>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact?type=custom-script">Request Custom Script</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
          <Text variant="small" className="mt-6 text-muted-foreground">
            Typical delivery in 5-10 business days • Starting at $2,500
          </Text>
        </div>
      </section>
    </PageLayout>
  );
}