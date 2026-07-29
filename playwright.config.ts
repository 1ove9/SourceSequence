import {defineConfig, devices} from "playwright/test"

const port = 3000
const baseURL = `http://127.0.0.1:${port}`
const startCommand =
  process.platform === "win32"
    ? `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${port}`
    : `npm run start -- --hostname 127.0.0.1 --port ${port}`

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: startCommand,
    url: `${baseURL}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      SANITY_REVALIDATE_SECRET:
        process.env.SANITY_REVALIDATE_SECRET ?? "e2e-signature-test-secret",
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Reuse the installed Chrome on local Windows machines. CI installs
        // Playwright Chromium explicitly and therefore uses the default there.
        channel: process.platform === "win32" && !process.env.CI ? "chrome" : undefined,
      },
    },
  ],
})
