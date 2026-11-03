import { ContactForm } from "@/components/contact-form"
import { Stagger, StaggerItem } from "@/components/animations"
import { siteConfig } from "@/lib/site-config"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <Stagger className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20" stagger={0.12}>
        <StaggerItem>
          <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">07 · Contact</p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-medium tracking-tight leading-[1.08]">
            Tell me what you need built.
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
            A website, SEO, design, or a campaign. I reply within one business day.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="font-label text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline underline-offset-4">
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Phone</dt>
              <dd className="mt-1 space-y-1">
                <a href="tel:+254114627400" className="block hover:underline underline-offset-4">
                  {siteConfig.contact.phone.primary}
                </a>
                <a href="tel:+254759433906" className="block hover:underline underline-offset-4">
                  {siteConfig.contact.phone.secondary}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Studio</dt>
              <dd className="mt-1">Nairobi, Kenya</dd>
            </div>
          </dl>
        </StaggerItem>

        <StaggerItem>
          <ContactForm />
        </StaggerItem>
      </Stagger>
    </section>
  )
}
