import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security & Trust Center',
  description: 'How we protect your data: isolation, least privilege, incident response, and compliance.',
}

export default function TrustCenterPage() {
  return (
    <main className="section-padding">
      <div className="prose prose-invert max-w-3xl">
        <h1>Security & Trust Center</h1>
        <p>We provide security by design across architecture, operations, and AI workflows.</p>

        <h2>Environment Isolation</h2>
        <ul>
          <li>Tenant‑scoped deployments; dedicated resource groups and service principals.</li>
          <li>Network controls and private endpoints where supported.</li>
        </ul>

        <h2>Least Privilege</h2>
        <ul>
          <li>Role‑based access with time‑boxed elevation; secrets managed in KMS.</li>
          <li>Separation of duties for CI/CD and production change controls.</li>
        </ul>

        <h2>Monitoring & Incident Response</h2>
        <ul>
          <li>Centralized logging/metrics; anomaly alerts; runbook‑driven response.</li>
          <li>Post‑incident reviews and corrective actions tracked to closure.</li>
        </ul>

        <h2>Compliance</h2>
        <ul>
          <li>Evidence artifacts for SOC 2 and GDPR available under NDA.</li>
          <li>Data Processing Addendum (DPA) template available upon request.</li>
        </ul>

        <p>
          See our <a href="/ethical-ai">Ethical AI Policy</a> for AI‑specific controls.
        </p>
      </div>
    </main>
  )
}



