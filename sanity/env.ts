export const apiVersion = "2024-01-01"

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET"
)

// SANITY_API_TOKEN remains a temporary local-development fallback so existing
// environments keep working while deployments migrate to the explicit name.
export const readToken =
  process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_TOKEN

// Keep public form writes on a separate, narrowly scoped credential.
export const writeToken = process.env.SANITY_API_WRITE_TOKEN

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
