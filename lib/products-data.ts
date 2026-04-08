import { directusClient } from './directus-client'
import { getAllReviewsUnified, type Review } from './api'
import {
  getCategoryReviewRowsForProductMerge,
  getReviewAsinsForCategorySlug,
} from './category-review-gate'
import {
  categoryInfo,
  categoryMap,
  matchesHomepageCategorySlug,
  productCategoryHref,
  resolveCategorySlugForRelatedKey,
  resolveRelatedCategoryDisplayName,
} from './category-taxonomy'

export {
  categoryInfo,
  categoryMap,
  productCategoryHref,
  resolveCategorySlugForRelatedKey,
  resolveRelatedCategoryDisplayName,
} from './category-taxonomy'

export interface Product {
  asin: string
  title: string
  brand: string
  features: string[]
  amazonUrl: string
  imageUrl: string
  rating?: number
  category: string
  shortTitle?: string
  summary?: string
  slug?: string // Added slug for review article URLs
  featuredHome?: boolean
  featuredRank?: number
}

// Empty by default: catalog comes from Directus in production. Local dev without credentials shows an empty catalog (expected).
export const productsDataFallback: Product[] = []

/**
 * Category index card covers — same priority as homepage **Featured** strip:
 * 1) First review in that category with `asin` + `frontmatter.image` (`getAllReviewsUnified` order)
 * 2) Catalog product with `featuredHome` + `imageUrl` in that category (`featured_rank`, title)
 * 3) Any catalog product in that category with `imageUrl`
 */
export function buildCategoryCoverImagesMap(
  reviews: Review[],
  products: Product[],
  slugs: string[]
): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {}
  for (const slug of slugs) {
    const fromReview = reviews.find(
      (r) =>
        matchesHomepageCategorySlug(r.frontmatter.category, slug) &&
        Boolean(r.frontmatter?.asin) &&
        Boolean(r.frontmatter.image?.trim())
    )
    if (fromReview?.frontmatter.image?.trim()) {
      out[slug] = fromReview.frontmatter.image.trim()
      continue
    }

    const featuredInCat = products
      .filter(
        (p) =>
          matchesHomepageCategorySlug(p.category, slug) &&
          p.featuredHome &&
          Boolean(p.imageUrl?.trim())
      )
      .sort((a, b) => {
        const rankA = a.featuredRank ?? Number.MAX_SAFE_INTEGER
        const rankB = b.featuredRank ?? Number.MAX_SAFE_INTEGER
        if (rankA !== rankB) return rankA - rankB
        return (a.title || '').localeCompare(b.title || '')
      })
    if (featuredInCat[0]?.imageUrl) {
      out[slug] = featuredInCat[0].imageUrl
      continue
    }

    const anyInCat = products.find(
      (p) => matchesHomepageCategorySlug(p.category, slug) && Boolean(p.imageUrl?.trim())
    )
    out[slug] = anyInCat?.imageUrl
  }
  return out
}

/** Loads reviews + catalog once; use on `/products` when `buildCategoryCoverImagesMap` inputs are not already available. */
export async function getCategoryCoverImagesUnified(
  slugs: string[]
): Promise<Record<string, string | undefined>> {
  const [reviews, products] = await Promise.all([getAllReviewsUnified(), getProductsData()])
  return buildCategoryCoverImagesMap(reviews, products, slugs)
}

/**
 * Fetch products from local data (synced from Directus)
 */
export async function getProductsData(): Promise<Product[]> {
  const resolvedSiteId =
    process.env.NEXT_PUBLIC_SITE_ID || process.env.DIRECTUS_SITE_ID || process.env.SITE_ID
  const directusToken = process.env.DIRECTUS_API_TOKEN
  if (directusToken && resolvedSiteId) {
    try {
      const rows = await directusClient.getProducts({ limit: 300, siteId: resolvedSiteId })
      const directusProducts: Product[] = rows
        .filter((row) => Boolean(row?.asin && row?.title))
        .map((row) => {
          const raw = row?.raw_paapi || {}
          const brand = raw?.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || ''
          const summary = Array.isArray(raw?.ItemInfo?.Features?.DisplayValues)
            ? raw.ItemInfo.Features.DisplayValues.join(' ')
            : ''
          const rating = raw?.CustomerReviews?.StarRating?.Value
          const imageUrl = row?.images?.large || row?.images?.medium || row?.images?.small || ''

          return {
            asin: row.asin,
            title: row.title,
            brand,
            features: Array.isArray(row.features) ? row.features : [],
            amazonUrl: `https://www.amazon.com/dp/${row.asin}?tag=smartymode-20`,
            imageUrl,
            rating: typeof rating === 'number' ? rating : undefined,
            category: (row.category || '').trim() || 'Uncategorized',
            shortTitle: row.title.substring(0, 50),
            summary: summary ? summary.substring(0, 150) : undefined,
            slug: ((row as any).review_slug || row.asin || '').toString().toLowerCase(),
            featuredHome: (row as any).featured_home === 'yes',
            featuredRank:
              typeof (row as any).featured_rank === 'number'
                ? (row as any).featured_rank
                : undefined,
          }
        })

      if (directusProducts.length > 0) {
        return directusProducts
      }
    } catch (error) {
      console.error('Failed to load products from Directus, fallback to local:', error)
    }
  }

  return productsDataFallback.filter((product) => Boolean(product?.asin && product?.title))
}

// Backward compatible synchronous version (returns fallback)
export const productsData: Product[] = productsDataFallback

/**
 * 从评测 frontmatter 解析 `categoryMap` 的 slug，供 `productFromReviewFrontmatter` 使用。
 */
