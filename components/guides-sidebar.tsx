import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Lightbulb, Package } from "lucide-react"
import { getAllGuides } from "@/lib/api"
import Image from "next/image"
import { siteConfig } from "@/lib/site.config"
import { normalizeGuideCategories, slugifyGuideCategory } from "@/lib/guide-categories"
import {
  getGuideRelatedProductsData,
  type GuideRelatedProductsData,
} from "@/lib/guide-related-products"
import { GuideRelatedProductsList } from "@/components/guide-related-products-list"

interface GuidesSidebarProps {
  category: string
  currentSlug: string
  relatedProductCategory?: string
  /** When passed from the page, avoids duplicate async work (same data as mobile drawer). */
  relatedData?: GuideRelatedProductsData
  /** Hide the Related Products card below `lg` when the mobile bottom sheet shows the same list. */
  hideRelatedProductsOnMobile?: boolean
}

export async function GuidesSidebar({
  category,
  currentSlug,
  relatedProductCategory,
  relatedData: preloaded,
  hideRelatedProductsOnMobile = false,
}: GuidesSidebarProps) {
  const relatedData =
    preloaded ?? (await getGuideRelatedProductsData(category, relatedProductCategory))

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

  const showRelatedProducts = relatedData.mode !== "none"

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {showRelatedProducts && (
        <Card
          className={
            hideRelatedProductsOnMobile ? "hidden lg:block" : undefined
          }
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-primary" />
              Related Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GuideRelatedProductsList data={relatedData} />
          </CardContent>
        </Card>
      )}

      {relatedGuides.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-primary" />
              Related Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedGuides.map((guide) => (
                <div
                  key={guide.slug}
                  className="rounded-lg border border-border p-3 transition-all hover:border-primary/50"
                >
                  <Link href={`/guides/${guide.slug}`} className="group block">
                    <div className="mb-2 flex gap-3">
                      {guide.frontmatter.image && (
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={guide.frontmatter.image}
                            alt={guide.frontmatter.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h5 className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                          {guide.frontmatter.title}
                        </h5>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <span>{guide.frontmatter.readTime || "5 min read"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
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
