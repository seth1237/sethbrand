import dynamic from "next/dynamic"
import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { About } from "@/components/about"

const GraphicsShowcase = dynamic(() =>
  import("@/components/graphics-showcase").then((mod) => ({ default: mod.GraphicsShowcase })),
)
const Experience = dynamic(() => import("@/components/experience").then((mod) => ({ default: mod.Experience })))
const Contact = dynamic(() => import("@/components/contact").then((mod) => ({ default: mod.Contact })))
const Testimonials = dynamic(() =>
  import("@/components/testimonials").then((mod) => ({ default: mod.Testimonials })),
)

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Projects />
      <Services />
      <GraphicsShowcase />
      <About />
      <Testimonials />
      <Experience />
      <Contact />
    </main>
  )
}
