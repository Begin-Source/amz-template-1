"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ExternalLink, Package } from "lucide-react"

export function GuideMobileRelatedSheet({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#FF9900] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex min-h-14 w-full items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#FF9900]/90"
            >
              View on Amazon
              <ExternalLink className="h-4 w-4 shrink-0" />
            </button>
          </SheetTrigger>
        </div>
        <SheetContent
          side="bottom"
          className="max-h-[88vh] overflow-y-auto rounded-t-xl border-t p-0 pt-2"
        >
          <SheetHeader className="border-b border-border px-4 pb-3 text-left">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-primary" />
              Related Products
            </SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">{children}</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
