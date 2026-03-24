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
    <main className="flex-1 min-w-0 overflow-x-clip">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {pageDescription}
            </p>
          </div>

          <GuidesFilter guides={guides} categories={categories} />
        </div>
      </div>

      {/* CTA Section — same max width as guide article layout */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl rounded-lg bg-primary/5 p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">{guidesConfig.cta.title}</h2>
              <p className="mb-8 text-lg text-muted-foreground">{guidesConfig.cta.description}</p>
              <div className="flex justify-center">
                <Button asChild size="lg">
                  <Link href={guidesConfig.cta.primaryButton.href}>
                    {guidesConfig.cta.primaryButton.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
