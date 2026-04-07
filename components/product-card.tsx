"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { productPagePathFromFields } from "@/lib/product-page-url"

interface ProductCardProps {
  title: string
  image: string
  summary: string
  amazonUrl: string
  asin?: string
  slug?: string
  /** Same source as `/review/[slug]` when from MDX; used for `/product/{asin}/{slug}`. */
  productSlug?: string
  shortTitle?: string
  linkType?: "product" | "review"
  /** When true with `linkType="product"`, show "View product page". Intended for category listing pages only. */
  showProductPageLink?: boolean
}

export function ProductCard({
  title,
  image,
  summary,
  amazonUrl,
  asin,
  slug,
  productSlug,
  shortTitle,
  linkType = "product",
  showProductPageLink = false,
}: ProductCardProps) {
  const reviewUrl = slug || asin ? `/review/${slug || asin}` : "#"
  const productUrl =
    asin
      ? productPagePathFromFields({
          asin,
          slug: productSlug ?? slug,
          shortTitle,
          title,
        })
      : "#"

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={`${title} - Expert Review | Wild Nature Journey`}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            if (target.src !== "/placeholder.svg") {
              target.src = "/placeholder.svg"
            }
          }}
          loading="lazy"
        />
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 leading-snug">{title}</h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">{summary}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex flex-col gap-3 w-full">
          {linkType === "review" && asin && (
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              size="lg"
            >
              <Link href={reviewUrl}>Read Expert Review</Link>
            </Button>
          )}
          {linkType === "product" && asin && showProductPageLink && (
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" size="lg">
              <Link href={productUrl}>View product page</Link>
            </Button>
          )}
          <Button
            className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            size="lg"
            onClick={() => window.open(amazonUrl, "_blank", "noopener,noreferrer")}
          >
            View on Amazon
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
