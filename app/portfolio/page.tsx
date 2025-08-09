export const dynamic = 'force-dynamic'

export default function PortfolioPage() {
  return (
    <main className="px-6 py-16">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Enterprise Outcomes, Quantified</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We publish only attributable outcomes with approvals. First anonymized case study is in preparation. Meanwhile, here’s how we work.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            title: 'Cost Teardown → Pilot → Production',
            bullets: ['Teardown with safe-by-default changes', 'Pilot behind approvals & guardrails', 'Production with telemetry and ROI'],
          },
          {
            title: 'Evidence & Controls',
            bullets: ['Change proposals with diffs', 'SOC 2 style audit logs', 'Redaction & least privilege'],
          },
          {
            title: 'Measurable Impact',
            bullets: ['Run-rate cost reduction', 'Reliability & MTTR', 'Experience & deflection'],
          },
        ].map((c) => (
          <article key={c.title} className="rounded-2xl border border-white/10 p-6 bg-white/5 dark:bg-black/30 text-left">
            <h2 className="text-lg font-semibold mb-2">{c.title}</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="text-center mt-12">
        <a href="/contact?type=portfolio-review" className="inline-flex items-center px-5 py-3 rounded-md bg-emerald-400 text-black font-semibold" data-analytics="portfolio-cta-briefing">
          Schedule C‑Level Briefing
        </a>
      </section>
    </main>
  )
}
