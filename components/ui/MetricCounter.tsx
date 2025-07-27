'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Heading, Text } from './Typography';

interface MetricCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function MetricCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 2,
}: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <div ref={ref} className="text-center">
      <Heading as="h3" variant="h3" color="magenta" className="mb-2">
        {prefix}
        <motion.span
          onUpdate={(latest) => {
            if (ref.current) {
              const countElement = ref.current.querySelector('.counter-value');
              if (countElement) {
                countElement.textContent = Math.round(latest).toLocaleString();
              }
            }
          }}
          style={{ x: springValue }}
        />
        <span className="counter-value">0</span>
        {suffix}
      </Heading>
      <Text variant="body" className="text-offwhite/70">
        {label}
      </Text>
    </div>
  );
}