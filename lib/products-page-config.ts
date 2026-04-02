import { siteConfig } from "@/lib/site.config"

/**
 * 扩展字段：n8n / Directus 生成的站点可能只包含 `title` + `description`。
 * 用显式类型 + 解析函数，避免克隆仓里 `typeof siteConfig` 变窄导致 TS 报错。
 */
export type ProductsPageConfigInput = {
  title: string
  description: string
  indexNote?: string
  categoryH1Lead?: string
  categoryH1Suffix?: string
  categoryProductCountTemplate?: string
  categoryProductCountEmpty?: string
  categoryBrowseOtherTitle?: string
  categoryBrowseOtherDescription?: string
}

export type ProductsPageConfigResolved = Required<
  Pick<
    ProductsPageConfigInput,
    | "title"
    | "description"
    | "indexNote"
    | "categoryH1Lead"
    | "categoryH1Suffix"
    | "categoryProductCountTemplate"
    | "categoryProductCountEmpty"
    | "categoryBrowseOtherTitle"
    | "categoryBrowseOtherDescription"
  >
>

const FALLBACK: Omit<ProductsPageConfigResolved, "title" | "description"> = {
  indexNote: "",
  categoryH1Lead: "Best",
  categoryH1Suffix: "— buying guide",
  categoryProductCountTemplate: "{count} products",
  categoryProductCountEmpty: "No products yet",
  categoryBrowseOtherTitle: "Can't find what you're looking for?",
  categoryBrowseOtherDescription: "Browse our other categories for more recommendations.",
}

export function resolveProductsPageConfig(): ProductsPageConfigResolved {
  const p = siteConfig.pages.products as ProductsPageConfigInput
  return {
    title: typeof p.title === "string" ? p.title : "Products",
    description: typeof p.description === "string" ? p.description : "",
    indexNote: (typeof p.indexNote === "string" ? p.indexNote : FALLBACK.indexNote).trim(),
    categoryH1Lead: (p.categoryH1Lead ?? FALLBACK.categoryH1Lead).trim() || FALLBACK.categoryH1Lead,
    categoryH1Suffix: (p.categoryH1Suffix ?? FALLBACK.categoryH1Suffix).trim(),
    categoryProductCountTemplate: p.categoryProductCountTemplate ?? FALLBACK.categoryProductCountTemplate,
    categoryProductCountEmpty: p.categoryProductCountEmpty ?? FALLBACK.categoryProductCountEmpty,
    categoryBrowseOtherTitle: p.categoryBrowseOtherTitle ?? FALLBACK.categoryBrowseOtherTitle,
    categoryBrowseOtherDescription: p.categoryBrowseOtherDescription ?? FALLBACK.categoryBrowseOtherDescription,
  }
}
