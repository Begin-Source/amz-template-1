import { MetadataRoute } from 'next'
import { getAllReviews, getAllGuides } from '@/lib/api'
import { getAllCategories } from '@/lib/products-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:3000'

  const reviews = getAllReviews()
  const guides = getAllGuides()
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
  
  // Category pages (using path segments)
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...reviewPages, ...guidePages, ...categoryPages]
}

