import { NextResponse } from "next/server"
import { getMedia } from "@/lib/content"

export const runtime = "nodejs"

function toBuffer(data: unknown): Buffer | null {
  if (!data) return null
  if (Buffer.isBuffer(data)) return data
  if (data instanceof Uint8Array) return Buffer.from(data)
  if (typeof data === "object" && data !== null && "buffer" in data) {
    return Buffer.from((data as { buffer: ArrayBuffer }).buffer)
  }
  return null
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const doc = await getMedia(id)
    const buffer = toBuffer(doc?.data)
    if (!doc || !buffer) {
      return new NextResponse("Not found", { status: 404 })
    }
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": String(doc.mimeType || "application/octet-stream"),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
