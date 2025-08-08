'use client'

import Link from 'next/link'

interface OfferCardProps {
  title: string
  excerpt: string
  guarantee?: string
  cta: string
  href: string
  icon?: React.ReactNode
}

export default function OfferCard({ title, excerpt, guarantee, cta, href, icon }: OfferCardProps) {
  return (
    <div className="card-3d card-padding h-full">
      <div className="flex items-start gap-3 mb-3">
        {icon && <div className="text-tech-accent">{icon}</div>}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-text-secondary mb-4">{excerpt}</p>
      {guarantee && (
        <div className="text-sm text-white/85 bg-white/5 border border-white/10 rounded-lg px-3 py-2 inline-block mb-4">
          <strong>Guarantee:</strong> {guarantee}
        </div>
      )}
      <Link href={href} className="inline-flex items-center gap-2 text-tech-accent hover:text-white transition">
        <span className="font-semibold">{cta}</span>
        <span aria-hidden>→</span>
      </Link>
    </div>
  )}


