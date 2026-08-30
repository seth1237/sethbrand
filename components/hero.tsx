"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  PenTool,
  Code2,
  Search,
  TrendingUp,
} from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { motion } from "framer-motion"

const stack = [
  {
    icon: PenTool,
    label: "Design",
    detail: "Brand & UI",
    rotate: "-rotate-6",
    offset: "translate-x-0 translate-y-0",
  },
  {
    icon: Code2,
    label: "Build",
    detail: "Fast, responsive",
    rotate: "rotate-3",
    offset: "translate-x-6 translate-y-8",
  },
  {
    icon: Search,
    label: "Optimize",
    detail: "SEO that ranks",
    rotate: "-rotate-2",
    offset: "translate-x-2 translate-y-20",
  },
  {
    icon: TrendingUp,
    label: "Grow",
    detail: "Campaigns & leads",
    rotate: "rotate-6",
    offset: "translate-x-8 translate-y-32",
  },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16 bg-background">
      <div className="absolute inset-0 hero-glow" />

      <div className="relative z-10 container mx-auto max-w-6xl grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        <div className="space-y-7 text-left">
          <p className="font-label text-xs sm:text-sm tracking-[0.2em] uppercase text-primary">
            Seth Makori — Nairobi, Kenya
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] tracking-tight">
            Websites that get found,
            <br />
            and businesses that get customers.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            I design, build, and optimize your website end to end — then run
            the SEO and marketing that bring people to it. One person, the
            whole pipeline, no handoffs. Currently sharpening that with a
            Master&apos;s in AI.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {["Web Development", "SEO", "Graphic Design", "Digital Marketing"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-3"
          >
            <Button asChild size="lg">
              <a href="#contact">
                Book a free call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#projects">See the work</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-5 pt-2"
          >
            {[
              { icon: Github, href: siteConfig.social.github.url },
              { icon: Linkedin, href: siteConfig.social.linkedin.url },
              { icon: Mail, href: `mailto:${siteConfig.contact.email}` },
            ]
              .filter((item) => !!item.href)
              .map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
          </motion.div>
        </div>

        <div className="hidden lg:block relative h-[420px]">
          {stack.map(({ icon: Icon, label, detail, rotate, offset }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`absolute w-64 rounded-xl border border-foreground/10 bg-background/90 backdrop-blur-sm shadow-lg p-4 ${rotate} ${offset} transition-transform hover:rotate-0 hover:scale-[1.02]`}
              style={{ zIndex: i }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{detail}</p>

              {i === 0 && (
                <div className="mt-3 rounded-md border border-foreground/10 overflow-hidden">
                  <div className="flex gap-1 px-2 py-1.5 bg-foreground/5">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                  </div>
                  <div className="p-2 space-y-1.5">
                    <div className="h-1.5 w-3/4 rounded-full bg-foreground/10" />
                    <div className="h-1.5 w-1/2 rounded-full bg-foreground/10" />
                    <svg viewBox="0 0 100 24" className="w-full h-6 mt-1">
                      <polyline
                        points="0,20 20,16 40,18 60,10 80,6 100,2"
                        fill="none"
                        className="stroke-primary"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
