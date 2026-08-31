import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin-auth"
import { createPoster, listPosters } from "@/lib/content"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const posters = await listPosters({ fallback: false })
    return NextResponse.json({ posters })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load posters"
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
    const group = String(form.get("group") || "").trim()
    const description = String(form.get("description") || "").trim()

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Choose a poster image" }, { status: 400 })
    }
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const id = await createPoster({ title, group, description, file })
    return NextResponse.json({ ok: true, id })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save poster"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
