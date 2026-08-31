"use client"

import { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { SectionHeading } from "@/components/section-heading"
import { motion } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(5.5rem+env(safe-area-inset-top))] pb-16 sm:pt-28 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <SectionHeading
            eyebrow="Portfolio"
            title="Design that sells"
            description="Posters, campaigns, and brand work for events, churches, and medical businesses."
            align="center"
          />
        </motion.div>

        <div className="relative -mx-4 sm:mx-0 mb-8 sm:mb-12">
          <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex sm:flex-wrap sm:justify-center gap-2 px-4 sm:px-0 min-w-max sm:min-w-0 pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap min-h-10 transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-[4px_6px_12px_oklch(0.62_0.02_250_/_0.2)]"
                      : "glass-neu text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background sm:hidden" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
              className="group glass-neu glass-neu-hover rounded-2xl p-1 sm:p-1.5 cursor-pointer"
              onClick={() => setLightboxImage(item)}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="media-overlay absolute inset-0 bg-black/60 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-5">
                  <span className="font-label text-[9px] sm:text-[10px] tracking-widest uppercase text-primary mb-0.5">
                    {item.group}
                  </span>
                  <h3 className="font-heading text-xs sm:text-lg font-semibold text-white line-clamp-2">{item.title}</h3>
                  <p className="hidden sm:block text-sm text-white/70">{item.description}</p>
                  <div className="hidden sm:flex absolute top-4 right-4 w-9 h-9 bg-white/15 rounded-full items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
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
