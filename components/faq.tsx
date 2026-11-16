import { SectionHeading } from "@/components/section-heading"

const questions = [
  {
    q: "How long does a website take?",
    a: "A marketing site is usually 3–6 weeks from brief to launch. Larger catalogs, dashboards, or SEO retainers run longer and we agree the timeline before work starts.",
  },
  {
    q: "What does it cost?",
    a: "Packages start from KES 22,000 a month. One-off builds are quoted after a short call. You will always see the number before we begin.",
  },
  {
    q: "Who owns the site?",
    a: "You do. Domain, hosting, code, and content are in your name. I do not lock you into a platform you cannot leave.",
  },
  {
    q: "Where is it hosted?",
    a: "Most sites go on Vercel with a Kenyan or regional domain. I set up email, Search Console, and analytics as part of launch.",
  },
  {
    q: "What happens after launch?",
    a: "Fixes in the first two weeks are included. After that you can keep a Growth or Full Service retainer, or call when you need something new.",
  },
  {
    q: "Do you work with businesses outside Nairobi?",
    a: "Yes. Most of the work is remote. I am based in Nairobi and can meet in person when it helps.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border px-5 sm:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="08" eyebrow="FAQ" title="Straight answers" />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {questions.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none font-heading text-xl tracking-tight text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-baseline justify-between gap-4">
                  {item.q}
                  <span className="text-[#CC5500] transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
