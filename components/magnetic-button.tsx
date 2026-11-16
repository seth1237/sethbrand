"use client"

import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export function MagneticButton({
  href,
  children,
  className,
  external,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = node.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    node.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)"
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-flex transition-transform duration-200 will-change-transform", className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  )
}
