import type {Metadata} from "next"
import {notFound} from "next/navigation"
import {getTranslations, setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import BackgroundLayer from "@/components/BackgroundLayer"
import DetailPageLayout from "@/components/DetailPageLayout"
import {sanityFetch} from "@/sanity/lib/fetch"
import {
  LAB_CAPABILITY_BY_SLUG_QUERY,
  LAB_CAPABILITY_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import {routing} from "@/i18n/routing"
import {detailPageMetadata} from "@/lib/seo"
import {detailPageJsonLd} from "@/lib/jsonld"
import type {LabCapabilityDetail, Locale} from "@/sanity/lib/types"

type PageParams = {locale: string; slug: string}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: LAB_CAPABILITY_SLUGS_QUERY,
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
  const doc = await sanityFetch<LabCapabilityDetail | null>({
    query: LAB_CAPABILITY_BY_SLUG_QUERY,
    params: {slug},
  })
  if (!doc) return {}
  const title = (locale === "zh" ? doc.titleZh ?? doc.titleEn : doc.titleEn) ?? ""
  const description =
    locale === "zh" ? doc.subtitleZh ?? doc.abstractZh : doc.subtitleEn ?? doc.abstractEn
  return detailPageMetadata({section: "lab", slug, locale, title, description})
}

export default async function LabCapabilityPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const {locale, slug} = await params
  setRequestLocale(locale)

  const doc = await sanityFetch<LabCapabilityDetail | null>({
    query: LAB_CAPABILITY_BY_SLUG_QUERY,
    params: {slug},
  })

  if (!doc) notFound()

  const t = await getTranslations("labDetail")
  const title = (locale === "zh" ? doc.titleZh ?? doc.titleEn : doc.titleEn) ?? ""
  const description =
    locale === "zh" ? doc.subtitleZh ?? doc.abstractZh : doc.subtitleEn ?? doc.abstractEn

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            detailPageJsonLd({section: "lab", slug, locale, title, description}),
          ),
        }}
      />
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        data={doc}
        locale={locale as Locale}
        backHref="/#lab"
        labels={{
          back: t("backLabel"),
          keyConcepts: t("keyConcepts"),
          references: t("references"),
          cta: t("cta"),
        }}
      />
      <Footer />
    </main>
  )
}
