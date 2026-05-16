/**
 * Migrate hardcoded content (messages/{en,zh}.json + section component metadata)
 * into Sanity as document records.
 *
 * Idempotent: uses createOrReplace with deterministic _id.
 * Hero images are left empty — clients upload from Studio after migration.
 *
 * Run:   npx tsx scripts/migrate-to-sanity.ts
 */

import {createClient, type SanityDocument} from "@sanity/client"
import {readFileSync, existsSync} from "node:fs"
import {resolve} from "node:path"

// ---------- Env loading (no external dep) ----------

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
  console.error(
    "Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_TOKEN",
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
})

// ---------- Load source content ----------

type AnyDict = Record<string, unknown> & {[k: string]: any}

const en = JSON.parse(readFileSync("messages/en.json", "utf8")) as AnyDict
const zh = JSON.parse(readFileSync("messages/zh.json", "utf8")) as AnyDict

// ---------- Helpers ----------

function buildSections(enD: AnyDict, zhD: AnyDict) {
  const sections: AnyDict[] = []
  for (let i = 1; i <= 8; i++) {
    const h = enD[`s${i}Heading`]
    if (h === undefined) break
    sections.push({
      _type: "object",
      _key: `s${i}`,
      titleEn: enD[`s${i}Heading`],
      titleZh: zhD[`s${i}Heading`],
      contentEn: enD[`s${i}Body`],
      contentZh: zhD[`s${i}Body`],
    })
  }
  return sections
}

function buildConcepts(enD: AnyDict, zhD: AnyDict) {
  const concepts: AnyDict[] = []
  for (let i = 1; i <= 8; i++) {
    const t = enD[`c${i}Term`]
    if (t === undefined) break
    concepts.push({
      _type: "object",
      _key: `c${i}`,
      termEn: enD[`c${i}Term`],
      termZh: zhD[`c${i}Term`],
      definitionEn: enD[`c${i}Def`],
      definitionZh: zhD[`c${i}Def`],
    })
  }
  return concepts
}

function buildReferences(enD: AnyDict) {
  const refs: string[] = []
  for (let i = 1; i <= 10; i++) {
    const v = enD[`r${i}`]
    if (v === undefined) break
    refs.push(v as string)
  }
  return refs
}

// ---------- Research Topics ----------

interface ResearchMapping {
  msgKey: string // namespace key in researchDetail / research.directions
  slug: string
  order: number
  isLongHorizon: boolean
  cardIcon: string
}

const RESEARCH_MAPPINGS: ResearchMapping[] = [
  {msgKey: "pass", slug: "pinching-antenna-systems", order: 1, isLongHorizon: false, cardIcon: "Antenna"},
  {msgKey: "control", slug: "ai-control-plane", order: 2, isLongHorizon: false, cardIcon: "Brain"},
  {msgKey: "generative", slug: "generative-rf-design", order: 3, isLongHorizon: false, cardIcon: "Sparkles"},
  {msgKey: "isac", slug: "integrated-sensing-communication", order: 4, isLongHorizon: false, cardIcon: "Radar"},
  {msgKey: "aircomp", slug: "aircomp-wireless-ai-compute", order: 5, isLongHorizon: true, cardIcon: "Network"},
]

function buildResearchDoc(m: ResearchMapping) {
  const enD = (en.researchDetail as AnyDict)[m.msgKey] as AnyDict
  const zhD = (zh.researchDetail as AnyDict)[m.msgKey] as AnyDict
  const enCard = (en.research as AnyDict).directions[m.msgKey] as AnyDict
  const zhCard = (zh.research as AnyDict).directions[m.msgKey] as AnyDict
  return {
    _id: `researchTopic.${m.slug}`,
    _type: "researchTopic",
    slug: {_type: "slug", current: m.slug},
    order: m.order,
    code: enD.label,
    isLongHorizon: m.isLongHorizon,
    cardIcon: m.cardIcon,
    titleEn: enD.title,
    titleZh: zhD.title,
    subtitleEn: enD.subtitle,
    subtitleZh: zhD.subtitle,
    cardDescriptionEn: enCard.desc,
    cardDescriptionZh: zhCard.desc,
    abstractEn: enD.abstract,
    abstractZh: zhD.abstract,
    sections: buildSections(enD, zhD),
    keyConcepts: buildConcepts(enD, zhD),
    references: buildReferences(enD),
  }
}

