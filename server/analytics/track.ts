import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongo"

interface TrackPayload {
  path?: string
  referrer?: string
}

export async function handleTrack(req: NextRequest) {
  try {
    let payload: TrackPayload | null = null
    try {
      const parsed = await req.json()
      payload = typeof parsed === "object" && parsed !== null ? (parsed as TrackPayload) : null
    } catch (err) {
      console.error("Failed to parse tracking payload", err)
    }

    const rawPath = typeof payload?.path === "string" ? payload.path : null
    if (!rawPath) {
      return NextResponse.json({ success: false, error: "Missing path" }, { status: 400 })
    }

    const path = rawPath.slice(0, 512)
    const referrer = typeof payload?.referrer === "string" ? payload.referrer.slice(0, 512) : undefined
    const userAgent = req.headers.get("user-agent") || "unknown"
    const ipHeader = req.headers.get("x-forwarded-for") || ""
    const ip = ipHeader.split(",")[0]?.trim() || "unknown"

    const db = await getDb()
    await db.collection("pageViews").insertOne({ path, referrer, userAgent, ip, createdAt: new Date() })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics tracking failed", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
