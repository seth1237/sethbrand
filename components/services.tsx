import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem } from "@/components/animations"

const services = [
  {
    title: "Web Development",
    description: "A site that loads fast, looks right on a phone, and turns visitors into leads.",
    features: "Responsive design, catalogs, a CMS you can update, payments",
  },
  {
    title: "SEO",
    description: "Show up when Nairobi customers search for what you sell.",
    features: "Research, technical SEO, Google Business Profile, monthly reporting",
  },
  {
    title: "Graphic Design",
    description: "Visuals that match the brand and work on posters, ads, and social.",
    features: "Identity, campaign graphics, print, product UI",
  },
  {
    title: "Digital Marketing",
    description: "Campaigns aimed at inquiries, not vanity metrics.",
    features: "Social, ads, email, content that converts",
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title="What I can take on"
          description="Most clients start with a website, then add search and campaigns."
        />

        <Stagger className="mt-12 divide-y divide-border border-y border-border" stagger={0.1}>
          {services.map((service, index) => (
            <StaggerItem
              key={service.title}
              className="grid gap-3 py-7 sm:grid-cols-[4rem_14rem_1fr] sm:gap-8 sm:py-8 sm:items-baseline"
            >
              <span className="font-label text-[11px] tracking-[0.16em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-xl font-medium tracking-tight">{service.title}</h3>
              <div>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <p className="mt-2 text-sm text-muted-foreground/80">{service.features}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Link
          href="/services"
          className="mt-8 inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Full service list →
        </Link>
      </div>
    </section>
  )
}
