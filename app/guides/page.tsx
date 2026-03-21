import type { Metadata } from "next"
import Link from "next/link"
import { getAllGuidesUnified } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { GuidesFilter } from "@/components/guides-filter"
import { siteConfig } from "@/lib/site.config"
import { normalizeGuideCategories } from "@/lib/guide-categories"
import { absoluteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "Camping Guides | Expert Outdoor Advice & Tips",
  description:
    "Discover expert camping guides, how-to articles, and seasonal advice for outdoor adventures. Learn from experienced campers and improve your wilderness skills.",
  keywords: [
    "camping guides",
    "outdoor advice",
    "camping how-to",
    "wilderness skills",
    "camping tips",
    "beginner camping",
    "seasonal camping",
  ],
  openGraph: {
    title: "Camping Guides | Expert Outdoor Advice & Tips",
    description:
      "Discover expert camping guides, how-to articles, and seasonal advice for outdoor adventures. Learn from experienced campers and improve your wilderness skills.",
    type: "website",
    url: absoluteUrl("/guides"),
  },
}

export default async function GuidesPage() {
  const guides = await getAllGuidesUnified()

  // 从配置文件获取页面文案和分类
  const guidesConfig = siteConfig.pages?.guides ?? {
    title: "Guides",
    description: "",
    categories: [],
    cta: {
      title: "",
      description: "",
      primaryButton: {
        text: "Browse Guides",
        href: "/guides",
      },
    },
  }
  const pageTitle = guidesConfig.title
  const pageDescription = guidesConfig.description
  const categories = normalizeGuideCategories(guidesConfig.categories)

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {pageDescription}
          </p>
        </div>

        <GuidesFilter guides={guides} categories={categories} />
      </div>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-primary/5 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {guidesConfig.cta.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {guidesConfig.cta.description}
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href={guidesConfig.cta.primaryButton.href}>
                  {guidesConfig.cta.primaryButton.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
