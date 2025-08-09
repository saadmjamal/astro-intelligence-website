"use client";
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { scripts } from '@/lib/scripts-data-enhanced'

export default function ScriptComparePage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id)
      ? prev.filter(x => x !== id)
      : prev.length < 3 ? [...prev, id] : prev)
  }

  const chosen = useMemo(() => scripts.filter(s => selected.includes(s.id)), [selected])

  return (
    <main className="px-6 py-16">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Compare Scripts</h1>
        <p className="text-gray-600 dark:text-gray-300">Select up to 3 scripts to compare key attributes.</p>
      </section>

      <section className="max-w-6xl mx-auto mb-10">
        <div className="grid gap-3 md:grid-cols-3">
          {scripts.slice(0, 12).map(s => (
            <label key={s.id} className="flex items-start gap-3 rounded-xl border border-white/10 p-4 bg-white/5 dark:bg-black/30 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(s.id)}
                onChange={() => toggle(s.id)}
                aria-label={`Select ${s.title}`}
              />
              <div>
                <div className="text-sm uppercase tracking-wide text-gray-400">{s.category} • {s.language}</div>
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{s.description}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">{selected.length} of 3 selected</div>
      </section>

      {chosen.length >= 2 && (
        <section className="max-w-6xl mx-auto">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 dark:bg-black/30">
                  <th className="text-left p-3">Feature</th>
                  {chosen.map(s => (
                    <th key={s.id} className="text-left p-3">
                      <div className="font-semibold mb-1">{s.title}</div>
                      <div className="text-xs text-gray-400">{s.category} • {s.language}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-medium">Price</td>
                  {chosen.map(s => (
                    <td key={s.id} className="p-3">{s.isPremium ? `$${(s.price/100).toFixed(0)}` : 'Free'}</td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-medium">Top Features</td>
                  {chosen.map(s => (
                    <td key={s.id} className="p-3">
                      <ul className="list-disc list-inside space-y-1">
                        {(s.features || []).slice(0,3).map((f,i)=>(<li key={i}>{f}</li>))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-medium">Actions</td>
                  {chosen.map(s => (
                    <td key={s.id} className="p-3">
                      <Link href={`/scripts/${s.id}`} className="text-emerald-400" data-analytics="scripts-compare-view">View Details →</Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  )
}