import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin-auth"
import { deletePoster, updatePoster } from "@/lib/content"

export const runtime = "nodejs"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  try {
    const body = await req.json()
    await updatePoster(id, {
      title: typeof body.title === "string" ? body.title : undefined,
      group: typeof body.group === "string" ? body.group : undefined,
      description: typeof body.description === "string" ? body.description : undefined,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update poster"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  try {
    await deletePoster(id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete poster"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
