import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem } from "@/components/animations"

const steps = [
  {
    title: "Discover",
    time: "About 1 week",
    detail: "Goals, audience, competitors, and what already exists. A short brief you can actually use.",
  },
  {
    title: "Design",
    time: "1–2 weeks",
    detail: "Look, pages, and the visuals that will live on the site — posters, brand, and layout together.",
  },
  {
    title: "Build",
    time: "2–4 weeks",
    detail: "Next.js, CMS, SEO foundations, and the forms or payments your business needs.",
  },
  {
    title: "Launch",
    time: "A few days",
    detail: "Domain, hosting, Search Console, analytics, and a checklist so nothing is left half-live.",
  },
  {
    title: "Grow",
    time: "Ongoing",
    detail: "Content, local SEO, campaigns, and the small changes that keep inquiries coming.",
  },
]

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          eyebrow="Process"
          title="How a project usually runs"
          description="Clear steps, a typical timeline, and one person at every stage."
        />
        <Stagger className="mt-12 divide-y divide-border border-y border-border" stagger={0.08}>
          {steps.map((step, index) => (
            <StaggerItem
              key={step.title}
              className="grid gap-3 py-7 sm:grid-cols-[4rem_minmax(0,12rem)_8rem_1fr] sm:items-baseline sm:gap-8"
            >
              <span className="font-label text-[11px] tracking-[0.16em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-2xl tracking-tight text-foreground">{step.title}</h3>
              <p className="text-sm text-[#E8702A]">{step.time}</p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{step.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
