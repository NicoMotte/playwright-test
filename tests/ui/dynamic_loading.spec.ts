import { test, expect, Page } from "@playwright/test";

async function clickOnStartButton(page: Page) {
  const startButton = page.getByRole("button", { name: "Start" });
  const loading = page.locator("#loading");
  const finish = page.locator("#finish");

  await expect(startButton).toBeVisible();
  await startButton.click();

  await expect(loading).toBeVisible();
  await expect(loading).toBeHidden({ timeout: 10000 });

  await expect(finish).toBeVisible({ timeout: 10000 });
  await expect(finish).toContainText("Hello World!", { timeout: 10000 });
}

test.describe("Dynamic loading", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading");
  });

  test("Example 1: Element on page that is hidden", async ({ page }) => {
    await page.getByRole("link", { name: "Example 1" }).click();

    await clickOnStartButton(page);
  });

  test("Example 2: Element rendered after the fact", async ({ page }) => {
    await page.getByRole("link", { name: "Example 2" }).click();

    await clickOnStartButton(page);
  });
});
