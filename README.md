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
- **Next.js 16.0.10** - React framework with App Router
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
│   ├── product/[asin]/          # Dynamic product pages
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
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the site.

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
const nextConfig = {
  // Only use static export for production builds
  ...(process.env.NODE_ENV === "production" && { output: "export" }),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
```

**Key features:**
- ✅ Static export enabled in production (`npm run build`)
- ✅ Dynamic routes work in development (`npm run dev`)
- ✅ TypeScript errors don't block builds
- ✅ Images are unoptimized for static hosting

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
- **Automatic Categorization** - Smart category inference with manual override support
- **Real-time Updates** - Changes in Directus reflect immediately on the website
- **Fallback Mechanism** - Gracefully degrades to local data if Directus is unavailable

### Configuration

Create a `.env.local` file in the project root:

```bash
DIRECTUS_API_URL=https://your-directus-instance.com
DIRECTUS_API_TOKEN=your-api-token-here
NEXT_PUBLIC_ENABLE_DIRECTUS=true
```

### How It Works

1. **Data Fetching**: System fetches products from Directus API
2. **Category Assignment**: Uses manual category field or auto-infers from title
3. **Deduplication**: Merges with MDX reviews (MDX takes priority if same ASIN)
4. **Sorting**: Displays newest products first
5. **Fallback**: Uses local data if Directus is unavailable

### Product Data Architecture

The `lib/products-data.ts` file provides a **hybrid data system**:

**When Directus is DISABLED** (`NEXT_PUBLIC_ENABLE_DIRECTUS=false` or not set):
- Uses `productsDataFallback` array (30+ pre-configured camping products)
- Perfect for development and testing
- No external dependencies

**When Directus is ENABLED** (`NEXT_PUBLIC_ENABLE_DIRECTUS=true`):
- Fetches products from Directus `seed_inputs` table via API
- Automatically transforms Directus data to match Product interface
- Maps categories from your `site.config.ts` categories
- Falls back to local data if API fails

**Key Functions:**
- `getProductsData()` - Main function that returns products (Directus or fallback)
- `getProductByAsin(asin)` - Get single product by Amazon ASIN
- `getProductsByCategory(slug)` - Filter products by category slug
- `getFeaturedProducts(count)` - Get featured products for homepage
- `getAllCategories()` - Get all categories from config

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

### Example: Adding Products via Directus

1. **Set up Directus connection** (see Configuration section above)
2. **Create products in Directus admin panel:**
   - Add ASIN, title, images, features
   - Set category to match your config categories
   - Set status to "fetched"
3. **Products automatically appear on your site** - No code changes needed!

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
- `lib/products-data.ts` - **Smart product catalog with Directus integration**
  - Contains fallback product data (30+ camping products)
  - Automatically fetches products from Directus when enabled
  - Merges Directus seed_inputs with local fallback data
  - Handles category mapping from config
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

