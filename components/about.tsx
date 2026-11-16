import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { Stagger, StaggerItem } from "@/components/animations"
import { siteConfig } from "@/lib/site-config"

const tools = ["Next.js", "React", "Figma", "Search Console"]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24" aria-label="About Seth Makori">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-surface">
            <Image
              src="/elimu.png"
              alt="Seth Makori, web developer and SEO specialist in Nairobi"
              width={800}
              height={1200}
              className="h-auto w-full object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 380px"
            />
          </div>
          <p className="mt-4 font-heading text-lg italic text-[#E8702A]">
            One person. Design, code, search, and the marketing that follows.
          </p>
        </div>

        <div>
          <SectionHeading index="04" eyebrow="About" title="Designer and developer, one pipeline" />
          <Stagger className="mt-8 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base" stagger={0.1}>
            <StaggerItem>
              I make the posters and brand work, then the website those visuals live on. Background in Electronics and
              Instrumentation, now doing a Master&apos;s in Artificial Intelligence.
            </StaggerItem>
            <StaggerItem>
              Campaigns and sites for Amani Centre CBO, Accord Medical Supplies, and event, fitness, and furniture brands
              that needed something they could grow with.
            </StaggerItem>
            <StaggerItem>If you need graphics, a site, or a ranking plan, you talk to one person.</StaggerItem>
          </Stagger>

          <div className="mt-8 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                {tool}
              </span>
            ))}
          </div>

          <a
            href={siteConfig.social.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex text-sm text-[#E8702A] underline-offset-4 hover:underline"
          >
            CV / LinkedIn →
          </a>
        </div>
      </div>
    </section>
  )
}
