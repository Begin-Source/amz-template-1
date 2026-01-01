import type { Metadata } from "next"
import { AmazonButton } from "@/components/amazon-button"
import { ProsCons } from "@/components/pros-cons"
import { ProductCard } from "@/components/product-card"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Shield, Truck } from "lucide-react"
import { getProductByAsin, getFeaturedProducts, getAllProducts } from "@/lib/products-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    asin: product.asin,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ asin: string }> }): Promise<Metadata> {
  const { asin } = await params
  const product = getProductByAsin(asin)
  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.title} Review - Wild Nature Journey`,
    description: `Detailed review of ${product.title}. ${product.summary || product.features[0]}`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ asin: string }> }) {
  const { asin } = await params
  const product = getProductByAsin(asin)

  if (!product) {
    notFound()
  }

  const relatedProducts = getFeaturedProducts(3).filter((p) => p.asin !== product.asin)

  return (
    <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Breadcrumbs */}
          <BreadcrumbNav
            items={[
              { label: product.category, href: `/category/${product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}` },
              { label: product.shortTitle || product.title },
            ]}
          />

          {/* Product Overview */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Product Image */}
            <div>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full uppercase">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">{product.title}</h1>

              {product.brand && (
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">Brand: </span>
                  <span className="text-sm font-semibold text-foreground">{product.brand}</span>
                </div>
              )}

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {product.summary || product.features[0]}
              </p>

              <AmazonButton url={product.amazonUrl} size="lg" className="w-full mb-6" />

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xs text-muted-foreground">Free Shipping</div>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xs text-muted-foreground">Secure Checkout</div>
                </div>
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xs text-muted-foreground">Fast Delivery</div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Key Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-12" />

          {/* Pros & Cons */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Pros & Cons</h2>
            <ProsCons
              pros={product.features.slice(0, 4)}
              cons={[
                "Price may vary based on Amazon deals",
                "Availability depends on stock",
                "Shipping times may vary by location",
              ]}
            />
          </section>

          <div className="flex justify-center mb-12">
            <AmazonButton url={product.amazonUrl} size="lg" />
          </div>

          {/* Related Products */}
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.asin}
                  title={relatedProduct.shortTitle || relatedProduct.title}
                  image={relatedProduct.imageUrl}
                  summary={relatedProduct.summary || relatedProduct.features[0]}
                  amazonUrl={relatedProduct.amazonUrl}
                  asin={relatedProduct.asin}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
  )
}
