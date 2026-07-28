import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {CAPABILITIES_QUERY} from "@/sanity/lib/queries"
import type {Capability, Locale} from "@/sanity/lib/types"
import CapabilitiesView from "./CapabilitiesView"

export default async function Capabilities() {
  const t = await getTranslations("capabilities")
  const locale = (await getLocale()) as Locale
  const items = await sanityFetch<Capability[]>({
    query: CAPABILITIES_QUERY,
    tags: ["capability"],
  })

  if (items.length === 0) return null

  return (
    <CapabilitiesView
      items={items}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
    />
  )
}
