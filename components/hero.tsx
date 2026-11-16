"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { revealChild, staggerParent } from "@/components/animations"
import { MagneticButton } from "@/components/magnetic-button"

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const reduce = !ready || reduceMotion

  return (
    <section className="relative overflow-hidden px-5 sm:px-8 pt-[calc(6.5rem+env(safe-area-inset-top))] pb-12 sm:pt-32 sm:pb-16">
      <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <motion.div initial={reduce ? false : "hidden"} animate={reduce ? undefined : "show"} variants={staggerParent(0.1, 0.08)}>
          <h1
            className="max-w-[12ch] font-heading text-[clamp(2.4rem,9vw,6.4rem)] leading-[0.94] tracking-[-0.04em] text-foreground"
            aria-label="Websites that get found, and businesses that get customers"
          >
            Websites that{" "}
            <em className="italic text-[#E8702A]">get found</em>, and businesses that get customers
          </h1>

          <motion.p variants={revealChild} className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            Design, build, SEO, and marketing under one roof in Nairobi. You talk to one person — from the first poster
            to the ranking plan that brings people in.
          </motion.p>

          <motion.div variants={revealChild} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="/#contact"
              className="h-12 items-center rounded-full bg-[#CC5500] px-6 text-sm font-medium text-[#F4EFE8] hover:bg-[#E8702A]"
            >
              Start a project
            </MagneticButton>
            <a
              href="/#projects"
              className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm text-foreground transition-colors hover:border-[#E8702A] hover:text-[#E8702A]"
            >
              See the work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orange-arch absolute inset-x-[8%] bottom-0 top-[12%] -z-0" aria-hidden />
          <Image
            src="/profile.webp"
            alt="Seth Makori, web developer and SEO specialist in Nairobi"
            width={1400}
            height={2100}
            priority
            sizes="(max-width: 1024px) 80vw, 420px"
            className="relative z-10 mx-auto h-auto w-[86%] object-contain object-bottom"
          />
        </motion.div>
      </div>
    </section>
  )
}
