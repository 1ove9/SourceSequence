import {BRAND} from "./brand"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

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
      "A research company building physics-grounded AI — reliable, trustworthy prediction and decision systems for the data-scarce, noisy reality of industry.",
    email: BRAND.emails.general,
    sameAs: BRAND.repo.isLive ? [BRAND.repo.url] : [],
    knowsAbout: [
      "Physics-Grounded AI",
      "Physics-Informed Machine Learning",
      "Industrial AI",
      "Predictive Maintenance",
      "Prognostics and Health Management",
      "High-Fidelity Simulation",
      "Antenna Design",
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
