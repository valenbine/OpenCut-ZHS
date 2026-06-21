const { test, expect } = require("@playwright/test");

test.describe("Landing page localization", () => {
		test("defaults to Chinese and preserves the language toggle selection", async ({ page }) => {
			await page.goto("/");

			await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
			await expect(page.getByRole("heading", { name: "开源" })).toBeVisible();
			await expect(page.getByRole("button", { name: "体验早期测试版" })).toBeVisible();

			const chineseToggle = page
				.getByRole("button", { name: "切换中英文" })
				.first();
			await expect(chineseToggle).toBeVisible();
			await expect(chineseToggle).toHaveText("中 / EN");

			await chineseToggle.click();

			await expect(page.getByRole("heading", { name: "The open source" })).toBeVisible();
			await expect(page.getByRole("button", { name: "Try early beta" })).toBeVisible();

			const englishToggle = page
				.getByRole("button", { name: "Switch language" })
				.first();
			await expect(englishToggle).toHaveText("EN / 中");
			await expect
				.poll(() => page.evaluate(() => localStorage.getItem("opencut-locale")))
				.toBe('"en"');

			await page.reload();

			await expect(page.getByRole("heading", { name: "The open source" })).toBeVisible();
			await expect(
				page.getByRole("button", { name: "Switch language" }).first(),
			).toHaveText("EN / 中");
		});
});
