"use client"

import { ExternalLink } from "lucide-react"

export function ReviewMobileAmazonBar({ amazonUrl }: { amazonUrl: string | null | undefined }) {
  if (!amazonUrl?.trim()) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-border bg-[#FF9900] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
      <a
        href={amazonUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="flex min-h-14 w-full items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#FF9900]/90"
      >
        View on Amazon
        <ExternalLink className="h-4 w-4 shrink-0" />
      </a>
    </div>
  )
}
