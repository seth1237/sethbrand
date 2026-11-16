import dynamic from "next/dynamic"
import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { StatsStrip } from "@/components/stats-strip"
import { Marquee } from "@/components/marquee"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { GraphicsShowcase } from "@/components/graphics-showcase"
import { About } from "@/components/about"

const Testimonials = dynamic(() =>
  import("@/components/testimonials").then((mod) => ({ default: mod.Testimonials })),
)
const Faq = dynamic(() => import("@/components/faq").then((mod) => ({ default: mod.Faq })))
const Experience = dynamic(() => import("@/components/experience").then((mod) => ({ default: mod.Experience })))
const Contact = dynamic(() => import("@/components/contact").then((mod) => ({ default: mod.Contact })))

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a website take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A marketing site is usually 3–6 weeks from brief to launch.",
      },
    },
    {
      "@type": "Question",
      name: "What does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Packages start from KES 22,000 a month. One-off builds are quoted after a short call.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do. Domain, hosting, code, and content are in your name.",
      },
    },
  ],
}

export default function Home() {
  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navigation />
      <Hero />
      <StatsStrip />
      <Marquee />
      <Projects />
      <Services />
      <GraphicsShowcase />
      <About />
      <Testimonials />
      <Faq />
      <Experience />
      <Contact />
    </main>
  )
}
