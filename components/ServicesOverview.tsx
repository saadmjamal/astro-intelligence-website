'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

const services = [
  {
    title: 'AI-Enhanced Orchestration',
    description: 'Intelligent automation for cloud infrastructure and CI/CD pipelines with ML-driven optimization.',
    icon: '🤖',
    href: '/services/ai-enhanced-orchestration',
  },
  {
    title: 'DevOps as a Service',
    description: 'End-to-end DevOps implementation and management for seamless deployment workflows.',
    icon: '⚡',
    href: '/services/devops-as-a-service',
  },
  {
    title: 'Platform Engineering',
    description: 'Build scalable, self-service developer platforms that accelerate innovation.',
    icon: '🏗️',
    href: '/services/platform-engineering',
  },
  {
    title: 'Microservices Architecture',
    description: 'Design and implement cloud-native microservices for maximum flexibility and scale.',
    icon: '🔧',
    href: '/services/microservices-architecture',
  },
];

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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Heading as="h2" variant="h2" className="mb-4">
            Our Services
          </Heading>
          <Text variant="lead" className="max-w-3xl mx-auto text-offwhite/80">
            Cutting-edge solutions that combine AI, cloud expertise, and engineering excellence
          </Text>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative bg-gradient-to-br from-offwhite/5 to-offwhite/0 backdrop-blur-sm border border-offwhite/10 rounded-2xl p-8 hover:border-magenta/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-magenta/0 to-magenta/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{service.icon}</div>
                <Heading as="h3" variant="h4" className="mb-3">
                  {service.title}
                </Heading>
                <Text variant="body" className="mb-6 text-offwhite/70">
                  {service.description}
                </Text>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={service.href}>
                    Learn More
                    <svg
                      className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}