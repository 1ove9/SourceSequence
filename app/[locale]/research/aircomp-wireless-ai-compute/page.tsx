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
    {heading: t("aircomp.s1Heading"), body: t("aircomp.s1Body")},
    {heading: t("aircomp.s2Heading"), body: t("aircomp.s2Body")},
    {heading: t("aircomp.s3Heading"), body: t("aircomp.s3Body")},
    {heading: t("aircomp.s4Heading"), body: t("aircomp.s4Body")},
  ]

  const concepts = [
    {term: t("aircomp.c1Term"), def: t("aircomp.c1Def")},
    {term: t("aircomp.c2Term"), def: t("aircomp.c2Def")},
    {term: t("aircomp.c3Term"), def: t("aircomp.c3Def")},
    {term: t("aircomp.c4Term"), def: t("aircomp.c4Def")},
  ]

  const references = [
    t("aircomp.r1"),
    t("aircomp.r2"),
    t("aircomp.r3"),
    t("aircomp.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("aircomp.label")}
        title={t("aircomp.title")}
        subtitle={t("aircomp.subtitle")}
        abstract={t("aircomp.abstract")}
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
