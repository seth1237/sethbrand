"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { FEATURED_SITES, type SiteItem } from "@/lib/content-defaults"

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

export function Projects() {
  const [active, setActive] = useState<SiteItem | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [follow, setFollow] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setFollow(media.matches && !reduce.matches)
    update()
    media.addEventListener("change", update)
    reduce.addEventListener("change", update)
    return () => {
      media.removeEventListener("change", update)
      reduce.removeEventListener("change", update)
    }
  }, [])

  return (
    <section id="projects" className="scroll-mt-24 px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Work"
          title="Selected sites"
          description="Live builds for medical, events, furniture, retail, and community. Hover a row to preview."
        />

        <div
          className="relative mt-12"
          onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
          onMouseLeave={() => setActive(null)}
        >
          <ul className="divide-y divide-border border-y border-border">
            {FEATURED_SITES.map((project, index) => (
              <li
                key={project.id}
                className="group grid min-w-0 grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,16rem)_auto] sm:gap-6"
                onMouseEnter={() => setActive(project)}
                onFocus={() => setActive(project)}
              >
                <span className="font-label text-[11px] tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-2xl tracking-tight text-foreground transition-colors group-hover:text-[#E8702A] sm:text-4xl">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="col-start-2 text-sm text-muted-foreground sm:col-auto">
                  {project.result ?? project.description}
                </p>
                {project.caseStudy ? (
                  <Link
                    href={project.caseStudy}
                    className="col-start-2 text-sm text-muted-foreground underline-offset-4 hover:text-[#E8702A] hover:underline sm:col-auto sm:justify-self-end"
                  >
                    Case study
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-start-2 text-sm text-muted-foreground hover:text-[#E8702A] sm:col-auto sm:justify-self-end"
                  >
                    Visit
                  </a>
                )}
              </li>
            ))}
          </ul>

          {follow && active && (
            <div
              className="pointer-events-none fixed z-40 hidden w-[280px] overflow-hidden rounded-md border border-border bg-surface shadow-2xl md:block"
              style={{
                left: Math.min(cursor.x + 24, window.innerWidth - 304),
                top: Math.min(cursor.y - 90, window.innerHeight - 220),
              }}
            >
              <div className="relative aspect-[16/10] bg-[#1a1917]">
                <Image src={active.image} alt="" fill className="object-cover" sizes="280px" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Private systems · {privateProjects.length}
          </p>
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
