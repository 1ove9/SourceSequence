import type {MetadataRoute} from "next"
import {sanityFetch} from "@/sanity/lib/fetch"
import {
  APPLICATION_SLUGS_QUERY,
  LAB_CAPABILITY_SLUGS_QUERY,
  RESEARCH_TOPIC_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import {routing} from "@/i18n/routing"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

type Section = "research" | "lab" | "applications"

const SECTION_QUERY: Record<Section, string> = {
  research: RESEARCH_TOPIC_SLUGS_QUERY,
  lab: LAB_CAPABILITY_SLUGS_QUERY,
  applications: APPLICATION_SLUGS_QUERY,
}

function buildAlternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const locale of routing.locales) {
    langs[locale] = `${SITE_URL}/${locale}${path}`
  }
  langs["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`
  return langs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Home per locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === routing.defaultLocale ? 1.0 : 0.9,
      alternates: {languages: buildAlternates("")},
    })
  }

  // Detail pages per section × locale
  for (const section of Object.keys(SECTION_QUERY) as Section[]) {
    const slugs = await sanityFetch<string[]>({
      query: SECTION_QUERY[section],
      tags: [section === "research" ? "researchTopic" : section === "lab" ? "labCapability" : "application"],
    })
    for (const slug of slugs) {
      const path = `/${section}/${slug}`
      for (const locale of routing.locales) {
        entries.push({
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {languages: buildAlternates(path)},
        })
      }
    }
  }

  return entries
}
