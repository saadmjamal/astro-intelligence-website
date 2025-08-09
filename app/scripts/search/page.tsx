'use client'
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { scripts } from '@/lib/scripts-data-enhanced'

export default function ScriptSearchPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [paid, setPaid] = useState<'all'|'free'|'premium'>('all')

  const categories = useMemo(() => {
    const c = new Set<string>(scripts.map(s => s.category))
    return ['all', ...Array.from(c)]
  }, [])

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    return scripts.filter(s => {
      if (cat !== 'all' && s.category !== cat) return false
      if (paid !== 'all' && (paid === 'free' ? s.isPremium : !s.isPremium)) return false
      if (!query) return true
      const hay = [s.title, s.description, s.language, ...(s.features||[])].join(' ').toLowerCase()
      return hay.includes(query)
    })
  }, [q, cat, paid])

  return (
    <main className="px-6 py-16">
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Search Scripts</h1>
        <p className="text-gray-600 dark:text-gray-300">Find automation scripts by name, capability, category, or language.</p>
      </section>

      <section className="max-w-6xl mx-auto grid gap-4 md:grid-cols-3 mb-8">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search by name, feature, or language..."
          className="w-full rounded-md border border-white/20 bg-white/5 dark:bg-black/30 px-3 py-2"
          aria-label="Search scripts"
        />
        <select value={cat} onChange={e => setCat(e.target.value)} className="w-full rounded-md border border-white/20 bg-white/5 dark:bg-black/30 px-3 py-2" aria-label="Filter by category">
          {categories.map(c => (
            <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>
          ))}
        </select>
        <div className="flex gap-2">
          {(['all','free','premium'] as const).map(k => (
            <button key={k} onClick={() => setPaid(k)} className={`flex-1 rounded-md px-3 py-2 border ${paid===k?'bg-emerald-400 text-black border-emerald-400':'border-white/20 bg-white/5 dark:bg-black/30'}`} aria-pressed={paid===k}>
              {k[0].toUpperCase()+k.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{results.length} result{results.length!==1?'s':''}</div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map(s => (
            <article key={s.id} className="rounded-2xl border border-white/10 p-6 bg-white/5 dark:bg-black/30">
              <div className="mb-2 text-xs uppercase tracking-wide text-gray-400">{s.category} • {s.language}</div>
              <h2 className="text-lg font-semibold mb-2">{s.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{s.description}</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 list-disc list-inside">
                {(s.features||[]).slice(0,2).map((f,i)=>(<li key={i}>{f}</li>))}
              </ul>
              <div className="flex items-center justify-between">
                <strong>{s.isPremium ? `$${(s.price/100).toFixed(0)}` : 'Free'}</strong>
                <Link href={`/scripts/${s.id}`} className="text-emerald-400" data-analytics="scripts-search-view">View Details →</Link>
              </div>
            </article>
          ))}
        </div>
        {results.length===0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">No scripts match your criteria.</div>
        )}
      </section>
    </main>
  )
}
