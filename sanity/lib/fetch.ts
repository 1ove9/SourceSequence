import {client} from "../client"
import {hasSanityConfig} from "../env"

/**
 * Marketing content changes infrequently. We default to 1 hour ISR and rely
 * on the Sanity webhook at /api/revalidate to invalidate immediately when
 * editors publish changes. See app/api/revalidate/route.ts.
 */
const DEFAULT_REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 0 : 60 * 60

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = DEFAULT_REVALIDATE_SECONDS,
  tags,
  fallback = [] as unknown as T,
}: {
  query: string
  params?: Record<string, unknown>
  revalidate?: number
  tags?: string[]
  fallback?: T
}): Promise<T> {
  if (!hasSanityConfig) {
    return fallback
  }

  return client.fetch<T>(query, params, {
    next: {revalidate, tags},
  })
}
