import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })

  try {
    const resp = await fetch(url, { next: { revalidate: 60 } })
    const html = await resp.text()

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i)
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i)

    const headings: Array<{tag: string; text: string}> = []
    const hMatches = html.matchAll(/<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi)
    for (const m of hMatches) {
      const tag = (m[1] || '').toUpperCase()
      const text = (m[2] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      if (text) headings.push({ tag, text })
    }

    return NextResponse.json({
      title: titleMatch?.[1]?.trim() || null,
      description: descMatch?.[1]?.trim() || null,
      canonical: canonicalMatch?.[1]?.trim() || null,
      robots: robotsMatch?.[1]?.trim() || null,
      headings,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to analyze' }, { status: 500 })
  }
}
