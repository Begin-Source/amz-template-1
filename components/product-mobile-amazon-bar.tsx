"use client"

import { ExternalLink } from "lucide-react"

/**
 * Sticky bottom bar (mobile) — single clear affiliate exit without deceptive urgency copy.
 */
export function ProductMobileAmazonBar({
  amazonUrl,
  label = "See price on Amazon",
}: {
  amazonUrl: string | null | undefined
  label?: string
}) {
  if (!amazonUrl?.trim()) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#FF9900] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] lg:hidden">
      <a
        href={amazonUrl}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="flex min-h-14 w-full items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#FF9900]/90"
      >
        {label}
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
      </a>
    </div>
  )
}
