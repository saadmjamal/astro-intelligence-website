'use client'

import { motion } from 'framer-motion'

const steps = [
  { title: 'Weeks 0–2', copy: 'Opportunity map + executive ROI model.' },
  { title: 'Weeks 3–6', copy: 'Pilot copilot/automation with guardrails.' },
  { title: 'Weeks 7–12', copy: 'Production rollout + telemetry dashboard.' },
]

export default function HowWeWork() {
  return (
    <section className="relative section-padding">
      <div className="container-width">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">How we work</h2>
          <p className="text-text-secondary mt-2">Fast path to value with a low‑risk rollout on your stack.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-gap-md">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-morphism rounded-2xl card-padding h-full"
            >
              <div className="text-sm text-tech-accent font-semibold mb-1">{s.title}</div>
              <div className="text-white font-medium">{s.copy}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


