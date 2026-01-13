"use client"

import { generateThemeCSS, generateFontCSS } from "@/lib/theme-generator"

/**
 * ConfigThemeProvider - 根据配置文件注入动态主题样式
 * 这个组件会读取 site.config.ts 中的主题配置，并生成对应的 CSS 变量
 */
export function ConfigThemeProvider({ children }: { children: React.ReactNode }) {
  const themeCSS = generateThemeCSS()
  const fontCSS = generateFontCSS()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      <style dangerouslySetInnerHTML={{ __html: fontCSS }} />
      {children}
    </>
  )
}
