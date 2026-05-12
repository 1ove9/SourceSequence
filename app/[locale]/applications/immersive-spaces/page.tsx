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
  const t = await getTranslations("applicationsDetail")

  const sections = [
    {heading: t("immersive.s1Heading"), body: t("immersive.s1Body")},
    {heading: t("immersive.s2Heading"), body: t("immersive.s2Body")},
    {heading: t("immersive.s3Heading"), body: t("immersive.s3Body")},
    {heading: t("immersive.s4Heading"), body: t("immersive.s4Body")},
  ]

  const concepts = [
    {term: t("immersive.c1Term"), def: t("immersive.c1Def")},
    {term: t("immersive.c2Term"), def: t("immersive.c2Def")},
    {term: t("immersive.c3Term"), def: t("immersive.c3Def")},
    {term: t("immersive.c4Term"), def: t("immersive.c4Def")},
  ]

  const references = [
    t("immersive.r1"),
    t("immersive.r2"),
    t("immersive.r3"),
    t("immersive.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("immersive.label")}
        title={t("immersive.title")}
        subtitle={t("immersive.subtitle")}
        abstract={t("immersive.abstract")}
        sections={sections}
        concepts={concepts}
        references={references}
        backHref="/#applications"
        backLabel={t("backLabel")}
        keyConcepts={t("keyConcepts")}
        referencesLabel={t("references")}
        ctaLabel={t("cta")}
      />
      <Footer />
    </main>
  )
}
