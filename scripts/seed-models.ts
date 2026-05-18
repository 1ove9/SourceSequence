/**
 * Seed the 2 initial modelShowcase docs (pinching-antenna + beamforming-array)
 * so /models has content out of the box.
 *
 * Idempotent — uses createOrReplace with deterministic _id.
 *
 * Run:  npx tsx scripts/seed-models.ts
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

const docs = [
  {
    _id: "modelShowcase.pinching-antenna",
    _type: "modelShowcase",
    slug: {_type: "slug", current: "pinching-antenna"},
    order: 1,
    code: "01 / Showcase",
    sceneKey: "pinching-antenna",
    titleEn: "Pinching Antenna System",
    titleZh: "夹捏天线系统",
    subtitleEn: "Reconfigurable radiation along a low-loss dielectric waveguide.",
    subtitleZh: "沿低损耗介质波导可重构辐射的天线系统。",
    cardDescriptionEn:
      "Pinching elements clamp along a dielectric guide to launch radiation on demand at any position—antennas that move to where coverage is needed.",
    cardDescriptionZh:
      "夹捏单元沿介质波导按需建立辐射点——把信号放到需要覆盖的位置。",
    descriptionEn:
      "The interactive scene shows three pinching elements applied to a dielectric waveguide. Each clamp creates an effective radiation point along the guide, modeling a class of reconfigurable antenna systems we call PASS (Pinching Antenna Systems).\n\nDrag to orbit around the model. The rings represent radiation patterns at each pinch point. The auto-rotate pauses while you interact and resumes after a few seconds.",
    descriptionZh:
      "可交互场景中展示了三个夹捏单元沿介质波导布置。每个夹捏点在波导上建立有效辐射点，对应我们称之为 PASS（夹捏天线系统）的一类可重构天线设计。\n\n拖拽可绕模型旋转。每个夹捏点处的环表示辐射方向图。交互时自动旋转暂停，停止操作几秒后恢复。",
    tagsEn: ["PASS", "Reconfigurable", "Waveguide", "6G"],
    tagsZh: ["夹捏天线", "可重构", "波导", "6G"],
    isFeatured: true,
  },
  {
    _id: "modelShowcase.beamforming-array",
    _type: "modelShowcase",
    slug: {_type: "slug", current: "beamforming-array"},
    order: 2,
    code: "02 / Showcase",
    sceneKey: "beamforming-array",
    titleEn: "Beamforming Array",
    titleZh: "波束成型阵列",
    subtitleEn: "8 × 8 phased element grid with a steerable beam cone.",
    subtitleZh: "8 × 8 相控阵列单元与可转向的波束锥。",
    cardDescriptionEn:
      "Each element contributes a phase-shifted signal; together they synthesize a directional beam that can be electronically steered without moving parts.",
    cardDescriptionZh:
      "每个单元贡献相位偏移信号，合成可电子转向的定向波束，无需任何机械运动。",
    descriptionEn:
      "An 8 × 8 antenna array procedurally generated in R3F. The translucent cone represents the synthesized beam direction, slowly steering in azimuth and elevation to illustrate phase-steering principles.\n\nThis is the same idea behind 5G/6G base-station MIMO arrays, satellite phased arrays, and integrated sensing-communication (ISAC) systems.",
    descriptionZh:
      "8 × 8 天线阵列由 R3F 程序化生成。半透明锥体表示合成后的波束方向，缓慢在方位角与俯仰角上扫描，直观演示相位转向原理。\n\n这正是 5G/6G 基站 MIMO 阵列、卫星相控阵以及通感一体（ISAC）系统背后的核心思想。",
    tagsEn: ["Beamforming", "Phased Array", "MIMO", "ISAC"],
    tagsZh: ["波束成型", "相控阵", "MIMO", "通感一体"],
    isFeatured: false,
  },
]

async function main() {
  console.log(`Seeding ${docs.length} modelShowcase docs to dataset "${dataset}"…`)
  let ok = 0
  let fail = 0
  for (const doc of docs) {
    try {
      const result = await client.createOrReplace(doc)
      console.log(`  ✓ ${result._id}`)
      ok++
    } catch (e) {
      console.error(`  ✗ ${doc._id}:`, (e as Error).message)
      fail++
    }
  }
  console.log(`\nDone. ${ok} ok · ${fail} fail`)
  if (fail > 0) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
