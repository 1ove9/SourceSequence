import {createClient} from "@sanity/client"
import {readFileSync} from "node:fs"

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const [k, ...rest] = line.split("=")
  if (k && rest.length) process.env[k.trim()] = rest.join("=").trim()
}

const baseConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
}

async function main() {
  // Authenticated, raw perspective — shows all docs incl. drafts
  const authClient = createClient({
    ...baseConfig,
    token: process.env.SANITY_API_TOKEN!,
    useCdn: false,
    perspective: "raw",
  })
  const all = await authClient.fetch('*[_type in ["researchTopic","labCapability","application","publication","jobPosting"]]{_id, _type, "slug": slug.current, titleEn}')
  console.log("RAW (auth, all incl. drafts):", all.length)
  console.dir(all.slice(0, 30), {depth: 2})

  // Published perspective
  const pubClient = createClient({...baseConfig, token: process.env.SANITY_API_TOKEN, useCdn: false, perspective: "published"})
  const pub = await pubClient.fetch('*[_type in ["researchTopic","labCapability","application","publication","jobPosting"]]{_id, _type, "slug": slug.current}')
  console.log("\nPUBLISHED (auth):", pub.length)

  // Anonymous (no token), CDN
  const anonCdn = createClient({...baseConfig, useCdn: true})
  const anonPub = await anonCdn.fetch('*[_type in ["researchTopic","labCapability","application","publication","jobPosting"]]{_id, _type}')
  console.log("\nPUBLISHED via CDN (anon):", anonPub.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
