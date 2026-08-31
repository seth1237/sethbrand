import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin-auth"
import { createSite, listSites } from "@/lib/content"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const sites = await listSites({ fallback: false })
    return NextResponse.json({ sites })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load sites"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const form = await req.formData()
    const file = form.get("file")
    const title = String(form.get("title") || "").trim()
    const description = String(form.get("description") || "").trim()
    const link = String(form.get("link") || "").trim()
    const tags = String(form.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }
    if (!link) {
      return NextResponse.json({ error: "Site URL is required" }, { status: 400 })
    }

    const id = await createSite({
      title,
      description,
      tags,
      link,
      file: file instanceof File && file.size > 0 ? file : null,
    })
    return NextResponse.json({ ok: true, id })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save site"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
