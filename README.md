# Affiliate Marketing Website Template

A modern, **fully configuration-driven** affiliate marketing website built with Next.js 16. Transform this template into ANY niche (cameras, camping, tech, fitness, etc.) by simply editing one configuration file - **no code changes required**.

## 🎯 Project Philosophy: Complete Customization Through Configuration

This template is designed with a **configuration-first architecture**. Every aspect of the website - from branding and colors to content and navigation - is controlled through a single configuration file: `lib/site.config.ts`.

### Why Configuration-Driven?

**Traditional approach:** Edit multiple component files, search for hardcoded text, modify CSS variables
**Our approach:** Edit ONE file (`lib/site.config.ts`), and the entire site updates automatically

### What Can You Customize?

✅ **Brand Identity** - Site name, tagline, logo (Lucide icon, SVG, or image)
✅ **Color Theme** - Complete light/dark mode color schemes (OKLCH color space)
✅ **Typography** - Font families for the entire site
✅ **SEO Settings** - Meta titles, descriptions, keywords, social media
✅ **Navigation** - Header menu items and links
✅ **Homepage Content** - Hero section, category cards, featured products, CTA
✅ **Page Descriptions** - Reviews page, guides page content
✅ **Footer Content** - About section, link groups, copyright, affiliate notice
✅ **Categories** - Define your product categories with names, descriptions, icons

### Key Features

- **🎨 100% Configuration-Driven** - Zero code changes needed for customization
- **🔄 Theme Flexibility** - Switch from camping → cameras → tech → any niche instantly
- **🗄️ Directus CMS Integration** - Optional dynamic product management
- **🔄 Hybrid Data Architecture** - Combines MDX reviews with Directus seed_inputs (产品数据)
- **📱 Fully Responsive** - Mobile-first design with Tailwind CSS 4
- **🚀 Static Export** - Deploy to any static hosting (Cloudflare, Netlify, Vercel)
- **🔍 SEO Optimized** - Structured data, sitemaps, and meta tags
- **💰 Amazon Associates Ready** - Built-in affiliate link management

## 🛠️ Technology Stack

### Core Framework
- **Next.js 16.2.1** - React framework with App Router (see `package.json` for exact version; production build uses Turbopack by default)
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development (strict mode)

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework (CSS-first configuration)
- **shadcn/ui** - Component library built on Radix UI primitives
- **Lucide React** - Icon library

### Content & SEO
- **MDX** - Markdown with JSX for rich content
- **next-mdx-remote** - Server-side MDX rendering
- **JSON-LD** - Structured data for search engines
- **Directus** - Headless CMS for dynamic product management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📁 Project Structure

```
camping-website-template/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage (reads from config)
│   ├── product/[asin]/[slug]/   # Dynamic product pages (legacy `/product/[asin]` redirects)
│   ├── review/[slug]/           # MDX review articles
│   ├── category/[category]/     # Category listing pages
│   ├── guides/                  # Buying guides
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── site-header.tsx          # Header (reads from config)
│   ├── site-footer.tsx          # Footer (reads from config)
│   └── ...                      # Other components
├── lib/                         # Core configuration & utilities
│   ├── site.config.ts           # ⭐ CENTRAL CONFIGURATION FILE
│   ├── products-data.ts         # Product catalog with Directus integration
│   ├── directus-client.ts       # Directus API client
│   ├── types/directus.ts        # Directus type definitions
│   ├── api.ts                   # Data fetching (MDX + Directus)
│   ├── theme-generator.ts       # Dynamic theme generation
│   └── utils.ts                 # Helper functions
├── content/                     # MDX content files
│   ├── reviews/                 # Review articles (30+ files)
│   └── guides/                  # Buying guides (10+ files)
├── public/                      # Static assets
│   └── images/                  # Product images
└── next.config.mjs              # Next.js configuration
```

## ⚙️ Configuration System

### Central Configuration File: `lib/site.config.ts`

**This is the most important file in the project.** All site customization happens here - no need to edit individual components.

#### Configuration Sections:

1. **Brand Settings** (`brand`)
   - Site name, tagline, description
   - Logo configuration (Lucide icon, SVG, or image)

