import Link from "next/link"
import Image from "next/image"
import type { ComponentType } from "react"
import * as LucideIcons from "lucide-react"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function CategoryCoverImage({ src, alt }: { src: string; alt: string }) {
  const className =
    "h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={480}
        height={216}
        className={className}
        unoptimized
      />
    )
  }
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
}

export type CategoryIndexCardProps = {
  slug: string
  name: string
  description: string
  icon: string
  /** Optional hero image (`/path` from `public/` or absolute `https://…`). */
  coverImageUrl?: string
  /** Shown when `showCount` and counts are loaded */
  productCount?: number
  showCount?: boolean
  countEmptyLabel?: string
  countTemplate?: string
  linkLabel?: string
  /** When set with `showCount` (e.g. on `/products`), link to `/reviews?category=…` for this slug. Shown for all counts. */
  reviewsBrowseHref?: string
  reviewsLinkLabel?: string
  /** e.g. `/products` — opens Amazon search for this category in a new tab (above overlay link). */
  amazonSearchHref?: string
  /** Default h3 (under homepage section h2). Use h2 on /products (page h1 + card h2). */
  titleLevel?: "h2" | "h3"
}

export function CategoryIndexCard({
  slug,
  name,
  description,
  icon,
  coverImageUrl,
  productCount,
  showCount,
  countEmptyLabel = "No products yet",
  countTemplate = "{count} products",
  linkLabel = "View Products",
  reviewsBrowseHref,
  reviewsLinkLabel = "Browse reviews",
  amazonSearchHref,
  titleLevel = "h3",
}: CategoryIndexCardProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, ComponentType<{ className?: string }>>)[icon]

  const countLine =
    showCount && typeof productCount === "number"
      ? productCount === 0
        ? countEmptyLabel
        : countTemplate.replace("{count}", String(productCount))
      : null

  const showBrowseReviewsLink = Boolean(reviewsBrowseHref) && showCount

  const TitleTag = titleLevel === "h2" ? "h2" : "h3"
  const titleClass = cn(
    "mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary",
    coverImageUrl && "text-balance"
  )

  const hasCover = Boolean(coverImageUrl?.trim())

  return (
    <Card className="group relative h-full overflow-hidden border-2 transition-all duration-300 hover:border-primary hover:shadow-lg">
      <Link
        href={`/category/${slug}`}
        className="absolute inset-0 z-0 rounded-[inherit]"
        aria-label={`View ${name} category`}
      />
      {hasCover ? (
        <div className="relative z-[1] h-36 w-full overflow-hidden bg-muted">
          <CategoryCoverImage src={coverImageUrl!.trim()} alt={`${name} — category`} />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent"
            aria-hidden
          />
        </div>
      ) : null}

      <CardContent
        className={cn(
          "relative z-[1] flex flex-col items-center text-center pointer-events-none",
          hasCover ? "px-5 pb-5 pt-5" : "p-6"
        )}
      >
        {!hasCover ? (
          <div className="mb-4 rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
            {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
          </div>
        ) : (
          <div className="mb-3 rounded-full bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
            {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
          </div>
        )}

        <TitleTag className={titleClass}>{name}</TitleTag>

        {countLine ? (
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{countLine}</p>
        ) : null}

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="mb-2 flex items-center text-sm font-medium text-primary transition-all group-hover:gap-2">
          {linkLabel} <ArrowRight className="ml-1 h-4 w-4 transition-all group-hover:ml-0" />
        </div>

        {amazonSearchHref ? (
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "relative z-[2] w-full max-w-full pointer-events-auto text-xs sm:text-sm",
              showBrowseReviewsLink && "mb-2"
            )}
            asChild
          >
            <a
              href={amazonSearchHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              <span className="line-clamp-2 text-center">
                Search on Amazon
              </span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            </a>
          </Button>
        ) : null}

        {showBrowseReviewsLink ? (
          <p className="relative z-[2] text-xs text-muted-foreground pointer-events-auto">
            <Link
              href={reviewsBrowseHref!}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {reviewsLinkLabel}
            </Link>
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
