import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {PUBLICATIONS_QUERY} from "@/sanity/lib/queries"
import type {Locale, Publication} from "@/sanity/lib/types"
import PublicationsView from "./PublicationsView"

export default async function Publications({
  verifiedOnly = false,
}: {
  verifiedOnly?: boolean
}) {
  const t = await getTranslations("publications")
  const locale = (await getLocale()) as Locale
  const items = await sanityFetch<Publication[]>({
    query: PUBLICATIONS_QUERY,
    tags: ["publication"],
  })

  const visibleItems = verifiedOnly
    ? items.filter((item) => Boolean(item.doi || item.externalUrl))
    : items

  if (visibleItems.length === 0) return null

  return (
    <PublicationsView
      items={visibleItems}
      locale={locale}
      label={t("label")}
      cta={t("paper.cta")}
    />
  )
}
