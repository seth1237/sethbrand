import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Contact } from "@/components/contact"

export const metadata: Metadata = {
  title: "Book a call | Seth Makori",
  description: "Get in touch for web development, SEO, graphic design, or digital marketing in Nairobi.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-[calc(3.5rem+env(safe-area-inset-top))]">
        <Contact />
      </div>
    </main>
  )
}
