"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

export function GuideMobileRelatedSheet({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur supports-[backdrop-filter]:bg-background/90">
          <SheetTrigger asChild>
            <Button
              type="button"
              size="lg"
              className="h-14 w-full gap-2 rounded-none text-base font-semibold"
            >
              <Package className="h-5 w-5" />
              Recommended gear
            </Button>
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
