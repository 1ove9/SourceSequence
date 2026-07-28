import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {CASE_STUDIES_QUERY} from "@/sanity/lib/queries"
import type {CaseStudy, Locale} from "@/sanity/lib/types"
import CaseStudiesView from "./CaseStudiesView"

export default async function CaseStudies() {
  const t = await getTranslations("cases")
  const locale = (await getLocale()) as Locale
  const items = await sanityFetch<CaseStudy[]>({
    query: CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  })

  if (items.length === 0) return null

  return (
    <CaseStudiesView
      items={items}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
      learnMore={t("learnMore")}
      githubLabel={t("github")}
    />
  )
}
