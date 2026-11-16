import { Stagger, StaggerItem } from "@/components/animations"

const testimonials = [
  {
    name: "James Ondiek",
    role: "Founder, Boom Audio Visuals",
    quote: "The design captures our brand, and inquiries have increased by over 60% since launch.",
    href: "https://www.boomevents.co.ke/",
    mark: "BA",
  },
  {
    name: "John Green",
    role: "Director, Amani Centre CBO",
    quote: "He understood our mission and built a site that actually helps us reach people in need.",
    href: "https://www.amanicentercbo.org/",
    mark: "AC",
  },
  {
    name: "Dickson Cadiet",
    role: "Cadiet Gym Coach",
    quote: "Clean, easy to use, and my online bookings have tripled since the site went live.",
    href: "https://cadiet.vercel.app/",
    mark: "CG",
  },
]

export function Testimonials() {
  return (
    <section className="border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">05 · Clients</p>
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((item, index) => (
            <StaggerItem key={item.name} className={index === 1 ? "md:mt-8" : ""}>
              <figure className="h-full bg-surface p-6 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#CC5500] text-sm font-medium text-[#F4EFE8]">
                  {item.mark}
                </div>
                <blockquote className="mt-6 font-heading text-xl leading-snug tracking-tight text-foreground sm:text-[1.35rem]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  {item.name}
                  <span className="block">{item.role}</span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-[#E8702A] underline-offset-4 hover:underline"
                  >
                    Visit site
                  </a>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