2. **Color Theme** (`theme.colors`)
   - Light and dark mode colors
   - Uses OKLCH color space for better color accuracy
   - Automatically generates CSS variables

3. **Typography** (`fonts`)
   - Font families for sans and mono

4. **SEO Settings** (`seo`)
   - Meta titles, descriptions, keywords
   - Site URL, author, social media handles

5. **Navigation Menu** (`navigation.main`)
   - Header navigation items
   - Labels and links

6. **Homepage Content** (`homepage`)
   - Hero section (title, subtitle, search placeholder)
   - Category cards (name, description, icon, slug)
   - Featured products section
   - CTA/Newsletter section

7. **Page Content** (`pages`)
   - Reviews page title and description
   - Guides page title, description, and categories
   - Supports dynamic placeholders like `{count}`

8. **Footer Content** (`footer`)
   - About section
   - Resources and legal links
   - Copyright and affiliate notice


### Example Configuration:

```typescript
// lib/site.config.ts
export const siteConfig = {
  brand: {
    name: "Camera Lens Pro",
    tagline: "Find Your Perfect Camera & Lens",
    description: "Expert reviews and honest recommendations...",
    logo: {
      type: "lucide",
      icon: "Camera",
    }
  },

  theme: {
    colors: {
      light: {
        primary: "oklch(0.30 0.02 240)",
        accent: "oklch(0.60 0.20 25)",
        // ... more colors
      }
    }
  },

  homepage: {
    hero: {
      title: "Find Your Perfect Camera & Lens",
      subtitle: "Expert reviews and honest recommendations...",
    },
    categories: {
      items: [
        {
          name: "DSLR Cameras",
          slug: "dslr-cameras",
          description: "Professional DSLR cameras",
          icon: "Camera",
        },
        // ... more categories
      ]
    }
  },

  // ... more configuration
}
```

### How It Works:

1. **Edit `lib/site.config.ts`** - Change any configuration value
2. **Theme Generator** - `lib/theme-generator.ts` converts config to CSS variables
3. **Components Read Config** - All components import and use `siteConfig`
4. **Automatic Updates** - Changes apply across the entire site

### Quick Customization Guide:

```bash
# 1. Change site branding
# Edit: siteConfig.brand.name, tagline, description

# 2. Change colors
# Edit: siteConfig.theme.colors.light and .dark

# 3. Update navigation
# Edit: siteConfig.navigation.main

# 4. Customize homepage
# Edit: siteConfig.homepage.hero, categories, featuredProducts, cta

# 5. Update page descriptions
# Edit: siteConfig.pages.reviews, guides
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (this repo ships `package-lock.json`; use `npm install`, not a second lockfile)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The dev server binds to `127.0.0.1:3000` (see `package.json` → `npm run dev`). On **Windows**, if you see `EACCES` / permission denied on a port, that port may be in an excluded range—use another port, e.g. `npx next dev -H 127.0.0.1 -p 3001`.

### First Steps: Customize Your Site

1. **Edit the configuration file:**
   ```bash
   # Open lib/site.config.ts in your editor
   ```

2. **Change basic branding:**
   ```typescript
   brand: {
     name: "Your Site Name",
     tagline: "Your Tagline",
     description: "Your description",
   }
   ```

3. **Update categories for your niche:**
   ```typescript
   homepage: {
     categories: {
       items: [
         {
           name: "Your Category 1",
           slug: "category-1",
           description: "Description here",
           icon: "Camera", // Any Lucide icon
         },
         // Add more categories
       ]
     }
   }
   ```

4. **Save and refresh** - Changes apply immediately in dev mode!

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (static export)
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📦 Build & Deployment

The project is configured for **conditional static export**:

```javascript
// next.config.mjs
const isStaticExport = process.env.NODE_ENV === "production"

