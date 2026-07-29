import type {Metadata, Viewport} from "next"
import {notFound} from "next/navigation"
import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {NextIntlClientProvider, hasLocale} from "next-intl"
import {getMessages, setRequestLocale} from "next-intl/server"
import {routing} from "@/i18n/routing"
import {organizationJsonLd} from "@/lib/jsonld"
import SmoothScroll from "@/components/SmoothScroll"
import "../globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const TITLE_BY_LOCALE: Record<string, string> = {
  en: "Source Sequence — Physics-Grounded AI",
  zh: "源序 — 物理增强 AI",
}

const DESCRIPTION_BY_LOCALE: Record<string, string> = {
  en: "Physics-grounded AI for the data-scarce, noisy reality of industry — reliable prediction, physical validation, and high-fidelity simulation. Founded in Hangzhou.",
  zh: "面向数据稀缺、噪声严重的真实工业世界的物理增强人工智能:可靠预测、物理验证与高保真仿真。源自杭州。",
}

const OG_LOCALE: Record<string, string> = {en: "en_US", zh: "zh_CN"}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const title = TITLE_BY_LOCALE[locale] ?? TITLE_BY_LOCALE.en
  const description = DESCRIPTION_BY_LOCALE[locale] ?? DESCRIPTION_BY_LOCALE.en

  return {
    metadataBase: new URL(SITE_URL),
    title: {default: title, template: "%s · Source Sequence"},
    description,
    keywords: [
      "Physics-Grounded AI",
      "Physics-Informed Machine Learning",
      "Industrial AI",
      "Predictive Maintenance",
      "PHM",
      "Source Sequence",
      "物理增强 AI",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Source Sequence",
      title,
      description,
      url: `/${locale}`,
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: locale === "en" ? "zh_CN" : "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    icons: {
      icon: [{url: "/icon.svg", type: "image/svg+xml"}],
      apple: "/apple-icon.png",
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#ccd5e2",
  width: "device-width",
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const allMessages = await getMessages()
  // Nav is the only translated Client Component shared by every route. Route
  // sections opt into their own namespaces via i18n/ClientMessages.
  const messages = {
    nav: allMessages.nav,
    brand: allMessages.brand,
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="bg-background"
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd())}}
        />
        <SmoothScroll />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        {process.env.VERCEL === "1" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
