import {BRAND} from "./brand"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

/**
 * Schema.org Organization data shared site-wide. Lives in the root layout so
 * crawlers see it on every page.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    legalName: BRAND.org.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    foundingDate: String(BRAND.org.foundingYear),
    foundingLocation: BRAND.org.foundingLocation,
    description:
      "A research company building the physical layer of 6G. AI-native radio architectures.",
    email: BRAND.emails.general,
    sameAs: [],
    knowsAbout: [
      "6G",
      "Pinching Antenna",
      "AI-Native Radio",
      "Integrated Sensing and Communication",
      "Over-the-Air Computation",
      "Physical Layer Wireless",
    ],
  }
}

/**
 * TechArticle for research / lab / applications detail pages. Encodes the
 * paper-like content as a discoverable scholarly artifact for Google Scholar
 * and Knowledge Panel.
 */
export function detailPageJsonLd({
  section,
  slug,
  locale,
  title,
  description,
}: {
  section: "research" | "lab" | "applications"
  slug: string
  locale: string
  title: string
  description?: string
}) {
  const url = `${SITE_URL}/${locale}/${section}/${slug}`
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    url,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
  }
}
