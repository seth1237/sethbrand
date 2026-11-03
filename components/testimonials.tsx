const testimonials = [
  {
    name: "James Ondiek",
    role: "Founder, Boom Audio Visuals",
    quote: "The design captures our brand, and inquiries have increased by over 60% since launch.",
  },
  {
    name: "John Green",
    role: "Director, Amani Centre CBO",
    quote: "He understood our mission and built a site that actually helps us reach people in need.",
  },
  {
    name: "Dickson Cadiet",
    role: "Cadiet Gym Coach",
    quote: "Clean, easy to use, and my online bookings have tripled since the site went live.",
  },
]

export function Testimonials() {
  return (
    <section className="border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-label text-[11px] tracking-[0.18em] uppercase text-muted-foreground">05 · Clients</p>
        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-10">
          {testimonials.map((item) => (
            <figure key={item.name}>
              <blockquote className="font-heading text-xl sm:text-[1.35rem] font-medium leading-snug tracking-tight text-foreground">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                {item.name}
                <span className="block">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
