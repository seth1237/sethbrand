"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Lock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { DEFAULT_SITES, type SiteItem } from "@/lib/content-defaults"

const privateProjects = [
  {
    title: "HR Management System",
    description: "Employees, attendance, payroll, and reviews.",
    tags: ["HR", "Dashboard"],
    client: "Accord Medicals",
  },
  {
    title: "Sales Management System",
    description: "Inventory, orders, CRM, and sales analytics.",
    tags: ["Sales", "CRM"],
    client: "Accord Medical Supplies",
  },
  {
    title: "Machine Servicing System",
    description: "600+ medical installs tracked, with an engineer mobile app.",
    tags: ["Field ops", "Mobile"],
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
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
      loading={priority ? "eager" : "lazy"}
      priority={priority}
    />
  )
}

export function Projects() {
  const [publicProjects, setPublicProjects] = useState<SiteItem[]>(DEFAULT_SITES)
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? publicProjects : publicProjects.slice(0, 3)

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
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="container mx-auto max-w-6xl space-y-10 sm:space-y-16">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Work"
            title="Sites that bring in customers"
            description="Live websites for events, medical, furniture, NGOs, and fitness — built in Kenya, for Kenyan businesses."
          />
          <p className="text-sm text-muted-foreground">
            Deep dives:{" "}
            <Link href="/case-studies/boom-audio-visuals" className="text-primary hover:underline">
              Boom Audio Visuals
            </Link>
            {" · "}
            <Link href="/case-studies/amani-centre-cbo" className="text-primary hover:underline">
              Amani Centre CBO
            </Link>
          </p>
        </div>

        <div className="grid gap-6">
          {visibleProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex flex-col md:flex p-0`}
            >
              <div
                className={`md:w-1/2 relative overflow-hidden h-44 sm:h-56 md:h-auto min-h-[180px] md:min-h-[220px] ${
                  index % 2 === 0
                    ? "rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                    : "rounded-t-2xl md:rounded-r-2xl md:rounded-tl-none"
                }`}
              >
                <SiteImage src={project.image} alt={project.title} priority={index === 0} />
              </div>
              <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-center">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-label tracking-wide bg-primary/10 text-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full sm:w-fit min-h-11">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {publicProjects.length > 3 && (
          <div className="text-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-11" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show less" : "See more work"}
            </Button>
          </div>
        )}

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Enterprise"
            title="Private systems"
            description="Custom tools for Accord Medical — not public, but this is the same build quality."
          />
          <div className="grid md:grid-cols-3 gap-4">
            {privateProjects.map((project) => (
              <Card key={project.title} className="p-6">
                <Lock className="w-4 h-4 text-primary mb-4" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{project.title}</h3>
                <p className="text-xs font-label tracking-wide text-primary mb-3">{project.client}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full border border-foreground/10 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="w-full sm:w-auto min-h-11">
            <a href="#contact">
              Start a project
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
