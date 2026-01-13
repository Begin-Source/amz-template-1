import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

interface ProsConsProps {
  pros: string[]
  cons: string[]
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {/* Pros */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Pros</h3>
          </div>
          <ul className="space-y-3">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Cons */}
      <Card className="border-2 border-secondary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
              <X className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Cons</h3>
          </div>
          <ul className="space-y-3">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">{con}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
