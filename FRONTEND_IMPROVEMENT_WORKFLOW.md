# Frontend Improvement Workflow - Living Document (2025)

## Status snapshot
- Ethical claims removed; footer/legal updated; Services, Solutions, Portfolio, Scripts, Lab refined.
- Clerk removed from build path; dashboard public layout for now.
- Solutions pages added: CloudViewX, AI Service Desk, Cost Optimization.
- Calendly CTA added; analytics markers added (next: event handler).
- Build: GREEN locally (all known prerender errors resolved by simplifying `/dashboard/billing`, `/scripts/compare`, `/lab/innovation-timeline` to temporary stubs and using `export const dynamic = 'force-dynamic'` where required).
- Build: GREEN locally and pushed to Vercel. Home hero restored in a minimal SSR‑safe form. Temporarily disabled some routes to guarantee stability while we reintroduce hardened UIs:
  - `/scripts/compare` moved to `_disabled/compare/`
  - `/search` moved to `_disabled/search/`
  - `/blog` moved to `_disabled/blog/`
  - `/scripts`, `/scripts/search`, `/scripts/compare`, `/portfolio` currently no‑op stubs to keep build green while we harden components.

## Highest-priority next fixes (production readiness)
1) Prerender stability (in progress)
- Re‑enabled: home (minimal hero), portfolio (SSR‑safe stub with value copy), scripts marketplace (static grid + CTAs).
- Compare & Search: implemented SSR-safe Compare table (URL param `?ids=`) and server-rendered Search with query/category filters.

2) Analytics (MVP)
- `app/analytics-client.tsx` emits pageview on mount and click events via `data-analytics`.
- Event ids: `hero-cta-book-teardown`, `nav-cta`, `solutions-cta`, `calendly-click`, `contact-submit`, `search-submit`, `compare-cta-contact`.
- Next: outbound link tracking.

3) Calendly embed
- Add inline embed section to `contact` below hero, lazy-loaded for performance.

4) Performance + a11y pass
- Enforce AA contrasts; ensure focus-visible everywhere; reduce motion for `prefers-reduced-motion`.
- Lazy-load below-the-fold; verify images (`next/image`) and font preload.
- Target Web Vitals: LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.05.

5) Content authenticity
- About page: remove fictional bios/metrics; rewrite with real, current credentials; add photo.
- Portfolio: keep stub until first real case is ready; then publish with proof-first structure.

## Implemented (since last revision)
- Footer: added Ethical AI + Trust Center; removed uptime claim; fixed case studies link; pragmatic CTA copy.
- Services: toned-down copy, consistent CTAs, removed optimistic badges.
- Portfolio: credible stub; removed fabricated awards/testimonials; added publishing timeline.
- Scripts: MVP shape with real starter list; removed inflated adoption metrics.
- Lab: refocused copy on aligned areas.
- Layout/Header: removed Clerk; stabilized composition.
 - Middleware: removed Clerk references from Edge middleware to satisfy Vercel Edge constraints; dashboard remains public preview.
 - Sign-in/Sign-up: replaced Clerk components with placeholders for preview to eliminate runtime warnings and dev-key prompts.
- Solutions: created 3 solution pages with Architecture/Rollout/KPIs.
- Contact: Calendly CTA and analytics marker.
- Compare: SSR table using `lib/scripts-data-enhanced.ts` with deterministic output.
- Search: SSR filtering by query and category; no client JS needed.
- Ethical AI: created `/ethical-ai` policy page (plain English, HIL, audit logs, opt-outs).
- Trust Center: created `/trust-center` with controls summary and briefing CTA.
- SEO: Added Organization JSON‑LD to root layout; ensured PWA `apple-touch-icon` present.

## Backlog (rolling)
- Solutions: add diagrams and sample screenshots (mocked and clearly labeled) for each.
- Case studies: publish 1–2 anonymized real cases; add filters by outcome/platform.
- Newsletter: component + ConvertKit wiring; add lead magnet.
- Trust Center: list evidence artifacts and DPA template link.
- SEO: schema for Organization, WebSite, BreadcrumbList, FAQPage; meta titles/descriptions per page.
- Monitoring: Sentry; Web Vitals reporting; Lighthouse CI gate.
 - Re‑enable `portfolio` with SSR‑safe UI; then `scripts` marketplace (static grid + docs links); then `search` (client-only, dynamic route); and finally `compare` (SSR‑safe compare table without dynamic imports).

## Near-term value delivery (72 hours)
- Convert hero and offers to A/B variants (copy only) and log CTR events.
- Publish one anonymized case stub (problem → approach → metrics) with clear “Book a teardown” CTA.
- Add a simple “Cloud Cost Checklist (PDF)” download CTA on scripts/services; track downloads.
- Add Organization and WebSite JSON‑LD, plus canonical/meta on home, services, solutions.

## Validation checklist (each PR)
- Build: `pnpm build` green, no prerender errors.
- Lint/types: no new warnings; ARIA/focus-visible pass.
- Web Vitals: local Lighthouse ≥ 90.
- Links: no 404s; internal links use `next/link`.
- A11y: keyboard nav, skip link, alt text.

---

Owner: Roo (AI); Reviewed weekly; Updated continuously as we ship.
