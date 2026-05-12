import {client} from "../client"

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
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
