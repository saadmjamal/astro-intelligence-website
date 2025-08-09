'use client'

import { motion } from 'framer-motion'

const proofs = [
  {
    title: 'Fortune 100 FinServ',
    stat: '−31% cloud run‑rate',
    detail: '12 weeks · Azure',
  },
  {
    title: 'Global Support',
    stat: '−42% handle time',
    detail: 'Service Desk Copilot · Bedrock',
  },
  {
    title: 'Finance Ops',
    stat: '−35% month‑end close',
    detail: 'Reconciliation Agent · Vertex + Snowflake',
  },
]

export default function ProofStrip() {
  return (
    <section className="section-padding-sm">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-gap-sm">
          {proofs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-morphism rounded-2xl card-padding"
            >
              <div className="text-xs text-white/70 uppercase tracking-wide mb-1">{p.title}</div>
              <div className="text-xl font-bold text-white">{p.stat}</div>
              <div className="text-sm text-white/80 mt-1">{p.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



