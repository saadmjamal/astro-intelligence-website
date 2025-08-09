export default function AboutPage() {
  return (
    <main className="min-h-screen section-padding">
      <div className="container-width">
        <h1 className="text-3xl font-bold mb-4">About AstroIntelligence</h1>
        <p className="text-muted-foreground mb-6">
          Human‑first enterprise AI for cloud and operations. We prioritize approvals, audit trails, and telemetry to ensure safe automation and measurable outcomes.
        </p>
        <div className="rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-2">Our mission</h2>
          <p className="text-sm text-muted-foreground">
            Deliver pragmatic automation with guardrails and ROI clarity. We publish only credible outcomes and operate transparently.
          </p>
        </div>
        <div className="mt-6">
          <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-tech-green text-black font-semibold">
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}
