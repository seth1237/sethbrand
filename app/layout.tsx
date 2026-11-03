import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { ConditionalFooter } from "@/components/conditional-footer"
import { PageTransition } from "@/components/page-transition"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  title: "Seth Makori - Digital Solutions Expert",
  description:
    "Websites that get found, and businesses that get customers. Web development, SEO, graphic design, and digital marketing in Nairobi, Kenya.",
  generator: "v0.app",
  metadataBase: new URL("https://codewithseth.co.ke"),
  keywords: ["Web Development", "SEO", "Graphic Design", "Digital Marketing", "Seth Makori", "Kenya"],
  authors: [{ name: "Seth Makori" }],
  creator: "Seth Makori",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codewithseth.co.ke",
    title: "Seth Makori - Digital Solutions Expert",
    description: "Websites that get found, and businesses that get customers. Web development, SEO, graphic design, and digital marketing in Nairobi, Kenya.",
    siteName: "Seth Makori Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Seth Makori - Digital Solutions Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seth Makori - Digital Solutions Expert",
    description: "Websites that get found, and businesses that get customers.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1a1917",
}

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const monoLabel = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-label",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.social.linkedin.url,
      siteConfig.social.twitter.url,
      siteConfig.social.instagram.url,
      siteConfig.social.facebook.url,
      siteConfig.social.youtube?.url,
      siteConfig.social.github.url,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone.primary,
      areaServed: "KE",
      availableLanguage: ["en"],
      contactType: "customer support",
    },
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Full-Stack Developer & Digital Marketer",
    sameAs: [
      siteConfig.social.linkedin.url,
      siteConfig.social.twitter.url,
      siteConfig.social.instagram.url,
      siteConfig.social.facebook.url,
      siteConfig.social.youtube?.url,
      siteConfig.social.github.url,
    ].filter(Boolean),
  }

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Performance / SEO hints */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        {/* Favicon and app icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1a1917" />
        <meta name="description" content="Websites that get found, and businesses that get customers. Web development, SEO, design, and marketing in Nairobi, Kenya." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${display.variable} ${monoLabel.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={null}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
          <ConditionalFooter />
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
        </ThemeProvider>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
