// lib/site.config.ts
// 网站集中配置文件 - AI 可以通过修改这个文件来自定义整个网站
//
// 使用说明：
// 1. 修改此文件中的任何配置项
// 2. 配置会自动应用到整个网站
// 3. 支持的配置包括：品牌、颜色、字体、SEO、导航、首页内容、页脚等

export const siteConfig = {
  // ==================== 品牌配置 ====================
  // 网站的基本品牌信息
  brand: {
    // 网站名称 - 会显示在 header、footer、SEO 标题等位置
    name: "Camera Lens Pro",

    // 网站标语 - 简短的品牌口号
    tagline: "Find Your Perfect Camera & Lens",

    // 网站描述 - 用于 SEO 和页脚简介
    description: "Expert reviews and honest recommendations for digital cameras, lenses, and photography equipment.",

    // Logo 配置
    logo: {
      // Logo 类型：
      // - "lucide": 使用 lucide-react 图标库中的图标
      // - "svg": 使用自定义 SVG 代码
      // - "image": 使用图片文件
      type: "lucide" as const,

      // 当 type 为 "lucide" 时，指定图标名称
      // 可用图标：https://lucide.dev/icons/
      icon: "Camera",

      // 当 type 为 "svg" 时，提供 SVG 路径数据
      svgPath: "",

      // 当 type 为 "image" 时，提供图片路径
      imagePath: "",
    }
  },

  // ==================== 颜色主题配置 ====================
  // 网站的配色方案 - 直接修改这些颜色值即可改变整个网站的配色
  // 颜色格式：OKLCH 色彩空间 - oklch(亮度 色度 色相)
  // 亮度(0-1): 0=黑 1=白 | 色度(0-0.4): 饱和度 | 色相(0-360): 颜色角度
  theme: {
    colors: {
      light: {
        // 主色 - 专业深灰色，适合摄影器材网站
        primary: "oklch(0.30 0.02 240)",

        // 次色 - 用于次要元素
        secondary: "oklch(0.45 0.02 240)",

        // 强调色 - 橙红色用于 CTA 按钮，代表快门按钮
        accent: "oklch(0.60 0.20 25)",

        // 背景色
        background: "oklch(0.99 0 0)",

        // 文字颜色
        foreground: "oklch(0.25 0.02 240)",

        // 卡片背景色
        card: "oklch(1 0 0)",

        // 边框颜色
        border: "oklch(0.9 0.01 240)",

        // 输入框背景色
        input: "oklch(0.9 0.01 240)",

        // 静音文字颜色（次要文字）
        muted: "oklch(0.95 0.01 240)",
        mutedForeground: "oklch(0.5 0.02 240)",
      },
      dark: {
        // 深色模式的颜色配置
        primary: "oklch(0.45 0.1 155)",
        background: "oklch(0.2 0.02 240)",
        foreground: "oklch(0.95 0.01 240)",
        card: "oklch(0.25 0.02 240)",
        border: "oklch(0.3 0.02 240)",
        input: "oklch(0.3 0.02 240)",
        muted: "oklch(0.3 0.02 240)",
        mutedForeground: "oklch(0.65 0.02 240)",
      }
    }
  },

  // ==================== 字体配置 ====================
  // 直接修改字体名称即可改变整个网站的字体
  fonts: {
    // 主字体 - 用于正文和大部分文本
    sans: "Geist",

    // 等宽字体 - 用于代码块
    mono: "Geist Mono",
  },

  // ==================== SEO 配置 ====================
  // 搜索引擎优化相关配置
  seo: {
    // 网站标题 - 显示在浏览器标签和搜索结果中
    title: "Camera Lens Pro - Best Digital Camera & Lens Reviews 2025",

    // 标题模板 - %s 会被页面标题替换
    titleTemplate: "%s | Camera Lens Pro",

    // 网站描述 - 显示在搜索结果中
    description: "Expert reviews and buying guides for digital cameras, lenses, and photography equipment. Honest, in-depth analysis to help you make informed decisions.",

    // SEO 关键词 - 帮助搜索引擎理解网站内容
    keywords: [
      "camera reviews",
      "lens reviews",
      "digital camera",
      "photography equipment",
      "camera buying guide",
      "best cameras 2025",
      "DSLR reviews",
      "mirrorless camera",
    ],

    // 作者信息
    author: "Camera Lens Pro",

    // 网站 URL - 修改为你的实际域名
    siteUrl: "http://localhost:3000",

    // 社交媒体账号
    social: {
      twitter: "@cameralenspro",
    }
  },

  // ==================== 导航菜单配置 ====================
  // 网站顶部导航栏的菜单项
  navigation: {
    // 主导航菜单
    main: [
      { label: "Home", href: "/" },
      { label: "Product Reviews", href: "/reviews" },
      { label: "Guides", href: "/guides" },
      { label: "About", href: "/about" },
    ]
  },

  // ==================== 首页内容配置 ====================
  // 首页各个区域的文案和内容
  homepage: {
    // Hero 区域（首屏大标题区域）
    hero: {
      // 主标题
      title: "Find Your Perfect Camera & Lens",

      // 副标题/描述
      subtitle: "Expert reviews and honest recommendations for digital cameras, lenses, and photography equipment. Capture your best moments with confidence.",

      // 搜索框占位符文本
      searchPlaceholder: "Search for cameras, lenses, accessories...",
    },

    // 分类区域
    categories: {
      // 分类区域标题
      title: "Shop by Category",

      // 分类区域描述
      subtitle: "Browse our expertly curated photography equipment collections",

      // 分类列表
      items: [
        {
          name: "DSLR Cameras",
          slug: "dslr-cameras",
          description: "Professional DSLR cameras for all skill levels",
          icon: "Camera",
        },
        {
          name: "Mirrorless Cameras",
          slug: "mirrorless-cameras",
          description: "Compact and powerful mirrorless camera systems",
          icon: "Video",
        },
        {
          name: "Camera Lenses",
          slug: "camera-lenses",
          description: "Prime, zoom, and specialty lenses for every need",
          icon: "Focus",
        },
        {
          name: "Accessories",
          slug: "accessories",
          description: "Tripods, bags, filters, and essential gear",
          icon: "Package",
        },
      ],
    },

    // 特色产品区域
    featuredProducts: {
      title: "Featured Cameras & Lenses",
      subtitle: "Top-rated photography gear from real Amazon data",
    },

    // CTA 区域（邮件订阅）
    cta: {
      title: "Never Miss a Review",
      subtitle: "Get our latest camera reviews and buying guides delivered to your inbox",
      emailPlaceholder: "Enter your email",
      buttonText: "Subscribe",
    },
  },

  // ==================== 页面配置 ====================
  // 各个页面的标题和描述文字
  pages: {
    // Reviews 页面
    reviews: {
      title: "All Product Reviews",
      description: "Browse our complete collection of {count} camera and lens reviews, all tested and evaluated by our photography experts.",
    },

    // Guides 页面
    guides: {
      title: "Photography Buying Guides",
      description: "Expert tips and comprehensive guides to help you choose the perfect camera and lens for your photography needs.",
      categories: [
        "Camera Basics",
        "Photography Techniques",
        "Gear Maintenance",
        "Buying Guides",
      ],
      // CTA 区域配置
      cta: {
        title: "Ready to Gear Up?",
        description: "Check out our expert reviews to find the perfect equipment for your needs.",
        primaryButton: {
          text: "Browse Product Reviews",
          href: "/reviews",
        },
      },
    },

  },

  // ==================== 页脚配置 ====================
  // 网站底部页脚的内容
  footer: {
    // 关于区域
    about: {
      title: "Camera Lens Pro",
      description: "Your trusted source for honest camera and lens reviews. We help photographers find the perfect equipment for their creative vision.",
    },

    // 注意：分类链接现在从 homepage.categories.items 动态生成，无需在此配置
    // 注意：指南链接现在从 pages.guides.categories 动态生成，无需在此配置

    // 资源链接
    resources: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],

    // 法律链接
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Affiliate Disclosure", href: "/disclosure" },
    ],

    // 版权信息
    copyright: "Camera Lens Pro. All rights reserved.",

    // 联盟声明
    affiliateNotice: "We earn from qualifying purchases as an Amazon Associate.",
  },
}

// 导出类型定义
export type SiteConfig = typeof siteConfig
