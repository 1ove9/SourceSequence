export const apiVersion = "2024-01-01"

export const hasSanityConfig = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
)

// Keep module initialization valid in CI and other content-free builds. All
// reads are short-circuited by sanityFetch when the real public config is
// absent; production still uses the configured project and dataset.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ci-placeholder"

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// SANITY_API_TOKEN remains a temporary local-development fallback so existing
// environments keep working while deployments migrate to the explicit name.
export const readToken =
  process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_TOKEN

// Keep public form writes on a separate, narrowly scoped credential.
export const writeToken = process.env.SANITY_API_WRITE_TOKEN
