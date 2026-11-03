import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem } from "@/components/animations"

const skills = [
  { title: "Web", detail: "Next.js and React, built to convert." },
  { title: "Search", detail: "Technical SEO, local search, content that ranks." },
  { title: "Design", detail: "Brand, posters, and campaign visuals." },
  { title: "Marketing", detail: "Funnels that turn traffic into inquiries." },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24" aria-label="About Seth Makori">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading index="04" eyebrow="About" title="One person for the whole pipeline" />
          <Stagger className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground" stagger={0.1}>
            <StaggerItem>
              I&apos;m a full-stack developer with a background in Electronics and Instrumentation, now doing a
              Master&apos;s in Artificial Intelligence.
            </StaggerItem>
            <StaggerItem>
              I&apos;ve shipped work for Amani Centre CBO, Accord Medical Supplies, and event, fitness, and furniture
              brands that needed something they could grow with.
            </StaggerItem>
            <StaggerItem>If you need a site, a ranking plan, or campaign creative, you talk to one person.</StaggerItem>
          </Stagger>
        </div>

        <Stagger className="lg:pt-16 divide-y divide-border border-y border-border" stagger={0.08}>
          {skills.map((skill) => (
            <StaggerItem key={skill.title} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
              <p className="text-sm font-medium text-foreground">{skill.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{skill.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
