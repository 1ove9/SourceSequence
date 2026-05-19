import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {LAB_SHOTS_QUERY} from "@/sanity/lib/queries"
import type {LabShot, Locale} from "@/sanity/lib/types"
import InsideTheLabView from "./InsideTheLabView"

export default async function InsideTheLab() {
  const items = await sanityFetch<LabShot[]>({
    query: LAB_SHOTS_QUERY,
    tags: ["labShot"],
  })

  // No shots yet → keep the section invisible so visitors don't see an
  // empty placeholder. Once you upload at least one labShot in Studio it
  // appears on the homepage.
  if (items.length === 0) return null

  const t = await getTranslations("insideTheLab")
  const locale = (await getLocale()) as Locale

  return (
    <InsideTheLabView
      items={items}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
      intro={t("intro")}
    />
  )
}