// ---------- Lab Capabilities ----------

interface LabMapping {
  msgKey: string
  slug: string
  order: number
  cardIcon: string
  locationTag?: string
}

const LAB_MAPPINGS: LabMapping[] = [
  {msgKey: "simulation", slug: "simulation-modeling", order: 1, cardIcon: "Atom", locationTag: "Hangzhou · In-house"},
  {msgKey: "hardware", slug: "open-hardware-prototyping", order: 2, cardIcon: "CircuitBoard", locationTag: "Hangzhou · In-house"},
  {msgKey: "partners", slug: "partner-lab-network", order: 3, cardIcon: "Handshake", locationTag: "Distributed · Partners"},
  {msgKey: "aiStack", slug: "ai-compute-stack", order: 4, cardIcon: "Boxes", locationTag: "Hangzhou · Cloud"},
]

function buildLabDoc(m: LabMapping) {
  const enD = (en.labDetail as AnyDict)[m.msgKey] as AnyDict
  const zhD = (zh.labDetail as AnyDict)[m.msgKey] as AnyDict
  const enCard = (en.lab as AnyDict).practices[m.msgKey] as AnyDict
  const zhCard = (zh.lab as AnyDict).practices[m.msgKey] as AnyDict
  return {
    _id: `labCapability.${m.slug}`,
    _type: "labCapability",
    slug: {_type: "slug", current: m.slug},
    order: m.order,
    code: enD.label,
    locationTag: m.locationTag,
    cardIcon: m.cardIcon,
    titleEn: enD.title,
    titleZh: zhD.title,
    subtitleEn: enD.subtitle,
    subtitleZh: zhD.subtitle,
    cardDescriptionEn: enCard.desc,
    cardDescriptionZh: zhCard.desc,
    abstractEn: enD.abstract,
    abstractZh: zhD.abstract,
    sections: buildSections(enD, zhD),
    keyConcepts: buildConcepts(enD, zhD),
    references: buildReferences(enD),
  }
}

// ---------- Applications ----------

interface AppMapping {
  msgKey: string
  slug: string
  order: number
  figureNumber: string
}

const APP_MAPPINGS: AppMapping[] = [
  {msgKey: "factory", slug: "smart-factory", order: 1, figureNumber: "FIG. 01"},
  {msgKey: "immersive", slug: "immersive-spaces", order: 2, figureNumber: "FIG. 02"},
  {msgKey: "hangar", slug: "low-altitude-vertiports", order: 3, figureNumber: "FIG. 03"},
]

function buildAppDoc(m: AppMapping) {
  const enD = (en.applicationsDetail as AnyDict)[m.msgKey] as AnyDict
  const zhD = (zh.applicationsDetail as AnyDict)[m.msgKey] as AnyDict
  const enCard = (en.applications as AnyDict).scenarios[m.msgKey] as AnyDict
  const zhCard = (zh.applications as AnyDict).scenarios[m.msgKey] as AnyDict
  return {
    _id: `application.${m.slug}`,
    _type: "application",
    slug: {_type: "slug", current: m.slug},
    order: m.order,
    code: enD.label,
    figureNumber: m.figureNumber,
    figureLabelEn: enCard.tag,
    figureLabelZh: zhCard.tag,
    titleEn: enD.title,
    titleZh: zhD.title,
    subtitleEn: enD.subtitle,
    subtitleZh: zhD.subtitle,
    cardDescriptionEn: enCard.desc,
    cardDescriptionZh: zhCard.desc,
    abstractEn: enD.abstract,
    abstractZh: zhD.abstract,
    sections: buildSections(enD, zhD),
    keyConcepts: buildConcepts(enD, zhD),
    references: buildReferences(enD),
  }
}

// ---------- Publications ----------

const enPaper = (en.publications as AnyDict).paper as AnyDict
const zhPaper = (zh.publications as AnyDict).paper as AnyDict

