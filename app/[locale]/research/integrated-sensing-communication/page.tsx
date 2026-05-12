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
    {heading: t("isac.s1Heading"), body: t("isac.s1Body")},
    {heading: t("isac.s2Heading"), body: t("isac.s2Body")},
    {heading: t("isac.s3Heading"), body: t("isac.s3Body")},
  ]

  const concepts = [
    {term: t("isac.c1Term"), def: t("isac.c1Def")},
    {term: t("isac.c2Term"), def: t("isac.c2Def")},
    {term: t("isac.c3Term"), def: t("isac.c3Def")},
    {term: t("isac.c4Term"), def: t("isac.c4Def")},
  ]

  const references = [
    t("isac.r1"),
    t("isac.r2"),
    t("isac.r3"),
    t("isac.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("isac.label")}
        title={t("isac.title")}
        subtitle={t("isac.subtitle")}
        abstract={t("isac.abstract")}
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
