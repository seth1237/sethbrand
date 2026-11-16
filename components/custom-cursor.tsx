"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add("has-custom-cursor")

    const move = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY })
      const target = event.target as HTMLElement | null
      const interactive = Boolean(target?.closest("a, button, input, textarea, [role='button']"))
      setHovering(interactive)
    }

    window.addEventListener("mousemove", move, { passive: true })
    return () => {
      window.removeEventListener("mousemove", move)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden md:block mix-blend-difference"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      aria-hidden
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-all duration-200 ${
          hovering ? "h-10 w-10 bg-white/20" : "h-3 w-3 bg-white"
        }`}
      />
    </div>
  )
}
