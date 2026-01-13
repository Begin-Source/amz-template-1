import { getAllReviews, getAllGuides } from "@/lib/api"
import { SearchResults } from "@/components/search-results"

export default async function SearchPage() {
  const allReviews = getAllReviews()
  const allGuides = getAllGuides()

  return <SearchResults allReviews={allReviews} allGuides={allGuides} />
}
