import {client} from "../client"

/**
 * Marketing content changes infrequently. We default to 1 hour ISR and rely
 * on the Sanity webhook at /api/revalidate to invalidate immediately when
 * editors publish changes. See app/api/revalidate/route.ts.
 */
const DEFAULT_REVALIDATE_SECONDS = 60 * 60

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = DEFAULT_REVALIDATE_SECONDS,
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  revalidate?: number
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {revalidate, tags},
  })
}
