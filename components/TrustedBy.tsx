import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {PARTNERS_QUERY} from "@/sanity/lib/queries"
import type {Locale, Partner} from "@/sanity/lib/types"
import TrustedByView from "./TrustedByView"

export default async function TrustedBy() {
  const items = await sanityFetch<Partner[]>({
    query: PARTNERS_QUERY,
    tags: ["partner"],
  })

  // Hide the whole section until at least one partner exists.
  if (items.length === 0) return null

  const t = await getTranslations("trustedBy")
  const locale = (await getLocale()) as Locale

  return (
    <TrustedByView
      items={items}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
    />
  )
}
