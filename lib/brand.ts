/**
 * Single source of truth for brand identity. Email domain can be overridden
 * via NEXT_PUBLIC_BRAND_EMAIL_DOMAIN — useful while the brand is still in
 * transition (legacy yuanxu.tech vs. final Source Sequence domain).
 */

const EMAIL_DOMAIN =
  process.env.NEXT_PUBLIC_BRAND_EMAIL_DOMAIN ?? "sourcesequence.cn"

// YAF — the online AI antenna-design platform. "#" = placeholder; set
// NEXT_PUBLIC_PLATFORM_URL once the domain is live and the "Launch / 在线体验"
// CTA appears automatically with no code change.
const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "#"

// YAF open-source repository. "#" = placeholder; set NEXT_PUBLIC_GITHUB_URL
// (or hardcode below) and the GitHub link surfaces automatically.
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "#"

export const BRAND = {
  name: "Source Sequence",
  emailDomain: EMAIL_DOMAIN,
  emails: {
    general: `hello@${EMAIL_DOMAIN}`,
    research: `research@${EMAIL_DOMAIN}`,
    press: `press@${EMAIL_DOMAIN}`,
    careers: `careers@${EMAIL_DOMAIN}`,
  },
  platform: {
    url: PLATFORM_URL,
    isLive: PLATFORM_URL !== "#",
  },
  repo: {
    url: GITHUB_URL,
    isLive: GITHUB_URL !== "#",
  },
  org: {
    legalName: "Source Sequence Technology",
    foundingLocation: "Hangzhou, China",
    foundingYear: 2025,
  },
} as const

export type BrandEmailKey = keyof typeof BRAND.emails
