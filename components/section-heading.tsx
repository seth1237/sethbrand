"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "space-y-3 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <p className="font-label text-[11px] sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-[1.65rem] sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
