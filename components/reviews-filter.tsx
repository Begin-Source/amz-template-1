"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

interface Review {
  slug: string
  frontmatter: {
    title: string
    date: string
    description: string
    asin?: string
    brand?: string
    category?: string
    rating?: number
    image?: string
    amazonUrl?: string
  }
}

interface Category {
  value: string
  label: string
}

interface ReviewsFilterProps {
  reviews: Review[]
  categories: Category[]
}

export function ReviewsFilter({ reviews, categories }: ReviewsFilterProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && categories.some(cat => cat.value === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams, categories])

  const filteredReviews =
    selectedCategory === "all"
      ? reviews
      : reviews.filter((review) => {
          const categoryLabel = categories.find(cat => cat.value === selectedCategory)?.label
          return review.frontmatter.category === categoryLabel
        })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    const newUrl = params.toString() ? `/reviews?${params.toString()}` : "/reviews"
    router.push(newUrl, { scroll: false })
  }

  return (
    <>
      {/* Filter and Sort Section */}
      <div className="border-2 border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <p className="text-sm font-medium text-foreground">Filter by Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <p className="text-sm font-medium text-foreground">Sort by</p>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                disabled
              >
                Newest
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{sortedReviews.length}</span> of{" "}
            {reviews.length} products
            {selectedCategory !== "all" && (
              <span className="ml-2 text-sm">
                in <span className="font-semibold text-foreground">{categories.find(cat => cat.value === selectedCategory)?.label}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedReviews.map((review) => (
          <ProductCard
            key={review.slug}
            title={review.frontmatter.title}
            image={review.frontmatter.image || "/placeholder.svg"}
            summary={review.frontmatter.description}
            amazonUrl={review.frontmatter.amazonUrl || "#"}
            asin={review.frontmatter.asin}
            slug={review.slug}
            linkType="review"
          />
        ))}
      </div>

      {sortedReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No reviews found in this category.</p>
          <Button variant="outline" className="mt-4" onClick={() => handleCategoryChange("all")}>
            View All Reviews
          </Button>
        </div>
      )}
    </>
  )
}

