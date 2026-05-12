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
    {heading: t("hardware.s1Heading"), body: t("hardware.s1Body")},
    {heading: t("hardware.s2Heading"), body: t("hardware.s2Body")},
    {heading: t("hardware.s3Heading"), body: t("hardware.s3Body")},
  ]

  const concepts = [
    {term: t("hardware.c1Term"), def: t("hardware.c1Def")},
    {term: t("hardware.c2Term"), def: t("hardware.c2Def")},
    {term: t("hardware.c3Term"), def: t("hardware.c3Def")},
    {term: t("hardware.c4Term"), def: t("hardware.c4Def")},
  ]

  const references = [
    t("hardware.r1"),
    t("hardware.r2"),
    t("hardware.r3"),
    t("hardware.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("hardware.label")}
        title={t("hardware.title")}
        subtitle={t("hardware.subtitle")}
        abstract={t("hardware.abstract")}
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
