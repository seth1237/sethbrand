"use client"

import { useEffect, useRef, useState } from "react"

const VIEW_W = 1366
const VIEW_H = 820

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

type LiveSiteFrameProps = {
  url: string
  title: string
}

export function LiveSiteFrame({ url, title }: LiveSiteFrameProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(0.42)
  const [active, setActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const metrics = useRef({ height: VIEW_H * 2.4, view: VIEW_H })

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const measure = () => setScale(shell.clientWidth / VIEW_W)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(shell)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.35
        setActive(visible)
        if (entry.isIntersecting) setMounted(true)
      },
      { threshold: [0, 0.35, 0.6], rootMargin: "240px 0px" },
    )
    observer.observe(shell)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return
      const data = event.data
      if (!data || data.source !== "seth-preview" || data.type !== "metrics") return
      const height = Number(data.height)
      const view = Number(data.view)
      if (height > 0) metrics.current.height = height
      if (view > 0) metrics.current.view = view
      if (height > view) setReady(true)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  useEffect(() => {
    if (!active || !ready) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const frame = iframeRef.current?.contentWindow
    if (!frame) return

    if (reduce) {
      frame.postMessage({ source: "seth-preview", type: "scroll", y: 0 }, "*")
      return
    }

    const hold = 2200
    const down = 18000
    const rest = 1400
    const up = 10000
    const cycle = hold + down + rest + up
    const started = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = (now - started) % cycle
      let progress = 0
      if (elapsed < hold) progress = 0
      else if (elapsed < hold + down) progress = easeInOut((elapsed - hold) / down)
      else if (elapsed < hold + down + rest) progress = 1
      else progress = 1 - easeInOut((elapsed - hold - down - rest) / up)

      const max = Math.max(0, metrics.current.height - metrics.current.view - 24)
      iframeRef.current?.contentWindow?.postMessage(
        { source: "seth-preview", type: "scroll", y: max * progress },
        "*",
      )
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, ready])

  const hostname = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "")
    } catch {
      return url
    }
  })()

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border bg-background"
      aria-label={`Open ${title}`}
    >
      <div className="flex h-9 items-center gap-2 border-b border-border px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
        <span className="truncate font-label text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
          {hostname}
        </span>
      </div>
      <div ref={shellRef} className="relative w-full overflow-hidden bg-white" style={{ height: Math.max(220, Math.round(VIEW_H * scale)) }}>
        {mounted ? (
          <iframe
            ref={iframeRef}
            title={title}
            src={`/api/frame?url=${encodeURIComponent(url)}`}
            sandbox="allow-scripts allow-popups"
            referrerPolicy="no-referrer"
            scrolling="no"
            className="pointer-events-none absolute left-0 top-0 border-0"
            style={{ width: VIEW_W, height: VIEW_H, transform: `scale(${scale})`, transformOrigin: "top left" }}
          />
        ) : (
          <div className="absolute inset-0 bg-foreground/5" />
        )}
      </div>
    </a>
  )
}
