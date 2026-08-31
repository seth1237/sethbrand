"use client"

import { Card } from "@/components/ui/card"
import { Code2, Palette, Search, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"

export function About() {
  const skills = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Fast, secure sites on Next.js and React — built to convert, not just look good.",
    },
    {
      icon: Search,
      title: "SEO",
      description: "Get found in Nairobi and beyond. Technical SEO, local search, and content that ranks.",
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Brand, posters, and campaign visuals that make people stop scrolling.",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Campaigns and funnels that turn traffic into inquiries and sales.",
    },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20" aria-label="About Seth Makori">
      <div className="container mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="About"
          title="One person for the whole pipeline"
          description="I help Kenyan businesses get a website that works — then the search and marketing that fill it with customers."
        />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            className="space-y-5 text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p>
              I&apos;m a full-stack developer with a background in Electronics and
              Instrumentation, now doing a Master&apos;s in Artificial Intelligence.
            </p>
            <p>
              I&apos;ve shipped work for{" "}
              <span className="text-foreground font-medium">Amani Centre CBO</span>,{" "}
              <span className="text-foreground font-medium">Accord Medical Supplies</span>,
              and event, fitness, and furniture brands that needed something they
              could actually grow with.
            </p>
            <p>
              If you need a site, a ranking plan, or campaign creative — you talk
              to one person. No agency handoffs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="p-5 h-full">
                  <skill.icon className="h-5 w-5 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-foreground mb-1.5">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
