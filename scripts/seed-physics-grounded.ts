/**
 * Seed Physics-Grounded AI content:
 *   - 3 core capabilities (homepage layer 2)
 *   - 3 solution groups + 8 industry solutions (/solutions + homepage layer 3)
 *   - 2 case studies (homepage layer 4)
 *
 * Idempotent — createOrReplace with deterministic _id.
 *
 * Run:  npx tsx scripts/seed-physics-grounded.ts
 *
 * The YAF case picks up its GitHub link from NEXT_PUBLIC_GITHUB_URL if set;
 * otherwise the externalUrl is left blank (the card still links to /antenna).
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
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL

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

const slug = (current: string) => ({_type: "slug" as const, current})

const capabilities = [
  {
    _id: "capability.physics-informed-modeling",
    _type: "capability",
    slug: slug("physics-informed-modeling"),
    order: 1,
    tagline: "Physics-Informed Modeling",
    titleEn: "Physics-Informed AI Modeling",
    titleZh: "物理增强的 AI 建模",
    descriptionEn:
      "Inject physical laws into the model to deliver reliable prediction and uncertainty quantification on small, low-quality datasets.",
    descriptionZh:
      "将物理规律注入模型，在小样本、低质量数据下实现可靠预测与不确定性量化。",
    cardIcon: "Atom",
  },
  {
    _id: "capability.physical-validation",
    _type: "capability",
    slug: slug("physical-validation"),
    order: 2,
    tagline: "Physical Validation for AI",
    titleEn: "Physical Validation for AI",
    titleZh: "AI 的物理验证与评估",
    descriptionEn:
      "Independent physical-consistency review, boundary testing, and trustworthiness assessment for AI outputs — a gatekeeper for the physical world.",
    descriptionZh:
      "为 AI 输出提供独立的物理一致性审查、边界测试与可信度评估，做物理世界的守门人。",
    cardIcon: "ShieldCheck",
  },
  {
    _id: "capability.high-fidelity-simulation",
    _type: "capability",
    slug: slug("high-fidelity-simulation"),
    order: 3,
    tagline: "High-Fidelity Simulation & Data",
    titleEn: "High-Fidelity Simulation & Data",
    titleZh: "物理保真的仿真与数据",
    descriptionEn:
      "Built on real solvers and mechanistic models: surrogate-model acceleration, physically consistent synthetic data, and simulation environments.",
    descriptionZh:
      "基于真实求解器与机理模型，提供代理模型加速、物理一致的合成数据与仿真环境。",
    cardIcon: "Layers",
  },
]

const solutionGroups = [
  {
    _id: "solutionGroup.reliability",
    _type: "solutionGroup",
    key: "reliability",
    order: 1,
    tagline: "Equipment Reliability",
    titleEn: "Equipment Reliability",
    titleZh: "设备可靠性",
    introEn:
      "Make critical equipment self-warning — reliable, interpretable predictions before failure happens.",
    introZh: "让关键设备「会预警」——在故障发生前给出可靠、可解释的预测。",
  },
  {
    _id: "solutionGroup.efficiency",
    _type: "solutionGroup",
    key: "efficiency",
    order: 2,
    tagline: "Assets & Efficiency",
    titleEn: "Assets & Efficiency",
    titleZh: "资产与能效",
    introEn:
      "Turn physical state into economic value — value assets, cut losses, optimize energy.",
    introZh: "把物理状态算成经济价值——评估资产、降低损耗、优化能耗。",
  },
  {
    _id: "solutionGroup.process",
    _type: "solutionGroup",
    key: "process",
    order: 3,
    tagline: "Process & Quality",
    titleEn: "Process & Quality",
    titleZh: "工艺与质量",
    introEn: "Make processes predictable — less waste on every heat and every wafer.",
    introZh: "让工艺「算得准」——在每一炉、每一片上减少浪费。",
  },
]

const solutions = [
  {
    _id: "solution.rotating-equipment-phm",
    slug: slug("rotating-equipment-phm"),
    order: 1,
    group: "reliability",
    tagline: "Rotating Equipment PHM",
    titleEn: "Rotating Equipment PHM",
    titleZh: "旋转设备健康管理",
    descriptionEn:
      "Remaining-life and fault prediction for pumps, compressors, motors, and gearboxes.",
    descriptionZh: "对泵、压缩机、电机、齿轮箱等做剩余寿命与故障预警。",
    highlightEn:
      "The cost of a single unplanned shutdown is clearly quantifiable; one flagship deployment replicates across a group.",
    highlightZh: "一次非计划停机损失清晰可量化，标杆落地后可在集团内批量复制。",
    cardIcon: "Gauge",
    isFeatured: true,
  },
  {
    _id: "solution.wind-turbine-phm",
    slug: slug("wind-turbine-phm"),
    order: 2,
    group: "reliability",
    tagline: "Wind Turbine PHM",
    titleEn: "Wind Turbine PHM",
    titleZh: "风电专项预测性运维",
    descriptionEn:
      "Degradation prediction and maintenance decision support for blades and gearboxes from SCADA data.",
    descriptionZh: "针对叶片、齿轮箱，基于 SCADA 数据做退化预测与运维决策支持。",
    highlightEn:
      "High maintenance cost and poor data quality — where small-sample, noise-robust modeling shines most.",
    highlightZh: "运维成本高、数据质量差——小样本与抗噪建模优势最突出。",
    cardIcon: "Wind",
    isFeatured: true,
  },
  {
    _id: "solution.power-equipment-diagnostics",
    slug: slug("power-equipment-diagnostics"),
    order: 3,
    group: "reliability",
    tagline: "Power Equipment Diagnostics",
    titleEn: "Power Equipment Diagnostics",
    titleZh: "电力设备状态评估",
    descriptionEn:
      "Condition assessment and life prediction for transformers and other critical electrical assets.",
    descriptionZh: "对变压器等关键电气设备做状态评估与寿命预测。",
    highlightEn:
      "Monitoring data is inherently scarce — physics-grounded models step in where pure-data methods fail.",
    highlightZh: "监测数据天然稀少，物理增强模型在纯数据方案失效处补位。",
    cardIcon: "Zap",
    isFeatured: false,
  },
  {
    _id: "solution.battery-soh-rul",
    slug: slug("battery-soh-rul"),
    order: 4,
    group: "efficiency",
    tagline: "Battery SOH / RUL",
    titleEn: "Battery SOH / RUL",
    titleZh: "电池健康与残值评估",
    descriptionEn:
      "State-of-health, remaining-life, and residual-value assessment for storage and traction batteries.",
    descriptionZh: "对储能与动力电池做健康度、剩余寿命与残值评估。",
    highlightEn:
      "Tied directly to asset residual value and insurance pricing; deliverable as a lightweight pay-per-use service.",
    highlightZh: "直接绑定资产残值与保险定价，可做按次计费的轻量服务。",
    cardIcon: "BatteryCharging",
    isFeatured: true,
  },
  {
    _id: "solution.pipeline-leak-detection",
    slug: slug("pipeline-leak-detection"),
    order: 5,
    group: "efficiency",
    tagline: "Pipeline Leak Detection",
    titleEn: "Pipeline Leak Detection",
    titleZh: "管网漏损与泄漏检测",
    descriptionEn:
      "Leak localization and early warning for water and gas distribution networks.",
    descriptionZh: "对供水、燃气管网做漏损定位与泄漏预警。",
    highlightEn:
      "Losses convert straight to cost, enabling a low-friction share-of-savings business model.",
    highlightZh: "损耗直接折算成本，支持「按节省分成」的低阻力商业模式。",
    cardIcon: "Droplets",
    isFeatured: false,
  },
  {
    _id: "solution.soft-sensor",
    slug: slug("soft-sensor"),
    order: 6,
    group: "efficiency",
    tagline: "Soft Sensor",
    titleEn: "Soft Sensor",
    titleZh: "过程软测量",
    descriptionEn:
      "Infer hard-to-measure process indicators from easy-to-measure variables, replacing costly online analyzers.",
    descriptionZh: "从易测变量推算难测的关键工艺指标，替代昂贵在线分析仪。",
    highlightEn:
      "Pure-software delivery, zero hardware; wide operating-condition variance amplifies the small-sample customization edge.",
    highlightZh: "纯软件交付、零硬件；工况差异大，放大小样本定制优势。",
    cardIcon: "Activity",
    isFeatured: false,
  },
  {
    _id: "solution.metallurgical-process-prediction",
    slug: slug("metallurgical-process-prediction"),
    order: 7,
    group: "process",
    tagline: "Metallurgical Process Prediction",
    titleEn: "Metallurgical Process Prediction",
    titleZh: "冶金关键工艺预测",
    descriptionEn:
      "Prediction and optimization of key process nodes such as endpoint composition and continuous-casting quality.",
    descriptionZh: "对终点成分、连铸质量等关键工艺节点做预测与优化。",
    highlightEn:
      "Cost is measured per heat and clearly visible; fits the industry's dedicated budget cycle for intelligent retrofits.",
    highlightZh: "成本按炉计、清晰可见；契合行业智能化技改的专项预算周期。",
    cardIcon: "Factory",
    isFeatured: true,
  },
  {
    _id: "solution.virtual-metrology",
    slug: slug("virtual-metrology"),
    order: 8,
    group: "process",
    tagline: "Virtual Metrology",
    titleEn: "Virtual Metrology",
    titleZh: "制造虚拟量测",
    descriptionEn:
      "Predict per-wafer / per-part quality from equipment sensor data, replacing costly full inspection.",
    descriptionZh: "用设备传感数据预测每片 / 每件质量，替代昂贵全检。",
    highlightEn:
      "A tiny yield gain means huge profit; high price ceiling and strong customer stickiness.",
    highlightZh: "良率微增即巨额利润，客单价天花板高、客户粘性强。",
    cardIcon: "Microscope",
    isFeatured: false,
  },
].map((s) => ({_type: "solution", ...s}))

const caseStudies = [
  {
    _id: "caseStudy.yaf",
    _type: "caseStudy",
    slug: slug("yaf"),
    order: 1,
    tagEn: "Open Source · Flagship",
    tagZh: "开源 · 旗舰",
    titleEn: "YAF · AI Antenna Design Platform",
    titleZh: "YAF · AI 天线设计平台",
    descriptionEn:
      "The first open-source proof of our Physics-Grounded AI philosophy — real electromagnetic solvers and AI optimization, reimagining antenna design.",
    descriptionZh:
      "源序「物理增强 AI」理念的首个开源实证——用真实电磁求解器与 AI 优化重新定义天线设计。",
    cardIcon: "Antenna",
    href: "/antenna",
    ...(githubUrl && githubUrl !== "#" ? {externalUrl: githubUrl} : {}),
    isFlagship: true,
  },
  {
    _id: "caseStudy.energy-reliability",
    _type: "caseStudy",
    slug: slug("energy-reliability"),
    order: 2,
    tagEn: "Energy & Industry",
    tagZh: "能源工业",
    titleEn: "Energy & Industrial Reliability Prediction",
    titleZh: "能源工业可靠性预测",
    descriptionEn:
      "A physics-grounded equipment-reliability prediction system delivered in energy and industrial settings — small-sample modeling, uncertainty quantification, and deployment in localized environments.",
    descriptionZh:
      "在能源工业场景交付物理增强的设备可靠性预测系统，覆盖小样本建模、不确定性量化与国产化环境部署。",
    cardIcon: "Gauge",
    isFlagship: false,
  },
]

const docs = [...capabilities, ...solutionGroups, ...solutions, ...caseStudies]

async function main() {
  console.log(
    `Seeding ${docs.length} Physics-Grounded docs to dataset "${dataset}"…`,
  )
  let ok = 0
  let fail = 0
  for (const doc of docs) {
    try {
      const result = await client.createOrReplace(doc as never)
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
