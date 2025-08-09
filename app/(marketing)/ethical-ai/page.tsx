import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ethical AI Policy',
  description: 'Plain‑English policy outlining data handling, human‑in‑the‑loop, audit logs, privacy, and model limits.',
}

export default function EthicalAIPage() {
  return (
    <main className="section-padding">
      <div className="prose prose-invert max-w-3xl">
        <h1>Ethical AI Policy</h1>
        <p>
          We design AI systems that protect people. This page explains our commitments and the controls we implement
          in every engagement.
        </p>

        <h2>Data Handling</h2>
        <ul>
          <li>Data stays in your tenant where feasible; otherwise, isolated environments with least privilege.</li>
          <li>PII redaction and minimization by default; no data is used to train third‑party models without written consent.</li>
          <li>Clear retention policies; secure deletion on request.</li>
        </ul>

        <h2>Human‑in‑the‑Loop (HIL)</h2>
        <ul>
          <li>High‑risk actions require human review and explicit approval workflows.</li>
          <li>All AI change proposals are logged with rationale and can be rolled back.</li>
        </ul>

        <h2>Audit & Transparency</h2>
        <ul>
          <li>Comprehensive audit trails of prompts, models, versions, and outputs.</li>
          <li>Documented model and policy configurations per environment.</li>
        </ul>

        <h2>Model Limits & Safety</h2>
        <ul>
          <li>Safety evals for hallucinations, PII leakage, jailbreaks; policy‑as‑code guardrails.</li>
          <li>Rollback and circuit‑breaker mechanisms on anomaly detection.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions? <a href="/contact">Contact us</a> for our full policy pack and evidence artifacts (SOC 2, DPA template).
        </p>
      </div>
    </main>
  )
}



