import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {RESEARCH_TOPICS_QUERY} from "@/sanity/lib/queries"
import type {Locale, ResearchTopicCard} from "@/sanity/lib/types"
import ResearchView from "./ResearchView"

export default async function Research() {
  const t = await getTranslations("research")
  const locale = (await getLocale()) as Locale
  const items = await sanityFetch<ResearchTopicCard[]>({
    query: RESEARCH_TOPICS_QUERY,
    tags: ["researchTopic"],
  })

  return (
    <ResearchView
      items={items}
      locale={locale}
      label={t("label")}
      heading={t("heading")}
      horizonBadge={t("horizonBadge")}
      serviceBadge={t("serviceBadge")}
      learnMore={t("learn_more")}
    />
  )
}
