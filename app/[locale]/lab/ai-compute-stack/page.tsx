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
    {heading: t("aiStack.s1Heading"), body: t("aiStack.s1Body")},
    {heading: t("aiStack.s2Heading"), body: t("aiStack.s2Body")},
    {heading: t("aiStack.s3Heading"), body: t("aiStack.s3Body")},
  ]

  const concepts = [
    {term: t("aiStack.c1Term"), def: t("aiStack.c1Def")},
    {term: t("aiStack.c2Term"), def: t("aiStack.c2Def")},
    {term: t("aiStack.c3Term"), def: t("aiStack.c3Def")},
    {term: t("aiStack.c4Term"), def: t("aiStack.c4Def")},
  ]

  const references = [
    t("aiStack.r1"),
    t("aiStack.r2"),
    t("aiStack.r3"),
    t("aiStack.r4"),
  ]

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <DetailPageLayout
        label={t("aiStack.label")}
        title={t("aiStack.title")}
        subtitle={t("aiStack.subtitle")}
        abstract={t("aiStack.abstract")}
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
