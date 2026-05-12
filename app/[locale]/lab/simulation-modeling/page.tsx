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
    {heading: t("simulation.s1Heading"), body: t("simulation.s1Body")},
    {heading: t("simulation.s2Heading"), body: t("simulation.s2Body")},
    {heading: t("simulation.s3Heading"), body: t("simulation.s3Body")},
  ]

  const concepts = [
    {term: t("simulation.c1Term"), def: t("simulation.c1Def")},
    {term: t("simulation.c2Term"), def: t("simulation.c2Def")},
    {term: t("simulation.c3Term"), def: t("simulation.c3Def")},
    {term: t("simulation.c4Term"), def: t("simulation.c4Def")},
  ]

  const references = [
    t("simulation.r1"),
    t("simulation.r2"),
    t("simulation.r3"),
    t("simulation.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("simulation.label")}
        title={t("simulation.title")}
        subtitle={t("simulation.subtitle")}
        abstract={t("simulation.abstract")}
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