const nextConfig = {
  ...(isStaticExport && { output: "export" }),
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}
```

**Key features:**
- ✅ Static export enabled in production (`npm run build`)
- ✅ Dynamic routes work in development (`npm run dev`)
- ✅ TypeScript is type-checked on production builds (`ignoreBuildErrors: false`)
- ✅ Images are unoptimized for static hosting

**Product detail URLs (`/product/[asin]/[slug]`):** Canonical paths use **`lib/product-page-url.ts`**: the `slug` matches **`product.slug`** when set (same as `/review/[slug]` for MDX-merged rows); otherwise it is derived from the product title. At build time, static HTML is generated for every pair returned by `getAllProducts()` in `lib/products-data.ts`. That list **merges** the product catalog (`getProductsData()`—Directus or `productsDataFallback`) with **Amazon ASINs found in review MDX frontmatter** (`content/reviews/*.mdx`). If an ASIN appears only in a review and not in the catalog, a lightweight `Product` is still built from that review so the product page does not 404 after deploy. The catalog row wins when the same ASIN exists in both. **`/product/[asin]`** (no slug) still resolves at build time and **redirects** to the canonical URL. **Category listing pages** (`/category/[slug]`) use a **narrower** rule: only ASINs from reviews in that category—see **Directus → How It Works** below.

**Cloudflare Pages / `npm ci`:** Tools required at build time (Tailwind/PostCSS, `typescript`, `@types/*`, `tw-animate-css`) are under `dependencies` so installs that run with `NODE_ENV=production` still receive everything `next build` needs.

**Cloudflare Pages + GitHub (no Directus required in CI):** If this repo is **connected to Cloudflare Pages**, a push to your production branch triggers a **new build automatically**—you do not need a separate step to “pull from Directus” for that to happen. The build runs in Cloudflare’s environment and only sees **what you commit** (MDX, `lib/site.config.ts`, etc.) **plus** any **Environment variables** you add in the Cloudflare project. If you **do not** set `DIRECTUS_API_URL` / `DIRECTUS_API_TOKEN` / site id there, the template **does not** fetch the catalog at build time; it uses **`productsDataFallback`** and **review MDX** as documented below—enough for a full static site. Add Directus vars in Cloudflare **only when** you want the live catalog baked into each deploy.

### Build Output
```bash
npm run build
```

Generates static files in the `out/` directory, ready for deployment to:
- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Site URL (SEO canonical & sitemap)

Set **`NEXT_PUBLIC_SITE_URL`** to your public origin (no trailing slash) when you want an explicit domain (especially with a **custom domain** on Cloudflare Pages). On Cloudflare Pages, **`CF_PAGES_URL`** is used automatically when `NEXT_PUBLIC_SITE_URL` is unset, so `*.pages.dev` builds still get correct canonicals and `og:url`. Otherwise the app falls back to `lib/site.config.ts` → `seo.siteUrl`. Copy `.env.example` to `.env.local` for local development. After changing domains, update the variable (if you use it) and rebuild.

## 🗄️ Directus CMS Integration

### Overview

This template integrates with **Directus**, a powerful open-source headless CMS, enabling dynamic product management without code changes.

### Key Benefits

- **Dynamic Product Management** - Add/edit/delete products via Directus admin interface (seed_inputs)
- **Hybrid Data Architecture** - Seamlessly combines MDX reviews with Directus seed_inputs
- **Shared category taxonomy** - `site.config.ts`, review MDX frontmatter, and Directus `category` resolve through `lib/category-taxonomy.ts` (same slugs/names across the site)
- **CMS-driven data** - After you deploy or rebuild, catalog and (if enabled) Directus-backed reviews flow into the static site
- **Fallback Mechanism** - Gracefully degrades to local data if Directus is unavailable

### Configuration

Create a `.env.local` file in the project root (see also `.env.example` for `NEXT_PUBLIC_SITE_URL`).

**Product catalog (`getProductsData()` → Directus `seed_inputs`):** requires both a token and which site to query:

```bash
DIRECTUS_API_URL=https://your-directus-instance.com
DIRECTUS_API_TOKEN=your-api-token-here
# One of the following (same value your Directus rows use for site scoping):
NEXT_PUBLIC_SITE_ID=your-site-uuid
# or: DIRECTUS_SITE_ID=...  or  SITE_ID=...
```

If `DIRECTUS_API_TOKEN` or the site id is missing, the app uses **`productsDataFallback`** in `lib/products-data.ts`. On **Cloudflare Pages**, leaving these unset is normal when your workflow is **Git → auto rebuild** and product/review data is already in the repo (or you only need MDX-backed pages).

**Review / MDX content from Directus (optional):** when set, Directus is included as an additional source after local files (see `lib/content-source.ts`):

```bash
NEXT_PUBLIC_ENABLE_DIRECTUS=true
```

This flag does **not** gate the product catalog fetch; catalog uses the token + site id above.

### How It Works

1. **Catalog fetch**: `getProductsData()` loads products from Directus when `DIRECTUS_API_TOKEN` and a site id (`NEXT_PUBLIC_SITE_ID`, `DIRECTUS_SITE_ID`, or `SITE_ID`) are set; otherwise it uses `productsDataFallback` in the repo.
2. **Category pages (`/category/[slug]`)**: **Which ASINs appear is driven by review MDX**—only ASINs from reviews whose `category` matches that slug (see `lib/category-review-gate.ts`). Order matches the Reviews list. For **each** such ASIN, product **fields** prefer the **catalog**; if there is no catalog row, the row is **built from that review’s frontmatter**. If a category has **no** reviews with a valid ASIN, the page is **empty** even if the catalog has products tagged for that category.
3. **Product detail + static export**: `getAllProducts()` merges the catalog with **all ASINs from review MDX** (site-wide for `/product/[asin]/[slug]` and sitemap). **Catalog wins** on duplicate ASINs—broader than category pages, which only list review ASINs per slug.
4. **Fallback**: If Directus fails or returns no rows, the template falls back to `productsDataFallback`.

### Product Data Architecture

The `lib/products-data.ts` file provides a **hybrid data system**:

**Catalog source (`getProductsData()`):**
- If **`DIRECTUS_API_TOKEN`** and a **site id** env var are set at build/runtime, products are fetched from Directus (see `directus-client` / `types/directus`).
- Otherwise the repo uses **`productsDataFallback`** (sample products in code)—good for local dev without CMS.

**Merged list (`getAllProducts()`):**
- Starts from `getProductsData()`, then adds any ASIN **only present in `content/reviews/*.mdx`** frontmatter (so static export builds `/product/[asin]/[slug]` for reviews that don’t have a catalog row yet).

**Key Functions:**
- `getProductsData()` - Catalog only (Directus or `productsDataFallback`)
- `getAllProducts()` - Catalog **plus** review MDX ASINs (used for `/product/[asin]/[slug]` `generateStaticParams` and sitemap)
- `getProductByAsin(asin)` - Resolves from `getAllProducts()`
- `getProductsByCategory(slug)` - **Membership** = review ASINs in that category; **per-ASIN data** = catalog first, else MDX frontmatter
- `getCategoryProductCounts()` - Per-slug counts for `/products` (unique ASINs from reviews per category; matches category listing scope, not raw catalog counts)
- `getFeaturedProducts(count)` - Uses **catalog** only (`getProductsData()`)
- `getAllCategories()` - Slugs/names/icons from `site.config.ts` via `lib/category-taxonomy.ts` (`categoryMap`)
- `buildCategoryCoverImagesMap(reviews, products, slugs)` - Sync helper: cover URLs for category grids (see below)
- `getCategoryCoverImagesUnified(slugs)` - Async: loads `getAllReviewsUnified()` + `getProductsData()` then calls `buildCategoryCoverImagesMap` (used on **`/products`**)

**Category index cards (homepage + `/products`):**

- **`components/category-index-card.tsx`** renders each category.
- **Cover image priority** (aligned with homepage **Featured** reviews): (1) first **review** in that category with **`asin`** + **`frontmatter.image`** (same idea as the Featured strip); (2) catalog product with **`featured_home`** / **`featuredHome`** + **`imageUrl`** in that category; (3) any catalog product in that category with **`imageUrl`**. Homepage uses **`buildCategoryCoverImagesMap(allReviews, products, slugs)`** after one parallel fetch of reviews + catalog; **`/products`** uses **`getCategoryCoverImagesUnified(slugs)`**.
- **Override:** optional **`coverImage`** on each item in `site.config.ts` → `homepage.categories.items` (the template exports `HomepageCategoryItem` for reference; forks without that export still work). If set, it replaces the resolved cover for that category.
- **Local / no Directus:** `productsDataFallback` still supplies catalog images when reviews lack images for a category.

### Directus Products Table Schema

Your Directus `seed_inputs` table should have these fields:

**Required fields:**
- `id` (integer, primary key)
- `asin` (string) - Amazon ASIN identifier
- `title` (string) - Product title
- `images` (JSON) - Product images array
- `features` (array) - Product features list
- `status` (string) - Product status (e.g., "fetched")
- `date_created` (timestamp)
- `raw_paapi` (JSON) - Amazon PA-API response data

**Optional fields:**
- `category` (string) - Manual category override (recommended)
  - If not provided, system auto-infers from title
  - Should match category names in `site.config.ts`
- `featured_home` (string) - Set to **`yes`** to mark a product as featured in the catalog (`Product.featuredHome`). Used by **`getFeaturedProducts`** and as the **second** source for category card covers when no review image exists (**`buildCategoryCoverImagesMap`**).
- `featured_rank` (number) - Lower sorts first when multiple featured products exist in the same category or when ordering featured homepage picks.

### Example: Adding Products via Directus

1. **Set up Directus connection** (see Configuration section above)
2. **Create products in Directus admin panel:**
   - Add ASIN, title, images, features
   - Set category to match your config categories
   - Set status to "fetched"
   - Optionally set **`featured_home`** = `yes` and **`featured_rank`** so this row can drive the **homepage / `/products` category card image** for that category (and homepage featured picks when not using review-based featured).
3. **Catalog rows power product detail pages** (merged with review ASINs as documented above). **Category listing pages** still only show ASINs that appear in **reviews** for that category—adding a product only in Directus does not put it on `/category/[slug]` until a review references that ASIN under the matching `category`.

### Example: Adding Products Manually

Edit `lib/products-data.ts` and add to `productsDataFallback` array:

```typescript
{
  asin: "B0XXXXXX",
  title: "Your Product Name",
  shortTitle: "Short Name",
  brand: "Brand Name",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
  ],
  amazonUrl: "https://www.amazon.com/dp/B0XXXXXX?tag=your-tag-20",
  imageUrl: "https://m.media-amazon.com/images/I/image.jpg",
  rating: 4.5,
  category: "Your Category Name", // Must match category name in site.config.ts
  summary: "Brief product description",
  slug: "product-slug",
  featuredHome: true, // optional: category card cover + getFeaturedProducts
  featuredRank: 1,
}
```

### Directus + n8n Operations (Categories Push)

For category synchronization, we now support dedicated manual buttons in Directus that trigger n8n workflows.

**Buttons added**
- `[站点产品分类] 推送到 GitHub` (collection: `site_categories`)
  - Flow ID: `407dcb55-c1cf-44d5-bc31-8c39cf1f2f13`
  - Purpose: Push selected product categories to GitHub (via n8n `site-categories-v1`).
- `[站点指南分类] 推送到 GitHub` (collection: `site_guide_categories`)
  - Flow ID: `5a6afc3a-ca40-4cc9-8dc8-326eba72c2e6`
  - Purpose: Push selected guide categories to GitHub (reuses guide-categories sync flow).

**Sites operations menu integration**
- `Sites Operations Menu (item)` and `Sites Operations Menu (collection)` both include:
  - Action: `推送产品分类到 GitHub`
  - Value: `categories_push`

**Stability notes**
- Category push request body is serialized with `JSON.stringify(...)` before calling n8n webhook.
- Selected row IDs are normalized and site IDs are deduplicated before triggering downstream sync.

**How to use**
1. Open `site_categories` or `site_guide_categories` in Directus.
2. Select one or multiple rows.
3. Click the push button and confirm.
4. Check n8n execution logs and GitHub commit results.

## 📝 Content Management

### What's Configurable vs What's Content

**Configurable (via `lib/site.config.ts`):**
- ✅ Site name, tagline, description
- ✅ Navigation menu items
- ✅ Homepage hero section
- ✅ Category cards and descriptions
- ✅ Page titles and descriptions
- ✅ Footer content and links
- ✅ SEO metadata

**Content (via files):**
- 📄 Product data (`lib/products-data.ts` or Directus)
- 📄 Review articles (`content/reviews/*.mdx`)
- 📄 Guide articles (`content/guides/*.mdx`)

### Example: Switching from Camping to Camera Niche

**Current state:** Template comes with camping gear example
**Your niche:** Camera equipment

**Steps:**
1. Edit `lib/site.config.ts` - Change all text to camera-related
2. Update categories to: DSLR Cameras, Mirrorless, Lenses, Accessories
3. Replace product data in `lib/products-data.ts` with camera products
4. Write new MDX reviews for cameras (or keep existing structure)

**Result:** Entire site transforms to camera niche without touching component code!

## 🎨 Design System

### Tailwind CSS 4 Configuration
- CSS-first configuration in `app/globals.css`
- Custom color palette with CSS variables
- Dark mode support via `class` strategy
- Responsive breakpoints: sm, md, lg, xl, 2xl

### Component Library
- Built with **shadcn/ui** pattern
- Radix UI primitives for accessibility
- Customizable via `components.json`
- Components in `components/ui/`

## 🔗 Amazon Associates Integration

### Affiliate Links
All Amazon links include:
- Your Amazon Associates tracking ID
- `rel="nofollow sponsored"` attributes
- `target="_blank"` for external navigation

### Compliance
- FTC-compliant disclosure on all pages
- Clear affiliate relationship statements
- Proper link attribution

## 📊 SEO Features

- **Metadata**: Dynamic title, description, keywords for each page
- **Structured Data**: JSON-LD for products, reviews, breadcrumbs
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Image Optimization**: Alt text, lazy loading
- **Performance**: Static generation, optimized assets

## 🔧 Configuration Files

### Primary Configuration
- **`lib/site.config.ts`** - ⭐ **Main configuration file** - Edit this to customize your site
  - Brand settings (name, logo, tagline)
  - Color theme (light/dark mode)
  - SEO metadata
  - Navigation menu
  - Homepage content
  - Page descriptions
  - Footer content

### Technical Configuration
- `next.config.mjs` - Next.js configuration (static export)
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration (strict mode)
- `postcss.config.mjs` - PostCSS with Tailwind CSS 4
- `components.json` - shadcn/ui configuration

### Data Files
- `lib/products-data.ts` - **Product catalog + merge helpers** (with `lib/category-taxonomy.ts` and `lib/category-review-gate.ts`)
  - Fallback catalog in repo; optional Directus `seed_inputs` when token + site id are set
  - `getAllProducts()` merges catalog with ASINs from `content/reviews/*.mdx` for `/product/[asin]/[slug]`
  - Category **listings** use **review ASINs per slug**; catalog enriches rows when present
- `lib/product-page-url.ts` - Canonical product paths; **`slug`** aligns with **`product.slug`** / review when present
- `lib/category-taxonomy.ts` / `lib/category-review-gate.ts` - Slugs/names from `site.config.ts`; which ASINs appear on `/category/[slug]` follows reviews
- `lib/theme-generator.ts` - Converts config colors to CSS variables (auto-generated)

## 🎯 Customization Workflow

1. **Edit `lib/site.config.ts`** for all branding, content, and styling
2. **Edit `lib/products-data.ts`** to add/modify products
3. **Add MDX files** in `content/` for reviews and guides
4. **Deploy** - Changes automatically apply across the entire site

## 🌟 Quick Start Summary

**To customize this template:**

1. Edit `lib/site.config.ts` - Change branding, colors, content
2. Edit `lib/products-data.ts` - Add your products
3. Add MDX files in `content/` - Create reviews and guides
4. Run `npm run build` - Generate static site
5. Deploy to Cloudflare Pages, Netlify, or Vercel

**That's it!** No need to edit individual component files.

## 🤝 Contributing

This is a template project. Feel free to:
- Customize the design and branding
- Add more products and categories
- Create additional review articles
- Modify the component library
- Enhance SEO and performance

## 📄 License

This project is open source and available for personal and commercial use.

## 📞 Support

For questions or issues with this template, please refer to the official documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

Built with ❤️ for affiliate marketers and content creators

