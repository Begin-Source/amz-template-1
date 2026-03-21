# Operations Runbook

## Flow Trigger Forbidden (`[FORBIDDEN] You don't have permission to access this`)

### Typical symptom
- Directus list-page flow buttons fail with `FORBIDDEN` (for example in `employees`, `sites`, `seed_products`).
- n8n webhook endpoints still work when called directly.

### Fast checks
1. Confirm the current login user is the intended admin account.
2. Confirm the account has role `Administrator`.
3. Confirm policy assignment includes a valid admin policy (for example `Admin Recovery`).
4. In the admin policy, ensure:
   - `App Access` is enabled
   - `Admin Access` is enabled
   - `IP Access` is empty (no restrictive CIDR)

### Recovery steps (proven)
1. In Directus, create or reuse an emergency admin policy (example: `Admin Recovery`).
2. Assign the policy to both:
   - the admin user directly (`Assigned To -> Users`)
   - the `Administrator` role (`Assigned To -> Roles`)
3. Save all changes.
4. Restart the Directus service/container (Coolify: **Pull latest image and restart** worked in production).
5. Sign out and sign back in, then retest flow buttons.

### Verification
- `Employees | Test API Credentials` should trigger and update:
  - `api_check_status`
  - `api_check_at`
- `Seed Products | Fetch ASIN by Site Categories (Bulk)` should trigger n8n workflow:
  - `Seed Products | Fetch ASIN (PA-API)`

### Notes
- Duplicate `Administrator` policies can cause confusion. Keep one canonical admin policy name and remove ambiguity.
- If direct n8n webhook calls succeed but Directus button triggers fail, prioritize Directus policy/session/service checks.

## Seed Keywords Cascading Selects (`site_id -> site_category_id -> product`)

### Goal
- In `seed_keywords` create form, make dropdowns cascade by selected site/category.
- Prevent mismatched data at save-time.

### Data model requirements
- `seed_keywords.product` must relate to `products` (not `seed_inputs`).
- `products.site_category_id` must exist and relate to `site_categories`.
- Existing `products` rows should be backfilled with `site_category_id` (by `site_id + category name`).

### Field interface filters (working config)
- `seed_keywords.site_id`
  - No filter.
  - Display template:
    - `{{site_name}} ({{id}}) · {{preview_url}} · {{github_repo}}`

- `seed_keywords.site_category_id`
  - Display template:
    - `{{name}} · Site {{site_id}}`
  - Filter:
    - `site_id = {{site_id}}`

- `seed_keywords.product`
  - Display template:
    - `#{{id}} · {{asin}} · {{title}} · {{category}} · Site {{site_id}}`
  - Filter:
    - `site_id = {{site_id}}`
    - `site_category_id = {{site_category_id}}`

### UI setup path (Directus)
1. `Settings -> Data Model -> seed_keywords`.
2. Open field `site_id`:
   - Interface: `Many to One`
   - Filter: empty
3. Open field `site_category_id`:
   - Interface: `Many to One`
   - Filter: `site_id = {{site_id}}`
4. Open field `product`:
   - Interface: `Many to One`
   - Filter:
     - `site_id = {{site_id}}`
     - `site_category_id = {{site_category_id}}`
5. Save, then hard refresh (`Ctrl+F5`).

### Save-time consistency guard (Flow)
- Flow name: `[Seed Keywords] Enforce Create Consistency`
- Purpose:
  - Validate selected `product` belongs to selected `site_id` and `site_category_id`.
  - Normalize payload fields (`keyword_norm`, `category`, `source`, `status`).

### Temporary fallback mode (if dropdown fails in production)
- Keep `site_category_id` filtered by `site_id`.
- Temporarily set `product` filter to only:
  - `site_id = {{site_id}}`
- Let Flow `[Seed Keywords] Enforce Create Consistency` block mismatched category on save.
- After Directus UI is stable, restore full product filter (`site_id + site_category_id`).

### Troubleshooting
- Symptom: category/product dropdown opens but shows no records.
  1. Hard refresh browser (`Ctrl+F5`).
  2. Re-open create form (avoid stale form state).
  3. Verify source data exists:
     - `site_categories` for selected `site_id`
     - `products` with both `site_id` and `site_category_id`
  4. In field editor, remove accidental fixed filter chips like `ID Equals --`.

- About red underlines in filter input:
  - In Directus `11.5.1`, UI may show red underline for dynamic tokens even when runtime works.
  - Prefer template-token style (`{{site_id}}`, `{{site_category_id}}`) in interface filters.

## Site URL (`NEXT_PUBLIC_SITE_URL`) — Cloudflare Pages / multi-site

### Purpose
- Canonical URLs, `openGraph.url`, RSS (`/feed.xml`), `sitemap.xml`, and JSON-LD use **`getSiteUrl()`** in `lib/site-url.ts`.
- Resolution order: **`NEXT_PUBLIC_SITE_URL`** → **`CF_PAGES_URL`** (injected by Cloudflare Pages on each build) → `lib/site.config.ts` → `seo.siteUrl` → placeholder.

### Cloudflare Pages (no env required for `*.pages.dev`)
- If you **do not** set `NEXT_PUBLIC_SITE_URL`, builds on Cloudflare Pages still get the correct deployment origin via **`CF_PAGES_URL`** (e.g. `https://<branch>.<project>.pages.dev`), so `og:url` and canonicals match that URL after deploy.
- **Custom domain:** set **`NEXT_PUBLIC_SITE_URL`** to your primary public origin (e.g. `https://www.yoursite.com`, no trailing `/`). `CF_PAGES_URL` may still point at `*.pages.dev`; the explicit variable wins so SEO matches the domain you want indexed.

### Per deployment
1. Optional but recommended for a fixed domain: in Cloudflare Pages → **Settings** → **Environment variables**, set **`NEXT_PUBLIC_SITE_URL`** to the public origin visitors should use.
2. **Redeploy** after changing any build-time URL variable (Next embeds `NEXT_PUBLIC_*` at build time). Saving env vars alone does not change HTML already deployed until a new build runs (use **Retry deployment** or push a commit).
3. After binding or changing a custom domain, **update `NEXT_PUBLIC_SITE_URL`** to that primary domain and redeploy.

### Verify
- View page source: `<link rel="canonical">`, `og:url`, and JSON-LD `@id` / `url` should match the intended origin (`NEXT_PUBLIC_SITE_URL` if set, else the deployment URL from `CF_PAGES_URL` on Pages).
- Open `/sitemap.xml`: every `<loc>` should use that origin.

See also: `.env.example` in the repo root.

## Guide frontmatter: `related_product_category` (sidebar products)

- Optional field on MDX guides under `content/guides/`. Build reads **static files only** (no Directus API at build time unless you already use it for product sync).
- **Value:** a category **slug** from `siteConfig.homepage.categories` (e.g. `product-category-1`), the **display name** in that config, or **exact** `product.category` string from catalog / Directus export (e.g. `Camp Essentials`).
- `components/guides-sidebar.tsx` loads up to **3** products via `getProductsForRelatedCategory()` in `lib/products-data.ts`. If the field is missing or no products match, the sidebar falls back to **same `category` MDX reviews** (same behavior as before).
- **View all** appears when the value resolves to a `categoryMap` slug; raw `product.category` strings that are not in `siteConfig` may show products without a category link.
