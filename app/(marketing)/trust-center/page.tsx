export const dynamic = 'force-dynamic'

export default function TrustCenterPage() {
  return (
    <main className="min-h-screen section-padding">
      <div className="container-width max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Security & Trust Center</h1>
        <p className="text-muted-foreground mb-6">We provide security by design across architecture, operations, and AI workflows.</p>
        <div className="grid gap-6">
          <section className="rounded-xl border border-border p-6">
            <h2 className="font-semibold mb-2">Environment Isolation</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Tenant‑scoped deployments; dedicated resource groups and service principals.</li>
              <li>Network controls and private endpoints where supported.</li>
            </ul>
          </section>
          <section className="rounded-xl border border-border p-6">
            <h2 className="font-semibold mb-2">Least Privilege</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Role‑based access with time‑boxed elevation; secrets managed in KMS.</li>
              <li>Separation of duties for CI/CD and production change controls.</li>
            </ul>
          </section>
          <section className="rounded-xl border border-border p-6">
            <h2 className="font-semibold mb-2">Monitoring & Incident Response</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Centralized logging/metrics; anomaly alerts; runbook‑driven response.</li>
              <li>Post‑incident reviews and corrective actions tracked to closure.</li>
            </ul>
          </section>
          <section className="rounded-xl border border-border p-6">
            <h2 className="font-semibold mb-2">Compliance</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Evidence artifacts for SOC 2 and GDPR available under NDA.</li>
              <li>Data Processing Addendum (DPA) template available upon request.</li>
            </ul>
          </section>
          <p className="text-sm text-muted-foreground">See our <a href="/ethical-ai" className="underline">Ethical AI Policy</a> for AI‑specific controls.</p>
        </div>
      </div>
    </main>
  )
}



