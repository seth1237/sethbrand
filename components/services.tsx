"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"

export function Services() {
  const services = [
    {
      title: "Web Development",
      description: "A site that loads fast, looks right on a phone, and turns visitors into leads.",
      features: ["Responsive design", "E-commerce & catalogs", "CMS you can update", "Payment & API integrations"],
    },
    {
      title: "SEO",
      description: "Show up when Nairobi customers search for what you sell.",
      features: ["Keyword & competitor research", "On-page and technical SEO", "Google Business Profile", "Monthly reporting"],
    },
    {
      title: "Graphic Design",
      description: "Visuals that match your brand and work on posters, ads, and social.",
      features: ["Brand identity", "Campaign & social graphics", "Print and event design", "UI for your product"],
    },
    {
      title: "Digital Marketing",
      description: "Paid and organic campaigns aimed at inquiries — not vanity metrics.",
      features: ["Social management", "Ads & remarketing", "Email sequences", "Content that converts"],
    },
  ]

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8" aria-label="Services">
      <div className="container mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="Services"
          title="What I can do for your business"
          description="Pick one, or hand over the whole stack. Most clients start with a website, then add SEO and campaigns."
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="p-5 sm:p-7 h-full">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <a href="#contact">
              Book a free call
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
