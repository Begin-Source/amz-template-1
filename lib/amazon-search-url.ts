/**
 * Amazon search results URL with associate tag (matches product links in `products-data` fallback).
 * Override tag with `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` in `.env.local`.
 */
const DEFAULT_ASSOCIATE_TAG = "smartymode-20"

function associateTag(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim()) ||
    DEFAULT_ASSOCIATE_TAG
  )
}

export function amazonSearchUrl(query: string): string {
  const tag = associateTag()
  const q = query.trim()
  const params = new URLSearchParams()
  if (q) params.set("k", q)
  params.set("tag", tag)
  return `https://www.amazon.com/s?${params.toString()}`
}
