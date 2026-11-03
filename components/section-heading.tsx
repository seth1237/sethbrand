"use client"

import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"
import { RevealWords, revealChild, staggerParent } from "@/components/animations"

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
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={staggerParent(0.09)}
    >
      {(index || eyebrow) && (
        <motion.p variants={revealChild} className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
          {index ? <span className="mr-3">{index}</span> : null}
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={{ hidden: {}, show: {} }}
        className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-foreground tracking-tight leading-[1.08]"
      >
        <RevealWords text={title} mode="parent" />
      </motion.h2>
      {description ? (
        <motion.p variants={revealChild} className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
