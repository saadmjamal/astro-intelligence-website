export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Security & Trust Center',
  description: 'Evidence of controls: data handling, environment isolation, least privilege, incident response.'
}

export default function TrustCenterPage() {
  return (
    <main className="px-6 py-16">
      <section className="content-width">
        <h1 className="text-4xl font-bold mb-4">Security & Trust Center</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">This page summarizes how we protect data and operate reliably.</p>

        <div className="grid gap-6 md:grid-cols-2">
          {[ 
            { title: 'Data Handling', bullets: ['Encryption in transit and at rest', 'Scoped service accounts', 'PII redaction by default'] },
            { title: 'Isolation', bullets: ['Per‑environment separation', 'Least privilege IAM', 'Secrets in managed vaults'] },
            { title: 'Monitoring', bullets: ['Audit logs for actions', 'Alerting on anomalies', 'Runbook automation'] },
            { title: 'Incident Response', bullets: ['Triage in < 30m target', 'Root cause analysis', 'Customer comms SOP'] }
          ].map((c) => (
            <article key={c.title} className="rounded-2xl border border-white/10 p-6 bg-white/5 dark:bg-black/30">
              <h2 className="text-lg font-semibold mb-2">{c.title}</h2>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {c.bullets.map((b) => (<li key={b}>{b}</li>))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <a href="/contact?type=security" className="inline-flex items-center px-5 py-3 rounded-md bg-emerald-400 text-black font-semibold" data-analytics="trust-cta-contact">
            Request our security briefing
          </a>
        </div>
      </section>
    </main>
  )
}


