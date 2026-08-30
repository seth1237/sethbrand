import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Technical SEO Audit in Kenya | CodeWithSeth',
  description: 'Full-stack technical SEO audits: crawlability, indexation, Core Web Vitals, and structured data for Kenyan businesses.',
  alternates: { canonical: '/services/seo/technical-seo-audit-kenya' },
}

export default function TechnicalSEOAudit() {
  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          <header className="space-y-2">
            <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Technical SEO</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">Technical SEO Audit (Kenya)</h1>
            <p className="text-muted-foreground">Uncover issues blocking performance and rankings. Ship fixes with a prioritized action plan.</p>
          </header>

          <div className="space-y-6 text-muted-foreground">
            <ul className="list-disc pl-6 space-y-1">
              <li>Crawlability & indexation (robots, sitemaps, canonicals)</li>
              <li>Core Web Vitals & performance opportunities</li>
              <li>Structured data & search enhancements</li>
              <li>Content inventory and internal linking</li>
              <li>Action plan with effort/impact scoring</li>
            </ul>
          </div>

          <div className="pt-2">
            <Link href="/pricing" className="text-primary underline">See pricing</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
