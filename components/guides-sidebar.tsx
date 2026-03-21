import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Lightbulb, Package } from "lucide-react"
import { getAllGuides, getAllReviews } from "@/lib/api"
import Image from "next/image"
import { siteConfig } from "@/lib/site.config"
import { normalizeGuideCategories, slugifyGuideCategory } from "@/lib/guide-categories"
import { RelatedProductImage } from "@/components/related-product-image"
import {
  categoryMap,
  getProductsForRelatedCategory,
  resolveCategorySlugForRelatedKey,
} from "@/lib/products-data"

function reviewsCategoryHref(category: string) {
  return `/reviews?category=${category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`
}

interface GuidesSidebarProps {
  category: string
  currentSlug: string
  /** From guide frontmatter: category slug, display name, or exact product.category */
  relatedProductCategory?: string
}

export async function GuidesSidebar({
  category,
  currentSlug,
  relatedProductCategory,
}: GuidesSidebarProps) {
  const allGuides = getAllGuides()
  const categorySlug = slugifyGuideCategory(category)
  const categoryHref = categorySlug ? `/guides?category=${categorySlug}` : "/guides"
  const categoryLabel =
    normalizeGuideCategories(siteConfig.pages?.guides?.categories).find(
      (item) => item.slug === categorySlug
    )?.name || category

  const relatedGuides = allGuides
    .filter(
      (guide) =>
        slugifyGuideCategory(guide.frontmatter.category) === categorySlug &&
        guide.slug !== currentSlug
    )
    .slice(0, 3)

  const allReviews = getAllReviews()
  const relatedReviewProducts = category
    ? allReviews
        .filter((review) => review.frontmatter.category === category)
        .slice(0, 3)
    : []

  const trimmedRelated = relatedProductCategory?.trim() ?? ""
  const catalogProducts = trimmedRelated
    ? (await getProductsForRelatedCategory(trimmedRelated)).slice(0, 3)
    : []

  const showCatalog = catalogProducts.length > 0
  const showReviewFallback = !showCatalog && relatedReviewProducts.length > 0

  const resolvedCatalogSlug = trimmedRelated ? resolveCategorySlugForRelatedKey(trimmedRelated) : null
  const catalogViewAllHref = resolvedCatalogSlug ? `/category/${resolvedCatalogSlug}` : null
  const catalogViewAllLabel = resolvedCatalogSlug ? categoryMap[resolvedCatalogSlug] : null

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Related Products from catalog (frontmatter related_product_category) */}
      {showCatalog && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Related Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {catalogProducts.map((product) => (
                <div
                  key={product.asin}
                  className="border border-border rounded-lg p-3 hover:border-primary/50 transition-all"
                >
                  <Link href={`/product/${product.asin}`} className="block group">
                    <div className="flex gap-3 mb-3">
                      <RelatedProductImage
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={`${product.title} - ${product.brand || "Product"}`}
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {product.shortTitle || product.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                  {product.amazonUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white"
                    >
                      <a href={product.amazonUrl} target="_blank" rel="nofollow noopener noreferrer">
                        Check Price on Amazon
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {catalogViewAllHref && catalogViewAllLabel && (
              <Button asChild variant="ghost" size="sm" className="w-full mt-4">
                <Link href={catalogViewAllHref}>
                  View all in {catalogViewAllLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Fallback: same-category MDX reviews (when no related_product_category products) */}
      {showReviewFallback && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Related Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedReviewProducts.map((product) => (
                <div
                  key={product.slug}
                  className="border border-border rounded-lg p-3 hover:border-primary/50 transition-all"
                >
                  <Link href={`/review/${product.slug}`} className="block group">
                    <div className="flex gap-3 mb-3">
                      <RelatedProductImage
                        src={product.frontmatter.image || "/placeholder.svg"}
                        alt={`${product.frontmatter.title} - Related Product | ${product.frontmatter.brand || "Camping Gear"}`}
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {product.frontmatter.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                  {product.frontmatter.amazonUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white"
                    >
                      <a
                        href={product.frontmatter.amazonUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        Check Price on Amazon
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button asChild variant="ghost" size="sm" className="w-full mt-4">
              <Link href={reviewsCategoryHref(category)}>
                View All in {category}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {relatedGuides.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Related Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedGuides.map((guide) => (
                <div
                  key={guide.slug}
                  className="border border-border rounded-lg p-3 hover:border-primary/50 transition-all"
                >
                  <Link href={`/guides/${guide.slug}`} className="block group">
                    <div className="flex gap-3 mb-2">
                      {guide.frontmatter.image && (
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={guide.frontmatter.image}
                            alt={guide.frontmatter.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {guide.frontmatter.title}
                        </h5>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <span>{guide.frontmatter.readTime || "5 min read"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <Button asChild variant="ghost" size="sm" className="w-full mt-4">
              <Link href={categoryHref}>
                View All {categoryLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/guides">All Guides</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/reviews">Product Reviews</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
