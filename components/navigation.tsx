"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { revealChild, staggerParent } from "@/components/animations"
import { MagneticButton } from "@/components/magnetic-button"
import { siteConfig } from "@/lib/site-config"

const links = [
  { label: "Work", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Posters & Brand", href: "/#design" },
  { label: "About", href: "/#about" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const reduce = !ready || reduceMotion

  useEffect(() => {
    setReady(true)
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
        isScrolled || open ? "glass-nav" : "bg-transparent"
      }`}
    >
      <motion.div
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={staggerParent(0.06, 0.05)}
      >
        <motion.div variants={revealChild}>
          <Link href="/" className="font-heading text-[17px] tracking-tight text-foreground">
            Seth Makori
          </Link>
        </motion.div>

        <motion.nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Main"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {links.map((item) => (
            <motion.div key={item.label} variants={revealChild}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-[#E8702A]"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div className="hidden lg:flex items-center gap-4" variants={revealChild}>
          <a
            href={siteConfig.contact.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-muted-foreground transition-colors hover:text-[#E8702A]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.9-1.1A11 11 0 0 0 21 12a10.9 10.9 0 0 0-.5-8.5ZM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.5.6.7-3.4-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.3.1-.3-.1-.3c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a8.9 8.9 0 0 0 3.4 2.7c.5.2.8.3 1.1.2.3 0 1-.4 1.2-.8s.4-.8.3-.8-.2-.1-.4-.2Z" />
            </svg>
          </a>
          <MagneticButton
            href="/#contact"
            className="h-10 items-center rounded-full bg-[#CC5500] px-5 text-sm font-medium text-[#F4EFE8] hover:bg-[#E8702A]"
          >
            Let&apos;s talk
          </MagneticButton>
        </motion.div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={siteConfig.contact.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.9-1.1A11 11 0 0 0 21 12a10.9 10.9 0 0 0-.5-8.5ZM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.5.6.7-3.4-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.3.1-.3-.1-.3c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a8.9 8.9 0 0 0 3.4 2.7c.5.2.8.3 1.1.2.3 0 1-.4 1.2-.8s.4-.8.3-.8-.2-.1-.4-.2Z" />
            </svg>
          </a>
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
          className="lg:hidden border-t border-border bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          aria-label="Mobile"
        >
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-heading text-2xl text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex h-12 items-center rounded-full bg-[#CC5500] px-6 text-sm font-medium text-[#F4EFE8]"
          >
            Let&apos;s talk
          </a>
        </nav>
      )}
    </header>
  )
}
