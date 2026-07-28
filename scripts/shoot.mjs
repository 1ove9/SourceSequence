// Temporary Playwright screenshot script — visual QA of the light "misty" reskin.
// Run: node scripts/shoot.mjs    (dev server must be on http://localhost:3000)
import {chromium} from "playwright"
import {mkdirSync} from "node:fs"
import {fileURLToPath} from "node:url"
import {dirname, join} from "node:path"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "screenshots")
mkdirSync(OUT, {recursive: true})

const BASE = "http://localhost:3000/en"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Scroll the whole page in steps so framer-motion `whileInView` reveals fire,
// then return to top. Lets lazy 3D canvases warm up too.
async function primeReveals(page) {
  const height = await page.evaluate(() => document.body.scrollHeight)
  const vh = await page.evaluate(() => window.innerHeight)
  for (let y = 0; y < height; y += Math.floor(vh * 0.8)) {
    await page.evaluate((y) => window.scrollTo(0, y), y)
    await sleep(250)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(400)
}

async function run() {
  const browser = await chromium.launch()

  // ---- Desktop 1440×900 ----
  const desktop = await browser.newContext({
    viewport: {width: 1440, height: 900},
    deviceScaleFactor: 2,
  })
  const page = await desktop.newPage()

  // 1 · Homepage hero, first viewport
  await page.goto(BASE, {waitUntil: "networkidle"})
  await sleep(1800) // hero font-gated reveal + aurora settle
  await page.screenshot({path: join(OUT, "01-home-hero-1440.png")})
  console.log("✓ 01 home hero")

  // 2 · Homepage CaseStudies dark band
  await primeReveals(page)
  await page.evaluate(() => {
    const el = document.querySelector("#cases")
    if (el) el.scrollIntoView({block: "center"})
  })
  await sleep(1200)
  await page.screenshot({path: join(OUT, "02-home-casestudies-band-1440.png")})
  console.log("✓ 02 home casestudies band")

  // 3 · /antenna — light shell + dark 3D box. Full page to capture both.
  await page.goto(`${BASE}/antenna`, {waitUntil: "networkidle"})
  await sleep(2000)
  await primeReveals(page)
  await page.screenshot({
    path: join(OUT, "03-antenna-fullpage-1440.png"),
    fullPage: true,
  })
  // also a first-viewport crop of antenna for the hero/3D box detail
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(800)
  await page.screenshot({path: join(OUT, "03b-antenna-hero-1440.png")})
  console.log("✓ 03 antenna")

  await desktop.close()

  // ---- Mobile 390 (iPhone-ish) ----
  const mobile = await browser.newContext({
    viewport: {width: 390, height: 844},
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })
  const mpage = await mobile.newPage()
  await mpage.goto(BASE, {waitUntil: "networkidle"})
  await sleep(1800)
  await mpage.screenshot({path: join(OUT, "04-home-mobile-390-hero.png")})
  await primeReveals(mpage)
  await mpage.screenshot({
    path: join(OUT, "04b-home-mobile-390-full.png"),
    fullPage: true,
  })
  console.log("✓ 04 mobile home")

  await mobile.close()
  await browser.close()
  console.log("\nAll screenshots written to ./screenshots/")
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
