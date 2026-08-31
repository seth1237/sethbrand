import { NextResponse } from "next/server"
import { listPosters } from "@/lib/content"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const posters = await listPosters()
  return NextResponse.json({ posters })
}
