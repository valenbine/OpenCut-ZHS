const { defineConfig, devices } = require("@playwright/test");

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const shouldManageWebServer = process.env.PLAYWRIGHT_SKIP_WEBSERVER !== "1";

module.exports = defineConfig({
	testDir: "./e2e",
	fullyParallel: false,
	timeout: 30_000,
	expect: {
		timeout: 10_000,
	},
	retries: process.env.CI ? 2 : 0,
	reporter: [["list"], ["html", { open: "never", outputFolder: "test-results/playwright-report" }]],
	use: {
		baseURL,
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
	outputDir: "test-results/playwright",
	...(shouldManageWebServer
		? {
				webServer: {
					command: "bun --cwd apps/web dev --hostname 127.0.0.1 --port 3000",
					url: baseURL,
					reuseExistingServer: true,
					timeout: 120_000,
					stdout: "pipe",
					stderr: "pipe",
				},
			}
		: {}),
});
