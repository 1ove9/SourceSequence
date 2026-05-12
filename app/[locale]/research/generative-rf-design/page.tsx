import {getTranslations, setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import BackgroundLayer from "@/components/BackgroundLayer"
import DetailPageLayout from "@/components/DetailPageLayout"
import {routing} from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function Page({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations("researchDetail")

  const sections = [
    {heading: t("generative.s1Heading"), body: t("generative.s1Body")},
    {heading: t("generative.s2Heading"), body: t("generative.s2Body")},
    {heading: t("generative.s3Heading"), body: t("generative.s3Body")},
  ]

  const concepts = [
    {term: t("generative.c1Term"), def: t("generative.c1Def")},
    {term: t("generative.c2Term"), def: t("generative.c2Def")},
    {term: t("generative.c3Term"), def: t("generative.c3Def")},
    {term: t("generative.c4Term"), def: t("generative.c4Def")},
  ]

  const references = [
    t("generative.r1"),
    t("generative.r2"),
    t("generative.r3"),
    t("generative.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("generative.label")}
        title={t("generative.title")}
        subtitle={t("generative.subtitle")}
        abstract={t("generative.abstract")}
        sections={sections}
        concepts={concepts}
        references={references}
        backHref="/#research"
        backLabel={t("backLabel")}
        keyConcepts={t("keyConcepts")}
        referencesLabel={t("references")}
        ctaLabel={t("cta")}
      />
      <Footer />
    </main>
  )
}
