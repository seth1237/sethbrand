"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { DEFAULT_SITES, type SiteItem } from "@/lib/content-defaults"

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

function SiteImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  if (src.startsWith("/api/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 720px"
      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      loading={priority ? "eager" : "lazy"}
      priority={priority}
    />
  )
}

export function Projects() {
  const [publicProjects, setPublicProjects] = useState<SiteItem[]>(DEFAULT_SITES)
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? publicProjects : publicProjects.slice(0, 4)

  useEffect(() => {
    fetch("/api/content/sites")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.sites) && data.sites.length > 0) {
          setPublicProjects(data.sites)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="scroll-mt-24 px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16">
          <SectionHeading
            index="01"
            eyebrow="Work"
            title="Selected sites"
            description="Live websites for events, medical, furniture, NGOs, and fitness."
          />
          <p className="text-sm text-muted-foreground shrink-0">
            <Link href="/case-studies/boom-audio-visuals" className="hover:text-foreground underline-offset-4 hover:underline">
              Boom
            </Link>
            <span className="mx-2">/</span>
            <Link href="/case-studies/amani-centre-cbo" className="hover:text-foreground underline-offset-4 hover:underline">
              Amani
            </Link>
          </p>
        </div>

        <div className="grid gap-14 sm:gap-20">
          {visibleProjects.map((project, index) => (
            <article key={project.id} className="group grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12 md:items-end">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[16/10] overflow-hidden bg-muted"
              >
                <SiteImage src={project.image} alt={project.title} priority={index === 0} />
              </a>
              <div>
                <p className="font-label text-[11px] tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                  {project.tags[0] ? `  ·  ${project.tags[0]}` : ""}
                </p>
                <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-medium tracking-tight">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    {project.title}
                  </a>
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{project.description}</p>
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

        {publicProjects.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="mt-14 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAll ? "Show less" : `Show all ${publicProjects.length} projects`}
          </button>
        )}

        <div className="mt-20 border-t border-border pt-10">
          <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Private systems</p>
          <div className="mt-6 divide-y divide-border">
            {privateProjects.map((project) => (
              <div key={project.title} className="grid gap-1 py-5 sm:grid-cols-[1fr_1.4fr] sm:gap-8 sm:items-baseline">
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
