import Link from "next/link"
import { siteConfig } from "@/lib/site.config"

export function SiteFooter() {
  // 动态生成分类链接，从 homepage.categories.items 读取
  const categoryLinks = siteConfig.homepage.categories.items.map(cat => ({
    name: cat.name,
    href: `/reviews?category=${cat.slug}`
  }))

  // 动态生成指南链接，从 pages.guides.categories 读取
  const guideLinks = [
    { name: "All Guides", href: "/guides" },
    ...siteConfig.pages.guides.categories.map(cat => ({
      name: cat,
      href: `/guides?category=${encodeURIComponent(cat)}`
    }))
  ]

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-x-16 lg:gap-y-8">
          {/* About */}
          <div className="lg:col-span-1 lg:pr-4">
            <h3 className="font-bold text-foreground mb-4">{siteConfig.footer.about.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.footer.about.description}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product Reviews</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reviews"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All Reviews
                </Link>
              </li>
              {categoryLinks.map((category) => (
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
          </div>

          {/* Guides */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Guides</h4>
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
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
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
          </div>
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
