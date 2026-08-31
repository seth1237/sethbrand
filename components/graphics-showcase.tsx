"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { DEFAULT_POSTERS, type PosterItem } from "@/lib/content-defaults"

const fallbackFeatured = DEFAULT_POSTERS.slice(0, 6)

export function GraphicsShowcase() {
  const [featured, setFeatured] = useState<PosterItem[]>(fallbackFeatured)

  useEffect(() => {
    fetch("/api/content/posters")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.posters) && data.posters.length > 0) {
          setFeatured(data.posters.slice(0, 6))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-8 sm:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <SectionHeading
            eyebrow="Design"
            title="Campaigns, posters, and brand work"
            description="A sample of graphics that sell — medical, events, church, and social campaigns."
          />
          <Button asChild variant="outline" className="shrink-0 self-stretch sm:self-auto min-h-11">
            <Link href="/portfolio">
              View full portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
          {featured.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group glass-neu glass-neu-hover rounded-2xl p-1 sm:p-1.5 block"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                {item.src.startsWith("/api/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                <div className="media-overlay absolute inset-0 bg-black/55 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-4">
                  <p className="font-label text-[9px] sm:text-[10px] tracking-widest uppercase text-primary">{item.group}</p>
                  <h3 className="font-heading text-xs sm:text-sm font-semibold text-white line-clamp-2">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
