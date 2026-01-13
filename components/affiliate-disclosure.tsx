import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function AffiliateDisclosure() {
  return (
    <Alert className="my-8 border-muted bg-muted/30">
      <Info className="h-5 w-5 text-muted-foreground" />
      <AlertDescription className="text-sm text-muted-foreground leading-relaxed ml-2">
        <strong className="text-foreground">Affiliate Disclosure:</strong> Wild Nature Journey is a participant in the
        Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites
        to earn advertising fees by advertising and linking to Amazon.com. We may earn a small commission when you
        purchase through our links at no additional cost to you. This helps us continue providing honest, in-depth
        reviews.
      </AlertDescription>
    </Alert>
  )
}
