import type {Metadata} from "next"
import {routing} from "@/i18n/routing"

const OG_LOCALE: Record<string, string> = {en: "en_US", zh: "zh_CN"}

interface DetailMetaInput {
  section: "research" | "lab" | "applications"
  slug: string
  locale: string
  title: string
  description?: string
}

/**
 * Build per-locale alternates + canonical + OpenGraph for a Sanity-backed
 * detail page. Paths are kept relative; root layout's metadataBase resolves them.
 */
export function detailPageMetadata({
  section,
  slug,
  locale,
  title,
  description,
}: DetailMetaInput): Metadata {
  const path = `/${section}/${slug}`
  const languages: Record<string, string> = {}
  for (const l of routing.locales) languages[l] = `/${l}${path}`
  languages["x-default"] = `/${routing.defaultLocale}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/${locale}${path}`,
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: locale === "en" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