function resolveCategorySlugForReview(review: Review): string {
  const cat = review.frontmatter.category?.trim()
  if (!cat) return ''
  const direct = resolveCategorySlugForRelatedKey(cat)
  if (direct) return direct
  for (const slug of Object.keys(categoryMap)) {
    if (matchesHomepageCategorySlug(cat, slug)) return slug
  }
  return ''
}

/**
 * 将「仅出现在评测 MDX、不在商品库」的 ASIN 合并进列表，使 `/product/[asin]/[slug]` 与静态导出与 Review 一致。
 * 商品库（Directus / fallback）优先；同 ASIN 不覆盖。
 */
function mergeReviewMdxIntoCatalog(catalog: Product[], reviews: Review[]): Product[] {
  const byAsin = new Map<string, Product>()
  for (const p of catalog) {
    if (p?.asin?.trim()) {
      byAsin.set(p.asin.trim().toLowerCase(), p)
    }
  }
  for (const r of reviews) {
    const raw = r.frontmatter.asin?.trim()
    if (!raw) continue
    const low = raw.toLowerCase()
    if (byAsin.has(low)) continue
    const slug = resolveCategorySlugForReview(r)
    byAsin.set(low, productFromReviewFrontmatter(r, slug))
  }
  return Array.from(byAsin.values())
}

/** 无商品库行时，用评测 frontmatter 拼出分类页可用的 Product（GitHub-only 构建）。`pros` 写入 `features`，供商品页「At a glance」与 Pros 区块。 */
function productFromReviewFrontmatter(
  review: Review,
  categorySlug: string
): Product {
  const fm = review.frontmatter
  const asin = String(fm.asin ?? "").trim()
  const title = fm.title?.trim() || "Product"
  const desc = fm.description?.trim() || ""
  const featuresFromPros = Array.isArray(fm.pros)
    ? fm.pros.map((p) => String(p).trim()).filter((p) => p.length > 0)
    : []
  return {
    asin,
    title,
    brand: (fm.brand && fm.brand !== "N/A" ? fm.brand : "") || "",
    features: featuresFromPros,
    amazonUrl: fm.amazonUrl?.trim() || `https://www.amazon.com/dp/${asin}`,
    imageUrl: fm.image?.trim() || "",
    rating: fm.rating,
    category: fm.category?.trim() || categoryMap[categorySlug] || "",
    shortTitle: title.length > 100 ? `${title.slice(0, 97)}…` : title,
    summary: desc,
    slug: review.slug,
  }
}

/**
 * 分类下要展示的 ASIN：优先用商品库（Directus/本地 JSON）；缺失时用同 ASIN 的评测 MDX 字段填充。
 * 顺序与 Reviews 列表一致（getAllReviewsUnified 已按日期排序，同 ASIN 取首次出现）。
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  if (!categoryMap[categorySlug]) return []
  const { reviewsInCategory, orderedLowerAsins } =
    await getCategoryReviewRowsForProductMerge(categorySlug)
  if (orderedLowerAsins.length === 0) return []

  const catalogList = await getProductsData()
  const catalogByAsin = new Map(
    catalogList.map((p) => [p.asin.trim().toLowerCase(), p])
  )

  const out: Product[] = []
  for (const low of orderedLowerAsins) {
    const fromCatalog = catalogByAsin.get(low)
    if (fromCatalog) {
      out.push(fromCatalog)
      continue
    }
    const review = reviewsInCategory.find(
      (r) => r.frontmatter.asin?.trim().toLowerCase() === low
    )
    if (review) {
      out.push(productFromReviewFrontmatter(review, categorySlug))
    }
  }
  return out
}

/**
 * Resolve guide frontmatter `related_product_category`: accepts category slug (categoryMap key),
 * display name (categoryMap value), or exact product.category string (e.g. from Directus export).
 */
export async function getProductsForRelatedCategory(key: string): Promise<Product[]> {
  const products = await getProductsData()
  const trimmed = key.trim()
  if (!trimmed) return []

  const slug = resolveCategorySlugForRelatedKey(trimmed)
  if (slug) {
    return getProductsByCategory(slug)
  }

  return products.filter((p) => p.category === trimmed)
}

export async function getProductByAsin(asin: string): Promise<Product | undefined> {
  const products = await getAllProducts()
  const needle = asin?.toLowerCase()
  return products.find((p) => p?.asin?.toLowerCase() === needle)
}

export async function getFeaturedProducts(count = 6): Promise<Product[]> {
  const products = await getProductsData()

  const explicitlyFeatured = products
    .filter((product) => product.featuredHome)
    .sort((a, b) => {
      const rankA = a.featuredRank ?? Number.MAX_SAFE_INTEGER
      const rankB = b.featuredRank ?? Number.MAX_SAFE_INTEGER
      if (rankA !== rankB) return rankA - rankB
      return (a.title || '').localeCompare(b.title || '')
    })

  if (explicitlyFeatured.length > 0) {
    return explicitlyFeatured.slice(0, count)
  }

  return products.slice(0, count)
}

/** Per-slug product counts（`/products`）：与分类页一致 = 该分类下评测里出现的唯一 ASIN 数（含仅 MDX、无商品库行）。 */
export async function getCategoryProductCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {}
  for (const slug of Object.keys(categoryMap)) {
    const reviewAsins = await getReviewAsinsForCategorySlug(slug)
    counts[slug] = reviewAsins.size
  }
  return counts
}

export function getAllCategories() {
  return Object.keys(categoryMap).map((slug) => ({
    slug,
    ...categoryInfo[slug],
  }))
}

export async function getAllProducts(): Promise<Product[]> {
  const catalog = await getProductsData()
  const reviews = await getAllReviewsUnified()
  return mergeReviewMdxIntoCatalog(catalog, reviews)
}
