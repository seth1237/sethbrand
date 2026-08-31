import { NextResponse } from "next/server"
import { adminConfigured, checkPassword, setAdminCookie } from "@/lib/admin-auth"

export const runtime = "nodejs"

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Set ADMIN_PASSWORD in .env.local (at least 6 characters)." },
      { status: 500 },
    )
  }

  const body = await req.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 })
  }

  await setAdminCookie()
  return NextResponse.json({ ok: true })
}
