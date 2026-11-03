"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { revealChild, staggerParent } from "@/components/animations"

const links = [
  { label: "Work", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Design", href: "/portfolio" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        isScrolled || open ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <motion.div
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={staggerParent(0.06, 0.05)}
      >
        <motion.div variants={revealChild}>
          <Link href="/" className="font-heading text-[15px] font-medium tracking-tight text-foreground">
            Seth Makori
          </Link>
        </motion.div>

        <motion.nav
          className="hidden md:flex items-center gap-7"
          aria-label="Main"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {links.map((item) => (
            <motion.div key={item.label} variants={revealChild}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={revealChild}>
            <ThemeToggle />
          </motion.div>
        </motion.nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      {open && (
        <nav
          className="md:hidden border-t border-border bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          aria-label="Mobile"
        >
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-heading text-2xl font-medium text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
