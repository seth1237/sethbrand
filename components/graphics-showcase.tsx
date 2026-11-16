"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { FEATURED_POSTERS, type PosterItem } from "@/lib/content-defaults"
import { siteConfig } from "@/lib/site-config"

function PosterImage({ item, sizes, className }: { item: PosterItem; sizes: string; className?: string }) {
  if (item.src.startsWith("/api/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.src} alt={item.title} className={className ?? "absolute inset-0 h-full w-full object-cover"} />
    )
  }

  return (
    <Image
      src={item.src}
      alt={item.title}
      fill
      className={className ?? "object-cover transition-transform duration-700 group-hover:scale-[1.03]"}
      sizes={sizes}
    />
  )
}

export function GraphicsShowcase() {
  const [featured, setFeatured] = useState<PosterItem[]>(FEATURED_POSTERS)
  const [open, setOpen] = useState<PosterItem | null>(null)

  useEffect(() => {
    fetch("/api/content/posters")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.posters) || data.posters.length === 0) return
        const uploaded = (data.posters as PosterItem[]).filter((item) => item.source === "upload")
        const rest = (data.posters as PosterItem[]).filter((item) => item.source !== "upload")
        setFeatured([...uploaded, ...rest].slice(0, 9))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (featured.length === 0) return null

  return (
    <section id="design" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Posters & Brand"
            title="Work people actually see"
            description="Campaigns, events, churches, and medical — each piece tagged with a one-line brief."
          />
          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <a
              href={siteConfig.moreDesigns}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#E8702A] underline-offset-4 hover:underline"
            >
              More designs →
            </a>
            <Link href="/portfolio" className="text-sm text-muted-foreground transition-colors hover:text-[#E8702A]">
              On-site gallery →
            </Link>
          </div>
        </div>

        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {featured.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(item)}
              className={`group mb-3 w-full break-inside-avoid text-left sm:mb-4 ${index % 5 === 0 ? "" : ""}`}
            >
              <div className={`relative overflow-hidden bg-surface ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
                <PosterImage item={item} sizes="(max-width: 1024px) 50vw, 33vw" />
              </div>
              <p className="mt-3 font-label text-[10px] uppercase tracking-[0.14em] text-[#E8702A]">{item.group}</p>
              <p className="mt-1 text-sm text-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </button>
          ))}
        </div>

        <a
          href={siteConfig.moreDesigns}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex text-sm text-[#E8702A] underline-offset-4 hover:underline"
        >
          Access more designs →
        </a>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <div className="relative max-w-4xl w-full" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={open.title} className="mx-auto max-h-[70vh] w-auto object-contain" />
            <p className="mt-4 text-center font-label text-[11px] uppercase tracking-[0.16em] text-[#E8702A]">{open.group}</p>
            <p className="mt-1 text-center font-heading text-2xl text-[#F4EFE8]">{open.title}</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">{open.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}
