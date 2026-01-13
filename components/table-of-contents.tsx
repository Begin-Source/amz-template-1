"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { List } from "lucide-react"

interface TOCHeading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
  maxLevel?: 2 | 3 // Control which heading levels to show (2 = h2 only, 3 = h2 and h3)
}

export function TableOfContents({ className, maxLevel = 3 }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCHeading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from the main content only based on maxLevel
    // Exclude headings from "Related Reviews" and other sidebar sections
    const contentElement = document.querySelector("article .prose") || document.querySelector("main .prose")
    if (!contentElement) return

    const selector = maxLevel === 2 ? "h2" : "h2, h3"
    const headingElements = contentElement.querySelectorAll(selector)
    const headingData: TOCHeading[] = []

    headingElements.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent || ""
      
      // Generate or use existing ID
      let id = heading.id
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim()
        
        // Ensure unique ID
        if (headingData.some(h => h.id === id)) {
          id = `${id}-${index}`
        }
        
        heading.id = id
      }

      headingData.push({ id, text, level })
    })

    setHeadings(headingData)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      }
    )

    headingElements.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [maxLevel])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without scrolling
      window.history.pushState(null, "", `#${id}`)
      setActiveId(id)
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <List className="h-5 w-5 text-primary" />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <nav aria-label="Table of contents">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  "text-sm transition-all duration-200",
                  heading.level === 3 && "pl-4"
                )}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={cn(
                    "block py-1.5 px-3 rounded-md transition-colors hover:bg-muted/50",
                    activeId === heading.id
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}

