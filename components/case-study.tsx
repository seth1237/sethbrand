import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export type CaseStudyData = {
  slug: string
  title: string
  industry: string
  stack: string
  timeline: string
  problem: string
  approach: string[]
  results: string[]
  testimonial?: string
  liveUrl: string
}

export function caseStudyMetadata(study: CaseStudyData): Metadata {
  return {
    title: `Case Study: ${study.title}`,
    description: study.problem,
    alternates: { canonical: `/case-studies/${study.slug}` },
  }
}

export function CaseStudyArticle({ study }: { study: CaseStudyData }) {
  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <article className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <p className="font-label text-[11px] uppercase tracking-[0.18em] text-[#E8702A]">Case study</p>
        <h1 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">{study.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {study.industry} · {study.stack} · {study.timeline}
        </p>

        <section className="mt-12">
          <h2 className="font-heading text-2xl">Problem</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{study.problem}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl">Approach</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            {study.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl">Result</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            {study.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {study.testimonial ? (
          <blockquote className="mt-10 border-l-2 border-[#CC5500] pl-4 font-heading text-xl italic leading-snug">
            “{study.testimonial}”
          </blockquote>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-[#CC5500] px-5 text-sm text-[#F4EFE8] hover:bg-[#E8702A]"
          >
            Visit live site
          </a>
          <Link href="/#contact" className="inline-flex h-11 items-center text-sm text-muted-foreground hover:text-[#E8702A]">
            Start a similar project →
          </Link>
        </div>
      </article>
    </main>
  )
}
