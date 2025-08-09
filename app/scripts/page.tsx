import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function ScriptsMarketplacePage() {
  return (
    <main className="px-6 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Enterprise Automation Scripts</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Production-ready scripts and tools that save weeks of engineering time. Clear docs, rollback steps, and safe-by-default policies.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            id: 'azure-idle-vm-shutoff',
            title: 'Azure Idle‑VM Shutoff (session‑aware)',
            summary: 'Stop idle VMs safely with user-session awareness and change approvals.',
            href: '/contact?type=script&name=azure-idle-vm-shutoff'
          },
          {
            id: 'citrix-logon-time-analyzer',
            title: 'Citrix Logon Time Analyzer',
            summary: 'Collect, parse, and trend logon phases to locate bottlenecks fast.',
            href: '/contact?type=script&name=citrix-logon-time-analyzer'
          },
          {
            id: 'azure-cost-export-idle-tagger',
            title: 'Azure Cost Export + Idle Tagger',
            summary: 'Export costs, identify decom candidates, and tag resources for action.',
            href: '/contact?type=script&name=azure-cost-export-idle-tagger'
          },
          {
            id: 'autoscale-policy-pack',
            title: 'Autoscale Policy Pack (off‑hours schedules)',
            summary: 'Opinionated policy pack to scale down safely during off‑hours.',
            href: '/contact?type=script&name=autoscale-policy-pack'
          }
        ].map((s) => (
          <article key={s.id} className="rounded-2xl border border-white/10 p-6 bg-white/5 dark:bg-black/30">
            <h2 className="text-lg font-semibold mb-2">{s.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{s.summary}</p>
            <div className="flex gap-3">
              <Link href={s.href} className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-400 text-black font-medium" data-analytics="scripts-cta-contact">
                Contact for Access
              </Link>
              <Link href="/services" className="inline-flex items-center px-4 py-2 rounded-md border border-white/20">
                View Services
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="text-center mt-14">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Launching with 3–5 scripts • MIT/Apache‑2.0 where possible</p>
        <Link href="/contact?type=script-notification" className="inline-flex items-center px-5 py-3 rounded-md border border-white/20" data-analytics="scripts-cta-notify">
          Notify me when new scripts are added
        </Link>
      </section>
    </main>
  )
}
