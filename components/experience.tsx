const experience = [
  {
    role: "Digital Marketing",
    company: "Accord Medical Supplies",
    period: "2025 — Now",
    description: "Campaigns and online presence for a medical supplier.",
  },
  {
    role: "Designer & Marketer",
    company: "Amani CBO & HeroesForHer",
    period: "2025",
    description: "Volunteer design and marketing for NGOs in Kenya and Nigeria.",
  },
  {
    role: "Graphic Designer",
    company: "Elimu Centre Malindi",
    period: "2025",
    description: "Design, SEO, and web work for an education centre.",
  },
]

const education = [
  {
    degree: "Master's in Artificial Intelligence",
    institution: "Open University (Konza)",
    period: "2025 — Present",
  },
  {
    degree: "BSc Applied Science",
    institution: "Technical University of Mombasa",
    period: "2020 — 2024",
    details: "Electronics and Instrumentation",
  },
]

export function Experience() {
  return (
    <section id="experience" className="border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl grid gap-14 lg:grid-cols-2">
        <div>
          <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">06 · Work</p>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {experience.map((item) => (
              <div key={item.role + item.company} className="py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium text-foreground">{item.role}</h3>
                  <span className="font-label text-[11px] text-muted-foreground shrink-0">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-foreground/80">{item.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Education</p>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {education.map((item) => (
              <div key={item.degree} className="py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium text-foreground">{item.degree}</h3>
                  <span className="font-label text-[11px] text-muted-foreground shrink-0">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.institution}
                  {item.details ? ` · ${item.details}` : ""}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Software Engineering and AI, ALX Africa. Machine Learning, Braitacademy. Frontend, Power Learn Project.
          </p>
        </div>
      </div>
    </section>
  )
}
