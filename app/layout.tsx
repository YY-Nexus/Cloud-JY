import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "言语云³ 智能教育平台 - YYC³-DeepStack",
  description: "万象归元于云枢；言语智启新纪元。基于AI技术的中国式教育平台，为初中至高中学生提供个性化学习方案",
  keywords: ["言语云", "智能教育", "AI教学", "多语言学习", "奥数训练", "文艺素养", "985", "211"],
  authors: [{ name: "YanYu Cloud Education Team" }],
  creator: "言语云³ 教育科技",
  publisher: "YYC³-DeepStack Platform",
  robots: "index, follow",
  openGraph: {
    title: "言语云³ 智能教育平台",
    description: "万象归元于云枢；言语智启新纪元",
    url: "https://yanyu-cloud.com",
    siteName: "言语云³",
    images: [
      {
        url: "/images/yanyu-logo.png",
        width: 1200,
        height: 630,
        alt: "言语云³ Logo",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "言语云³ 智能教育平台",
    description: "万象归元于云枢；言语智启新纪元",
    images: ["/images/yanyu-logo.png"],
  },
  icons: {
    icon: "/images/yanyu-logo.png",
    shortcut: "/images/yanyu-logo.png",
    apple: "/images/yanyu-logo.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
