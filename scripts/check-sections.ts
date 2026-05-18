import {createClient} from "@sanity/client"
import {readFileSync} from "node:fs"

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const [k, ...rest] = line.split("=")
  if (k && rest.length) process.env[k.trim()] = rest.join("=").trim()
}

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

async function main() {
  const r = await c.fetch<{sections: {titleEn: string}[]} | null>(
    `*[_type == "researchTopic" && slug.current == "generative-rf-design"][0]{sections}`,
  )
  console.log(`Total sections: ${r?.sections?.length ?? 0}`)
  for (const s of r?.sections ?? []) console.log("  -", s.titleEn)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
