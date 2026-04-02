import Link from "next/link"
import type { ComponentType } from "react"
import * as LucideIcons from "lucide-react"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export type CategoryIndexCardProps = {
  slug: string
  name: string
  description: string
  icon: string
  /** Shown when `showCount` and counts are loaded */
  productCount?: number
  showCount?: boolean
  countEmptyLabel?: string
  countTemplate?: string
  linkLabel?: string
  /** Default h3 (under homepage section h2). Use h2 on /products (page h1 + card h2). */
  titleLevel?: "h2" | "h3"
}

export function CategoryIndexCard({
  slug,
  name,
  description,
  icon,
  productCount,
  showCount,
  countEmptyLabel = "No products yet",
  countTemplate = "{count} products",
  linkLabel = "View Products",
  titleLevel = "h3",
}: CategoryIndexCardProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, ComponentType<{ className?: string }>>)[icon]

  const countLine =
    showCount && typeof productCount === "number"
      ? productCount === 0
        ? countEmptyLabel
        : countTemplate.replace("{count}", String(productCount))
      : null

  const TitleTag = titleLevel === "h2" ? "h2" : "h3"
  const titleClass =
    "mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary"

  return (
    <Link href={`/category/${slug}`} className="group">
      <Card className="h-full border-2 transition-all duration-300 hover:border-primary hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
              {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
            </div>
            <TitleTag className={titleClass}>{name}</TitleTag>
            {countLine ? (
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{countLine}</p>
            ) : null}
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <div className="flex items-center text-sm font-medium text-primary transition-all group-hover:gap-2">
              {linkLabel} <ArrowRight className="ml-1 h-4 w-4 transition-all group-hover:ml-0" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
