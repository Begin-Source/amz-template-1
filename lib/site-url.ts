import { siteConfig } from "@/lib/site.config"

const FALLBACK_SITE_URL = "https://example.com"

function firstNonEmpty(...candidates: (string | undefined)[]): string | undefined {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim()
  }
  return undefined
}

/**
 * Canonical site origin for SEO. No trailing slash.
 *
 * Priority: `NEXT_PUBLIC_SITE_URL` → Cloudflare Pages `CF_PAGES_URL` (per build) →
 * `site.config` → placeholder.
 */
export function getSiteUrl(): string {
  const raw =
    firstNonEmpty(
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.CF_PAGES_URL,
    ) ||
    siteConfig.seo.siteUrl ||
    FALLBACK_SITE_URL
  return raw.replace(/\/$/, "")
}

/**
 * Absolute URL for a path starting with / (e.g. /guides/foo).
 */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
}
