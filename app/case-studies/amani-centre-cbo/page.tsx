import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Case Study: Amani Centre CBO | CodeWithSeth',
  description: 'Building a community-impact site that supports outreach during floods and adverse conditions — with clear storytelling and fast UX.',
  alternates: { canonical: '/case-studies/amani-centre-cbo' },
}

export default function AmaniCaseStudy() {
  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <article className="container mx-auto max-w-4xl px-4 py-12 space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Case Studies", item: "/case-studies/amani-centre-cbo" },
            ],
          }) }}
        />
        <header className="space-y-3">
          <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Case study</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight">Amani Centre CBO — Nonprofit Website for Community Impact</h1>
          <p className="text-muted-foreground">Industry: NGO • Stack: Next.js, Tailwind CSS, Vercel • Timeline: 3 weeks</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Goals</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Tell a clear mission story with strong visuals.</li>
            <li>Enable donations and volunteer contact pathways.</li>
            <li>Ensure accessibility and performance on low bandwidth.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Solution & Process</h2>
          <p className="text-muted-foreground">We shipped a clean, mobile-first site structure that highlights programs and impact. We optimized images, metadata, and created simple content blocks that the team can maintain.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>UX: accessible typography, clear hierarchy, strong CTAs.</li>
            <li>SEO: localized keywords, Open Graph, canonical links.</li>
            <li>Ops: Vercel deploys, analytics, and contact routing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Results</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Improved reach to stakeholders and local partners.</li>
            <li>Clearer storytelling and engagement via contact forms.</li>
            <li>Fast, reliable performance across devices.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Testimonial</h2>
          <blockquote className="border-l-4 pl-4 text-muted-foreground italic">
            "He understood our mission and created a platform that effectively communicates our work. The site has helped us reach more people in need."
          </blockquote>
        </section>
      </article>
    </main>
  )
}
