import { siteConfig } from "@/lib/site.config"

export type NavItem = { label: string; href: string }

/** 新模板主导航：Home → Products → Reviews → Guides → About */
const DEFAULT_MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Reviews", href: "/reviews" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
]

function normalizeHref(href: string): string {
  const t = String(href ?? "").trim()
  if (!t || t === "/") return "/"
  return t.replace(/\/+$/, "") || "/"
}

/**
 * 合并站点 navigation.main 与默认新模板导航：
 * - 顺序与路由以新模板为准（保证有 /products、/reviews、/guides）。
 * - 若旧配置缺少某条，用默认英文标签补齐。
 * - 若旧配置有同一路由，保留其 label（便于多语言），并对常见旧英文文案做映射。
 */
export function resolveMainNavigation(): NavItem[] {
  const raw = siteConfig.navigation as { main?: NavItem[] } | undefined
  const incoming = Array.isArray(raw?.main) ? raw.main.filter((x) => x?.href) : []

  const byHref = new Map<string, NavItem>()
  for (const item of incoming) {
    const href = normalizeHref(String(item.href))
    const label = String(item.label ?? "").trim()
    const fallbackLabel = DEFAULT_MAIN_NAV.find((d) => normalizeHref(d.href) === href)?.label ?? ""
    byHref.set(href, { href, label: label || fallbackLabel })
  }

  return DEFAULT_MAIN_NAV.map((def) => {
    const href = normalizeHref(def.href)
    const found = byHref.get(href)
    if (!found || !found.label) {
      return def
    }

    let label = found.label

    if (href === "/reviews" && /^product\s+reviews?$/i.test(label)) {
      label = "Reviews"
    }
    if (href === "/products" && /^product\s+reviews?$/i.test(label)) {
      label = "Products"
    }

    return { href: def.href, label }
  })
}
