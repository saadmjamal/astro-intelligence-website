export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ethical AI Policy',
  description: 'Plain-English policy on data use, guardrails, human‑in‑the‑loop, auditability, and opt‑outs.'
}

export default function EthicalAIPage() {
  return (
    <main className="px-6 py-16">
      <section className="content-width">
        <h1 className="text-4xl font-bold mb-4">Ethical AI Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We design AI systems to protect people. This policy summarizes how we handle data, decisions, and accountability.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">1) Data Minimization & Purpose</h2>
            <p className="text-gray-300">We collect only what is necessary for the task. Sensitive data is excluded or redacted by default.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2) Human‑in‑the‑Loop (HIL)</h2>
            <p className="text-gray-300">High‑impact actions require approvals. All AI change proposals are reviewable with diffs and rollback steps.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3) Auditability & Logs</h2>
            <p className="text-gray-300">We keep SOC 2 style audit logs: input source, model version, prompts, outputs, and approvers.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4) Model & Vendor Limits</h2>
            <p className="text-gray-300">We avoid sending secrets to third parties; we enforce time‑boxed retention and regionalization where possible.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5) Opt‑outs & Redress</h2>
            <p className="text-gray-300">People can opt‑out of AI processing where alternatives exist. Issues are triaged with an incident process.</p>
          </section>
        </div>

        <div className="mt-10">
          <a href="/contact?type=ethics" className="inline-flex items-center px-5 py-3 rounded-md bg-emerald-400 text-black font-semibold" data-analytics="ethical-cta-contact">
            Contact our AI Ethics Lead
          </a>
        </div>
      </section>
    </main>
  )
}


