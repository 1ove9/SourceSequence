/**
 * One-shot script: mark generative-rf-design as a commercializable service.
 *
 * Run:  npx tsx scripts/mark-service.ts
 */

import {createClient} from "@sanity/client"
import {readFileSync, existsSync} from "node:fs"
import {resolve} from "node:path"

function loadEnv(file: string) {
  const abs = resolve(process.cwd(), file)
  if (!existsSync(abs)) return
  for (const raw of readFileSync(abs, "utf8").split("\n")) {
    const line = raw.trim()
    if (!line || line.startsWith("#")) continue
    const eq = line.indexOf("=")
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim()
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnv(".env.local")

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_TOKEN")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
})

async function main() {
  const doc = await client.fetch<{_id: string} | null>(
    `*[_type == "researchTopic" && slug.current == "generative-rf-design"][0]{_id}`,
  )
  if (!doc) {
    console.error('Document with slug "generative-rf-design" not found.')
    process.exit(1)
  }
  const result = await client.patch(doc._id).set({isService: true}).commit()
  console.log(`✓ Updated ${result._id} → isService: true`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
