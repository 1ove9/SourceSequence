/**
 * Append "How We Engage" + "Where We're a Fit" sections to the
 * generative-rf-design researchTopic doc, idempotently.
 *
 * Run:  npx tsx scripts/append-engagement.ts
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

interface Section {
  _key: string
  _type?: string
  titleEn: string
  titleZh: string
  contentEn: string
  contentZh: string
}

const NEW_SECTIONS: Section[] = [
  {
    _key: "how-we-engage",
    _type: "object",
    titleEn: "How We Engage",
    titleZh: "我们如何合作",
    contentEn:
      "We work with hardware companies on a project basis, typically with the following phases. **Discovery (1 week):** We review your performance requirements, manufacturing constraints, physical envelope, and target volume. Output: a feasibility brief and price quote. **Design (2–4 weeks):** Our generative pipeline produces 5–10 candidate antenna designs matching your specs. Each design comes with full-wave simulation results, S-parameter sweeps, and radiation pattern reports. **Validation (2–3 weeks):** We fabricate the top 1–2 designs and validate against measurement. Final deliverable: fabrication-ready files (Gerber, STEP, 3D models), simulation reports, and measurement validation.",
    contentZh:
      "我们与硬件公司以项目制合作，通常包括以下阶段。**调研期（1 周）：**我们梳理您的性能需求、制造约束、物理边界、目标量产规模。输出：可行性简报与报价。**设计期（2–4 周）：**我们的生成式流水线产出 5–10 个符合规格的天线设计候选方案。每个设计附带全波仿真结果、S 参数扫描、辐射方向图报告。**验证期（2–3 周）：**我们加工最优的 1–2 个设计并进行测量验证。最终交付：可加工文件（Gerber、STEP、3D 模型）、仿真报告、测量验证数据。",
  },
  {
    _key: "where-we-fit",
    _type: "object",
    titleEn: "Where We're a Fit",
    titleZh: "我们适合的场景",
    contentEn:
      "Our generative design pipeline shows the strongest advantage in three contexts. (1) **Tight physical constraints:** wearables, sub-10mm-thick devices, conformal antennas on curved surfaces — where conventional design templates run out of options. (2) **Multi-band or multi-objective specs:** when an antenna must cover multiple bands, satisfy specific radiation patterns, and respect cost — humans struggle to balance all objectives; our optimizer handles them jointly. (3) **High iteration count:** when you need to evaluate dozens of design variants before committing — we deliver these in days, not months. We work across frequency ranges from Sub-6 GHz to mmWave (110 GHz). For specific cases — automotive radar, satellite communication, medical implants — please contact us to discuss.",
    contentZh:
      "我们的生成式设计流水线在三类场景中优势最显著。(1) **严苛物理约束：**可穿戴设备、厚度低于 10mm 的设备、曲面共形天线 — 传统设计模板在这些场景下选择有限。(2) **多频段或多目标规格：**当天线必须覆盖多个频段、满足特定方向图、并兼顾成本 — 人工难以同时平衡所有目标，我们的优化器联合处理。(3) **高迭代量需求：**当您需要在选定方案前评估几十个设计变体 — 我们以天为单位交付，而非月。频率范围覆盖 Sub-6 GHz 到毫米波（110 GHz）。具体场景如车载雷达、卫星通信、医疗植入物等，请联系我们详谈。",
  },
]

async function main() {
  const doc = await client.fetch<{_id: string; sections?: Section[]} | null>(
    `*[_type == "researchTopic" && slug.current == "generative-rf-design"][0]{_id, sections}`,
  )

  if (!doc) {
    console.error('Document with slug "generative-rf-design" not found.')
    process.exit(1)
  }

  const existing = doc.sections ?? []
  const existingKeys = new Set(existing.map((s) => s._key))
  const toAdd = NEW_SECTIONS.filter((s) => !existingKeys.has(s._key))

  if (toAdd.length === 0) {
    console.log("All engagement sections already present — nothing to do.")
    return
  }

  const updated = [...existing, ...toAdd]
  const result = await client.patch(doc._id).set({sections: updated}).commit()

  console.log(`✓ Appended ${toAdd.length} section(s) to ${result._id}`)
  for (const s of toAdd) console.log(`    + ${s.titleEn} / ${s.titleZh}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
