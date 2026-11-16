import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif, Space_Grotesk, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { ConditionalFooter } from "@/components/conditional-footer"
import { PageTransition } from "@/components/page-transition"
import { CustomCursor } from "@/components/custom-cursor"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "Seth Makori",
    "Web Developer Nairobi",
    "SEO Kenya",
    "Graphic Design Nairobi",
    "Digital Marketing Kenya",
    "codewithseth",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} · ${siteConfig.handle}`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Seth Makori, web developer and SEO specialist in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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
    apple: [{ url: "/apple-icon.png" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1a1917",
}

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
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
    "@type": "ProfessionalService",
    name: `${siteConfig.name} · ${siteConfig.handle}`,
    url: siteConfig.url,
    image: `${siteConfig.url}/profile.webp`,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    areaServed: { "@type": "Country", name: "Kenya" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone.tel,
    sameAs: [
      siteConfig.social.linkedin.url,
      siteConfig.social.twitter.url,
      siteConfig.social.instagram.url,
      siteConfig.social.facebook.url,
      siteConfig.social.youtube.url,
      siteConfig.social.github.url,
    ],
    priceRange: "KES",
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/profile.webp`,
    jobTitle: "Web Developer & SEO Specialist",
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone.tel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Technical University of Mombasa" },
      { "@type": "CollegeOrUniversity", name: "Open University (Konza)" },
    ],
    sameAs: [
      siteConfig.social.linkedin.url,
      siteConfig.social.twitter.url,
      siteConfig.social.instagram.url,
      siteConfig.social.facebook.url,
      siteConfig.social.youtube.url,
      siteConfig.social.github.url,
    ],
  }

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1a1917" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body
        className={`font-sans ${sans.variable} ${serif.variable} ${GeistMono.variable} ${monoLabel.variable} antialiased`}
      >
        <div className="grain" aria-hidden />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={null}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
          <ConditionalFooter />
          <WhatsAppButton />
          <CustomCursor />
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
