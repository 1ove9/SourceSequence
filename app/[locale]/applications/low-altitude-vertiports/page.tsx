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
    {heading: t("hangar.s1Heading"), body: t("hangar.s1Body")},
    {heading: t("hangar.s2Heading"), body: t("hangar.s2Body")},
    {heading: t("hangar.s3Heading"), body: t("hangar.s3Body")},
    {heading: t("hangar.s4Heading"), body: t("hangar.s4Body")},
  ]

  const concepts = [
    {term: t("hangar.c1Term"), def: t("hangar.c1Def")},
    {term: t("hangar.c2Term"), def: t("hangar.c2Def")},
    {term: t("hangar.c3Term"), def: t("hangar.c3Def")},
    {term: t("hangar.c4Term"), def: t("hangar.c4Def")},
  ]

  const references = [
    t("hangar.r1"),
    t("hangar.r2"),
    t("hangar.r3"),
    t("hangar.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("hangar.label")}
        title={t("hangar.title")}
        subtitle={t("hangar.subtitle")}
        abstract={t("hangar.abstract")}
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
