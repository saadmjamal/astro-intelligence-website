'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const caseStudies = [
  {
    title: '33Seconds Dating App',
    category: 'AI & Mobile',
    description: 'Revolutionary AI-powered video dating app that increased user connections by 250%.',
    image: '/images/case-studies/33seconds-dating.svg',
    metrics: ['250% more connections', '95% video quality', 'Real-time AI matching'],
    link: '/portfolio/33seconds-dating-app',
    gradient: 'from-pink-600 to-purple-600',
  },
  {
    title: 'Houston Property Services',
    category: 'Automation',
    description: 'Automated quote generation system that increased revenue by 45% in 6 months.',
    image: '/images/case-studies/houston-property.svg',
    metrics: ['45% revenue increase', '90% faster quotes', '80% time saved'],
    link: '/portfolio/houston-property-services',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'FinTech Transformation',
    category: 'Cloud & Security',
    description: 'Complete cloud migration reducing infrastructure costs by 60% while improving security.',
    image: '/images/case-studies/fintech-transformation.svg',
    metrics: ['60% cost reduction', '99.99% uptime', 'SOC 2 compliant'],
    link: '/portfolio/fintech-transformation',
    gradient: 'from-green-600 to-teal-600',
  },
];

export default function AgencyPortfolio() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-accent-primary">Case Studies</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Success Stories That Speak Volumes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Real results from real clients. See how we've helped businesses transform 
            their operations and accelerate growth.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-gray-800"
            >
              {/* Image placeholder with gradient */}
              <div className={`aspect-[16/9] bg-gradient-to-br ${study.gradient} opacity-10`} />
              
              <div className="p-6">
                <p className="text-sm font-semibold text-accent-primary">{study.category}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                  {study.title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {study.description}
                </p>
                
                {/* Metrics */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={study.link}
                  className="mt-6 inline-flex items-center font-semibold text-accent-primary transition-all hover:text-accent-secondary"
                >
                  Read case study
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-lg bg-accent-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-accent-secondary hover:shadow-md"
          >
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}