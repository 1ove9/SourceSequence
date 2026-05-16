import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {JOB_POSTINGS_QUERY} from "@/sanity/lib/queries"
import type {JobPosting, Locale} from "@/sanity/lib/types"
import CareersView from "./CareersView"

export default async function Careers() {
  const t = await getTranslations("careers")
  const locale = (await getLocale()) as Locale
  const items = await sanityFetch<JobPosting[]>({
    query: JOB_POSTINGS_QUERY,
    tags: ["jobPosting"],
  })

  return (
    <CareersView
      items={items}
      locale={locale}
      label={t("label")}
      quote={t("quote")}
      intro={t("intro")}
      apply={t("apply")}
    />
  )
}
