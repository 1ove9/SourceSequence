import type {Metadata} from "next"
import {notFound} from "next/navigation"
import {getTranslations, setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import BackgroundLayer from "@/components/BackgroundLayer"
import DetailPageLayout from "@/components/DetailPageLayout"
import GenerativeRFMount from "@/components/three/GenerativeRFMount"
import {sanityFetch} from "@/sanity/lib/fetch"
import {
  RESEARCH_TOPIC_BY_SLUG_QUERY,
  RESEARCH_TOPIC_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import {routing} from "@/i18n/routing"
import {detailPageMetadata} from "@/lib/seo"
import {detailPageJsonLd} from "@/lib/jsonld"
import type {Locale, ResearchTopicDetail} from "@/sanity/lib/types"

type PageParams = {locale: string; slug: string}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: RESEARCH_TOPIC_SLUGS_QUERY,
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
  const doc = await sanityFetch<ResearchTopicDetail | null>({
    query: RESEARCH_TOPIC_BY_SLUG_QUERY,
    params: {slug},
  })
  if (!doc) return {}
  const title = (locale === "zh" ? doc.titleZh ?? doc.titleEn : doc.titleEn) ?? ""
  const description =
    locale === "zh" ? doc.subtitleZh ?? doc.abstractZh : doc.subtitleEn ?? doc.abstractEn
  return detailPageMetadata({section: "research", slug, locale, title, description})
}

export default async function ResearchTopicPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const {locale, slug} = await params
  setRequestLocale(locale)

  const doc = await sanityFetch<ResearchTopicDetail | null>({
    query: RESEARCH_TOPIC_BY_SLUG_QUERY,
    params: {slug},
  })

  if (!doc) notFound()

  const t = await getTranslations("researchDetail")
  const title = (locale === "zh" ? doc.titleZh ?? doc.titleEn : doc.titleEn) ?? ""
  const description =
    locale === "zh" ? doc.subtitleZh ?? doc.abstractZh : doc.subtitleEn ?? doc.abstractEn

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            detailPageJsonLd({section: "research", slug, locale, title, description}),
          ),
        }}
      />
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        data={doc}
        locale={locale as Locale}
        backHref="/#research"
        labels={{
          back: t("backLabel"),
          keyConcepts: t("keyConcepts"),
          references: t("references"),
          cta: t("cta"),
        }}
        heroAsideSlot={slug === "generative-rf-design" ? <GenerativeRFMount /> : undefined}
      />
      <Footer />
    </main>
  )
}
