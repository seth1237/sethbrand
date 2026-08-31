export function PageGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      <div className="hero-glow absolute inset-0" />
    </div>
  )
}
