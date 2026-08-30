"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Lightweight client-side tracker that pings our API whenever the route changes.
 * Uses sendBeacon when available to avoid blocking navigation.
 */
export function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return

    const search = searchParams?.toString()
    const path = search ? `${pathname}?${search}` : pathname
    const payload = {
      path,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      ts: Date.now(),
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
    const url = `${apiUrl}/api/analytics/track`
    const body = JSON.stringify(payload)

    // Prefer sendBeacon to keep navigation snappy
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const sent = navigator.sendBeacon(url, new Blob([body], { type: "application/json" }))
      if (sent) return
    }

    // Fallback: fire-and-forget fetch
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Silently ignore tracking failures
    })
  }, [pathname, searchParams])

  return null
}
