import { NextResponse } from "next/server"
import { listSites } from "@/lib/content"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const sites = await listSites()
  return NextResponse.json({ sites })
}
