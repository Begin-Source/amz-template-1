import { getAllReviewsUnified } from "@/lib/api"
import { getAllCategories } from "@/lib/products-data"
import { ReviewsFilter } from "@/components/reviews-filter"
import { siteConfig } from "@/lib/site.config"

export default async function ReviewsPage() {
  const allReviews = await getAllReviewsUnified()
  const allCategories = getAllCategories()

  const categories = [
    { value: "all", label: "All Reviews" },
    ...allCategories.map(cat => ({ value: cat.slug, label: cat.name }))
  ]

  // 从配置文件获取页面文案，并替换 {count} 占位符
  const pageTitle = siteConfig.pages.reviews.title
  const pageDescription = siteConfig.pages.reviews.description.replace('{count}', allReviews.length.toString())

  return (
    <main className="flex-1 min-w-0 overflow-x-clip">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {pageDescription}
            </p>
          </div>

          <ReviewsFilter reviews={allReviews} categories={categories} />
        </div>
      </div>
    </main>
  )
}
