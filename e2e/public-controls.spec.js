const { test, expect } = require("@playwright/test");
const {
	clickVisibleButton,
	createErrorTracker,
	fillVisibleInput,
	resetStorage,
	toggleLanguage,
	toggleTheme,
	waitForSettled,
} = require("./helpers");

const publicRoutes = [
	"/",
	"/roadmap",
	"/sponsors",
	"/contributors",
	"/brand",
	"/changelog",
	"/blog",
	"/privacy",
	"/terms",
	"/projects",
];

test.describe("Public pages control sweep", () => {
	test.beforeEach(async ({ page }) => {
		await resetStorage(page);
	});

	for (const route of publicRoutes) {
		test(`page ${route} visible controls stay stable`, async ({ page }) => {
			test.setTimeout(60_000);
			const tracker = createErrorTracker(page);

			await page.goto(route);
			await waitForSettled(page);
			await expect(page.locator("body")).toBeVisible();

			await toggleLanguage(page);
			await toggleTheme(page);

			if (route === "/projects") {
				await fillVisibleInput(page, /搜索项目|Search projects/i, "demo");
				await clickVisibleButton(page, /网格视图|Grid view/i);
				await clickVisibleButton(page, /列表视图|List view/i);
				await clickVisibleButton(page, /按升序排序|按降序排序/i);
			}

			tracker.assertClean();
		});
	}

	test("blog detail and changelog detail controls stay stable", async ({ page }) => {
		test.setTimeout(60_000);
		const tracker = createErrorTracker(page);

		await page.goto("/blog");
		await waitForSettled(page);
		const firstPost = page.locator('a[href^="/blog/"]');
		if ((await firstPost.count()) > 0) {
			await firstPost.first().click();
			await waitForSettled(page);
			await toggleLanguage(page);
			await toggleTheme(page);
		}

		await page.goto("/changelog");
		await waitForSettled(page);
		const firstRelease = page.locator('a[href^="/changelog/"]');
		if ((await firstRelease.count()) > 0) {
			await firstRelease.first().click();
			await waitForSettled(page);
			await toggleLanguage(page);
			await toggleTheme(page);
			await clickVisibleButton(page, /复制 Markdown|Copy markdown/i);
		}

		tracker.assertClean();
	});
});
