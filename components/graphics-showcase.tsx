"use client"

import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const featured = [
  {
    type: "Social Campaign",
    title: "Heroes For Her",
    image: "/pro_samples/heroesforher_campaign.webp",
  },
  {
    type: "Event Design",
    title: "Wedding Invitation",
    image: "/pro_samples/wedding_card.webp",
  },
  {
    type: "Brand Identity",
    title: "Agosti Design",
    image: "/pro_samples/agosti.webp",
  },
  {
    type: "Poster",
    title: "Church Service",
    image: "/moreposterssquareall/ChurchService.webp",
  },
  {
    type: "Poster",
    title: "Ultrasound Marketing",
    image: "/moreposterssquareall/ultrasound_marketing.webp",
  },
  {
    type: "Poster",
    title: "Easter Poster",
    image: "/moreposterssquareall/easterposter.webp",
  },
]

export function GraphicsShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Design"
            title="Campaigns, posters, and brand work"
            description="A sample of graphics that sell — medical, events, church, and social campaigns."
          />
          <Button asChild variant="outline" className="shrink-0 self-start sm:self-auto">
            <Link href="/portfolio">
              View full portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map((item) => (
            <Link
              key={item.title}
              href="/portfolio"
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-foreground/10 bg-card"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="font-label text-[10px] tracking-widest uppercase text-primary">{item.type}</p>
                <h3 className="font-heading text-sm font-semibold text-white">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
