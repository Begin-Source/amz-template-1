import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { CategoryIndexCard } from "@/components/category-index-card"
import { getCategoryProductCounts } from "@/lib/products-data"
import { siteConfig } from "@/lib/site.config"
import { absoluteUrl } from "@/lib/site-url"

const productsPage = siteConfig.pages.products

export const metadata: Metadata = {
  title: productsPage?.title ?? "Products",
  description: productsPage?.description ?? "",
  openGraph: {
    title: productsPage?.title ?? "Products",
    description: productsPage?.description ?? "",
    type: "website",
    url: absoluteUrl("/products"),
  },
}

export default async function ProductsPage() {
  const cfg = siteConfig.pages.products
  const items = siteConfig.homepage?.categories?.items ?? []
  const counts = await getCategoryProductCounts()

  const indexNote = (cfg.indexNote ?? "").trim()
  const countEmpty = cfg.categoryProductCountEmpty ?? "No products yet"
  const countTpl = cfg.categoryProductCountTemplate ?? "{count} products"

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cat.name,
      url: absoluteUrl(`/category/${cat.slug}`),
    })),
  }

  return (
    <main className="flex-1 min-w-0 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <BreadcrumbNav items={[{ label: cfg.title }]} />

          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">{cfg.title}</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">{cfg.description}</p>
            {indexNote ? (
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{indexNote}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {items.map((category) => (
              <CategoryIndexCard
                key={category.slug}
                slug={category.slug}
                name={category.name}
                description={category.description}
                icon={category.icon}
                productCount={counts[category.slug] ?? 0}
                showCount
                countEmptyLabel={countEmpty}
                countTemplate={countTpl}
                linkLabel="View category"
                titleLevel="h2"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
