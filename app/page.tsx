import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryIndexCard } from "@/components/category-index-card"
import { ProductCard } from "@/components/product-card"
import { Search } from "lucide-react"
import Link from "next/link"
import { getCategoryCoverImagesFromFeaturedCatalog, getFeaturedProducts } from "@/lib/products-data"
import { getAllReviewsUnified } from "@/lib/api"
import { siteConfig, type HomepageCategoryItem } from "@/lib/site.config"

export default async function HomePage() {
  const categorySlugs = siteConfig.homepage.categories.items.map((c) => c.slug)
  const [allReviews, categoryCoverMap] = await Promise.all([
    getAllReviewsUnified(),
    getCategoryCoverImagesFromFeaturedCatalog(categorySlugs),
  ])
  const reviewBasedFeatured = allReviews
    .filter((review) => Boolean(review.frontmatter?.asin))
    .slice(0, 5)
    .map((review) => {
      const asin = review.frontmatter.asin || ""
      const title = review.frontmatter.title || "Untitled Review"
      return {
        asin,
        title,
        shortTitle: title.substring(0, 50),
        imageUrl: review.frontmatter.image || "",
        summary: review.frontmatter.description || "Expert product review.",
        amazonUrl: review.frontmatter.amazonUrl || `https://www.amazon.com/dp/${asin}?tag=smartymode-20`,
        slug: review.slug,
      }
    })

  const featuredProducts =
    reviewBasedFeatured.length > 0 ? reviewBasedFeatured : await getFeaturedProducts(5)

  return (
    <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-primary py-20 md:py-32"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            outline: 'none',
            border: 'none'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance">
                {siteConfig.homepage.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {siteConfig.homepage.hero.subtitle}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={siteConfig.homepage.hero.searchPlaceholder}
                  className="pl-12 h-14 text-base bg-background text-foreground"
                />
                <Button
                  size="lg"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative bottom wave */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              overflow: 'hidden',
              lineHeight: 0
            }}
          >
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{
                display: 'block',
                verticalAlign: 'bottom'
              }}
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="currentColor"
                className="text-background"
              />
            </svg>
          </div>
        </section>

        {/* Best Gear Picks Categories */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{siteConfig.homepage.categories.title}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {siteConfig.homepage.categories.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {siteConfig.homepage.categories.items.map((category) => (
                <CategoryIndexCard
                  key={category.slug}
                  slug={category.slug}
                  name={category.name}
                  description={category.description}
                  icon={category.icon}
                  coverImageUrl={
                    (category as HomepageCategoryItem).coverImage?.trim() ||
                    categoryCoverMap[category.slug] ||
                    undefined
                  }
                  showCount={false}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Reviews Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{siteConfig.homepage.featuredProducts.title}</h2>
                <p className="text-muted-foreground">{siteConfig.homepage.featuredProducts.subtitle}</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/reviews">View All Reviews</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.slug || product.asin}
                  title={product.shortTitle || product.title}
                  image={product.imageUrl}
                  summary={product.summary || "Tested and reviewed by our team."}
                  amazonUrl={product.amazonUrl}
                  asin={product.asin}
                  slug={product.slug}
                  linkType="review"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center bg-primary rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
                {siteConfig.homepage.cta.title}
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                {siteConfig.homepage.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={siteConfig.homepage.cta.emailPlaceholder}
                  className="flex-1 h-12 bg-background text-foreground"
                />
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap">
                  {siteConfig.homepage.cta.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}
