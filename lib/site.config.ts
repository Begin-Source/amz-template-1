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
    name: "ErgoSeat Pro",

    // 网站标语 - 简短的品牌口号
    tagline: "Ultimate Comfort, Optimal Posture, Peak Productivity",

    // 网站描述 - 用于 SEO 和页脚简介
    description: "Your ultimate source for high-performance, multi-functional, and comfortable ergonomic seating solutions, perfect for home offices, professional work, and long gaming sessions.",

    // Logo 配置
    logo: {
      // Logo 类型：
      // - "lucide": 使用 lucide-react 图标库中的图标
      // - "svg": 使用自定义 SVG 代码
      // - "image": 使用图片文件
      type: "lucide" as const,

      // 当 type 为 "lucide" 时，指定图标名称
      // 可用图标：https://lucide.dev/icons/
      icon: "Chair",

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
        // 主色 - 专业的深灰色/蓝紫色，用于强调舒适和科技感
        primary: "oklch(0.25 0.05 240)",

        // 次色 - 用于次要元素
        secondary: "oklch(0.45 0.02 240)",

        // 强调色 - 活力的绿色，代表健康和舒适
        accent: "oklch(0.60 0.15 150)",

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
    title: "ErgoSeat Pro - Best Ergonomic Chairs & Office Solutions 2025",

    // 标题模板 - %s 会被页面标题替换
    titleTemplate: "%s | ErgoSeat Pro",

    // 网站描述 - 显示在搜索结果中
    description: "Expert reviews and buying guides for ergonomic chairs, standing desks, and office accessories. Find the perfect setup for comfort, health, and productivity.",

    // SEO 关键词 - 帮助搜索引擎理解网站内容
    keywords: [
      "ergonomic chair reviews",
      "standing desk",
      "office chair",
      "gaming chair",
      "lumbar support",
      "home office setup",
      "ergonomic workspace",
      "best office chairs 2025",
      "adjustable chair",
      "posture support",
    ],

    // 作者信息
    author: "ErgoSeat Pro",

    // 网站 URL - 修改为你的实际域名
    siteUrl: "https://ergoseat.com",

    // 社交媒体账号
    social: {
      twitter: "@ergoseatpro",
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
      title: "Your Ultimate Ergonomic Workspace Starts Here",

      // 副标题/描述
      subtitle: "Discover expert reviews and honest recommendations for ergonomic chairs, standing desks, and accessories that boost comfort and productivity.",

      // 搜索框占位符文本
      searchPlaceholder: "Search for ergonomic chairs, standing desks, monitor arms...",
    },

    // 分类区域
    categories: {
      // 分类区域标题
      title: "Explore Ergonomic Solutions",

      // 分类区域描述
      subtitle: "Browse our expertly curated collections for a healthier and more productive workspace.",

      // 分类列表
      items: [
        {
          slug: "ergonomic-chairs",
          name: "Ergonomic Chairs",
          description: "High-performance seating for comfort and support.",
          icon: "Chair",
        },
        {
          slug: "standing-desks",
          name: "Standing Desks",
          description: "Adjustable desks for a dynamic and healthy workspace.",
          icon: "Desk",
        },
        {
          slug: "monitor-arms",
          name: "Monitor Arms",
          description: "Optimize your screen position for ergonomic viewing.",
          icon: "Monitor",
        },
        {
          slug: "ergonomic-keyboards-mice",
          name: "Ergonomic Keyboards & Mice",
          description: "Reduce strain with ergonomically designed peripherals.",
          icon: "Keyboard",
        },
      ],
    },

    // 特色产品区域
    featuredProducts: {
      title: "Top-Rated Ergonomic Gear",
      subtitle: "Discover the best ergonomic chairs and accessories from real Amazon data",
    },

    // CTA 区域（邮件订阅）
    cta: {
      title: "Stay Ahead in Ergonomics",
      subtitle: "Get our latest reviews and guides on ergonomic workspace solutions delivered to your inbox.",
      emailPlaceholder: "Enter your email",
      buttonText: "Subscribe",
    },
  },

  // ==================== 页面配置 ====================
  // 各个页面的标题和描述文字
  pages: {
    // Reviews 页面
    reviews: {
      title: "All Ergonomic Product Reviews",
      description: "Browse our complete collection of {count} ergonomic chair, desk, and accessory reviews, all tested and evaluated by our experts.",
    },

    // Guides 页面
    guides: {
      title: "Ergonomic Workspace Guides",
      description: "Expert tips and comprehensive guides to help you choose the perfect ergonomic setup for your health and productivity.",
      categories: [
        "Ergonomic Chair Buying Guides",
        "Standing Desk Benefits",
        "Posture & Health Tips",
        "Workspace Optimization",
      ],
      // CTA 区域配置
      cta: {
        title: "Ready to Upgrade Your Workspace?",
        description: "Check out our expert reviews to find the perfect ergonomic equipment for your needs.",
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
      title: "ErgoSeat Pro",
      description: "Your trusted source for honest ergonomic chair, desk, and accessory reviews. We help you create a healthier, more productive workspace.",
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
    copyright: "ErgoSeat Pro. All rights reserved.",

    // 联盟声明
    affiliateNotice: "We earn from qualifying purchases as an Amazon Associate.",
  },
}

// 导出类型定义
export type SiteConfig = typeof siteConfig