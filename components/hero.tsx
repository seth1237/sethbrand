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
    rotate: -6,
    x: 0,
    y: 0,
    float: 10,
    duration: 5.5,
  },
  {
    icon: Code2,
    label: "Build",
    detail: "Fast, responsive",
    rotate: 3,
    x: 24,
    y: 32,
    float: 12,
    duration: 6.5,
  },
  {
    icon: Search,
    label: "Optimize",
    detail: "SEO that ranks",
    rotate: -2,
    x: 8,
    y: 80,
    float: 9,
    duration: 5,
  },
  {
    icon: TrendingUp,
    label: "Grow",
    detail: "Campaigns & leads",
    rotate: 6,
    x: 32,
    y: 128,
    float: 11,
    duration: 7,
  },
]

export function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-10 sm:pt-24 sm:pb-16 lg:min-h-screen bg-background">
      <div className="relative z-10 container mx-auto max-w-6xl grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-16 items-center">
        <div className="space-y-5 sm:space-y-7 text-left">
          <p className="font-label text-[11px] sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase text-primary">
            Seth Makori — Nairobi, Kenya
          </p>

          <h1 className="font-heading text-[1.85rem] sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.12] tracking-tight">
            Websites that get found,
            <br className="hidden sm:block" />{" "}
            and businesses that get customers.
          </h1>

          <p className="text-[15px] sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
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
                  className="text-xs font-medium px-3 py-1.5 rounded-full glass-neu text-muted-foreground"
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
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-3"
          >
            <Button asChild size="lg" className="w-full sm:w-auto min-h-11">
              <a href="#contact">
                Book a free call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-h-11">
              <a href="#projects">See the work</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-1 pt-1 sm:pt-2"
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:hidden">
          {stack.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="rounded-2xl glass-neu p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{detail}</p>
            </div>
          ))}
        </div>

        {/* Desktop-only animated stack */}
        <div className="hidden lg:block relative h-[420px]">
          {/* Ambient drifting glow behind the cards */}
          <motion.div
            aria-hidden
            className="absolute -inset-16 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Dotted connector tracing through the stack, drawn in on load */}
          <svg
            aria-hidden
            viewBox="0 0 320 420"
            className="absolute inset-0 h-full w-full text-primary/25"
          >
            <motion.path
              d="M 40 40 C 140 90, 60 150, 160 190 C 260 230, 140 300, 200 340"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="1 8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
            />
          </svg>

          {stack.map(
            ({ icon: Icon, label, detail, rotate, x, y, float, duration }, i) => (
              <motion.div
                key={label}
                className="absolute w-64 rounded-2xl glass-neu p-4"
                style={{ zIndex: i }}
                initial={{ opacity: 0, x, y: y + 24, rotate }}
                animate={{
                  opacity: 1,
                  x,
                  y: [y, y - float, y],
                  rotate: [rotate, rotate * 0.4, rotate],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.15 * i },
                  x: { duration: 0.5, delay: 0.15 * i },
                  y: {
                    duration,
                    delay: 0.15 * i + 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration,
                    delay: 0.15 * i + 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.span
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{
                      duration: 4,
                      delay: 0.6 * i,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                  </motion.span>
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
                        <motion.polyline
                          points="0,20 20,16 40,18 60,10 80,6 100,2"
                          fill="none"
                          className="stroke-primary"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {i === 3 && (
                  <motion.div
                    className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-primary"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Live campaign
                  </motion.div>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  )
}