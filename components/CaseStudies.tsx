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

  // The homepage is an evidence path, not a claims carousel. Keep flagship
  // demonstrations and records with a source; hide unsupported case copy.
  const evidencedItems = items.filter(
    (item) =>
      item.isFlagship ||
      item.externalUrl ||
      item.evidenceUrl ||
      item.metrics?.some((metric) => metric.sourceUrl),
  )

  if (evidencedItems.length === 0) return null

  return (
    <CaseStudiesView
      items={evidencedItems}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
      learnMore={t("learnMore")}
      githubLabel={t("github")}
      evidenceLabel={t("evidence")}
    />
  )
}
