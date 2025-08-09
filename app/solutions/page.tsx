import Link from 'next/link'
export const dynamic = 'force-dynamic'

export default function SolutionsIndex() {
  return (
    <main className="min-h-screen section-padding">
      <div className="container-width text-center">
        <h1 className="text-4xl font-bold mb-4">Solutions</h1>
        <p className="text-muted-foreground mb-8">Explore our productized solutions designed for pragmatic automation with guardrails.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link className="p-6 rounded-xl border border-border hover:border-tech-green/40 transition" href="/solutions/cloudviewx">CloudViewX</Link>
          <Link className="p-6 rounded-xl border border-border hover:border-tech-green/40 transition" href="/solutions/ai-service-desk">AI Service Desk</Link>
          <Link className="p-6 rounded-xl border border-border hover:border-tech-green/40 transition" href="/solutions/cost-optimization">Cost Optimization</Link>
        </div>
      </div>
    </main>
  )
}
