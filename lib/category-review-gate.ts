import { cache } from "react"
import { getAllReviewsUnified } from "@/lib/api"
import { categoryMap, matchesHomepageCategorySlug } from "@/lib/category-taxonomy"

/**
 * 站点商品分类由 Reviews 驱动：只有至少有一篇评测落在该分类时，该 slug 才参与商品展示。
 */
export const getCategorySlugsWithReviews = cache(async (): Promise<Set<string>> => {
  const reviews = await getAllReviewsUnified()
  const slugs = new Set<string>()
  for (const slug of Object.keys(categoryMap)) {
    if (
      reviews.some((r) =>
        matchesHomepageCategorySlug(r.frontmatter.category, slug)
      )
    ) {
      slugs.add(slug)
    }
  }
  return slugs
})

export async function categorySlugHasReviews(slug: string): Promise<boolean> {
  if (!categoryMap[slug]) return false
  const set = await getCategorySlugsWithReviews()
  return set.has(slug)
}

/**
 * 某分类下、评测 frontmatter 里出现过的 ASIN（小写）。
 * 商品分类页只展示这些 ASIN 在商品库中的记录，与 Reviews 列表对齐。
 */
export const getReviewAsinsForCategorySlug = cache(
  async (slug: string): Promise<Set<string>> => {
    if (!categoryMap[slug]) return new Set()
    const reviews = await getAllReviewsUnified()
    const asins = new Set<string>()
    for (const r of reviews) {
      if (!matchesHomepageCategorySlug(r.frontmatter.category, slug)) continue
      const a = r.frontmatter.asin?.trim().toLowerCase()
      if (a) asins.add(a)
    }
    return asins
  }
)
