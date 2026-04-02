import Link from "next/link"
import { siteConfig } from "@/lib/site.config"
import { normalizeGuideCategories } from "@/lib/guide-categories"
import { FooterLinkSection } from "@/components/footer-link-section"

function formatReviewNavLabel(categoryName: string, template: string): string {
  return template.replace(/\{name\}/g, categoryName)
}

export function SiteFooter() {
  // 动态生成分类链接，从 homepage.categories.items 读取
  const categoryItems = siteConfig.homepage?.categories?.items ?? []
  const productCategoryLinks = categoryItems.map((cat) => ({
    name: cat.name,
    href: `/category/${cat.slug}`,
  }))

  const reviewNavTpl =
    (siteConfig.footer as { reviewCategoryNavLabelTemplate?: string }).reviewCategoryNavLabelTemplate ?? "{name} review"

  const reviewCategoryLinks = categoryItems.map((cat) => ({
    name: formatReviewNavLabel(cat.name, reviewNavTpl),
    href: `/reviews?category=${encodeURIComponent(cat.slug)}`,
  }))

  // 动态生成指南链接，从 pages.guides.categories 读取
  const guideCategories = normalizeGuideCategories(siteConfig.pages?.guides?.categories)
  const guideLinks = [
    { name: "All Guides", href: "/guides" },
    ...guideCategories.map(cat => ({
      name: cat.name,
      href: `/guides?category=${cat.slug}`
    }))
  ]

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-x-12 lg:gap-y-8">
          {/* About */}
          <div className="lg:pr-4">
            <h3 className="font-bold text-foreground mb-4">{siteConfig.footer.about.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.footer.about.description}
            </p>
          </div>

          <FooterLinkSection title="Products">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              {productCategoryLinks.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterLinkSection>

          <FooterLinkSection title="Reviews">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reviews"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All Reviews
                </Link>
              </li>
              {reviewCategoryLinks.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterLinkSection>

          <FooterLinkSection title="Guides">
            <ul className="space-y-2">
              {guideLinks.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {guide.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterLinkSection>

          <FooterLinkSection title="Resources">
            <ul className="space-y-2">
              {siteConfig.footer.resources.map((resource) => (
                <li key={resource.href}>
                  <Link
                    href={resource.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
              {siteConfig.footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterLinkSection>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            {siteConfig.footer.affiliateNotice}
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
