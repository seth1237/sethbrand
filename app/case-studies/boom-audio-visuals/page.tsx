import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Case Study: Boom Audio Visuals | CodeWithSeth',
  description: 'How we elevated Boom Audio Visuals with a high-performance Next.js site, driving a 60% increase in inquiries.',
  alternates: { canonical: '/case-studies/boom-audio-visuals' },
}

export default function BoomCaseStudy() {
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
              { "@type": "ListItem", position: 2, name: "Case Studies", item: "/case-studies/boom-audio-visuals" },
            ],
          }) }}
        />
        <header className="space-y-3">
          <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Case study</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight">Boom Audio Visuals — Website Redesign & Lead Growth</h1>
          <p className="text-muted-foreground">Industry: Events & Production • Stack: Next.js, Tailwind CSS, Vercel • Timeline: 4 weeks</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Goals</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Showcase premium brand and portfolio with fast, modern UI.</li>
            <li>Improve lead capture with clear CTAs and contact flow.</li>
            <li>Enhance SEO for regional event and AV service queries.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Solution & Process</h2>
          <p className="text-muted-foreground">We rebuilt the site on Next.js with optimized images, structured content, and clear service pages. We implemented schema, on-page SEO, and a contact flow integrated with email alerts.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Architecture: componentized sections, image optimization, Lighthouse-focused.</li>
            <li>SEO: metadata, canonicals, service keywords, structured data.</li>
            <li>Conversion: prominent CTAs, mobile-first forms, testimonials.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Results</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>+60% increase in qualified inquiries within 8 weeks.</li>
            <li>Improved search visibility for event production services in Kenya.</li>
            <li>Sub-2s LCP on 4G; consistent Core Web Vitals passed.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Testimonial</h2>
          <blockquote className="border-l-4 pl-4 text-muted-foreground italic">
            "Seth delivered an exceptional website for our event production company. Client inquiries have increased by over 60% since launch."
          </blockquote>
        </section>
      </article>
    </main>
  )
}
