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
    {heading: t("pass.s1Heading"), body: t("pass.s1Body")},
    {heading: t("pass.s2Heading"), body: t("pass.s2Body")},
    {heading: t("pass.s3Heading"), body: t("pass.s3Body")},
    {heading: t("pass.s4Heading"), body: t("pass.s4Body")},
  ]

  const concepts = [
    {term: t("pass.c1Term"), def: t("pass.c1Def")},
    {term: t("pass.c2Term"), def: t("pass.c2Def")},
    {term: t("pass.c3Term"), def: t("pass.c3Def")},
    {term: t("pass.c4Term"), def: t("pass.c4Def")},
  ]

  const references = [
    t("pass.r1"),
    t("pass.r2"),
    t("pass.r3"),
    t("pass.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("pass.label")}
        title={t("pass.title")}
        subtitle={t("pass.subtitle")}
        abstract={t("pass.abstract")}
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
