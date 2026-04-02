import type { Metadata } from "next"
import { AmazonButton } from "@/components/amazon-button"
import { ProductEditorialRating } from "@/components/product-editorial-rating"
import { ProductMobileAmazonBar } from "@/components/product-mobile-amazon-bar"
import { ProsCons } from "@/components/pros-cons"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BadgeCheck, BookOpen, Info, Store, Truck } from "lucide-react"
import {
  getProductByAsin,
  getFeaturedProducts,
  getAllProducts,
  getProductsForRelatedCategory,
  productCategoryHref,
  resolveRelatedCategoryDisplayName,
} from "@/lib/products-data"
import { findReviewByAsin, getAllReviewsUnified } from "@/lib/api"
import { notFound } from "next/navigation"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { siteConfig } from "@/lib/site.config"
import { absoluteUrl } from "@/lib/site-url"

const RELATED_REVIEWS_LIMIT = 4
const RELATED_PRODUCTS_LIMIT = 3

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products
    .filter((product) => product?.asin)
    .map((product) => ({
      asin: product.asin,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ asin: string }> }): Promise<Metadata> {
  const { asin } = await params
  const product = await getProductByAsin(asin)
  if (!product?.title) {
    return {
      title: "Product Not Found",
    }
  }

  const brand = siteConfig.brand.name
  const desc = product.summary || product.features?.[0] || `Specs and buying context for ${product.title}.`
  const pageUrl = absoluteUrl(`/product/${asin}`)

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

export default async function ProductPage({ params }: { params: Promise<{ asin: string }> }) {
  const { asin } = await params
  const product = await getProductByAsin(asin)

  if (!product?.title) {
    notFound()
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

  const categoryLabel = resolveRelatedCategoryDisplayName(product.category) ?? product.category
  const allReviews = await getAllReviewsUnified()
  const relatedReviews = allReviews
    .filter(
      (r) =>
        r.frontmatter.category === categoryLabel &&
        r.frontmatter.asin?.trim().toLowerCase() !== asinNorm
    )
    .slice(0, RELATED_REVIEWS_LIMIT)

  const features = Array.isArray(product.features) ? product.features : []
  const brandName = siteConfig.brand.name

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    description: product.summary || features[0],
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
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Product image from catalog data — see Amazon listing for live photos and variants.
              </p>
            </div>

            <div className="flex min-w-0 flex-col">
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
                {product.summary || features[0] || ""}
              </p>

              {fullReview && (
                <div className="mb-6 rounded-xl border border-primary/35 bg-primary/5 p-4">
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

              <Card className="border-2 border-border/80 shadow-md">
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

                  <div className="grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <Store className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span>
                        <span className="font-medium text-foreground">Amazon checkout</span> — purchase happens on
                        Amazon.com.
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <Truck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span>
                        <span className="font-medium text-foreground">Shipping &amp; Prime</span> — shown on the product
                        page before you pay.
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span>
                        <span className="font-medium text-foreground">No extra cost to you</span> — commission comes
                        from Amazon&apos;s side of the sale.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-12 md:my-14" />

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">At a glance</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="leading-relaxed text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-12" />

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">Pros &amp; considerations</h2>
            <ProsCons
              pros={features.slice(0, 4)}
              cons={[
                "Retail price and deals change — confirm on Amazon",
                "Stock and variants depend on the listing",
                "Shipping and returns follow Amazon’s policies for that item",
              ]}
            />
          </section>

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

          {relatedReviews.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-foreground md:text-3xl">
                <span className="h-1 w-12 rounded-full bg-primary" />
                Related reviews
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedReviews.map((related) => (
                  <ProductCard
                    key={related.slug}
                    title={related.frontmatter.title}
                    image={related.frontmatter.image || "/placeholder.svg"}
                    summary={related.frontmatter.description}
                    amazonUrl={related.frontmatter.amazonUrl || "#"}
                    asin={related.frontmatter.asin}
                    slug={related.slug}
                    linkType="review"
                  />
                ))}
              </div>
            </section>
          )}

          {relatedProducts.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">You might also like</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.asin}
                    title={relatedProduct.shortTitle || relatedProduct.title || ""}
                    image={relatedProduct.imageUrl}
                    summary={relatedProduct.summary || relatedProduct.features?.[0] || ""}
                    amazonUrl={relatedProduct.amazonUrl}
                    asin={relatedProduct.asin}
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
