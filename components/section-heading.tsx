import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-label text-xs sm:text-sm tracking-[0.2em] uppercase text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  )
}
