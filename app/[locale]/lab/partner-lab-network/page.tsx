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
  const t = await getTranslations("labDetail")

  const sections = [
    {heading: t("partners.s1Heading"), body: t("partners.s1Body")},
    {heading: t("partners.s2Heading"), body: t("partners.s2Body")},
    {heading: t("partners.s3Heading"), body: t("partners.s3Body")},
  ]

  const concepts = [
    {term: t("partners.c1Term"), def: t("partners.c1Def")},
    {term: t("partners.c2Term"), def: t("partners.c2Def")},
    {term: t("partners.c3Term"), def: t("partners.c3Def")},
    {term: t("partners.c4Term"), def: t("partners.c4Def")},
  ]

  const references = [
    t("partners.r1"),
    t("partners.r2"),
    t("partners.r3"),
    t("partners.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("partners.label")}
        title={t("partners.title")}
        subtitle={t("partners.subtitle")}
        abstract={t("partners.abstract")}
        sections={sections}
        concepts={concepts}
        references={references}
        backHref="/#lab"
        backLabel={t("backLabel")}
        keyConcepts={t("keyConcepts")}
        referencesLabel={t("references")}
        ctaLabel={t("cta")}
      />
      <Footer />
    </main>
  )
}
