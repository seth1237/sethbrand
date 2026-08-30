"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Lock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"

export function Projects() {
  const publicProjects = [
    {
      title: "Boom Audio Visuals",
      description:
        "Event production site for a premium AV brand. Clear services, portfolio, and a contact flow that grew inquiries.",
      image: "/boom-audio-visuals-website.webp",
      tags: ["Next.js", "Events"],
      link: "https://boomevents.co.ke/",
    },
    {
      title: "Astermed Medical Supplies",
      description:
        "Product catalog for a medical supplier — upload, featured items, and a clean storefront for clinics.",
      image: "/astermed-medical-supplies-logo.webp",
      tags: ["Catalog", "Medical"],
      link: "https://www.astermedsupplies.co.ke/",
    },
    {
      title: "Haven Furnitures",
      description:
        "Furniture e-commerce with an admin dashboard for products and images.",
      image: "/modern-furniture-website.webp",
      tags: ["E-commerce", "Dashboard"],
      link: "https://www.havenlivingfurniture.co.ke/",
    },
    {
      title: "Amani Centre CBO",
      description:
        "Community site for flood response and outreach. Fast on mobile, easy to update.",
      image: "/community-organization-website.webp",
      tags: ["NGO", "Community"],
      link: "https://www.amanicentercbo.org/",
    },
    {
      title: "WOMD Digitech",
      description: "Kenyan domain registration platform from the KENIC hackathon.",
      image: "/domain-registration-website.webp",
      tags: ["Hackathon", "Domains"],
      link: "http://womd.co.ke/",
    },
    {
      title: "Cadiet Gym Coach",
      description: "Fitness coaching site. Bookings went up after launch.",
      image: "/fitness-gym-coach-website.webp",
      tags: ["Fitness", "Portfolio"],
      link: "https://cadiet.vercel.app/",
    },
    {
      title: "MyKitchen",
      description: "Vegan recipe site with 700+ recipes, built for search and speed.",
      image: "/mykitchen.png",
      tags: ["SEO", "Content"],
      link: "https://mykitchen.codewithseth.co.ke/",
    },
    {
      title: "Dhamira Imara",
      description: "Financial management for NGOs — budgeting, reporting, donors.",
      image: "/dhamira.png",
      tags: ["Finance", "NGO"],
      link: "https://www.dhamiraimara.org/",
    },
    {
      title: "Elevate (HR System)",
      description: "HR platform for payroll, attendance, and employee lifecycle.",
      image: "/pro_samples/elevate-hr.webp",
      tags: ["HR", "Enterprise"],
      link: "https://hr.codewithseth.co.ke/",
    },
    {
      title: "API to PDF",
      description: "HTML-to-PDF microservice for reports and exports.",
      image: "/api_pdf.png",
      tags: ["API", "PDF"],
      link: "https://api-pdf.codewithseth.co.ke/",
    },
  ]

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

  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? publicProjects : publicProjects.slice(0, 3)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-16">
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
              key={project.title}
              className={`overflow-hidden border-foreground/10 bg-background hover:border-primary/40 transition-colors ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex flex-col md:flex p-0`}
            >
              <div className="md:w-1/2 relative overflow-hidden bg-muted h-56 md:h-auto min-h-[220px]">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </div>
              <div className="md:w-1/2 p-7 flex flex-col justify-center">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
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
                <Button asChild variant="outline" size="sm" className="w-fit">
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
            <Button variant="outline" size="lg" onClick={() => setShowAll(!showAll)}>
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
              <Card key={project.title} className="p-6 border-foreground/10 bg-background">
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
          <Button asChild size="lg">
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
