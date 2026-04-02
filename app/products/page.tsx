import type { Metadata } from "next"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/site.config"
import { absoluteUrl } from "@/lib/site-url"

const productsPage = siteConfig.pages.products

export const metadata: Metadata = {
  title: productsPage?.title ?? "Products",
  description: productsPage?.description ?? "",
  openGraph: {
    title: productsPage?.title ?? "Products",
    description: productsPage?.description ?? "",
    type: "website",
    url: absoluteUrl("/products"),
  },
}

export default function ProductsPage() {
  const cfg = siteConfig.pages?.products ?? {
    title: "Products",
    description: "",
  }
  const items = siteConfig.homepage?.categories?.items ?? []

  return (
    <main className="flex-1 min-w-0 overflow-x-clip">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              {cfg.title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {cfg.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {items.map((category) => {
              const IconComponent = (LucideIcons as any)[category.icon]
              return (
                <Link key={category.slug} href={`/category/${category.slug}`} className="group">
                  <Card className="h-full border-2 transition-all duration-300 hover:border-primary hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                          {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                          {category.name}
                        </h2>
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                        <div className="flex items-center text-sm font-medium text-primary transition-all group-hover:gap-2">
                          View category <ArrowRight className="ml-1 h-4 w-4 transition-all group-hover:ml-0" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
