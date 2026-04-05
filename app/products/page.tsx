import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { CategoryIndexCard } from "@/components/category-index-card"
import { amazonSearchUrl } from "@/lib/amazon-search-url"
import { getCategoryCoverImagesFromFeaturedCatalog, getCategoryProductCounts } from "@/lib/products-data"
import { resolveProductsPageConfig } from "@/lib/products-page-config"
import { siteConfig } from "@/lib/site.config"
import { absoluteUrl } from "@/lib/site-url"

const productsPageConfig = resolveProductsPageConfig()

export const metadata: Metadata = {
  title: productsPageConfig.title,
  description: productsPageConfig.description,
  openGraph: {
    title: productsPageConfig.title,
    description: productsPageConfig.description,
    type: "website",
    url: absoluteUrl("/products"),
  },
}

export default async function ProductsPage() {
  const cfg = productsPageConfig
  const items = siteConfig.homepage?.categories?.items ?? []
  const [counts, categoryCoverMap] = await Promise.all([
    getCategoryProductCounts(),
    getCategoryCoverImagesFromFeaturedCatalog(items.map((c) => c.slug)),
  ])

  const indexNote = cfg.indexNote
  const countEmpty = cfg.categoryProductCountEmpty
  const countTpl = cfg.categoryProductCountTemplate

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

          <div className="mb-10 rounded-2xl border border-border/50 bg-gradient-to-b from-muted/50 to-muted/15 px-6 py-10 text-center md:px-10 md:py-12">
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">{cfg.title}</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">{cfg.description}</p>
            {indexNote ? (
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{indexNote}</p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border/40 bg-muted/20 p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {items.map((category) => (
                <CategoryIndexCard
                  key={category.slug}
                  slug={category.slug}
                  name={category.name}
                  description={category.description}
                  icon={category.icon}
                  coverImageUrl={
                    (category as { coverImage?: string }).coverImage?.trim() ||
                    categoryCoverMap[category.slug] ||
                    undefined
                  }
                  productCount={counts[category.slug] ?? 0}
                  showCount
                  countEmptyLabel={countEmpty}
                  countTemplate={countTpl}
                  linkLabel="View category"
                  titleLevel="h2"
                  reviewsBrowseHref={`/reviews?category=${encodeURIComponent(category.slug)}`}
                  amazonSearchHref={amazonSearchUrl(category.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
