import { getAllReviews } from "@/lib/api"
import { matchesHomepageCategorySlug } from "@/lib/category-taxonomy"
import {
  categoryMap,
  getProductsForRelatedCategory,
  productCategoryHref,
  resolveCategorySlugForRelatedKey,
  resolveRelatedCategoryDisplayName,
} from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

const SIDEBAR_RELATED_LIMIT = 5

/** @deprecated Prefer productCategoryHref; kept name for call sites — uses /category/[slug] when mapped */
export function reviewsCategoryHref(category: string) {
  return productCategoryHref(category)
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

function mapReviewsToItems(
  reviews: ReturnType<typeof getAllReviews>
): GuideRelatedReviewItem[] {
  return reviews.map((r) => ({
    slug: r.slug,
    title: r.frontmatter.title,
    image: r.frontmatter.image || "/placeholder.svg",
    amazonUrl: r.frontmatter.amazonUrl,
    brand: r.frontmatter.brand,
  }))
}

export async function getGuideRelatedProductsData(
  category: string,
  relatedProductCategory: string | undefined
): Promise<GuideRelatedProductsData> {
  const allReviews = getAllReviews()
  const trimmedRelated = relatedProductCategory?.trim() ?? ""

  const resolvedCatalogSlug = trimmedRelated
    ? resolveCategorySlugForRelatedKey(trimmedRelated)
    : null
  const catalogViewAllHref = resolvedCatalogSlug ? `/category/${resolvedCatalogSlug}` : null
  const catalogViewAllLabel = resolvedCatalogSlug ? categoryMap[resolvedCatalogSlug] : null

  const empty = (): GuideRelatedProductsData => ({
    mode: "none",
    catalogProducts: [],
    reviewItems: [],
    catalogViewAllHref,
    catalogViewAllLabel,
    reviewsViewAllHref: reviewsCategoryHref(category),
    reviewsViewAllLabel: category,
  })

  if (trimmedRelated) {
    const resolvedSlug = resolveCategorySlugForRelatedKey(trimmedRelated)
    const resolvedName = resolveRelatedCategoryDisplayName(trimmedRelated)
    if (resolvedName) {
      const fromRelatedKey = allReviews
        .filter((r) =>
          resolvedSlug
            ? matchesHomepageCategorySlug(r.frontmatter.category, resolvedSlug)
            : r.frontmatter.category === resolvedName
        )
        .slice(0, SIDEBAR_RELATED_LIMIT)
      if (fromRelatedKey.length > 0) {
        return {
          mode: "reviews",
          catalogProducts: [],
          reviewItems: mapReviewsToItems(fromRelatedKey),
          catalogViewAllHref,
          catalogViewAllLabel,
          reviewsViewAllHref: reviewsCategoryHref(resolvedName),
          reviewsViewAllLabel: resolvedName,
        }
      }
    }

    const catalogProducts = (
      await getProductsForRelatedCategory(trimmedRelated)
    ).slice(0, SIDEBAR_RELATED_LIMIT)
    if (catalogProducts.length > 0) {
      return {
        mode: "catalog",
        catalogProducts,
        reviewItems: [],
        catalogViewAllHref,
        catalogViewAllLabel,
        reviewsViewAllHref: reviewsCategoryHref(category),
        reviewsViewAllLabel: category,
      }
    }
  }

  const relatedReviewProducts = category
    ? allReviews
        .filter((r) => r.frontmatter.category === category)
        .slice(0, SIDEBAR_RELATED_LIMIT)
    : []

  if (relatedReviewProducts.length > 0) {
    return {
      mode: "reviews",
      catalogProducts: [],
      reviewItems: mapReviewsToItems(relatedReviewProducts),
      catalogViewAllHref,
      catalogViewAllLabel,
      reviewsViewAllHref: reviewsCategoryHref(category),
      reviewsViewAllLabel: category,
    }
  }

  return empty()
}
