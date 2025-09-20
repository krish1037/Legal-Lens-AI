import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

export const metadata: Metadata = {
  title: "Legal Lens AI - AI-Powered Legal Analysis",
  description:
    "Analyze legal documents instantly with AI. Upload contracts, judgments, or legal documents and get structured analysis in seconds.",
  generator: "Legal Lens AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <PageTransition>
          <Suspense fallback={null}>{children}</Suspense>
        </PageTransition>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
