const { expect } = require("@playwright/test");

function createErrorTracker(page) {
	const errors = [];

	page.on("pageerror", (error) => {
		errors.push(`pageerror: ${error.message}`);
	});

	page.on("console", (message) => {
		if (message.type() === "error") {
			const text = message.text();
			if (
				text.includes("webpack-hmr") &&
				text.includes("WebSocket connection")
			) {
				return;
			}
			errors.push(`console: ${text}`);
		}
	});

	page.on("requestfailed", (request) => {
		const failure = request.failure();
		const errorText = failure?.errorText || "unknown error";

		if (errorText === "net::ERR_ABORTED") {
			return;
		}

		errors.push(
			`requestfailed: ${request.method()} ${request.url()} ${errorText}`,
		);
	});

	return {
		assertClean() {
			const uniqueErrors = Array.from(new Set(errors));
			expect(
				uniqueErrors,
				uniqueErrors.length ? uniqueErrors.join("\n") : undefined,
			).toEqual([]);
		},
	};
}

async function resetStorage(page) {
	await page.addInitScript(() => {
		localStorage.clear();
		sessionStorage.clear();
	});
}

async function firstVisible(locator) {
	const count = await locator.count();

	for (let index = 0; index < count; index += 1) {
		const candidate = locator.nth(index);
		if (await candidate.isVisible().catch(() => false)) {
			return candidate;
		}
	}

	return null;
}

async function clickVisibleButton(page, namePattern) {
	const button = await firstVisible(page.getByRole("button", { name: namePattern }));
	if (!button) return false;

	await button.click();
	return true;
}

async function toggleLanguage(page) {
	const languageButton = await firstVisible(
		page.getByRole("button", { name: /切换中英文|Switch language/ }),
	);

	if (!languageButton) return;

	const before = (await languageButton.textContent())?.trim() || "";
	await languageButton.click();
	await expect(languageButton).not.toHaveText(before);
	await languageButton.click();
	await expect(languageButton).toHaveText(before);
}

async function toggleTheme(page) {
	const themeButton = await firstVisible(
		page.getByRole("button", {
			name: /切换到浅色模式|切换到深色模式|Switch to light mode|Switch to dark mode/,
		}),
	);

	if (!themeButton) return;

	await themeButton.click();
	await page.waitForTimeout(150);
	await themeButton.click();
	await page.waitForTimeout(150);
}

async function fillVisibleInput(page, placeholderPattern, value) {
	const input = await firstVisible(
		page.getByPlaceholder(placeholderPattern),
	);

	if (!input) return false;

	await input.fill(value);
	await expect(input).toHaveValue(value);
	await input.clear();
	return true;
}

async function clickSafeVisibleButtons(scope, options = {}) {
	const skipPattern =
		options.skipPattern ||
		/删除|Delete|退出|Exit|导出时包含音频|Include audio|发送$|Send$|重置|Reset|下载|Download|复制|Copy|GitHub|Discord/i;
	const buttons = scope.getByRole("button");
	const clicked = new Set();

	for (let pass = 0; pass < 25; pass += 1) {
		const count = await buttons.count();
		let clickedInPass = false;

		for (let index = 0; index < count; index += 1) {
			const button = buttons.nth(index);
			if (!(await button.isVisible().catch(() => false))) continue;

			const insideLink = await button
				.evaluate((element) => Boolean(element.closest("a")))
				.catch(() => false);
			if (insideLink) continue;

			const ariaLabel = (await button.getAttribute("aria-label")) || "";
			const text = ((await button.textContent()) || "").trim();
			const name = ariaLabel || text || `button-${index}`;
			if (clicked.has(name) || skipPattern.test(name)) continue;

			await button.click().catch(() => null);
			clicked.add(name);
			clickedInPass = true;
			await scope.page().waitForTimeout(120).catch(() => null);
			await scope.page().keyboard.press("Escape").catch(() => null);
			await scope.page().waitForTimeout(80).catch(() => null);
			break;
		}

		if (!clickedInPass) break;
	}
}

async function waitForSettled(page) {
	await page.waitForLoadState("domcontentloaded");
	await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => null);
	await page.waitForTimeout(200);
}

module.exports = {
	clickSafeVisibleButtons,
	clickVisibleButton,
	createErrorTracker,
	fillVisibleInput,
	firstVisible,
	resetStorage,
	toggleLanguage,
	toggleTheme,
	waitForSettled,
};
