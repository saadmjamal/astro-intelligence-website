'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { services } from '@/lib/config/services.config';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ServicesOverview() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Heading as="h2" variant="h2" className="mb-4">
            Our Services
          </Heading>
          <Text variant="lead" className="text-offwhite/80 mx-auto max-w-3xl">
            Cutting-edge solutions that combine AI, cloud expertise, and engineering excellence
          </Text>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item}>
              <Card
                variant="glass"
                className="group hover:shadow-glow hover:border-magenta-500/50 h-full transition-all duration-300"
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <Heading as="h3" variant="h4" className="mb-3">
                  {service.title}
                </Heading>
                <Text variant="body" className="mb-6 text-gray-600 dark:text-gray-300">
                  {service.description}
                </Text>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/services/${service.slug}`}>
                    Learn More
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
