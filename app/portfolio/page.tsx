"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SectionHeading } from "@/components/section-heading"
import { motion } from "framer-motion"
import { X, ZoomIn } from "lucide-react"

const basePortfolioItems = [
  {
    id: 1,
    src: "/pro_samples/heroesforher_campaign.webp",
    title: "Heroes For Her Campaign",
    category: "Social Campaign",
    description: "Empowerment campaign for women's rights and equality",
  },
  {
    id: 2,
    src: "/pro_samples/wedding_card.webp",
    title: "Wedding Invitation Card",
    category: "Event Design",
    description: "Elegant wedding invitation with modern typography",
  },
  {
    id: 3,
    src: "/pro_samples/wedding_poster.webp",
    title: "Wedding Poster",
    category: "Event Design",
    description: "Wedding announcement poster",
  },
  {
    id: 4,
    src: "/pro_samples/agosti.webp",
    title: "Agosti Design",
    category: "Brand Identity",
    description: "Brand identity and visual design",
  },
  {
    id: 5,
    src: "/pro_samples/thankyou.webp",
    title: "Thank You Card",
    category: "Greeting Card",
    description: "Appreciation card",
  },
  {
    id: 6,
    src: "/pro_samples/mm.webp",
    title: "MM Design",
    category: "Graphics",
    description: "Graphic design showcase",
  },
  {
    id: 7,
    src: "/pro_samples/36.webp",
    title: "Design Sample 36",
    category: "Creative Work",
    description: "Professional design work",
  },
  {
    id: 8,
    src: "/pro_samples/38.webp",
    title: "Design Sample 38",
    category: "Creative Work",
    description: "Design solution",
  },
  {
    id: 9,
    src: "/pro_samples/39.webp",
    title: "Design Sample 39",
    category: "Creative Work",
    description: "Modern design",
  },
]

const squarePosterFiles = [
  "Chemiluminescence",
  "Choirtraining",
  "ChurchService",
  "Marketing",
  "Sermon",
  "Speakerposter",
  "baby warmer baby incubator offer",
  "blood sugarmachinemarketing",
  "choirtrainingposter",
  "easterposter",
  "electrolyte analyzer",
  "fetal dopler",
  "hospital furniture",
  "infusion pump",
  "kidney day",
  "labequipment",
  "locations",
  "marketingemergencyresponsepackage",
  "marketingsteamsterilizer",
  "newmonthposter",
  "ultrasound machine",
  "ultrasound_marketing",
  "vespersposter",
]

const toTitle = (name: string) =>
  name
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const posterItems = squarePosterFiles.map((fileName, index) => ({
  id: basePortfolioItems.length + index + 1,
  src: `/moreposterssquareall/${fileName}.webp`,
  title: toTitle(fileName),
  category: "Poster",
  description: "Square poster design",
}))

const portfolioItems = [...basePortfolioItems, ...posterItems]
const categories = ["All", ...new Set(portfolioItems.map((item) => item.category))]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<(typeof portfolioItems)[0] | null>(null)

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Portfolio"
            title="Design that sells"
            description="Posters, campaigns, and brand work for events, churches, and medical businesses."
            align="center"
          />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-card border border-foreground/10 hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => setLightboxImage(item)}
            >
              <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="font-label text-[10px] tracking-widest uppercase text-primary mb-1">
                  {item.category}
                </span>
                <h3 className="font-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/70">{item.description}</p>
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-white" />
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg mx-auto"
            />
            <div className="mt-5 text-center">
              <span className="font-label text-xs tracking-widest uppercase text-primary">
                {lightboxImage.category}
              </span>
              <h2 className="font-heading text-2xl font-semibold text-white mt-1">{lightboxImage.title}</h2>
              <p className="text-white/70">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
