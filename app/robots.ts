import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site.config'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (siteConfig.seo.siteUrl || 'https://example.com').replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

