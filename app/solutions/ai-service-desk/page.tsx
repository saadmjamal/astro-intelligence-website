export const dynamic = 'force-dynamic'
export default function AIServiceDesk() {
  return (
    <main className="min-h-screen section-padding">
      <div className="container-width">
        <h1 className="text-3xl font-bold mb-4">AI Service Desk</h1>
        <p className="text-muted-foreground mb-6">Deflect common tickets with domain-aware copilots. Approvals and audit trails for risky actions.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">How it works</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Intents (password reset, access, triage)</li>
              <li>Integrations: ServiceNow/Jira/M365/Slack</li>
              <li>Escalation and human-in-the-loop</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">Rollout</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Week 1–2: intents + redaction</li>
              <li>Week 3–4: policies + approvals</li>
              <li>Week 5–6: pilot + metrics</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">KPIs</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Deflection rate (policy-defined)</li>
              <li>Mean time to resolution</li>
              <li>Audit completeness</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
