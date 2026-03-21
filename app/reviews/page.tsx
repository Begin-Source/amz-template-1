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
      <div className="container mx-auto max-w-6xl px-4 py-6 sm:py-8 lg:py-10">
        <div className="mb-6 text-center lg:mb-8">
          <h1 className="mb-3 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {pageTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            {pageDescription}
          </p>
        </div>

        <ReviewsFilter reviews={allReviews} categories={categories} />
      </div>
    </main>
  )
}
