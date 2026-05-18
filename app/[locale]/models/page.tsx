import type {Metadata} from "next"
import {getLocale, getTranslations, setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import BackgroundLayer from "@/components/BackgroundLayer"
import ModelsView from "@/components/showcase/ModelsView"
import {sanityFetch} from "@/sanity/lib/fetch"
import {MODEL_SHOWCASES_QUERY} from "@/sanity/lib/queries"
import type {Locale, ModelShowcaseCard} from "@/sanity/lib/types"

type PageParams = {locale: string}

const OG_LOCALE: Record<string, string> = {en: "en_US", zh: "zh_CN"}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: "modelsPage"})
  const title = t("metaTitle")
  const description = t("metaDescription")

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/models`,
      languages: {
        en: "/en/models",
        zh: "/zh/models",
        "x-default": "/en/models",
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}/models`,
      locale: OG_LOCALE[locale] ?? "en_US",
    },
    twitter: {card: "summary_large_image", title, description},
  }
}

export default async function ModelsPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  const [items, t] = await Promise.all([
    sanityFetch<ModelShowcaseCard[]>({
      query: MODEL_SHOWCASES_QUERY,
      tags: ["modelShowcase"],
    }),
    getTranslations("modelsPage"),
  ])

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <ModelsView
        items={items}
        locale={(await getLocale()) as Locale}
        label={t("label")}
        heading={t("heading")}
        intro={t("intro")}
        emptyMessage={t("empty")}
        viewLabel={t("view")}
      />
      <Footer />
    </main>
  )
}
