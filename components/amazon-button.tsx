import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface AmazonButtonProps {
  url: string
  text?: string
  size?: "default" | "sm" | "lg"
  className?: string
  /** `amazon` = recognizable Amazon orange for primary affiliate CTAs (high visibility, still honest labeling). */
  variant?: "theme" | "amazon"
}

export function AmazonButton({
  url,
  text = "See price & availability on Amazon",
  size = "lg",
  className = "",
  variant = "theme",
}: AmazonButtonProps) {
  const isAmazon = variant === "amazon"
  return (
    <Button
      asChild
      className={cn(
        "font-semibold shadow-md transition-shadow hover:shadow-lg",
        isAmazon
          ? "bg-[#FF9900] text-white hover:bg-[#FF9900]/90"
          : "bg-accent hover:bg-accent/90 text-accent-foreground",
        className
      )}
      size={size}
    >
      <a href={url} target="_blank" rel="noopener noreferrer nofollow sponsored">
        {text}
        <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
      </a>
    </Button>
  )
}
