/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev chunk names stay stable, and an earlier immutable cache stored the
  // old homepage script. A prefix makes the browser request a fresh URL.
  ...(process.env.NODE_ENV === "production" ? {} : { assetPrefix: "/dev-assets" }),
  // Enable modern JavaScript output (avoid legacy bundles)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Headers for caching and security.
  // Dev chunk URLs stay stable while the file changes, so a year-long
  // immutable cache keeps serving the previous homepage script.
  async headers() {
    const headers = [
      {
        source: '/((?!api/frame).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Link', value: '<https://codewithseth.co.ke>; rel="canonical"' },
        ],
      },
    ]

    if (process.env.NODE_ENV !== 'production') return headers

    headers.push(
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, stale-while-revalidate=86400' },
        ],
      },
    )

    return headers
  },
  async rewrites() {
    if (process.env.NODE_ENV === "production") return []
    return [{ source: "/dev-assets/_next/:path*", destination: "/_next/:path*" }]
  },
}

export default nextConfig
