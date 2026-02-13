import { MetadataRoute } from 'next'
import { getAllReviews, getAllGuides } from '@/lib/api'
import { getAllCategories, getAllProducts } from '@/lib/products-data'
import { siteConfig } from '@/lib/site.config'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (siteConfig.seo.siteUrl || 'https://example.com').replace(/\/$/, '')

  const reviews = getAllReviews()
  const guides = getAllGuides()
  const products = await getAllProducts()
  const categories = getAllCategories()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]
  
  // Review pages
  const reviewPages = reviews.map((review) => ({
    url: `${baseUrl}/review/${review.slug}`,
    lastModified: review.frontmatter.updatedDate
      ? new Date(review.frontmatter.updatedDate)
      : new Date(review.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Guide pages
  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.frontmatter.updatedDate
      ? new Date(guide.frontmatter.updatedDate)
      : new Date(guide.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Product pages (for internal linking + early crawlable entities)
  const productPages = products
    .filter((product) => Boolean(product?.asin))
    .map((product) => ({
      url: `${baseUrl}/product/${product.asin}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  
  // Category pages (using path segments)
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...reviewPages, ...productPages, ...guidePages, ...categoryPages]
}

