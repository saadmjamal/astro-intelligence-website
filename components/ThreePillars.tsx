'use client'

import { motion } from 'framer-motion'
import { DollarSign, Bot, ShieldCheck } from 'lucide-react'

const pillars = [
  {
    icon: DollarSign,
    title: 'Cost Optimization',
    copy: 'LLM‑assisted FinOps and workflow automation that reduce opex now.'
  },
  {
    icon: Bot,
    title: 'Copilots & Agents',
    copy: 'Task‑level assistants for IT, Ops, and Finance that remove hours and errors.'
  },
  {
    icon: ShieldCheck,
    title: 'Governance & Safety',
    copy: 'SOC 2, PII redaction, evals, and access controls baked in from day one.'
  },
]

export default function ThreePillars() {
  return (
    <section className="relative section-padding">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-gap-md">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-3d card-padding h-full"
            >
              <p.icon className="h-6 w-6 text-tech-accent mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-text-secondary">{p.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