const publications: AnyDict[] = [
  {
    _id: "publication.core-views-on-ai-native-radio",
    _type: "publication",
    slug: {_type: "slug", current: "core-views-on-ai-native-radio"},
    order: 1,
    date: "2026.03",
    titleEn: enPaper.title,
    titleZh: zhPaper.title,
    type: "Position Paper",
    isFeatured: true,
    summaryEn: enPaper.abstract,
    summaryZh: zhPaper.abstract,
  },
  {
    _id: "publication.pass-signal-processing-perspective",
    _type: "publication",
    slug: {_type: "slug", current: "pass-signal-processing-perspective"},
    order: 2,
    date: "2026.01",
    titleEn: "Pinching antenna systems: A signal-processing perspective",
    type: "Working Paper",
    isFeatured: false,
  },
  {
    _id: "publication.realtime-rl-control-reconfigurable-radio",
    _type: "publication",
    slug: {_type: "slug", current: "realtime-rl-control-reconfigurable-radio"},
    order: 3,
    date: "2025.11",
    titleEn: "Real-time reinforcement learning for reconfigurable radio control",
    type: "Preprint",
    isFeatured: false,
  },
  {
    _id: "publication.generative-rf-circuit-synthesis",
    _type: "publication",
    slug: {_type: "slug", current: "generative-rf-circuit-synthesis"},
    order: 4,
    date: "2025.10",
    titleEn: "Generative models for RF circuit synthesis: An evaluation framework",
    type: "Technical Note",
    isFeatured: false,
  },
  {
    _id: "publication.geometry-of-isac-waveforms",
    _type: "publication",
    slug: {_type: "slug", current: "geometry-of-isac-waveforms"},
    order: 5,
    date: "2025.08",
    titleEn: "On the geometry of integrated sensing and communication waveforms",
    type: "Working Paper",
    isFeatured: false,
  },
  {
    _id: "publication.aircomp-position-note",
    _type: "publication",
    slug: {_type: "slug", current: "aircomp-position-note"},
    order: 6,
    date: "2025.06",
    titleEn: "Over-the-air computation as compute substrate: A position note",
    type: "Essay",
    isFeatured: false,
  },
]

// ---------- Job Postings ----------

interface JobMapping {
  msgKey: string
  slug: string
  order: number
}

const JOB_MAPPINGS: JobMapping[] = [
  {msgKey: "rfEngineer", slug: "antenna-rf-engineer", order: 1},
  {msgKey: "aiResearcher", slug: "ai-researcher-wireless", order: 2},
  {msgKey: "frontendEngineer", slug: "frontend-visualization-engineer", order: 3},
]

function buildJobDoc(m: JobMapping) {
  const enR = (en.careers as AnyDict).roles[m.msgKey] as AnyDict
  const zhR = (zh.careers as AnyDict).roles[m.msgKey] as AnyDict
  return {
    _id: `jobPosting.${m.slug}`,
    _type: "jobPosting",
    slug: {_type: "slug", current: m.slug},
    order: m.order,
    isOpen: true,
    titleEn: enR.title,
    titleZh: zhR.title,
    locationEn: enR.location,
    locationZh: zhR.location,
    descriptionEn: enR.desc,
    descriptionZh: zhR.desc,
    applyEmail: "careers@yuanxu.tech",
  }
}

// ---------- Migrate ----------

async function migrate() {
  const docs: AnyDict[] = [
    ...RESEARCH_MAPPINGS.map(buildResearchDoc),
    ...LAB_MAPPINGS.map(buildLabDoc),
    ...APP_MAPPINGS.map(buildAppDoc),
    ...publications,
    ...JOB_MAPPINGS.map(buildJobDoc),
  ]

  console.log(`\n→ Migrating ${docs.length} documents to Sanity`)
  console.log(`  project: ${projectId}  dataset: ${dataset}\n`)

  let ok = 0
  let fail = 0
  for (const doc of docs) {
    try {
      await client.createOrReplace(doc as SanityDocument)
      const label =
        (doc.titleEn as string | undefined) ??
        (doc.slug as AnyDict)?.current ??
        doc._id
      console.log(`  ✓ ${doc._type.padEnd(16)} ${label}`)
      ok++
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error(`  ✗ ${doc._type} ${doc._id} — ${msg}`)
      fail++
    }
  }

  console.log(`\n→ Done. ${ok} succeeded, ${fail} failed.\n`)
  if (fail > 0) process.exit(1)
}

migrate().catch((e) => {
  console.error("Fatal:", e)
  process.exit(1)
})
