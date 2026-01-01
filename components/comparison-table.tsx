import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Check } from "lucide-react"

interface Product {
  rank: number
  name: string
  image: string
  price: string
  weight?: string
  capacity?: string
  pros: string[]
  cons: string[]
  amazonUrl: string
}

interface ComparisonTableProps {
  products: Product[]
  title?: string
}

export function ComparisonTable({ products, title = "Top 3 Recommended Products" }: ComparisonTableProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold text-foreground">Rank</th>
                <th className="text-left p-4 font-semibold text-foreground">Product</th>
                <th className="text-left p-4 font-semibold text-foreground">Key Features</th>
                <th className="text-center p-4 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {product.rank}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} - Product Comparison Image`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-semibold text-foreground">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2 max-w-xs">
                      <div className="text-sm">
                        {product.pros.slice(0, 2).map((pro, i) => (
                          <div key={i} className="flex items-start gap-2 mb-1">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      asChild
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap"
                    >
                      <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer nofollow">
                        Check Price
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-6 mt-6">
          {products.map((product, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {product.rank}
                  </div>
                </div>

                <img
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} - Product Comparison Image`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h3 className="font-bold text-lg mb-2">{product.name}</h3>

                <div className="mb-4">
                  {product.pros.slice(0, 2).map((pro, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{pro}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  size="lg"
                >
                  <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer nofollow">
                    Check Price on Amazon
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
