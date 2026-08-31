import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin-auth"
import { deleteSite } from "@/lib/content"

export const runtime = "nodejs"

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  try {
    await deleteSite(id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete site"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
