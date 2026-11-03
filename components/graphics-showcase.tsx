"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem } from "@/components/animations"
import { DEFAULT_POSTERS, type PosterItem } from "@/lib/content-defaults"

export function GraphicsShowcase() {
  const [featured, setFeatured] = useState<PosterItem[]>(DEFAULT_POSTERS.slice(0, 4))

  useEffect(() => {
    fetch("/api/content/posters")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.posters) && data.posters.length > 0) {
          setFeatured(data.posters.slice(0, 4))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="design" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10">
          <SectionHeading
            index="03"
            eyebrow="Design"
            title="Posters and campaigns"
            description="A short sample. Medical, events, church, and social."
          />
          <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0">
            Full portfolio →
          </Link>
        </div>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" stagger={0.08}>
          {featured.map((item) => (
            <StaggerItem key={item.id}>
            <Link href="/portfolio" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                {item.src.startsWith("/api/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.src} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                )}
              </div>
              <p className="mt-3 text-sm text-foreground">{item.title}</p>
              <p className="font-label text-[10px] tracking-[0.14em] uppercase text-muted-foreground mt-1">{item.group}</p>
            </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
