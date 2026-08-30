"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { SectionHeading } from "@/components/section-heading"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl space-y-12">
        <SectionHeading
          eyebrow="Contact"
          title="Tell me what you need built"
          description="A website, SEO, design, or a campaign. Reply within one business day."
          align="center"
        />

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="space-y-4">
            <Card className="p-5 border-foreground/10 bg-background">
              <Mail className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-sm mb-1">Email</h3>
              <a
                href="mailto:bellarinseth@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
              >
                bellarinseth@gmail.com
              </a>
            </Card>
            <Card className="p-5 border-foreground/10 bg-background">
              <Phone className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-sm mb-1">Phone</h3>
              <a href="tel:+254114627400" className="text-sm text-muted-foreground hover:text-primary block">
                +254 114 627 400
              </a>
              <a href="tel:+254759433906" className="text-sm text-muted-foreground hover:text-primary block">
                +254 759 433 906
              </a>
            </Card>
            <Card className="p-5 border-foreground/10 bg-background">
              <MapPin className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-sm mb-1">Location</h3>
              <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
            </Card>
          </div>

          <Card className="lg:col-span-2 p-6 border-foreground/10 bg-background">
            <h3 className="font-heading font-semibold text-lg mb-4">Send a message</h3>
            <ContactForm />
          </Card>
        </div>
      </div>
    </section>
  )
}
