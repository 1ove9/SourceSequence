import {getLocale, getTranslations} from "next-intl/server"
import {sanityFetch} from "@/sanity/lib/fetch"
import {SOLUTIONS_QUERY, SOLUTION_GROUPS_QUERY} from "@/sanity/lib/queries"
import type {Locale, Solution, SolutionGroup} from "@/sanity/lib/types"
import SolutionsView from "./SolutionsView"

/**
 * variant="teaser" — 首页第 3 层精选入口（仅 isFeatured，链到 /solutions）
 * variant="full"   — /solutions 页完整三组八方向
 */
export default async function Solutions({
  variant = "teaser",
}: {
  variant?: "full" | "teaser"
}) {
  const t = await getTranslations("solutions")
  const locale = (await getLocale()) as Locale

  const [items, groups] = await Promise.all([
    sanityFetch<Solution[]>({query: SOLUTIONS_QUERY, tags: ["solution"]}),
    sanityFetch<SolutionGroup[]>({
      query: SOLUTION_GROUPS_QUERY,
      tags: ["solutionGroup"],
    }),
  ])

  if (items.length === 0) return null

  return (
    <SolutionsView
      items={items}
      groups={groups}
      locale={locale}
      variant={variant}
      label={t(variant === "teaser" ? "teaserLabel" : "label")}
      heading={t(variant === "teaser" ? "teaserHeading" : "heading")}
      viewAll={variant === "teaser" ? t("viewAll") : undefined}
    />
  )
}
