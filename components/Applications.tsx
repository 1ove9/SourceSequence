import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {APPLICATIONS_QUERY} from "@/sanity/lib/queries"
import type {ApplicationCard, Locale} from "@/sanity/lib/types"
import ApplicationsView from "./ApplicationsView"

export default async function Applications() {
  const t = await getTranslations("applications")
  const locale = (await getLocale()) as Locale
  const items = await sanityFetch<ApplicationCard[]>({
    query: APPLICATIONS_QUERY,
    tags: ["application"],
  })

  return (
    <ApplicationsView
      items={items}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
      learnMore={t("learn_more")}
    />
  )
}
