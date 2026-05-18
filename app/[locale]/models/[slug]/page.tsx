import type {Metadata} from "next"
import {notFound} from "next/navigation"
import {getTranslations, setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import BackgroundLayer from "@/components/BackgroundLayer"
import ModelDetailView from "@/components/showcase/ModelDetailView"
import {sanityFetch} from "@/sanity/lib/fetch"
import {
  MODEL_SHOWCASE_BY_SLUG_QUERY,
  MODEL_SHOWCASE_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import {routing} from "@/i18n/routing"
import type {Locale, ModelShowcaseDetail} from "@/sanity/lib/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const OG_LOCALE: Record<string, string> = {en: "en_US", zh: "zh_CN"}

type PageParams = {locale: string; slug: string}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: MODEL_SHOWCASE_SLUGS_QUERY,
  })
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({locale, slug})),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const {slug, locale} = await params
  const doc = await sanityFetch<ModelShowcaseDetail | null>({
    query: MODEL_SHOWCASE_BY_SLUG_QUERY,
    params: {slug},
  })
  if (!doc) return {}
  const title = (locale === "zh" ? doc.titleZh ?? doc.titleEn : doc.titleEn) ?? ""
  const description =
    locale === "zh" ? doc.subtitleZh ?? doc.descriptionZh : doc.subtitleEn ?? doc.descriptionEn
  const url = `/${locale}/models/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en/models/${slug}`,
        zh: `/zh/models/${slug}`,
        "x-default": `/en/models/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: locale === "en" ? "zh_CN" : "en_US",
    },
    twitter: {card: "summary_large_image", title, description},
  }
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const {locale, slug} = await params
  setRequestLocale(locale)

  const doc = await sanityFetch<ModelShowcaseDetail | null>({
    query: MODEL_SHOWCASE_BY_SLUG_QUERY,
    params: {slug},
  })

  if (!doc) notFound()

  const t = await getTranslations("modelDetail")
  const title = (locale === "zh" ? doc.titleZh ?? doc.titleEn : doc.titleEn) ?? ""

  // TechArticle JSON-LD with the scene's title as headline
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    url: `${SITE_URL}/${locale}/models/${slug}`,
    mainEntityOfPage: `${SITE_URL}/${locale}/models/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Source Sequence",
      url: SITE_URL,
      logo: {"@type": "ImageObject", url: `${SITE_URL}/icon.svg`},
    },
  }

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <BackgroundLayer />
      <Nav />
      <ModelDetailView
        data={doc}
        locale={locale as Locale}
        labels={{
          back: t("back"),
          interactionHint: t("interactionHint"),
        }}
      />
      <Footer />
    </main>
  )
}
