"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/lib/site-config"

const words = ["customers", "leads"]
const links = [
  { label: "GitHub", href: siteConfig.social.github.url },
  { label: "LinkedIn", href: siteConfig.social.linkedin.url },
  { label: "Email", href: `mailto:${siteConfig.contact.email}` },
].filter((item) => !!item.href)

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<"hold" | "delete" | "type">("type")
  const [buzz, setBuzz] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setWordIndex(0)
      setCount(words[0].length)
      setPhase("hold")
      return
    }

    const word = words[wordIndex]
    let timer = 0

    if (phase === "hold") {
      timer = window.setTimeout(() => setPhase("delete"), 1600)
    } else if (phase === "delete") {
      if (count === 0) {
        timer = window.setTimeout(() => {
          setWordIndex((index) => (index + 1) % words.length)
          setPhase("type")
        }, 280)
      } else {
        timer = window.setTimeout(() => setCount((value) => value - 1), 42)
      }
    } else if (count >= word.length) {
      timer = window.setTimeout(() => setPhase("hold"), 180)
    } else {
      timer = window.setTimeout(() => {
        setCount((value) => value + 1)
        setBuzz(true)
        window.setTimeout(() => setBuzz(false), 90)
      }, 68)
    }

    return () => window.clearTimeout(timer)
  }, [phase, count, wordIndex])

  const shown = words[wordIndex].slice(0, count)

  return (
    <section className="px-5 sm:px-8 pt-[calc(6.5rem+env(safe-area-inset-top))] pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="max-w-4xl font-heading text-[2.6rem] sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-foreground">
          <span className="sr-only">Websites that get found, and businesses that get customers.</span>
          <span aria-hidden>
            Websites that get found, and businesses that get{" "}
            <span className={`inline-block ${buzz ? "hero-type-buzz" : ""}`}>
              {shown}
              <span className="hero-caret" />
            </span>
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          I design, build, and optimize a site, then run the SEO and marketing
          that bring people to it. One person, the whole pipeline.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            Start a project
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
          <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Selected work
          </a>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="font-label text-[11px] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
