import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {LAB_CAPABILITIES_QUERY} from "@/sanity/lib/queries"
import type {LabCapabilityCard, Locale} from "@/sanity/lib/types"
import LabView from "./LabView"

export default async function Lab() {
  const t = await getTranslations("lab")
  const locale = (await getLocale()) as Locale
  const items = await sanityFetch<LabCapabilityCard[]>({
    query: LAB_CAPABILITIES_QUERY,
    tags: ["labCapability"],
  })

  return (
    <LabView
      items={items}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
      intro={t("intro")}
      cardBadge={t("cardBadge")}
      learnMore={t("learn_more")}
    />
  )
}
