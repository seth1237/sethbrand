import { Stagger, StaggerItem } from "@/components/animations"

const stats = [
  { value: "40+", label: "Websites" },
  { value: "600+", label: "Installs tracked" },
  { value: "60%", label: "More inquiries · Boom" },
  { value: "3×", label: "Bookings · Cadiet Gym" },
]

export function StatsStrip() {
  return (
    <section aria-label="Results" className="border-y border-border px-5 sm:px-8">
      <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4" stagger={0.08}>
        {stats.map((item) => (
          <StaggerItem key={item.label} className="py-7 sm:py-9 lg:px-2">
            <p className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">{item.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
