import { ContactForm } from "@/components/contact-form"
import { Stagger, StaggerItem } from "@/components/animations"
import { siteConfig } from "@/lib/site-config"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <Stagger className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20" stagger={0.12}>
        <StaggerItem>
          <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">09 · Contact</p>
          <h2 className="mt-4 font-heading text-3xl sm:text-5xl tracking-tight leading-[1.04]">
            Tell me what you need built.
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
            WhatsApp is fastest. The form is second. Book a 20-minute call if you would rather talk it through.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={siteConfig.contact.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-fit items-center rounded-full bg-[#CC5500] px-6 text-sm font-medium text-[#F4EFE8] hover:bg-[#E8702A]"
            >
              WhatsApp
            </a>
            <a
              href={siteConfig.contact.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-fit items-center rounded-full border border-foreground/20 px-6 text-sm text-foreground hover:border-[#E8702A] hover:text-[#E8702A]"
            >
              Book a discovery call
            </a>
          </div>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="font-label text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#E8702A]">
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Phone</dt>
              <dd className="mt-1">
                <a href={`tel:${siteConfig.contact.phone.tel}`} className="hover:text-[#E8702A]">
                  {siteConfig.contact.phone.primary}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-label text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Studio</dt>
              <dd className="mt-1">{siteConfig.contact.location}</dd>
            </div>
          </dl>
        </StaggerItem>

        <StaggerItem>
          <p className="mb-6 text-sm text-muted-foreground">
            After you submit, I reply within one business day with next steps — usually a short call and a written scope.
          </p>
          <ContactForm />
        </StaggerItem>
      </Stagger>
    </section>
  )
}
