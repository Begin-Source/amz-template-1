"use client"

import { useState, useMemo, useId, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useIsLg } from "@/hooks/use-is-lg"
import { cn } from "@/lib/utils"

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

  const slugCategories = useMemo(() => categories.filter((c) => c.value !== "all"), [categories])

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const categoryParam = searchParams.get("category")
    if (!categoryParam) return "all"
    const matched = categories.find((c) => c.value === categoryParam)
    return matched ? matched.value : "all"
  })
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || "")
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const isLg = useIsLg()
  const categoriesExpanded = isLg || categoriesOpen
  const categoriesPanelId = useId()

  // Keep local state in sync when navigating back/forward
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search") || ""
    if (!categoryParam) {
      setSelectedCategory("all")
    } else if (categories.some((c) => c.value === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
    setSearchQuery(searchParam)
  }, [searchParams, categories])

  const categoryFilteredReviews = useMemo(() => {
    if (selectedCategory === "all") return reviews
    const categoryLabel = categories.find((c) => c.value === selectedCategory)?.label
    return reviews.filter((r) => r.frontmatter.category === categoryLabel)
  }, [reviews, selectedCategory, categories])

  const filteredReviews = useMemo(() => {
    if (!searchQuery.trim()) return categoryFilteredReviews
    const query = searchQuery.toLowerCase()
    return categoryFilteredReviews.filter((review) => {
      const title = review.frontmatter.title.toLowerCase()
      const description = review.frontmatter.description.toLowerCase()
      const brand = review.frontmatter.brand?.toLowerCase() || ""
      return title.includes(query) || description.includes(query) || brand.includes(query)
    })
  }, [categoryFilteredReviews, searchQuery])

  const sortedReviews = useMemo(() => {
    return [...filteredReviews].sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return dateB - dateA
    })
  }, [filteredReviews])

  const categoryCount = (value: string) => {
    if (value === "all") return reviews.length
    const label = categories.find((c) => c.value === value)?.label
    if (!label) return 0
    return reviews.filter((r) => r.frontmatter.category === label).length
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    const newUrl = params.toString() ? `/reviews?${params.toString()}` : "/reviews"
    router.replace(newUrl, { scroll: false })
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    const newUrl = params.toString() ? `/reviews?${params.toString()}` : "/reviews"
    router.replace(newUrl, { scroll: false })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:w-64 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border-2 border-border bg-muted/20 p-4">
            <Collapsible open={categoriesExpanded} onOpenChange={setCategoriesOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 border-b border-border pb-3 text-left lg:hidden">
                <span className="text-sm font-medium text-foreground">Categories</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    categoriesExpanded && "rotate-180"
                  )}
                  aria-hidden
                />
              </CollapsibleTrigger>
              <div className="mb-3 hidden lg:block">
                <p className="text-sm font-medium text-foreground">Categories</p>
              </div>
              <CollapsibleContent id={categoriesPanelId}>
                <nav className="flex max-h-[min(50vh,22rem)] flex-col gap-1 overflow-y-auto pt-2 pr-1 lg:max-h-none lg:overflow-visible lg:pt-0">
                  <Button
                    type="button"
                    variant={selectedCategory === "all" ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "h-auto min-h-9 w-full min-w-0 justify-start gap-2 whitespace-normal px-3 py-2.5 text-left font-normal",
                      selectedCategory !== "all" && "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => handleCategoryChange("all")}
                  >
                    <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] leading-snug">
                      All Reviews
                    </span>
                    <span className="shrink-0 tabular-nums text-xs opacity-80">({reviews.length})</span>
                  </Button>
                  {slugCategories.map((cat) => {
                    const count = categoryCount(cat.value)
                    const active = selectedCategory === cat.value
                    return (
                      <Button
                        key={cat.value}
                        type="button"
                        variant={active ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-auto min-h-9 w-full min-w-0 justify-start gap-2 whitespace-normal px-3 py-2.5 text-left font-normal",
                          !active && "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => handleCategoryChange(cat.value)}
                      >
                        <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] leading-snug">
                          {cat.label}
                        </span>
                        <span className="shrink-0 tabular-nums text-xs opacity-80">({count})</span>
                      </Button>
                    )
                  })}
                </nav>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <div className="rounded-xl border-2 border-border p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="min-w-0 text-sm text-muted-foreground sm:flex-1">
                Showing <span className="font-semibold text-foreground">{sortedReviews.length}</span>{" "}
                {sortedReviews.length === 1 ? "review" : "reviews"}
                {searchQuery.trim() && (
                  <span className="ml-2">
                    matching &quot;
                    <span className="font-semibold text-foreground">{searchQuery}</span>
                    &quot;
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="ml-2">
                    in{" "}
                    <span className="font-semibold text-foreground">
                      {categories.find((c) => c.value === selectedCategory)?.label}
                    </span>
                  </span>
                )}
              </p>
              <div className="relative w-full shrink-0 sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, brand..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="h-9 pl-9 text-sm"
                  aria-label="Search reviews"
                />
              </div>
            </div>
          </div>

          {sortedReviews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          ) : (
            <div className="py-12 text-center">
              <p className="mb-4 text-lg text-muted-foreground">No reviews found matching your criteria.</p>
              <Button
                onClick={() => {
                  handleSearchChange("")
                  handleCategoryChange("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
