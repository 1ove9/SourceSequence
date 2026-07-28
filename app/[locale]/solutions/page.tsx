import type {Metadata} from "next"
import {getTranslations, setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import Solutions from "@/components/Solutions"
import AuroraBackground from "@/components/AuroraBackground"
import RevealOnScroll from "@/components/RevealOnScroll"
import {routing} from "@/i18n/routing"

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
  const t = await getTranslations({locale, namespace: "solutions"})
  const title = t("metaTitle")
  const description = t("metaDescription")

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/solutions`,
      languages: {
        en: "/en/solutions",
        zh: "/zh/solutions",
        "x-default": "/en/solutions",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Source Sequence",
      title,
      description,
      url: `/${locale}/solutions`,
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

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations("solutions")

  return (
    <main className="bg-canvas bg-grain relative isolate min-h-screen overflow-x-hidden text-foreground">
      <AuroraBackground />
      <Nav />

      {/* Page-head manifesto */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <RevealOnScroll>
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("label")}
            </div>
            <h1 className="max-w-4xl text-balance font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] tracking-[-0.015em] text-foreground">
              {t("heading")}
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      <Solutions variant="full" />

      <Contact />
      <Footer />
    </main>
  )
}
