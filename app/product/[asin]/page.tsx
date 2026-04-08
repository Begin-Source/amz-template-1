import { getAllProducts, getProductByAsin } from "@/lib/products-data"
import { productPagePath } from "@/lib/product-page-url"
import { notFound, permanentRedirect } from "next/navigation"

/**
 * `revalidate === 0` skips Next.js export check that errors on empty `generateStaticParams()`
 * when the catalog has no products at build time.
 */
export const revalidate = 0

/** Legacy `/product/{asin}` → canonical `/product/{asin}/{slug}` */
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.filter((p) => p?.asin).map((p) => ({ asin: p.asin.trim() }))
}

export default async function LegacyProductPathRedirect({
  params,
}: {
  params: Promise<{ asin: string }>
}) {
  const { asin } = await params
  const product = await getProductByAsin(asin)
  if (!product?.title) {
    notFound()
  }
  permanentRedirect(productPagePath(product))
}
