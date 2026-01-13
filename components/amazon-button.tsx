import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface AmazonButtonProps {
  url: string
  text?: string
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AmazonButton({ url, text = "Check Price on Amazon", size = "lg", className = "" }: AmazonButtonProps) {
  return (
    <Button
      asChild
      className={`bg-accent hover:bg-accent/90 text-accent-foreground font-semibold ${className}`}
      size={size}
    >
      <a href={url} target="_blank" rel="noopener noreferrer nofollow">
        {text}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  )
}
