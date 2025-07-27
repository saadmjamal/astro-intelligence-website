'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
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
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <Heading as="h3" variant="h3" color="magenta" className="mb-2">
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {displayValue.toLocaleString()}
        </motion.span>
        {suffix}
      </Heading>
      <Text variant="body" className="text-offwhite/70">
        {label}
      </Text>
    </div>
  );
}
