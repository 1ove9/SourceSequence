import "server-only"

import {createClient} from "next-sanity"
import {apiVersion, dataset, projectId, readToken, writeToken} from "./env"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Next.js owns ISR and on-demand invalidation. Avoid a second stale cache
  // layer between the app and Sanity's published dataset.
  useCdn: false,
  perspective: "published",
  token: readToken,
})

let inquiryWriteClient: ReturnType<typeof createClient> | undefined

export function getInquiryWriteClient() {
  if (!writeToken) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN")
  }

  inquiryWriteClient ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
    token: writeToken,
  })

  return inquiryWriteClient
}
