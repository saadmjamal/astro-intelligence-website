'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Beaker, FileText, GitBranch, Users } from 'lucide-react';

const researchAreas = [
  {
    icon: Beaker,
    title: 'AI Innovation Lab',
    description: 'Exploring cutting-edge AI applications and ethical implementation strategies.',
    link: '/lab',
  },
  {
    icon: FileText,
    title: 'Technical Publications',
    description: 'Research papers and technical articles on cloud optimization and AI systems.',
    link: '/lab/publications',
  },
  {
    icon: GitBranch,
    title: 'Open Source',
    description: 'Contributing to the community with tools and frameworks we have developed.',
    link: '/lab/open-source',
  },
  {
    icon: Users,
    title: 'Industry Partnerships',
    description: 'Collaborating with leading organizations to push technological boundaries.',
    link: '/lab/partnerships',
  },
];

export default function AgencyResearchLab() {
  return (
    <section className="py-24 bg-white dark:bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 text-accent-primary">Research Lab</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Pioneering Tomorrow's Technology
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our research lab is where innovation meets practical application. We're constantly 
              exploring new technologies and methodologies to stay ahead of the curve.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <dt>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-primary/10">
                    <area.icon className="h-6 w-6 text-accent-primary" />
                  </div>
                  <p className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                    {area.title}
                  </p>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {area.description}
                </dd>
                <Link
                  href={area.link}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-accent-primary transition-all hover:text-accent-secondary"
                >
                  Explore
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Featured Research */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary p-8 text-white lg:p-12"
        >
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Latest Research: AI-Powered Code Optimization
              </h3>
              <p className="mt-3 max-w-2xl text-lg opacity-90">
                Our latest research demonstrates how AI can reduce code complexity by 40% 
                while improving performance by 25%. Download our whitepaper to learn more.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <Link
                href="/lab/publications/ai-code-optimization"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-accent-primary shadow-sm transition-all hover:bg-gray-100"
              >
                Read Research
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}