import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"
import { getAllReviews } from "@/lib/api"
import { TableOfContents } from "@/components/table-of-contents"
import { RelatedProductImage } from "@/components/related-product-image"

interface ReviewSidebarProps {
  category?: string
  currentSlug: string
}

export function ReviewSidebar({ category, currentSlug }: ReviewSidebarProps) {
  const allReviews = getAllReviews()

  // Get related products from same category (excluding current)
  const relatedProducts = category
    ? allReviews
        .filter(review =>
          review.frontmatter.category === category &&
          review.slug !== currentSlug
        )
        .slice(0, 3)
    : []

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Related Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedProducts.map((product) => (
                <div
                  key={product.slug}
                  className="border border-border rounded-lg p-3 hover:border-primary/50 transition-all"
                >
                  <Link
                    href={`/review/${product.slug}`}
                    className="block group"
                  >
                    <div className="flex gap-3 mb-3">
                      <RelatedProductImage
                        src={product.frontmatter.image || "/placeholder.svg"}
                        alt={`${product.frontmatter.title} - Related Product | ${product.frontmatter.brand || 'Camping Gear'}`}
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
              <Link href={`/reviews?category=${category?.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                View All in {category}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/reviews">All Reviews</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/guides">Buying Guides</Link>
            </Button>
            {category && (
              <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                <Link href={`/reviews?category=${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                  {category} Reviews
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

