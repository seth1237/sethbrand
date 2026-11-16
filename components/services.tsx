import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem } from "@/components/animations"

const services = [
  {
    title: "Web Development",
    description: "A site that loads fast, looks right on a phone, and turns visitors into leads.",
    features: "Responsive design, catalogs, a CMS you can update, payments",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "SEO",
    description: "Show up when Nairobi customers search for what you sell.",
    features: "Research, technical SEO, Google Business Profile, monthly reporting",
    span: "lg:col-span-1",
  },
  {
    title: "AI & Automation",
    description: "Chatbots, workflows, and AI-assisted SEO so the site keeps working after launch.",
    features: "Chatbots, automations, content assist",
    span: "lg:col-span-1",
  },
  {
    title: "Graphic Design",
    description: "Visuals that match the brand and work on posters, ads, and social.",
    features: "Identity, campaign graphics, print, product UI",
    span: "lg:col-span-1",
  },
  {
    title: "Digital Marketing",
    description: "Campaigns aimed at inquiries, not vanity metrics.",
    features: "Social, ads, email, content that converts",
    span: "lg:col-span-1",
  },
]

function TileIcon({ index }: { index: number }) {
  const paths = [
    "M4 7h16M4 12h10M4 17h16",
    "M5 19V5h14v14M9 15h6",
    "M12 4v16M8 8h8M8 16h8",
    "M6 18 12 6l6 12",
    "M5 12h14M12 5v14",
  ]
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#E8702A]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d={paths[index] ?? paths[0]} />
    </svg>
  )
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title="What I can take on"
          description="Design, a website, search, AI, and campaigns — pick one, or hand over the stack."
        />

        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {services.map((service, index) => (
            <StaggerItem
              key={service.title}
              className={`bg-surface p-6 sm:p-8 ${service.span} ${index === 0 ? "min-h-[240px]" : ""}`}
            >
              <TileIcon index={index} />
              <h3 className="mt-6 font-heading text-2xl tracking-tight text-foreground">{service.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {service.description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground/80">{service.features}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Link href="/services" className="mt-8 inline-flex text-sm text-muted-foreground transition-colors hover:text-[#E8702A]">
          Full service list →
        </Link>
      </div>
    </section>
  )
}
