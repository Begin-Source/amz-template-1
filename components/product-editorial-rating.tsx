import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

/** Optional catalog rating shown as stars — not a claim about Amazon customer reviews. */
export function ProductEditorialRating({ rating }: { rating: number }) {
  if (rating == null || Number.isNaN(rating)) return null
  const clamped = Math.min(5, Math.max(0, rating))
  const filled = Math.round(clamped)

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="img"
      aria-label={`Editorial summary score ${clamped.toFixed(1)} out of 5`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) =>
          i < filled ? (
            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden />
          ) : (
            <Star key={i} className="h-5 w-5 text-muted-foreground/25" aria-hidden />
          )
        )}
      </div>
      <span className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{clamped.toFixed(1)}</span>
        <span className="mx-1">·</span>
        Editorial summary (not Amazon reviews)
      </span>
    </div>
  )
}
