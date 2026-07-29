import {expect, test} from "playwright/test"

for (const locale of ["en", "zh"] as const) {
  test(`${locale} homepage renders its primary content`, async ({page}) => {
    const consoleErrors: string[] = []
    const failedResources: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") {
        const source = message.location().url
        consoleErrors.push(`${message.text()}${source ? ` @ ${source}` : ""}`)
      }
    })
    page.on("response", (response) => {
      if (response.status() >= 400) {
        failedResources.push(`${response.status()} ${response.url()}`)
      }
    })

    const response = await page.goto(`/${locale}`)

    expect(response?.ok()).toBe(true)
    await expect(page.locator("main h1").first()).toBeVisible()
    await expect(page.locator("#capabilities")).toBeAttached()
    await expect(page.locator("#contact")).toBeAttached()
    expect(failedResources).toEqual([])
    expect(consoleErrors).toEqual([])
  })
}

test("top-level routes and health endpoints respond", async ({request}) => {
  for (const path of [
    "/en/capabilities",
    "/en/solutions",
    "/en/antenna",
    "/en/models",
    "/api/revalidate",
    "/robots.txt",
  ]) {
    const response = await request.get(path)
    expect(response.ok(), `${path} returned ${response.status()}`).toBe(true)
  }
})

test("homepage internal links do not point to broken routes", async ({page, request}) => {
  await page.goto("/en")

  const hrefs = await page.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((anchor) => (anchor as HTMLAnchorElement).getAttribute("href") ?? ""),
  )
  const internalPaths = [...new Set(
    hrefs
      .filter((href) => href.startsWith("/") && !href.startsWith("/#"))
      .map((href) => href.split("#")[0])
      .filter(Boolean),
  )]

  for (const path of internalPaths) {
    const response = await request.get(path)
    expect(response.status(), `${path} should not be broken`).toBeLessThan(400)
  }
})

test("unsigned Sanity webhooks are rejected", async ({request}) => {
  const response = await request.post("/api/revalidate", {
    data: {_type: "publication", slug: "not-authorized"},
  })
  expect(response.status()).toBe(401)
})

test("mobile capability cards use a compact horizontal rail", async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto("/en")

  const rail = page.locator("#capabilities .mobile-card-rail")
  await expect(rail).toBeVisible()
  const dimensions = await rail.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.clientWidth)
  await expect(page.locator("#contact form")).toBeAttached()
})

test("sitemap includes every public top-level route", async ({request}) => {
  const response = await request.get("/sitemap.xml")
  expect(response.ok()).toBe(true)

  const xml = await response.text()
  for (const path of [
    "/en",
    "/zh",
    "/en/capabilities",
    "/en/solutions",
    "/en/antenna",
    "/en/models",
  ]) {
    expect(xml).toContain(path)
  }
})
