import { siteConfig } from "./site.config"

/** slug → display name（与 `siteConfig.homepage.categories` 一致） */
export const categoryMap: Record<string, string> = Object.fromEntries(
  siteConfig.homepage.categories.items.map((cat) => [cat.slug, cat.name])
)

export const categoryInfo: Record<
  string,
  { name: string; description: string; icon: string }
> = Object.fromEntries(
  siteConfig.homepage.categories.items.map((cat) => [
    cat.slug,
    {
      name: cat.name,
      description: cat.description,
      icon: cat.icon.toLowerCase(),
    },
  ])
)

/**
 * 将 frontmatter / 商品库里的分类字段解析为站点「展示名」：
 * 接受 slug、展示名或与 `product.category` 一致的字符串。
 */
export function resolveRelatedCategoryDisplayName(key: string): string | null {
  const trimmed = key.trim()
  if (!trimmed) return null
  const fromSlug = categoryMap[trimmed]
  if (fromSlug) return fromSlug
  const slugEntry = Object.entries(categoryMap).find(([, name]) => name === trimmed)
  if (slugEntry) return slugEntry[1]
  return trimmed
}

/** 将 slug 或展示名解析为 `categoryMap` 的 key（slug），未命中则 null */
export function resolveCategorySlugForRelatedKey(key: string): string | null {
  const t = key.trim()
  if (!t) return null
  if (categoryMap[t]) return t
  const byName = Object.entries(categoryMap).find(([, name]) => name === t)
  return byName ? byName[0] : null
}

/**
 * 判断存储的分类字符串是否属于站点配置的某一分类（与 Reviews 筛选、商品分类页共用）。
 * `storedCategory` 可为 slug、展示名或与解析结果一致的标签。
 */
export function matchesHomepageCategorySlug(
  storedCategory: string | null | undefined,
  slug: string
): boolean {
  if (!slug) return false
  const expectedName = categoryMap[slug]
  if (!expectedName) return false
  const resolved = resolveRelatedCategoryDisplayName(String(storedCategory ?? "").trim())
  if (!resolved) return false
  return resolved === expectedName
}

/**
 * 商品分类落地页 URL（与 sitemap `/category/[slug]` 一致）。
 * 无映射时退回 `/reviews?category=`。
 */
export function productCategoryHref(categoryKey: string): string {
  const trimmed = String(categoryKey ?? "").trim()
  if (!trimmed) return "/reviews"
  const slug = resolveCategorySlugForRelatedKey(trimmed)
  if (slug) return `/category/${slug}`
  const fallback = trimmed.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")
  return `/reviews?category=${fallback}`
}
