import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, ArrowRight } from "lucide-react"

interface Product {
  title: string
  slug: string
  image?: string
}

interface RelatedProductsCTAProps {
  title?: string
  description?: string
  products: Product[]
  className?: string
}

export function RelatedProductsCTA({
  title = "Recommended Gear",
  description = "Check out these expert-reviewed products that can help with this camping tip.",
  products,
  className = "",
}: RelatedProductsCTAProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <Card className={`my-8 bg-primary/5 border-primary/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {description && <CardDescription className="text-base">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/review/${product.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background hover:shadow-md transition-all group"
            >
              {product.image && (
                <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {product.title}
                </h4>
                <div className="flex items-center text-xs text-primary mt-1">
                  <span>Read Review</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/reviews">
              Browse All Reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/guides">View Buying Guides</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

