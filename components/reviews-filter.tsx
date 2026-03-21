"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")

    if (categoryParam && categories.some(cat => cat.value === categoryParam)) {
      setSelectedCategory(categoryParam)
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams, categories])

  // Filter by category
  const categoryFilteredReviews =
    selectedCategory === "all"
      ? reviews
      : reviews.filter((review) => {
          const categoryLabel = categories.find(cat => cat.value === selectedCategory)?.label
          return review.frontmatter.category === categoryLabel
        })

  // Filter by search query
  const filteredReviews = searchQuery.trim()
    ? categoryFilteredReviews.filter((review) => {
        const query = searchQuery.toLowerCase()
        const title = review.frontmatter.title.toLowerCase()
        const description = review.frontmatter.description.toLowerCase()
        const brand = review.frontmatter.brand?.toLowerCase() || ""
        return title.includes(query) || description.includes(query) || brand.includes(query)
      })
    : categoryFilteredReviews

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

  // Update URL when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    const newUrl = params.toString() ? `/reviews?${params.toString()}` : "/reviews"
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      {/* Filter and Search Section */}
      <div className="mb-6 w-full min-w-0 max-w-full rounded-xl border-2 border-border p-4 sm:mb-8 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6 lg:gap-8">
          <div className="flex min-w-0 w-full flex-col gap-2 md:flex-1 md:justify-end">
            <p className="text-sm font-medium text-foreground">Filter by Category</p>

            <div className="sm:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="h-10 w-full min-w-0 max-w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden min-w-0 sm:flex sm:flex-nowrap sm:gap-2 sm:overflow-x-auto sm:overflow-y-hidden sm:pb-1 sm:[scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  className="shrink-0 whitespace-nowrap"
                  onClick={() => handleCategoryChange(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex w-full min-w-0 shrink-0 flex-col gap-2 md:w-[min(100%,320px)] lg:w-80">
            <p className="text-sm font-medium text-foreground">Search Products</p>
            <div className="relative w-full min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, brand..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-10 w-full min-w-0 max-w-full pl-9 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4 lg:mt-5 lg:pt-5">
          <p className="break-words text-muted-foreground text-sm sm:text-base">
            Showing <span className="font-semibold text-foreground">{sortedReviews.length}</span> of{" "}
            {reviews.length} products
            {searchQuery.trim() && (
              <span className="ml-2 text-sm">
                matching "<span className="font-semibold text-foreground">{searchQuery}</span>"
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="ml-2 text-sm">
                in <span className="font-semibold text-foreground">{categories.find(cat => cat.value === selectedCategory)?.label}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Products Grid — desktop: denser columns without oversized single cards */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
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
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg mb-2">
            {searchQuery.trim()
              ? `No products found matching "${searchQuery}"`
              : "No reviews found in this category."}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <div className="flex gap-3 justify-center">
            {searchQuery.trim() && (
              <Button variant="outline" onClick={() => handleSearchChange("")}>
                Clear Search
              </Button>
            )}
            {selectedCategory !== "all" && (
              <Button variant="outline" onClick={() => handleCategoryChange("all")}>
                View All Categories
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

