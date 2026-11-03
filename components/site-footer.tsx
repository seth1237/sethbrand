import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

const socials = [
  { label: "X", href: siteConfig.social.twitter.url },
  { label: "Instagram", href: siteConfig.social.instagram.url },
  { label: "LinkedIn", href: siteConfig.social.linkedin.url },
  { label: "GitHub", href: siteConfig.social.github.url },
  { label: "YouTube", href: siteConfig.social.youtube?.url },
].filter((item) => !!item.href)

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 sm:px-8 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-sm font-medium">Seth Makori</p>
          <p className="mt-1 text-sm text-muted-foreground">Nairobi · websites, search, and design</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
