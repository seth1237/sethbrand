"use client"

import { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { SectionHeading } from "@/components/section-heading"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { DEFAULT_POSTERS, type PosterItem } from "@/lib/content-defaults"

export default function PortfolioPage() {
  const [items, setItems] = useState<PosterItem[]>(DEFAULT_POSTERS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<PosterItem | null>(null)

  useEffect(() => {
    fetch("/api/content/posters")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.posters) && data.posters.length > 0) {
          setItems(data.posters)
        }
      })
      .catch(() => {})
  }, [])

  const categories = useMemo(
    () => ["All", ...new Set(items.map((item) => item.group))],
    [items],
  )

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.group === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pt-32 sm:pb-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <SectionHeading
            index="Design"
            title="Posters and campaigns"
            description="Events, churches, medical, and social work."
          />
        </motion.div>

        <div className="relative -mx-5 sm:mx-0 mb-10">
          <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-6 px-5 sm:px-0 min-w-max sm:min-w-0 border-b border-border">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`pb-3 text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "text-foreground border-b border-foreground -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group text-left cursor-pointer"
              onClick={() => setLightboxImage(item)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-3 text-sm text-foreground">{item.title}</p>
              <p className="mt-1 font-label text-[10px] tracking-[0.14em] uppercase text-muted-foreground">{item.group}</p>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center py-20 text-muted-foreground">No designs in this category</p>
        )}
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg mx-auto"
            />
            <div className="mt-4 sm:mt-5 text-center px-2">
              <span className="font-label text-xs tracking-widest uppercase text-primary">
                {lightboxImage.group}
              </span>
              <h2 className="font-heading text-lg sm:text-2xl font-semibold text-white mt-1">{lightboxImage.title}</h2>
              <p className="text-sm sm:text-base text-white/70">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
