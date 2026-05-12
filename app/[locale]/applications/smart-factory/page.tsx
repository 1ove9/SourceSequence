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
    {heading: t("factory.s1Heading"), body: t("factory.s1Body")},
    {heading: t("factory.s2Heading"), body: t("factory.s2Body")},
    {heading: t("factory.s3Heading"), body: t("factory.s3Body")},
    {heading: t("factory.s4Heading"), body: t("factory.s4Body")},
  ]

  const concepts = [
    {term: t("factory.c1Term"), def: t("factory.c1Def")},
    {term: t("factory.c2Term"), def: t("factory.c2Def")},
    {term: t("factory.c3Term"), def: t("factory.c3Def")},
    {term: t("factory.c4Term"), def: t("factory.c4Def")},
  ]

  const references = [
    t("factory.r1"),
    t("factory.r2"),
    t("factory.r3"),
    t("factory.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("factory.label")}
        title={t("factory.title")}
        subtitle={t("factory.subtitle")}
        abstract={t("factory.abstract")}
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
