import type {Metadata, Viewport} from "next"
import {notFound} from "next/navigation"
import {
  Instrument_Serif,
  Geist,
  JetBrains_Mono,
  Noto_Serif_SC,
  Noto_Sans_SC,
} from "next/font/google"
import {Analytics} from "@vercel/analytics/next"
import {NextIntlClientProvider, hasLocale} from "next-intl"
import {getMessages, setRequestLocale} from "next-intl/server"
import {routing} from "@/i18n/routing"
import {organizationJsonLd} from "@/lib/jsonld"
import "../globals.css"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display-cn",
  display: "swap",
})

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans-cn",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const TITLE_BY_LOCALE: Record<string, string> = {
  en: "Source Sequence — AI-Native Radio Systems",
  zh: "源序 — AI 原生无线系统",
}

const DESCRIPTION_BY_LOCALE: Record<string, string> = {
  en: "A research company building the physical layer of 6G. AI-native radio architectures, founded in Hangzhou.",
  zh: "一家构建 6G 物理层的研究公司。AI 原生无线架构，源自杭州。",
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
      "6G",
      "Pinching Antenna",
      "PASS",
      "AI-Native Radio",
      "Wireless",
      "Physical Layer",
      "Source Sequence",
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
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

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable} ${notoSerifSC.variable} ${notoSansSC.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd())}}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
