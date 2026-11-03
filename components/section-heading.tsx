"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type SectionHeadingProps = {
  index?: string
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {(index || eyebrow) && (
        <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
          {index ? <span className="mr-3">{index}</span> : null}
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-foreground tracking-tight leading-[1.08]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </motion.div>
  )
}
