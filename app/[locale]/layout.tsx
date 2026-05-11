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

export const metadata: Metadata = {
  title: "Source Sequence — AI-Native Radio Systems",
  description:
    "A research company building the physical layer of 6G. AI-native radio architectures, founded in Hangzhou.",
  keywords: [
    "6G",
    "Pinching Antenna",
    "PASS",
    "AI-Native Radio",
    "Wireless",
    "Physical Layer",
    "Source Sequence",
  ],
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
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable} ${notoSerifSC.variable} ${notoSansSC.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
