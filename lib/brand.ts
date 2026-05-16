/**
 * Single source of truth for brand identity. Email domain can be overridden
 * via NEXT_PUBLIC_BRAND_EMAIL_DOMAIN — useful while the brand is still in
 * transition (legacy yuanxu.tech vs. final Source Sequence domain).
 */

const EMAIL_DOMAIN =
  process.env.NEXT_PUBLIC_BRAND_EMAIL_DOMAIN ?? "yuanxu.tech"

export const BRAND = {
  name: "Source Sequence",
  emailDomain: EMAIL_DOMAIN,
  emails: {
    general: `hello@${EMAIL_DOMAIN}`,
    research: `research@${EMAIL_DOMAIN}`,
    press: `press@${EMAIL_DOMAIN}`,
    careers: `careers@${EMAIL_DOMAIN}`,
  },
  org: {
    legalName: "Source Sequence Technology",
    foundingLocation: "Hangzhou, China",
    foundingYear: 2025,
  },
} as const

export type BrandEmailKey = keyof typeof BRAND.emails
