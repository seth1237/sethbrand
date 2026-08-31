"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === overlayRef.current) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleOverlayClick)
      return () => document.removeEventListener("mousedown", handleOverlayClick)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusableElements = mobileMenuRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements?.[0] as HTMLElement | undefined
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement | undefined
    firstElement?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && firstElement && lastElement) {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      } else if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) {
      return isHomePage ? href : `/${href}`
    }
    return href
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith("#") && !isHomePage) {
      router.push(`/${href}`)
    }
  }

  const navItems = [
    { label: "Work", href: isHomePage ? "#projects" : "/#projects" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: isHomePage ? "#about" : "/#about" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
          isScrolled || isMobileMenuOpen ? "glass-nav" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-16">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
              aria-label="Go to home page"
            >
              <Image
                src="/logo.avif"
                alt="Seth Makori logo"
                width={42}
                height={42}
                className="h-10 w-10 object-contain"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <ThemeToggle />
              <Button asChild size="sm" className="font-medium">
                <Link href={resolveHref("#contact")} onClick={() => handleNavClick("#contact")}>
                  Book a free call
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="w-11 h-11"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={(e) => e.target === overlayRef.current && setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              ref={mobileMenuRef}
              className="absolute top-0 left-0 right-0 max-h-[100dvh] overflow-y-auto glass-neu rounded-none pt-[env(safe-area-inset-top)]"
              role="menu"
              aria-label="Mobile navigation menu"
              aria-modal="true"
              initial={{ y: "-12%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-8%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-end px-4 h-16">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-11 h-11 rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-1 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="w-full"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full font-heading text-xl font-semibold text-foreground py-3.5 border-b border-foreground/10"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <Button asChild size="lg" className="mt-5 w-full min-h-12">
                  <Link href={resolveHref("#contact")} onClick={() => handleNavClick("#contact")}>
                    Book a free call
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
