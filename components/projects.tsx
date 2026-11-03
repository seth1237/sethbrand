"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { LiveSiteFrame } from "@/components/live-site-frame"
import { DEFAULT_SITES, FEATURED_SITES, type SiteItem } from "@/lib/content-defaults"

const privateProjects = [
  {
    title: "HR Management System",
    description: "Employees, attendance, payroll, and reviews.",
    client: "Accord Medicals",
  },
  {
    title: "Sales Management System",
    description: "Inventory, orders, CRM, and sales analytics.",
    client: "Accord Medical Supplies",
  },
  {
    title: "Machine Servicing System",
    description: "600+ medical installs tracked, with an engineer mobile app.",
    client: "Accord Medical",
  },
]

function hostOf(link: string) {
  try {
    return new URL(link).hostname.replace(/^www\./, "")
  } catch {
    return link
  }
}

export function Projects() {
  const [more, setMore] = useState<SiteItem[]>(DEFAULT_SITES.filter((site) => !FEATURED_SITES.some((item) => item.id === site.id)))
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const featuredHosts = new Set(FEATURED_SITES.map((site) => hostOf(site.link)))
    fetch("/api/content/sites")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.sites)) return
        const extras = (data.sites as SiteItem[]).filter((site) => !featuredHosts.has(hostOf(site.link)))
        if (extras.length > 0) setMore(extras)
      })
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="scroll-mt-24 px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            index="01"
            eyebrow="Work"
            title="Selected sites"
            description="Live websites. They scroll on their own while you read."
          />
          <p className="shrink-0 text-sm text-muted-foreground">
            <Link href="/case-studies/boom-audio-visuals" className="underline-offset-4 hover:text-foreground hover:underline">
              Boom
            </Link>
            <span className="mx-2">/</span>
            <Link href="/case-studies/amani-centre-cbo" className="underline-offset-4 hover:text-foreground hover:underline">
              Amani
            </Link>
          </p>
        </div>

        <div className="grid gap-16 sm:gap-24">
          {FEATURED_SITES.map((project, index) => (
            <article key={project.id} className="grid items-start gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="min-w-0 lg:col-span-8">
                <LiveSiteFrame url={project.link} title={project.title} />
              </div>
              <div className="min-w-0 lg:col-span-4 lg:pt-8">
                <p className="font-label text-[11px] tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                  {project.tags[0] ? `  ·  ${project.tags[0]}` : ""}
                </p>
                <h3 className="mt-3 w-fit bg-white px-2 py-1 font-heading text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-950 transition-opacity hover:opacity-70"
                    style={{ color: "#141414" }}
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm text-foreground underline-offset-4 hover:underline"
                >
                  Visit site
                </a>
              </div>
            </article>
          ))}
        </div>

        {more.length > 0 && (
          <div className="mt-16">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {showAll ? "Hide other work" : `Other work · ${more.length}`}
            </button>
            {showAll && (
              <div className="mt-6 divide-y divide-border border-y border-border">
                {more.map((project) => (
                  <a
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-6 py-4 text-sm hover:text-foreground"
                  >
                    <span className="text-foreground">{project.title}</span>
                    <span className="truncate text-muted-foreground">{project.description}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-20 border-t border-border pt-10">
          <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Private systems</p>
          <div className="mt-6 divide-y divide-border">
            {privateProjects.map((project) => (
              <div key={project.title} className="grid gap-1 py-5 sm:grid-cols-[1fr_1.4fr] sm:items-baseline sm:gap-8">
                <div>
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
