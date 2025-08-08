'use client'

import { motion } from 'framer-motion'

const metrics = [
  { value: '−28%', label: 'Cloud Spend' },
  { value: '−48%', label: 'Ticket Resolution Time' },
  { value: '−35%', label: 'Month‑End Close' },
  { value: '6–10 wks', label: 'Time‑to‑Deploy' },
]

export default function OutcomeMetricsBand() {
  return (
    <section className="relative -mt-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl glass-morphism px-4 py-3 text-center"
            >
              <div className="text-2xl font-extrabold text-white">{m.value}</div>
              <div className="text-sm text-gray-300">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


