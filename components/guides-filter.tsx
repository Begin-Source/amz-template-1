"use client"

import { useState, useMemo, useId } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, Search, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useIsLg } from "@/hooks/use-is-lg"
import type { Guide } from "@/lib/api"
import { type GuideCategoryItem, slugifyGuideCategory } from "@/lib/guide-categories"
import { cn } from "@/lib/utils"

interface GuidesFilterProps {
  guides: Guide[]
  categories: GuideCategoryItem[]
}

export function GuidesFilter({ guides, categories }: GuidesFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const categoryParam = searchParams.get("category")
    if (!categoryParam) return "all"
    const matched = categories.find(
      (category) => category.slug === categoryParam || category.name === categoryParam
    )
    return matched ? matched.slug : "all"
  })
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || "")
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const isLg = useIsLg()
  const categoriesExpanded = isLg || categoriesOpen
  const categoriesPanelId = useId()

  // Filter guides based on category and search using useMemo
  const filteredGuides = useMemo(() => {
    let result = guides

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (guide) => slugifyGuideCategory(guide.frontmatter.category) === selectedCategory
      )
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (guide) =>
          guide.frontmatter.title.toLowerCase().includes(query) ||
          guide.frontmatter.description.toLowerCase().includes(query) ||
          guide.frontmatter.category.toLowerCase().includes(query) ||
          (guide.frontmatter.tags && guide.frontmatter.tags.some((tag) => tag.toLowerCase().includes(query)))
      )
    }

    return result
  }, [guides, selectedCategory, searchQuery])

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    const newUrl = params.toString() ? `/guides?${params.toString()}` : "/guides"
    router.replace(newUrl, { scroll: false })
  }

  // Update search query
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Category sidebar — full width on small screens, narrow column on lg+ */}
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
                      "h-auto min-h-9 w-full justify-start gap-2 px-3 py-2.5 text-left font-normal",
                      selectedCategory !== "all" && "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => handleCategoryChange("all")}
                  >
                    <span className="min-w-0 flex-1 break-words leading-snug">All Guides</span>
                    <span className="shrink-0 tabular-nums text-xs opacity-80">({guides.length})</span>
                  </Button>
                  {categories.map((category) => {
                    const count = guides.filter(
                      (guide) => slugifyGuideCategory(guide.frontmatter.category) === category.slug
                    ).length
                    const active = selectedCategory === category.slug
                    return (
                      <Button
                        key={category.slug}
                        type="button"
                        variant={active ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-auto min-h-9 w-full justify-start gap-2 px-3 py-2.5 text-left font-normal",
                          !active && "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => handleCategoryChange(category.slug)}
                      >
                        <span className="min-w-0 flex-1 break-words leading-snug">{category.name}</span>
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
                Showing <span className="font-semibold text-foreground">{filteredGuides.length}</span>{" "}
                {filteredGuides.length === 1 ? "article" : "articles"}
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
                      {categories.find((category) => category.slug === selectedCategory)?.name ?? selectedCategory}
                    </span>
                  </span>
                )}
              </p>
              <div className="relative w-full shrink-0 sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="h-9 pl-9 text-sm"
                  aria-label="Search guides"
                />
              </div>
            </div>
          </div>

      {/* Guides Grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.slug} className="flex flex-col hover:shadow-lg transition-shadow">
              {guide.frontmatter.image && (
                <div
                  className="aspect-square w-full bg-cover bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(${guide.frontmatter.image})` }}
                />
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{guide.frontmatter.category}</Badge>
                  {guide.frontmatter.readTime && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {guide.frontmatter.readTime}
                    </div>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{guide.frontmatter.title}</CardTitle>
                <CardDescription className="line-clamp-3">{guide.frontmatter.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(guide.frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/guides/${guide.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No guides found matching your criteria.</p>
          <Button onClick={() => {
            handleSearchChange("");
            handleCategoryChange("all");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}




