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
    {heading: t("control.s1Heading"), body: t("control.s1Body")},
    {heading: t("control.s2Heading"), body: t("control.s2Body")},
    {heading: t("control.s3Heading"), body: t("control.s3Body")},
  ]

  const concepts = [
    {term: t("control.c1Term"), def: t("control.c1Def")},
    {term: t("control.c2Term"), def: t("control.c2Def")},
    {term: t("control.c3Term"), def: t("control.c3Def")},
    {term: t("control.c4Term"), def: t("control.c4Def")},
  ]

  const references = [
    t("control.r1"),
    t("control.r2"),
    t("control.r3"),
    t("control.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("control.label")}
        title={t("control.title")}
        subtitle={t("control.subtitle")}
        abstract={t("control.abstract")}
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
