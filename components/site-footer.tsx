import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

const nav = [
  { label: "Work", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Posters & Brand", href: "/#design" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

const socials = [
  { label: "X", href: siteConfig.social.twitter.url },
  { label: "Instagram", href: siteConfig.social.instagram.url },
  { label: "LinkedIn", href: siteConfig.social.linkedin.url },
  { label: "GitHub", href: siteConfig.social.github.url },
  { label: "YouTube", href: siteConfig.social.youtube.url },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 sm:px-8 pb-[max(5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto grid max-w-6xl gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-2xl tracking-tight">Seth Makori</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Websites that get found, and businesses that get customers.
          </p>
        </div>
        <div>
          <p className="font-label text-[11px] uppercase tracking-[0.16em] text-muted-foreground">On this site</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-foreground hover:text-[#E8702A]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-label text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#E8702A]">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.contact.phone.tel}`} className="hover:text-[#E8702A]">
                {siteConfig.contact.phone.primary}
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.whatsapp.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#E8702A]">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-label text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Elsewhere</p>
          <ul className="mt-4 space-y-2">
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#E8702A]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Seth Makori · Nairobi</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-[#E8702A]">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[#E8702A]">
            Terms
          </Link>
          <a href="#top" className="hover:text-[#E8702A]">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
