import { getAllReviews, getAllGuides } from '@/lib/api'

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'http://localhost:3000'
  const reviews = getAllReviews()
  const guides = getAllGuides()
  
  // Combine and sort by date
  const allContent = [
    ...reviews.map(r => ({
      title: r.frontmatter.title,
      description: r.frontmatter.description,
      url: `${baseUrl}/review/${r.slug}`,
      date: r.frontmatter.updatedDate || r.frontmatter.date,
      category: r.frontmatter.category || 'Reviews',
    })),
    ...guides.map(g => ({
      title: g.frontmatter.title,
      description: g.frontmatter.description,
      url: `${baseUrl}/guides/${g.slug}`,
      date: g.frontmatter.updatedDate || g.frontmatter.date,
      category: g.frontmatter.category || 'Guides',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Wild Nature Journey - Camping &amp; Outdoor Gear Reviews</title>
    <link>${baseUrl}</link>
    <description>Expert reviews and buying guides for camping and outdoor gear. Honest, in-depth analysis to help you make informed decisions.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${allContent.map(item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${item.url}</guid>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

