import type {Metadata} from "next"
import {setRequestLocale} from "next-intl/server"
import ClientMessages from "@/i18n/ClientMessages"
import Nav from "@/components/Nav"
import AntennaIntro from "@/components/AntennaIntro"
import Hero from "@/components/Hero"
import Marquee from "@/components/Marquee"
import Vision from "@/components/Vision"
import Research from "@/components/Research"
import Lab from "@/components/Lab"
import InsideTheLab from "@/components/InsideTheLab"
import Applications from "@/components/Applications"
import Publications from "@/components/Publications"
import Footer from "@/components/Footer"
import AuroraBackground from "@/components/AuroraBackground"
import {routing} from "@/i18n/routing"

const TITLE: Record<string, string> = {
  en: "YAF — AI-Native Antenna Design",
  zh: "YAF — AI 原生天线设计平台",
}

const DESCRIPTION: Record<string, string> = {
  en: "YAF is the first open-source proof of our Physics-Grounded AI philosophy — real electromagnetic solvers and AI optimization, reimagining antenna design for the 6G era.",
  zh: "YAF 是源序科技「物理增强 AI」理念的首个开源实证——用真实电磁求解器与 AI 优化，重新定义面向 6G 时代的天线设计。",
}

const OG_LOCALE: Record<string, string> = {en: "en_US", zh: "zh_CN"}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const title = TITLE[locale] ?? TITLE.en
  const description = DESCRIPTION[locale] ?? DESCRIPTION.en

  return {
    title,
    description,
    keywords: [
      "YAF",
      "6G",
      "Pinching Antenna",
      "PASS",
      "AI-Native Radio",
      "Antenna Design",
      "Source Sequence",
    ],
    alternates: {
      canonical: `/${locale}/antenna`,
      languages: {
        en: "/en/antenna",
        zh: "/zh/antenna",
        "x-default": "/en/antenna",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Source Sequence",
      title,
      description,
      url: `/${locale}/antenna`,
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: locale === "en" ? "zh_CN" : "en_US",
      images: [{url: "/og-image.png", width: 1200, height: 630, alt: title}],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  }
}

export default async function AntennaPage({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  return (
    <main className="bg-canvas bg-grain relative isolate min-h-screen overflow-x-hidden text-foreground">
      <AuroraBackground />
      <Nav />
      <AntennaIntro />
      <Hero />
      <Marquee />
      <ClientMessages namespaces={["vision"]}>
        <Vision />
      </ClientMessages>
      <Research />
      <Lab />
      <InsideTheLab />
      <Applications />
      <Publications />
      <Footer />
    </main>
  )
}
