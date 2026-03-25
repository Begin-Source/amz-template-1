/**
 * Scheduled publishing: compare frontmatter `date` to the current instant using UTC milliseconds.
 *
 * - `YYYY-MM-DD` → interpreted as **00:00:00.000 UTC** on that calendar day.
 * - ISO strings with time → parsed with `Date.parse` (UTC Z or offset respected).
 * - Unparseable → treated as **not published** (safe default).
 *
 * **Static export (`output: 'export'`, e.g. Cloudflare Pages `/out`)**: There is no Node
 * server at request time, so App Router cannot use `dynamicParams: true` or Pages Router’s
 * `fallback: 'blocking'` on-demand ISR. Only routes returned from `generateStaticParams`
 * at build time become HTML files. After a post’s scheduled `date` passes in UTC, run a
 * **new build/deploy** (scheduled nightly build, webhook, or manual) so new pages appear.
 */

export function parseContentDateToUtcMs(dateStr: string): number {
  const s = String(dateStr).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, d] = s.split("-").map(Number)
    return Date.UTC(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0)
  }
  const t = Date.parse(s)
  return Number.isNaN(t) ? Number.NaN : t
}

/** `nowMs` defaults to `Date.now()` (UTC-based instant). */
export function isPublishedByDate(dateStr: string, nowMs: number = Date.now()): boolean {
  const t = parseContentDateToUtcMs(dateStr)
  if (Number.isNaN(t)) return false
  return t <= nowMs
}

export function filterByPublishDate<T extends { frontmatter: { date: string } }>(
  items: T[],
  nowMs: number = Date.now()
): T[] {
  return items.filter((item) => isPublishedByDate(item.frontmatter.date, nowMs))
}
