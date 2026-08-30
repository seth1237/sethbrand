import dynamic from "next/dynamic"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Navigation } from "@/components/navigation"

// Dynamically import below-the-fold components to reduce initial JS bundle
const GraphicsShowcase = dynamic(() => import("@/components/graphics-showcase").then(mod => ({ default: mod.GraphicsShowcase })), {
  loading: () => <div className="h-96" />
})
const Projects = dynamic(() => import("@/components/projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="h-96" />
})
const Experience = dynamic(() => import("@/components/experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="h-96" />
})
const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="h-96" />
})
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96" />
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <GraphicsShowcase />
      <Projects />
      <Testimonials />
      <Experience />
      <Contact />
    </main>
  )
}
