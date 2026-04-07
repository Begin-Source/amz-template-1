import type { Product } from "@/lib/products-data"
import { slugifyGuideCategory } from "@/lib/guide-categories"

type ProductSlugFields = Pick<Product, "slug" | "shortTitle" | "title">

/**
 * URL segment after `/product/{asin}/…`. Prefer `product.slug` (same as `/review/[slug]` when set from MDX merge), else slugify short title / title.
 */
export function getProductPathSlug(product: ProductSlugFields): string {
  const fromSlug = product.slug?.trim()
  if (fromSlug) {
    const normalized = slugifyGuideCategory(fromSlug)
    if (normalized) return normalized
  }
  const base = product.shortTitle?.trim() || product.title?.trim() || "product"
  return slugifyGuideCategory(base) || "product"
}

/** Canonical product detail path: `/product/{asin}/{slug}` */
export function productPagePath(product: Pick<Product, "asin" | "slug" | "shortTitle" | "title">): string {
  const slug = getProductPathSlug(product)
  const asin = product.asin.trim()
  return `/product/${encodeURIComponent(asin)}/${slug}`
}

/** Build path when you have fields without a full `Product` (e.g. ProductCard). */
export function productPagePathFromFields(fields: {
  asin: string
  slug?: string
  shortTitle?: string
  title?: string
}): string {
  return productPagePath({
    asin: fields.asin,
    slug: fields.slug,
    shortTitle: fields.shortTitle,
    title: fields.title ?? "",
  })
}
