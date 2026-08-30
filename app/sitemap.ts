import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL(siteConfig.url).origin

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/portfolio`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/tools`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/design`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/case-studies/boom-audio-visuals`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/case-studies/amani-centre-cbo`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/services/seo/local-seo-nairobi`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/services/seo/technical-seo-audit-kenya`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/services/seo/mpesa-integration-systems-kenya`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Blog dynamic routes (mirrors app/blog/[id])
  const blogIds = [1, 2, 3, 4, 5, 6]
  const blogRoutes: MetadataRoute.Sitemap = blogIds.map((id) => ({
    url: `${base}/blog/${id}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Services potential sub-sections anchors (optional, not typical for sitemap)

  return [...staticRoutes, ...blogRoutes]
}
