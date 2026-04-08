import { MetadataRoute } from 'next'
import { getAllReviews, getAllGuides } from '@/lib/api'
import { getAllCategories, getAllProducts } from '@/lib/products-data'
import { getProductPathSlug, productPagePath } from '@/lib/product-page-url'
import { getSiteUrl } from '@/lib/site-url'

export const dynamic = 'force-static'

/** Exclude static-export stub from `productsDataFallback` (not a real listing). */
function isPlaceholderCatalogProduct(product: {
  asin?: string
  slug?: string
  shortTitle?: string
  title?: string
}): boolean {
  if (product.asin?.trim().toLowerCase() === 'amzasin000') return true
  if (getProductPathSlug(product) === 'template-product-placeholder') return true
  return false
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()

  const reviews = getAllReviews()
  const guides = getAllGuides()
  const products = await getAllProducts()
  const categoryRoutes = getAllCategories()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
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
    .filter((product) => !isPlaceholderCatalogProduct(product))
    .map((product) => ({
      url: `${baseUrl}${productPagePath(product)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  
  const categoryPages = categoryRoutes.map(({ slug }) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...reviewPages, ...productPages, ...guidePages, ...categoryPages]
}

