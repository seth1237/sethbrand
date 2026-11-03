import { siteConfig } from "@/lib/site-config"

const links = [
  { label: "GitHub", href: siteConfig.social.github.url },
  { label: "LinkedIn", href: siteConfig.social.linkedin.url },
  { label: "Email", href: `mailto:${siteConfig.contact.email}` },
].filter((item) => !!item.href)

export function Hero() {
  return (
    <section className="px-5 sm:px-8 pt-[calc(6.5rem+env(safe-area-inset-top))] pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          Seth Makori · Nairobi
        </p>

        <h1 className="mt-6 max-w-4xl font-heading text-[2.6rem] sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-foreground">
          Websites that get found, and businesses that get customers.
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
