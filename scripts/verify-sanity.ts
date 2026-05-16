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
})

async function main() {
  const [labs, apps, research] = await Promise.all([
    c.fetch(
      '*[_type=="labCapability"] | order(order asc) {_id, "slug": slug.current, titleEn, titleZh, cardIcon, locationTag}',
    ),
    c.fetch(
      '*[_type=="application"] | order(order asc) {_id, "slug": slug.current, titleEn, titleZh, figureNumber, figureLabelEn}',
    ),
    c.fetch(
      '*[_type=="researchTopic"] | order(order asc) {_id, "slug": slug.current, titleEn}',
    ),
  ])
  console.log("Lab Capabilities:", labs.length)
  console.dir(labs, {depth: 2})
  console.log("\nApplications:", apps.length)
  console.dir(apps, {depth: 2})
  console.log("\nResearch:", research.length)
  console.dir(research.map((r: any) => r.titleEn), {depth: 1})
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
