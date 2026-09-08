import { defineConfig, devices } from "@playwright/test";

const testPort = Number(process.env.COURSES_TEST_PORT ?? 3101);
if (!Number.isInteger(testPort) || testPort < 1024 || testPort > 65535) {
  throw new Error("COURSES_TEST_PORT must be an unprivileged TCP port");
}
const testUrl = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: testUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
        deviceScaleFactor: 1,
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    command: `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${testPort}`,
    url: testUrl,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
