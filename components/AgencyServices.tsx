'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Cloud, Brain, Zap } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'Smart AI Workflow Integration',
    description: 'Boost productivity by 75% with intelligent workflows that adapt to your business needs.',
    benefits: ['Adaptive automation', 'Smart task routing', 'Process optimization'],
    link: '/services/smart-ai-workflow',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Bot,
    title: 'Autonomous L1 AI Service Desk',
    description: 'Reduce support costs by 60% while improving response times and customer satisfaction.',
    benefits: ['24/7 AI support', '90% instant resolution', 'Smart escalation'],
    link: '/services/autonomous-service-desk',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Cloud,
    title: 'AI Infrastructure Monitoring',
    description: 'Prevent 95% of outages with predictive monitoring that knows your systems better than you do.',
    benefits: ['Predictive alerts', 'Auto-remediation', 'Custom anomaly detection'],
    link: '/services/ai-infrastructure-monitoring',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Zap,
    title: 'AI-Driven Cloud Cost Optimization',
    description: 'Cut cloud spend by 40-70% without compromising performance through intelligent resource management.',
    benefits: ['Automated rightsizing', 'Cost anomaly detection', 'Multi-cloud optimization'],
    link: '/services/ai-cloud-cost-optimization',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
];

export default function AgencyServices() {
  return (
    <section className="py-24 bg-white dark:bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-accent-primary">Enterprise AI Solutions</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Transform Your Business with AI
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Deploy enterprise-grade AI solutions that deliver measurable ROI, reduce operational costs,
            and create sustainable competitive advantages for your organization.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-50 p-8 transition-all hover:shadow-lg dark:bg-gray-900"
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg ${service.bgColor} p-3`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg className="mr-2 h-4 w-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.link}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-accent-primary transition-all hover:text-accent-secondary"
                  >
                    Learn more
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}