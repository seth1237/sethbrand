import { Instagram, Facebook, Linkedin, Github, Youtube } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.395 6.231H2.75l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socials = [
  { icon: XIcon, href: siteConfig.social.twitter.url, label: "Follow on X (Twitter)" },
  { icon: Instagram, href: siteConfig.social.instagram.url, label: "Follow on Instagram" },
  { icon: Facebook, href: siteConfig.social.facebook.url, label: "Follow on Facebook" },
  { icon: Linkedin, href: siteConfig.social.linkedin.url, label: "Connect on LinkedIn" },
  { icon: Github, href: siteConfig.social.github.url, label: "View GitHub profile" },
  { icon: Youtube, href: siteConfig.social.youtube?.url, label: "Watch on YouTube" },
].filter((item) => !!item.href)

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left space-y-1">
          <p className="font-heading font-semibold text-foreground">Seth Makori</p>
          <p className="text-sm text-muted-foreground">
            Websites, SEO, and marketing for Kenyan businesses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Seth Makori
        </p>
      </div>
    </footer>
  )
}
