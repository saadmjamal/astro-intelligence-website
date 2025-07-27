'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';

interface HeroProps {
  tagline: string;
}

export default function Hero({ tagline }: HeroProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black">
        <div className="from-magenta/20 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Astro Intelligence
          </Heading>

          <Text variant="lead" className="mx-auto mb-8 max-w-3xl">
            {tagline}
          </Text>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/book-call">Book a Discovery Call</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-magenta/30 absolute h-1 w-1 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="text-offwhite/50 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
