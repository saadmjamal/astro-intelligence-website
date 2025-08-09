export default function CloudViewX() {
  return (
    <main className="min-h-screen section-padding">
      <div className="container-width">
        <h1 className="text-3xl font-bold mb-4">CloudViewX</h1>
        <p className="text-muted-foreground mb-6">Unified cost, performance, and governance dashboards with policy-as-code and approvals.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">Architecture</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Data ingest: AWS CUR, Azure Cost Mgmt, GCP Billing</li>
              <li>Warehouse: Snowflake/BigQuery (optional)</li>
              <li>Dashboards: next/edge + server actions</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">Rollout</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Week 1–2: connectors + models</li>
              <li>Week 3–4: policies + approvals</li>
              <li>Week 5–6: pilot + telemetry</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border">
            <h2 className="font-semibold mb-2">KPIs</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              <li>Idle spend tagged</li>
              <li>Rightsizing actions approved</li>
              <li>Budget breach prevented</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
