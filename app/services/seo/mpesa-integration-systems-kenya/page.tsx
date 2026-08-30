import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'M-Pesa Integration for Booking & Systems (Kenya) | CodeWithSeth',
  description: 'Build or integrate M-Pesa into booking engines, CRMs, and custom systems for Kenya-first digital experiences.',
  alternates: { canonical: '/services/seo/mpesa-integration-systems-kenya' },
}

export default function MPesaIntegration() {
  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          <header className="space-y-2">
            <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Payments</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">M-Pesa Integration for Systems (Kenya)</h1>
            <p className="text-muted-foreground">Payments built into your systems: bookings, ticketing, CRM, or e‑commerce.</p>
          </header>

          <div className="space-y-6 text-muted-foreground">
            <p>We design and build payment flows that work for Kenyan users and businesses. From hotel booking engines to event ticketing, we handle STK push, confirmation callbacks, and reconciliation.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>STK Push and C2B integrations</li>
              <li>Booking/ticketing flows and QR verification</li>
              <li>Sandbox testing and compliance basics</li>
              <li>Dashboards and reporting</li>
            </ul>
          </div>

          <div className="pt-2">
            <Link href="/case-studies/boom-audio-visuals" className="text-primary underline">See case study</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
