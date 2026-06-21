const { test, expect } = require("@playwright/test");
const {
	clickSafeVisibleButtons,
	clickVisibleButton,
	createErrorTracker,
	fillVisibleInput,
	firstVisible,
	resetStorage,
	toggleLanguage,
	toggleTheme,
	waitForSettled,
} = require("./helpers");

async function dismissOnboarding(page) {
	for (let step = 0; step < 6; step += 1) {
		const dialog = page.getByRole("dialog");
		if (!(await dialog.isVisible().catch(() => false))) return;

		const actionButton = await firstVisible(
			page.getByRole("button", { name: /下一步|Next|完成|Finish|关闭|Close/ }),
		);

		if (!actionButton) return;

		await actionButton.click();
		await page.waitForTimeout(250);
	}
}

test.describe("Projects and editor control sweep", () => {
	test.beforeEach(async ({ page }) => {
		await resetStorage(page);
		await page.addInitScript(() => {
			localStorage.setItem("hasSeenOnboarding", "true");
		});
	});

	test("project page and editor controls stay stable", async ({ page }) => {
		test.setTimeout(180_000);
		const tracker = createErrorTracker(page);

		await page.goto("/projects");
		await waitForSettled(page);

		await fillVisibleInput(page, /搜索项目|Search projects/i, "demo");
		await clickVisibleButton(page, /网格视图|Grid view/i);
		await clickVisibleButton(page, /列表视图|List view/i);
		await toggleLanguage(page);
		await toggleTheme(page);

		const newProjectButton = await firstVisible(
			page.getByRole("button", { name: /新建项目|新建|New project/i }),
		);
		await expect(newProjectButton).not.toBeNull();
		await newProjectButton.click();

		await page.waitForURL(/\/editor\//, { timeout: 30_000 });
		await waitForSettled(page);
		await dismissOnboarding(page);
		await page.keyboard.press("Escape").catch(() => null);
		await page.waitForTimeout(250);

		await expect(
			page.getByRole("button", { name: /发送反馈|Send feedback/i }),
		).toBeVisible({ timeout: 60_000 });
		await expect(page.getByText(/导出|Export/i).first()).toBeVisible({
			timeout: 60_000,
		});

		const editorHeader = page.locator("header").first();
		const projectMenuButton = editorHeader.getByRole("button").first();
		await projectMenuButton.click();
		await page.getByRole("menuitem", { name: /快捷键|Shortcuts/i }).click();
		await expect(page.getByRole("dialog")).toBeVisible();
		await page.keyboard.press("Escape");

		await clickVisibleButton(page, /发送反馈|Send feedback/i);
		await clickVisibleButton(page, /取消|Cancel/i);

		await clickVisibleButton(page, /导出|Export/i);
		await expect(page.getByText(/导出项目|Export project/i).first()).toBeVisible();
		await clickSafeVisibleButtons(page.locator("[data-radix-popper-content-wrapper]").first(), {
			skipPattern: /删除|Delete|退出|Exit|发送$|Send$|重置|Reset|Discord|GitHub|导出$|Export$/i,
		});
		await page.keyboard.press("Escape");

		await toggleLanguage(page);
		await toggleTheme(page);

		tracker.assertClean();
	});
});
