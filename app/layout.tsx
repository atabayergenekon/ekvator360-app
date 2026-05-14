import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-provider"

const siteUrl = "https://ekvator360.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ekvator360, International Sales & Export Management",
    template: "%s · Ekvator360",
  },
  description:
    "Ekvator360 is a premium export growth and international sales management firm. We act as your outsourced export department, building global sales channels, finding foreign buyers and operating overseas growth, end to end.",
  applicationName: "Ekvator360",
  keywords: [
    "export management",
    "international sales",
    "global trade",
    "foreign buyer discovery",
    "international market research",
    "overseas sales",
    "export consulting",
    "global business development",
    "B2B export",
    "Ekvator360",
  ],
  authors: [{ name: "Ekvator360" }],
  creator: "Ekvator360",
  publisher: "Ekvator360",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ekvator360",
    title: "Ekvator360, International Sales & Export Management",
    description:
      "Your outsourced international sales department. We build global channels, find overseas buyers and manage export operations for manufacturers ready to grow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekvator360, International Sales & Export Management",
    description:
      "We help manufacturers sell globally, buyer discovery, market entry, overseas sales operations and end-to-end export management.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
}

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="font-sans antialiased"
    >
      <body className="min-h-svh bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
