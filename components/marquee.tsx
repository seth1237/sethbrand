const items = [
  "Next.js",
  "React",
  "SEO",
  "Figma",
  "Posters",
  "AI",
  "Nairobi",
  "Accord Medical",
  "Boom AV",
  "Amani Centre",
  "Haven Furnitures",
  "Rai Merchants",
]

export function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-b border-border py-4" aria-hidden>
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-5">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="font-label text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {item}
            <span className="ml-10 text-[#CC5500]">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
