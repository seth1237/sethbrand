import { NextRequest, NextResponse } from "next/server"
import { handleTrack } from "@/server/analytics/track"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  return handleTrack(req)
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
