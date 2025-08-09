export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { scripts as allScripts } from '@/lib/scripts-data-enhanced'

type SearchParams = { q?: string; category?: string }

export default function ScriptSearchPage({
  searchParams
}: {
  searchParams?: SearchParams
}) {
  const q = (searchParams?.q || '').toLowerCase()
  const category = searchParams?.category as (typeof allScripts[number])['category'] | undefined

  const results = allScripts.filter((s) => {
    const text = `${s.title} ${s.description} ${s.features?.join(' ') ?? ''}`.toLowerCase()
    const matchesQuery = q ? text.includes(q) : true
    const matchesCategory = category ? s.category === category : true
    return matchesQuery && matchesCategory
  })

  return (
    <main className="px-6 py-16">
      <section className="text-center mb-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Search Scripts</h1>
        <p className="text-gray-600 dark:text-gray-300">Server‑rendered search over the published script catalog.</p>
      </section>

      <section className="max-w-6xl mx-auto mb-6">
        <form method="get" action="/scripts/search" className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name, description, or feature…"
            className="flex-1 rounded-md border border-white/20 bg-transparent px-4 py-2"
            aria-label="Search query"
          />
          <select
            name="category"
            defaultValue={category}
            className="rounded-md border border-white/20 bg-transparent px-3 py-2"
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {[...new Set(allScripts.map((s) => s.category))].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit" className="rounded-md bg-emerald-400 text-black font-semibold px-4 py-2" data-analytics="search-submit">
            Search
          </button>
        </form>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {results.map((s) => (
          <article key={s.id} className="rounded-2xl border border-white/10 p-6 bg-white/5 dark:bg-black/30">
            <h2 className="text-lg font-semibold mb-1">{s.title}</h2>
            <div className="text-xs text-gray-400 mb-3">{s.category} • {s.language}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{s.description}</p>
            <div className="flex gap-3">
              <Link href={`/contact?type=script&name=${encodeURIComponent(s.id)}`} className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-400 text-black font-medium" data-analytics="search-cta-contact">
                Contact for Access
              </Link>
              {s.documentation && (
                <a href={s.documentation} className="inline-flex items-center px-4 py-2 rounded-md border border-white/20">
                  Docs
                </a>
              )}
            </div>
          </article>
        ))}
        {results.length === 0 && (
          <div className="text-center text-gray-500 col-span-full">No results. Try a broader query.</div>
        )}
      </section>
    </main>
  )
}
