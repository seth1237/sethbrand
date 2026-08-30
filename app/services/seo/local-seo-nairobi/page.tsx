import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Local SEO Services in Nairobi | CodeWithSeth',
  description: 'Dominate local search in Nairobi with optimized Google Business Profiles, citations, and localized content strategies.',
  alternates: { canonical: '/services/seo/local-seo-nairobi' },
}

export default function LocalSEONairobi() {
  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Local SEO (Nairobi)",
              areaServed: { "@type": "City", name: "Nairobi" },
              provider: { "@type": "Organization", name: "CodeWithSeth" },
            }) }}
          />
          <header className="space-y-2">
            <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Local SEO</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">Local SEO in Nairobi</h1>
            <p className="text-muted-foreground">Get found on Google Maps and local search by customers near you.</p>
          </header>

          <div className="space-y-6 text-muted-foreground">
            <p>We optimize your Google Business Profile, build accurate local citations, and create localized content that matches Nairobi search behavior. We track results and iterate to keep you in the Map Pack.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>GBP optimization (categories, services, Q&A, posts)</li>
              <li>Local citations & NAP consistency</li>
              <li>Review strategy with keyword-rich responses</li>
              <li>Location pages and internal linking</li>
              <li>Reporting with call-tracking and actions</li>
            </ul>
          </div>

          <div className="pt-2">
            <Link href="/contact" className="text-primary underline">Book a consultation</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
