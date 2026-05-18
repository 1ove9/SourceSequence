import type {MetadataRoute} from "next"
import {sanityFetch} from "@/sanity/lib/fetch"
import {
  APPLICATION_SLUGS_QUERY,
  LAB_CAPABILITY_SLUGS_QUERY,
  MODEL_SHOWCASE_SLUGS_QUERY,
  RESEARCH_TOPIC_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import {routing} from "@/i18n/routing"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

type Section = "research" | "lab" | "applications" | "models"

const SECTION_CONFIG: Record<Section, {query: string; tag: string}> = {
  research: {query: RESEARCH_TOPIC_SLUGS_QUERY, tag: "researchTopic"},
  lab: {query: LAB_CAPABILITY_SLUGS_QUERY, tag: "labCapability"},
  applications: {query: APPLICATION_SLUGS_QUERY, tag: "application"},
  models: {query: MODEL_SHOWCASE_SLUGS_QUERY, tag: "modelShowcase"},
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

  // Models gallery page per locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}/models`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {languages: buildAlternates("/models")},
    })
  }

  // Detail pages per section × locale
  for (const section of Object.keys(SECTION_CONFIG) as Section[]) {
    const {query, tag} = SECTION_CONFIG[section]
    const slugs = await sanityFetch<string[]>({query, tags: [tag]})
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
