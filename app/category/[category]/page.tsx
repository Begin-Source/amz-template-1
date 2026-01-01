import type { Metadata } from "next"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getProductsByCategory, categoryInfo } from "@/lib/products-data"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const categories = ["camp-essentials", "cooking-dining", "gear-electronics", "safety-navigation"]
  return categories.map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const info = categoryInfo[category]
  if (!info) {
    return {
      title: "Category Not Found - Wild Nature Journey",
    }
  }

  return {
    title: `Best ${info.name} for Camping - Wild Nature Journey`,
    description: info.description,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const info = categoryInfo[category]
  const products = await getProductsByCategory(category)

  if (!info || products.length === 0) {
    notFound()
  }

  return (
    <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <BreadcrumbNav
            items={[
              { label: info.name },
            ]}
          />

          {/* Category Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Best {info.name} for Camping & Outdoors
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{info.description}</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard
                key={product.asin}
                title={product.shortTitle || product.title}
                image={product.imageUrl}
                summary={product.summary || `Expert-tested and reviewed. ${product.features[0]}`}
                amazonUrl={product.amazonUrl}
                asin={product.asin}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg text-primary-foreground/90 mb-6">
              Browse our other categories for more outdoor gear recommendations
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="/">Explore All Categories</a>
            </Button>
          </div>
        </div>
      </main>
  )
}
