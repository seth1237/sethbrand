import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem } from "@/components/animations"

const packages = [
  {
    name: "Starter",
    price: "from KES 22,000/mo",
    detail: "A site that works, local SEO, and a Google Business Profile that actually ranks.",
    items: ["Website or landing page", "Local SEO setup", "Monthly report"],
  },
  {
    name: "Growth",
    price: "from KES 58,000/mo",
    detail: "The full stack: site, search, content, and campaigns that bring in inquiries.",
    items: ["Site + SEO strategy", "Content and social", "Ads and conversion work"],
    featured: true,
  },
  {
    name: "Full Service",
    price: "from KES 118,000/mo",
    detail: "Design, build, SEO, and marketing under one retainer, with a dedicated owner.",
    items: ["Everything in Growth", "Automation and AI", "Senior account time"],
  },
]

export function HomePricing() {
  return (
    <section id="pricing" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          eyebrow="Pricing"
          title="Packages, from KES"
          description="Starting points. Most work is scoped to the business — ask if you need a one-off build."
        />

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {packages.map((item) => (
            <StaggerItem
              key={item.name}
              className={`flex flex-col bg-surface p-6 sm:p-8 ${item.featured ? "ring-1 ring-[#CC5500]" : ""}`}
            >
              <p className="font-label text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{item.name}</p>
              <p className="mt-4 font-heading text-3xl tracking-tight text-foreground">{item.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {item.items.map((line) => (
                  <li key={line}>· {line}</li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm ${
                  item.featured
                    ? "bg-[#CC5500] text-[#F4EFE8] hover:bg-[#E8702A]"
                    : "border border-foreground/20 text-foreground hover:border-[#E8702A] hover:text-[#E8702A]"
                }`}
              >
                Start here
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 text-sm text-muted-foreground">
          Need something else?{" "}
          <Link href="/#contact" className="text-[#E8702A] underline-offset-4 hover:underline">
            Ask for a custom quote
          </Link>
          {" · "}
          <Link href="/pricing" className="underline-offset-4 hover:underline">
            Full pricing
          </Link>
        </p>
      </div>
    </section>
  )
}
