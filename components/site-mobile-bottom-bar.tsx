"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

/** Global bar: all mobile pages except review/guide detail (they have their own) and /reviews. */
export function shouldShowGlobalMobileBar(pathname: string | null): boolean {
  if (!pathname) return false
  if (pathname === "/reviews") return false
  if (/^\/review\/[^/]+$/.test(pathname)) return false
  if (/^\/guides\/[^/]+$/.test(pathname)) return false
  return true
}

/** Bottom padding when the global Amazon-style bar is visible (avoids content hidden under fixed bar). */
export function SiteMobileLayoutPad({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pad = shouldShowGlobalMobileBar(pathname)
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col", pad && "pb-24 lg:pb-0")}>
      {children}
    </div>
  )
}

export function SiteMobileBottomBar() {
  const pathname = usePathname()
  if (!shouldShowGlobalMobileBar(pathname)) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#FF9900] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] lg:hidden">
      <Link
        href="/reviews"
        className="flex min-h-14 w-full items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#FF9900]/90"
      >
        Product Reviews
        <ExternalLink className="h-4 w-4 shrink-0" />
      </Link>
    </div>
  )
}
