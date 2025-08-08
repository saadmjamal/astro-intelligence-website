'use client'

export default function ComplianceStrip() {
  return (
    <section className="section-padding-sm">
      <div className="container-width">
        <div className="glass-morphism rounded-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-white/90 font-medium">Data stays in your tenant • PII redaction • Audit trails • Evals for hallucinations & safety</div>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <span className="px-2 py-1 rounded bg-white/10 border border-white/15">SOC 2</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/15">GDPR</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/15">HIPAA</span>
          </div>
        </div>
      </div>
    </section>
  )
}


