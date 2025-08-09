export default function CostOptimization() {
  return (
    <main className="min-h-screen section-padding">
      <div className="container-width">
        <h1 className="text-3xl font-bold mb-4">Cost Optimization</h1>
        <p className="text-muted-foreground mb-6">FinOps with policy-as-code: rightsizing, schedules, lifecycle. Changes with approvals and telemetry.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">Quick wins</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Idle/off-hours schedules</li>
              <li>Storage lifecycle</li>
              <li>Commitments planning</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">Rollout</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Week 1–2: discovery + tagging</li>
              <li>Week 3–4: policies + guardrails</li>
              <li>Week 5–6: pilot + dashboards</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">KPIs</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Idle tagged percentage</li>
              <li>Approved changes applied</li>
              <li>Budget variance trending</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
