"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { siteConfig } from "@/lib/site.config"

export function SiteHeader() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  // 动态渲染 Logo
  const renderLogo = () => {
    const { logo } = siteConfig.brand
    const logoType = logo.type as "lucide" | "svg" | "image"

    if (logoType === "lucide" && logo.icon) {
      const IconComponent = (LucideIcons as any)[logo.icon]
      if (IconComponent) {
        return <IconComponent className="h-6 w-6 text-primary-foreground" />
      }
    }

    if (logoType === "svg" && logo.svgPath) {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-primary-foreground"
        >
          <path d={logo.svgPath} />
        </svg>
      )
    }

    if (logoType === "image" && logo.imagePath) {
      return (
        <img
          src={logo.imagePath}
          alt={siteConfig.brand.name}
          className="h-6 w-6"
        />
      )
    }

    // 默认 fallback
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary-foreground"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Logo - Left */}
          <div className="flex-1 flex-shrink-0 lg:flex-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                {renderLogo()}
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-foreground">{siteConfig.brand.name}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
            {siteConfig.navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search & Mobile Menu Toggle - Right */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for gear, reviews, guides..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        )}

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
                  <nav className="flex flex-col gap-4">
                    {siteConfig.navigation.main.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
      </div>
    </header>
  )
}
