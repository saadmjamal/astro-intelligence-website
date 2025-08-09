export const dynamic = 'force-dynamic'

import { scripts as allScripts } from '@/lib/scripts-data-enhanced'

type SearchParams = { ids?: string }

function formatPrice(cents?: number): string {
  if (typeof cents !== 'number') return 'Free'
  if (cents === 0) return 'Free'
  return `$${(cents / 100).toFixed(0)}`
}

export default function ScriptComparePage({
  searchParams
}: {
  searchParams?: SearchParams
}) {
  const ids = (searchParams?.ids || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const base = ids.length
    ? allScripts.filter((s) => ids.includes(s.id))
    : [...allScripts]
        .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
        .slice(0, 3)

  const queryIds = base.map((s) => s.id).join(',')

  return (
    <main className="px-6 py-16">
      <section className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Compare Scripts</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Deterministic, SSR‑safe comparison of production scripts. Use the URL parameter
          <code className="mx-1 px-1 rounded bg-white/10">?ids=</code>
          with comma‑separated IDs to customize. Current:
          <span className="ml-1 font-semibold">{queryIds || 'top‑downloaded'}</span>
        </p>
        <div className="mt-3 text-sm text-gray-500">
          Example:&nbsp;
          <a href="/scripts/compare?ids=azure-idle-vm-shutoff,citrix-logon-time-analyzer,autoscale-policy-pack" className="underline">
            /scripts/compare?ids=azure-idle-vm-shutoff,citrix-logon-time-analyzer,autoscale-policy-pack
          </a>
        </div>
      </section>

      <section className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 max-w-7xl mx-auto">
          <thead>
            <tr>
              <th className="text-left sticky left-0 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-3">Attribute</th>
              {base.map((s) => (
                <th key={s.id} className="min-w-[240px] border border-white/10 px-4 py-3 text-left">
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-xs text-gray-400">{s.id}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'Category', get: (s: typeof allScripts[number]) => s.category.replace('-', ' ') },
              { key: 'Language', get: (s) => s.language },
              { key: 'Price', get: (s) => formatPrice(s.price) },
              { key: 'Premium', get: (s) => (s.isPremium ? 'Yes' : 'No') },
              { key: 'Version', get: (s) => s.version || '—' },
              { key: 'Last Updated', get: (s) => s.lastUpdated || '—' },
              { key: 'Downloads', get: (s) => (s.downloads != null ? s.downloads.toString() : '—') },
              { key: 'Features', get: (s) => (s.features?.length ? `${s.features.length} items` : '—') },
            ].map((row) => (
              <tr key={row.key}>
                <td className="sticky left-0 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-3 font-medium">
                  {row.key}
                </td>
                {base.map((s) => (
                  <td key={`${row.key}-${s.id}`} className="align-top border border-white/10 px-4 py-3">
                    {row.get(s)}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA row */}
            <tr>
              <td className="sticky left-0 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-3 font-medium">Action</td>
              {base.map((s) => (
                <td key={`cta-${s.id}`} className="border border-white/10 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/contact?type=script&name=${encodeURIComponent(s.id)}`}
                      className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-400 text-black font-medium"
                      data-analytics="compare-cta-contact"
                    >
                      Contact for Access
                    </a>
                    {s.documentation && (
                      <a href={s.documentation} className="inline-flex items-center px-4 py-2 rounded-md border border-white/20">
                        Docs
                      </a>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      <section className="max-w-7xl mx-auto mt-10 text-sm text-gray-500">
        <p>
          To compare different scripts, append <code className="px-1 rounded bg-white/10">?ids=</code> with their IDs from the
          <a href="/scripts" className="underline ml-1">Scripts</a> page.
        </p>
      </section>
    </main>
  )
}
