// lib/theme-generator.ts
// 根据配置文件动态生成 CSS 变量
// AI 可以直接修改 site.config.ts 中的颜色值来改变网站配色

import { siteConfig } from './site.config'

/**
 * 根据配置生成 CSS 变量字符串
 * 直接从 siteConfig.theme.colors 读取颜色配置
 */
export function generateThemeCSS(): string {
  const { colors } = siteConfig.theme

  // 生成 light 模式的 CSS 变量
  const lightVars = `
  --background: ${colors.light.background};
  --foreground: ${colors.light.foreground};
  --card: ${colors.light.card};
  --card-foreground: ${colors.light.foreground};
  --popover: ${colors.light.card};
  --popover-foreground: ${colors.light.foreground};
  --primary: ${colors.light.primary};
  --primary-foreground: oklch(0.99 0 0);
  --secondary: ${colors.light.secondary};
  --secondary-foreground: oklch(0.99 0 0);
  --muted: ${colors.light.muted};
  --muted-foreground: ${colors.light.mutedForeground};
  --accent: ${colors.light.accent};
  --accent-foreground: oklch(0.99 0 0);
  --border: ${colors.light.border};
  --input: ${colors.light.input};
  --ring: ${colors.light.primary};
  `

  // 生成 dark 模式的 CSS 变量
  const darkVars = `
  --background: ${colors.dark.background};
  --foreground: ${colors.dark.foreground};
  --card: ${colors.dark.card};
  --card-foreground: ${colors.dark.foreground};
  --popover: ${colors.dark.card};
  --popover-foreground: ${colors.dark.foreground};
  --primary: ${colors.dark.primary};
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.35 0.02 240);
  --secondary-foreground: ${colors.dark.foreground};
  --muted: ${colors.dark.muted};
  --muted-foreground: ${colors.dark.mutedForeground};
  --accent: ${colors.light.accent};
  --accent-foreground: ${colors.dark.background};
  --border: ${colors.dark.border};
  --input: ${colors.dark.input};
  --ring: ${colors.dark.primary};
  `

  return `
    :root {
      ${lightVars}
    }

    .dark {
      ${darkVars}
    }
  `
}

/**
 * 生成字体的 CSS 变量
 * 直接从 siteConfig.fonts 读取字体配置
 */
export function generateFontCSS(): string {
  const { fonts } = siteConfig

  return `
    :root {
      --font-sans: "${fonts.sans}", system-ui, -apple-system, sans-serif;
      --font-mono: "${fonts.mono}", monospace;
    }
  `
}
