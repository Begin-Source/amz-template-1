import type { Metadata } from "next"
import { AmazonButton } from "@/components/amazon-button"
import { ProductEditorialRating } from "@/components/product-editorial-rating"
import { ProductMobileAmazonBar } from "@/components/product-mobile-amazon-bar"
import { ProsCons } from "@/components/pros-cons"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Info } from "lucide-react"
import {
  getProductByAsin,
  getFeaturedProducts,
  getAllProducts,
  getProductsForRelatedCategory,
  productCategoryHref,
} from "@/lib/products-data"
import { getProductPathSlug, productPagePath } from "@/lib/product-page-url"
import { findReviewByAsin } from "@/lib/api"
import { notFound, permanentRedirect } from "next/navigation"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { siteConfig } from "@/lib/site.config"
import { absoluteUrl } from "@/lib/site-url"

const RELATED_PRODUCTS_LIMIT = 4

/**
 * See `revalidate` on legacy `/product/[asin]` — empty catalog + static export.
 */
export const revalidate = 0

function normalizeBulletList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((x) => String(x).trim()).filter((s) => s.length > 0)
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products
    .filter((product) => product?.asin)
    .map((product) => ({
      asin: product.asin.trim(),
      slug: getProductPathSlug(product),
    }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ asin: string; slug: string }>
}): Promise<Metadata> {
  const { asin } = await params
  const product = await getProductByAsin(asin)
  if (!product?.title) {
    return {
      title: "Product Not Found",
    }
  }

  const brand = siteConfig.brand.name
  const desc = product.summary || product.features?.[0] || `Specs and buying context for ${product.title}.`
  const pageUrl = absoluteUrl(productPagePath(product))

  return {
    title: `${product.shortTitle || product.title} | ${brand}`,
    description: desc,
    openGraph: {
      title: `${product.shortTitle || product.title}`,
      description: desc,
      url: pageUrl,
      type: "website",
      images: product.imageUrl ? [{ url: product.imageUrl, alt: product.title }] : [],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ asin: string; slug: string }> }) {
  const { asin, slug: slugParam } = await params
  const product = await getProductByAsin(asin)

  if (!product?.title) {
    notFound()
  }

  const canonicalSlug = getProductPathSlug(product)
  const decoded = decodeURIComponent(slugParam).trim().toLowerCase()
  if (decoded !== canonicalSlug.toLowerCase()) {
    permanentRedirect(productPagePath(product))
  }

  const asinNorm = asin.trim().toLowerCase()
  const fullReview = await findReviewByAsin(asin)

  const sameCategory = await getProductsForRelatedCategory(product.category)
  const seenAsins = new Set<string>([asinNorm])
  let relatedProducts = sameCategory
    .filter((p) => p?.asin && p?.title && p.asin.toLowerCase() !== asinNorm)
    .slice(0, RELATED_PRODUCTS_LIMIT)

  relatedProducts.forEach((p) => seenAsins.add(p.asin.toLowerCase()))

  if (relatedProducts.length < RELATED_PRODUCTS_LIMIT) {
    const featured = await getFeaturedProducts(24)
    for (const p of featured) {
      if (relatedProducts.length >= RELATED_PRODUCTS_LIMIT) break
      const pAsin = p.asin?.toLowerCase()
      if (!pAsin || !p.title || seenAsins.has(pAsin)) continue
      relatedProducts.push(p)
      seenAsins.add(pAsin)
    }
  }

  const features = Array.isArray(product.features) ? product.features : []
  const fm = fullReview?.frontmatter
  const prosFromReview = normalizeBulletList(fm?.pros)
  const consFromReview = normalizeBulletList(fm?.cons)
  /** Match the long-form review: prefer MDX pros when present, else catalog `features`. */
  const atAGlanceBullets = prosFromReview.length > 0 ? prosFromReview : features
  const prosConsPros =
    prosFromReview.length > 0 ? prosFromReview : features.slice(0, 4)
  /** Editorial cons from review frontmatter only (no generic Amazon disclaimers). */
  const prosConsCons = consFromReview
  const showAtAGlance = atAGlanceBullets.length > 0
  const showProsConsBlock = prosConsPros.length > 0 || prosConsCons.length > 0

  const brandName = siteConfig.brand.name

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    description: product.summary || atAGlanceBullets[0] || features[0],
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    offers: product.amazonUrl
      ? {
          "@type": "Offer",
          url: product.amazonUrl,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Amazon",
          },
        }
      : undefined,
  }

  const amazonUrl = product.amazonUrl

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main
        className={`flex-1 min-w-0 overflow-x-clip ${amazonUrl ? "pb-24 lg:pb-0" : ""}`}
      >
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
          <BreadcrumbNav
            items={[
              { label: product.category, href: productCategoryHref(product.category) },
              { label: product.shortTitle || product.title },
            ]}
          />

          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-14">
            <div className="min-w-0">
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-sm">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.title}
                  className="h-full w-full object-contain p-6 md:p-8"
                />
              </div>

              {fullReview && (
                <div className="mt-6 rounded-xl border border-primary/35 bg-primary/5 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                      <div>
                        <p className="font-semibold text-foreground">Long-form review on {brandName}</p>
                        <p className="text-sm text-muted-foreground">
                          Testing notes, pros &amp; cons, and who this product fits.
                        </p>
                      </div>
                    </div>
                    <Button asChild className="shrink-0">
                      <Link href={`/review/${fullReview.slug}`}>Read full review</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col md:h-full">
              <span className="mb-3 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase text-primary-foreground">
                {product.category}
              </span>

              <h1 className="mb-4 text-balance text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {product.title}
              </h1>

              {product.brand && (
                <p className="mb-4 text-sm text-muted-foreground">
                  Brand: <span className="font-semibold text-foreground">{product.brand}</span>
                </p>
              )}

              {product.rating != null && (
                <div className="mb-4">
                  <ProductEditorialRating rating={product.rating} />
                </div>
              )}

              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {product.summary || atAGlanceBullets[0] || features[0] || ""}
              </p>

              <Card className="border-2 border-border/80 shadow-md md:mt-auto">
                <CardContent className="space-y-4 p-5 md:p-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Where to buy</p>
                    <p className="text-sm text-muted-foreground">
                      We don&apos;t sell products. Prices, coupons, and stock change on Amazon — open the listing for
                      the current offer.
                    </p>
                  </div>

                  {amazonUrl && (
                    <AmazonButton
                      url={amazonUrl}
                      variant="amazon"
                      className="h-12 w-full text-base"
                      text="See current price and availability on Amazon"
                    />
                  )}

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <Info className="mb-0.5 mr-1 inline h-3.5 w-3.5 align-text-top text-muted-foreground" aria-hidden />
                    As an Amazon Associate, <strong className="font-medium text-foreground">{brandName}</strong> earns
                    from qualifying purchases.{" "}
                    <strong className="font-medium text-foreground">You pay the same price</strong> as visiting Amazon
                    directly.{" "}
                    <Link href="/disclosure" className="font-medium text-primary underline underline-offset-2">
                      Affiliate disclosure
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {(showAtAGlance || showProsConsBlock) && (
            <>
              <Separator className="my-12 md:my-14" />

              {showAtAGlance && (
                <section className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">At a glance</h2>
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {atAGlanceBullets.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                            <span className="leading-relaxed text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </section>
              )}

              {showAtAGlance && showProsConsBlock && <Separator className="my-12" />}

              {showProsConsBlock && (
                <section className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
                    Pros &amp; considerations
                  </h2>
                  <ProsCons pros={prosConsPros} cons={prosConsCons} />
                </section>
              )}
            </>
          )}

          {amazonUrl && (
            <section className="mb-12 rounded-2xl border border-border bg-muted/30 p-6 text-center md:p-8">
              <p className="mb-4 text-sm text-muted-foreground">
                Ready to compare color, size, and today&apos;s price on Amazon?
              </p>
              <AmazonButton
                url={amazonUrl}
                variant="amazon"
                className="mx-auto h-12 min-w-[min(100%,20rem)] text-base"
                text="Open Amazon listing"
              />
            </section>
          )}

          {relatedProducts.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">You might also like</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.asin}
                    title={relatedProduct.shortTitle || relatedProduct.title || ""}
                    image={relatedProduct.imageUrl}
                    summary={relatedProduct.summary || relatedProduct.features?.[0] || ""}
                    amazonUrl={relatedProduct.amazonUrl}
                    asin={relatedProduct.asin}
                    productSlug={relatedProduct.slug}
                    shortTitle={relatedProduct.shortTitle}
                  />
                ))}
              </div>
            </section>
          )}

          <p className="mt-12 text-center text-xs text-muted-foreground">
            Information on {brandName} is for research only. Always confirm details on the retailer site before you
            buy.
          </p>
        </div>
      </main>
      {amazonUrl && <ProductMobileAmazonBar amazonUrl={amazonUrl} label="See price on Amazon" />}
    </>
  )
}
