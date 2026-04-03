import type { Metadata } from "next"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getAllCategories, getProductsByCategory, categoryInfo } from "@/lib/products-data"
import { resolveProductsPageConfig } from "@/lib/products-page-config"
import { siteConfig } from "@/lib/site.config"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return getAllCategories().map(({ slug }) => ({ category: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const info = categoryInfo[category]
  const pp = resolveProductsPageConfig()
  const tpl = siteConfig.seo.titleTemplate

  if (!info) {
    return {
      title: tpl.replace("%s", "Category not found"),
    }
  }

  const lead = pp.categoryH1Lead
  const suffix = pp.categoryH1Suffix
  const pageTitleBase = suffix ? `${lead} ${info.name} ${suffix}` : `${lead} ${info.name}`

  return {
    title: tpl.replace("%s", pageTitleBase),
    description: info.description,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const info = categoryInfo[category]
  const products = await getProductsByCategory(category)
  const pp = resolveProductsPageConfig()

  if (!info) {
    notFound()
  }

  const lead = pp.categoryH1Lead
  const suffix = pp.categoryH1Suffix
  const h1Text = suffix ? `${lead} ${info.name} ${suffix}` : `${lead} ${info.name}`

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <BreadcrumbNav
          items={[
            { label: pp.title, href: "/products" },
            { label: info.name },
          ]}
        />

        <div className="mb-12">
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">{h1Text}</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{info.description}</p>
        </div>

        {products.length === 0 ? (
          <div className="mb-12 rounded-xl border border-border bg-muted/20 p-8 text-center">
            <p className="mb-4 text-muted-foreground">
              No reviews with ASINs in this category yet. Add review MDX under{" "}
              <code className="rounded bg-muted px-1">content/reviews</code> with matching{" "}
              <code className="rounded bg-muted px-1">category</code> and <code className="rounded bg-muted px-1">asin</code>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="default">
                <a href={`/reviews?category=${encodeURIComponent(category)}`}>View reviews in {info.name}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/products">All product categories</a>
              </Button>
            </div>
          </div>
        ) : (
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.asin}
              title={product.shortTitle || product.title}
              image={product.imageUrl}
              summary={product.summary || `Expert-tested and reviewed. ${product.features[0]}`}
              amazonUrl={product.amazonUrl}
              asin={product.asin}
              showProductPageLink
            />
          ))}
        </div>
        )}

        <div className="rounded-2xl bg-primary p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">{pp.categoryBrowseOtherTitle}</h2>
          <p className="mb-6 text-lg text-primary-foreground/90">{pp.categoryBrowseOtherDescription}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="/products">Browse all products</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
            >
              <a href="/">Back to home</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
