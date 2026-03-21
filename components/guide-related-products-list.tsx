import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RelatedProductImage } from "@/components/related-product-image"
import type { GuideRelatedProductsData } from "@/lib/guide-related-products"

/** Shared markup for guide “Related Products” (catalog or review fallback). Used in sidebar and mobile sheet. */
export function GuideRelatedProductsList({ data }: { data: GuideRelatedProductsData }) {
  if (data.mode === "none") return null

  if (data.mode === "catalog") {
    return (
      <>
        <div className="space-y-4">
          {data.catalogProducts.map((product) => (
            <div
              key={product.asin}
              className="rounded-lg border border-border p-3 transition-all hover:border-primary/50"
            >
              <Link href={`/product/${product.asin}`} className="group block">
                <div className="mb-3 flex gap-3">
                  <RelatedProductImage
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={`${product.title} - ${product.brand || "Product"}`}
                    className="h-16 w-16 flex-shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {product.shortTitle || product.title}
                    </h5>
                  </div>
                </div>
              </Link>
              {product.amazonUrl && (
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90"
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
        {data.catalogViewAllHref && data.catalogViewAllLabel && (
          <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
            <Link href={data.catalogViewAllHref}>
              View all in {data.catalogViewAllLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {data.reviewItems.map((product) => (
          <div
            key={product.slug}
            className="rounded-lg border border-border p-3 transition-all hover:border-primary/50"
          >
            <Link href={`/review/${product.slug}`} className="group block">
              <div className="mb-3 flex gap-3">
                <RelatedProductImage
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.title} - Related Product | ${product.brand || "Camping Gear"}`}
                  className="h-16 w-16 flex-shrink-0 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {product.title}
                  </h5>
                </div>
              </div>
            </Link>
            {product.amazonUrl && (
              <Button
                asChild
                size="sm"
                className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90"
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
      <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
        <Link href={data.reviewsViewAllHref}>
          View All in {data.reviewsViewAllLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </>
  )
}
