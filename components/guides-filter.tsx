"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"
import type { Guide } from "@/lib/api"

interface GuidesFilterProps {
  guides: Guide[]
  categories: string[]
}

export function GuidesFilter({ guides, categories }: GuidesFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const categoryParam = searchParams.get("category")
    return categoryParam && categories.includes(categoryParam) ? categoryParam : "all"
  })
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || "")

  // Filter guides based on category and search using useMemo
  const filteredGuides = useMemo(() => {
    let result = guides

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((guide) => guide.frontmatter.category === selectedCategory)
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
      params.set("category", encodeURIComponent(category))
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
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:flex-1 space-y-3">
          <p className="text-sm font-medium text-foreground">Filter by Category</p>

          <div className="sm:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All Guides ({guides.length})</option>
              {categories.map((category) => {
                const count = guides.filter((guide) => guide.frontmatter.category === category).length
                return (
                  <option key={category} value={category}>
                    {category} ({count})
                  </option>
                )
              })}
            </select>
          </div>

          <div className="hidden sm:flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => handleCategoryChange("all")}
              size="sm"
              className="whitespace-nowrap"
            >
              All Guides ({guides.length})
            </Button>
            {categories.map((category) => {
              const count = guides.filter((guide) => guide.frontmatter.category === category).length
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category} ({count})
                </Button>
              )
            })}
          </div>
        </div>

        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredGuides.length} {filteredGuides.length === 1 ? "article" : "articles"}
      </div>

      {/* Guides Grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.slug} className="flex flex-col hover:shadow-lg transition-shadow">
              {guide.frontmatter.image && (
                <div
                  className="h-48 bg-cover bg-center rounded-t-lg"
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
  )
}




