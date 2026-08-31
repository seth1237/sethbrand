"use client"

import { Briefcase, GraduationCap, Award } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

export function Experience() {
  const education = [
    {
      degree: "Master's in Artificial Intelligence",
      institution: "Open University (Konza)",
      period: "2025 – Present",
    },
    {
      degree: "BSc Applied Science",
      institution: "Technical University of Mombasa",
      period: "2020 – 2024",
      details: "Electronics and Instrumentation",
    },
  ]

  const experience = [
    {
      role: "Digital Marketing",
      company: "Accord Medical Supplies",
      period: "Sep 2025 – Present",
      description: "Campaigns and online presence for a medical supplier.",
    },
    {
      role: "Designer & Marketer",
      company: "Amani CBO & HeroesForHer",
      period: "May 2025 – Aug 2025",
      description: "Volunteer design and marketing for NGOs in Kenya and Nigeria.",
    },
    {
      role: "Graphic Designer",
      company: "Elimu Centre Malindi",
      period: "Jan 2025 – Apr 2025",
      description: "Design, SEO, and web work for an education centre.",
    },
  ]

  const certifications = [
    "Software Engineering — ALX Africa",
    "Artificial Intelligence — ALX Africa",
    "Machine Learning — Braitacademy",
    "Frontend Development — Power Learn Project",
  ]

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="Background"
          title="Experience & education"
          description="Engineering roots, agency-style delivery, currently going deeper on AI."
        />

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Briefcase className="h-4 w-4 text-primary" />
              <h3 className="font-heading font-semibold">Work</h3>
            </div>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.role + exp.company} className="border-l border-foreground/10 pl-4">
                  <h4 className="font-medium text-foreground">{exp.role}</h4>
                  <p className="text-sm text-primary">{exp.company}</p>
                  <p className="font-label text-xs text-muted-foreground mt-0.5">{exp.period}</p>
                  <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className="h-4 w-4 text-primary" />
              <h3 className="font-heading font-semibold">Education</h3>
            </div>
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.degree} className="border-l border-foreground/10 pl-4">
                  <h4 className="font-medium text-foreground">{edu.degree}</h4>
                  {edu.details ? <p className="text-sm text-muted-foreground">{edu.details}</p> : null}
                  <p className="text-sm text-primary">{edu.institution}</p>
                  <p className="font-label text-xs text-muted-foreground mt-0.5">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-5">
              <Award className="h-4 w-4 text-primary" />
              <h3 className="font-heading font-semibold">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary mt-0.5">▹</span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
