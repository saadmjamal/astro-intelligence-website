'use client'

const stacks = [
  'Azure OpenAI', 'AWS Bedrock', 'GCP Vertex', 'M365', 'Slack', 'ServiceNow', 'Snowflake', 'Databricks', 'Salesforce', 'NetSuite'
]

export default function SystemsFit() {
  return (
    <section className="section-padding-sm">
      <div className="container-width">
        <div className="text-center mb-4">
          <div className="text-sm text-white/80">Built for your stack</div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {stacks.map((s) => (
            <span key={s} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/85 text-sm">{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}



