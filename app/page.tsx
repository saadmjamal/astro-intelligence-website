export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="bg-black text-white">
      <section className="px-6 py-20 text-center">
        <p className="uppercase tracking-widest text-xs text-emerald-400/80 mb-4">Enterprise AI Outcomes</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Cut run‑rate costs 20–40% in 90 days with<br className="hidden md:block" />
          enterprise AI automation
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Copilots and agents built on your stack with SOC 2 guardrails, approvals, telemetry, and ROI dashboards. From pilot to production in 6–12 weeks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact?type=cost-teardown"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-emerald-400 text-black hover:bg-emerald-300 transition"
            data-analytics="hero-cta-book-teardown"
          >
            Book a Cost Teardown
          </a>
          <a
            href="/solutions"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold border border-white/20 hover:bg-white/10 transition"
          >
            Explore Solutions
          </a>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-sm text-gray-300">
          <div className="rounded-lg border border-white/10 px-4 py-3 glass-morphism">Guardrails & approvals</div>
          <div className="rounded-lg border border-white/10 px-4 py-3 glass-morphism">Telemetry & ROI dashboards</div>
          <div className="rounded-lg border border-white/10 px-4 py-3 glass-morphism">Pilot → Production in 6–12 weeks</div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10 text-center">
        <h2 className="text-2xl font-bold mb-2">Core Offers</h2>
        <p className="text-gray-300 mb-8">Bounded, outcome‑driven engagements that de‑risk adoption.</p>
        <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 p-6 text-left glass-morphism">
            <h3 className="font-semibold mb-2">Cloud Cost Teardown (14 days)</h3>
            <p className="text-gray-300 mb-4">Evidence‑based audit, quick wins, and policy scripts. ≥15% savings identified or 20% fee refund.</p>
            <a href="/services" className="text-emerald-400">See the 14‑day plan →</a>
          </div>
          <div className="rounded-2xl border border-white/10 p-6 text-left glass-morphism">
            <h3 className="font-semibold mb-2">AI‑Powered Ops Pilot (6 weeks)</h3>
            <p className="text-gray-300 mb-4">Ticket deflection, idle orchestration, and HIL change assistant with approvals.</p>
            <a href="/solutions/ai-service-desk" className="text-emerald-400">Start a pilot →</a>
          </div>
          <div className="rounded-2xl border border-white/10 p-6 text-left glass-morphism">
            <h3 className="font-semibold mb-2">Citrix Modernization Sprint (4 weeks)</h3>
            <p className="text-gray-300 mb-4">Logon analytics, image lifecycle automation, and capacity plan.</p>
            <a href="/solutions/cost-optimization" className="text-emerald-400">Modernize VDI →</a>
          </div>
        </div>
      </section>
    </main>
  )
}