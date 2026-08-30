import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const host = req.headers.get("host") || ""
  
  // Skip redirect for localhost, Vercel preview URLs, and when explicitly disabled
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1")
  const isVercelPreview = host.includes(".vercel.app")
  const skipEnforcement = process.env.NEXT_PUBLIC_SKIP_HOST_REDIRECT === "1"

  if (isLocal || isVercelPreview || skipEnforcement) {
    return NextResponse.next()
  }

  // Only redirect www subdomain to apex, avoid other redirect loops
  if (host === "www.codewithseth.co.ke") {
    url.hostname = "codewithseth.co.ke"
    url.protocol = "https"
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
}
