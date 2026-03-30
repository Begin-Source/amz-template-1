import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package } from "lucide-react"
import {
  getGuideRelatedProductsData,
  type GuideRelatedProductsData,
} from "@/lib/guide-related-products"
import { GuideRelatedProductsList } from "@/components/guide-related-products-list"

interface GuidesSidebarProps {
  category: string
  currentSlug: string
  relatedProductCategory?: string
  /** When passed from the page, avoids duplicate async work (same data as mobile drawer). */
  relatedData?: GuideRelatedProductsData
  /** Hide the Related Products card below `lg` when the mobile bottom sheet shows the same list. */
  hideRelatedProductsOnMobile?: boolean
}

export async function GuidesSidebar({
  category,
  currentSlug: _currentSlug,
  relatedProductCategory,
  relatedData: preloaded,
  hideRelatedProductsOnMobile = false,
}: GuidesSidebarProps) {
  const relatedData =
    preloaded ?? (await getGuideRelatedProductsData(category, relatedProductCategory))

  const showRelatedProducts = relatedData.mode !== "none"

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {showRelatedProducts && (
        <Card
          className={
            hideRelatedProductsOnMobile ? "hidden lg:block" : undefined
          }
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-primary" />
              Related Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GuideRelatedProductsList data={relatedData} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/guides">All Guides</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/reviews">Product Reviews</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
