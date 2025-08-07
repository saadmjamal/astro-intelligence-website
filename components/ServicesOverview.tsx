'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { services } from '@/lib/config/services.config';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Section, SectionHeader, SectionContent, SectionFooter } from '@/components/ui/Section';
import RecommendationEngine from '@/components/ai/RecommendationEngine';

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
    <Section size="lg" spacing="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          overline="COMPREHENSIVE SOLUTIONS"
          title="Transform Your Business with AI & Cloud Solutions"
          description="Proven solutions that reduce costs, increase efficiency, and deliver measurable results your team will love"
          titleVariant="display"
        />
      </motion.div>

      <SectionContent layout="grid" columns={2}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="contents"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item}>
              <Card
                variant="elevated"
                hierarchy="secondary"
                prominence="medium"
                hover
                className="group hover:border-magenta-500/30 h-full transition-all duration-300"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-magenta/10 text-magenta shadow-sm">
                  {service.iconComponent ? <service.iconComponent className="h-7 w-7" /> : service.icon}
                </div>
                <Heading as="h3" variant="h3" hierarchy="primary" className="mb-4">
                  {service.title}
                </Heading>
                <Text variant="body-large" hierarchy="muted" className="mb-8">
                  {service.description}
                </Text>
                <Button variant="tertiary" prominence="low" size="sm" asChild>
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
      </SectionContent>

      {/* AI-Powered Service Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16"
      >
        <RecommendationEngine
          userProfile={{
            industry: 'technology',
            companySize: 'medium',
            currentChallenges: ['cloud costs', 'scalability', 'automation'],
            interests: ['ai', 'cost optimization', 'devops']
          }}
          maxRecommendations={3}
        />
      </motion.div>

      <SectionFooter variant="cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button size="lg" prominence="high" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </motion.div>
      </SectionFooter>
    </Section>
  );
}
