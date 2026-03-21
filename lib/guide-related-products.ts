import { getAllReviews } from "@/lib/api"
import {
  categoryMap,
  getProductsForRelatedCategory,
  resolveCategorySlugForRelatedKey,
} from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

export function reviewsCategoryHref(category: string) {
  return `/reviews?category=${category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`
}

export type GuideRelatedReviewItem = {
  slug: string
  title: string
  image: string
  amazonUrl?: string
  brand?: string
}

export type GuideRelatedProductsData = {
  mode: "catalog" | "reviews" | "none"
  catalogProducts: Product[]
  reviewItems: GuideRelatedReviewItem[]
  catalogViewAllHref: string | null
  catalogViewAllLabel: string | null
  reviewsViewAllHref: string
  reviewsViewAllLabel: string
}

export async function getGuideRelatedProductsData(
  category: string,
  relatedProductCategory: string | undefined
): Promise<GuideRelatedProductsData> {
  const allReviews = getAllReviews()
  const relatedReviewProducts = category
    ? allReviews.filter((r) => r.frontmatter.category === category).slice(0, 3)
    : []

  const trimmedRelated = relatedProductCategory?.trim() ?? ""
  const catalogProducts = trimmedRelated
    ? (await getProductsForRelatedCategory(trimmedRelated)).slice(0, 3)
    : []

  const showCatalog = catalogProducts.length > 0
  const showReviewFallback = !showCatalog && relatedReviewProducts.length > 0

  const resolvedCatalogSlug = trimmedRelated
    ? resolveCategorySlugForRelatedKey(trimmedRelated)
    : null
  const catalogViewAllHref = resolvedCatalogSlug ? `/category/${resolvedCatalogSlug}` : null
  const catalogViewAllLabel = resolvedCatalogSlug ? categoryMap[resolvedCatalogSlug] : null

  return {
    mode: showCatalog ? "catalog" : showReviewFallback ? "reviews" : "none",
    catalogProducts,
    reviewItems: relatedReviewProducts.map((r) => ({
      slug: r.slug,
      title: r.frontmatter.title,
      image: r.frontmatter.image || "/placeholder.svg",
      amazonUrl: r.frontmatter.amazonUrl,
      brand: r.frontmatter.brand,
    })),
    catalogViewAllHref,
    catalogViewAllLabel,
    reviewsViewAllHref: reviewsCategoryHref(category),
    reviewsViewAllLabel: category,
  }
}
