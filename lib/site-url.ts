import { siteConfig } from "@/lib/site.config"

const FALLBACK_SITE_URL = "https://example.com"

/**
 * Canonical site origin for SEO: env NEXT_PUBLIC_SITE_URL (per deploy), else site.config.
 * No trailing slash.
 */
export function getSiteUrl(): string {
  const raw =
    (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
      process.env.NEXT_PUBLIC_SITE_URL.trim()) ||
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
