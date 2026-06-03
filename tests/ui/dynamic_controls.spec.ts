import { test, expect } from "@playwright/test";

import { DynamicControlsPage } from "../../pages/dynamic_controls.page";

test.describe("Buttons that create or deactivate page contents", () => {
  test("Remove/add", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
    const checkboxExample = page.locator("#checkbox-example");
    const checkBox = checkboxExample.locator("#checkbox");
    const removeButton = checkboxExample.getByRole("button", {
      name: "Remove",
    });
    const addButton = checkboxExample.getByRole("button", { name: "Add" });
    const message = checkboxExample.locator("#message");

    async function expectBoxVisibleState() {
      await expect(addButton).toBeHidden({ timeout: 10000 });
      await expect(checkBox).toBeVisible({ timeout: 10000 });
      await expect(removeButton).toBeVisible({ timeout: 10000 });
    }

    async function expectBoxRemovedState() {
      await expect(checkBox).toBeHidden({ timeout: 10000 });
      await expect(addButton).toBeVisible({ timeout: 10000 });
      await expect(removeButton).toBeHidden({ timeout: 10000 });
    }

    await expectBoxVisibleState();

    await removeButton.click();

    await expectBoxRemovedState();
    await expect(message).toContainText("It's gone!");

    await addButton.click();

    await expectBoxVisibleState();
    await expect(message).toContainText("It's back!");
  });

  test("Enable/disable", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
    const inputExample = page.locator("#input-example");
    const inputField = inputExample.locator("input");
    const message = inputExample.locator("#message");
    const disableButton = inputExample.getByRole("button", { name: "Disable" });
    const enableButton = inputExample.getByRole("button", { name: "Enable" });

    async function expectInputBarDisabledState() {
      await expect(disableButton).toBeHidden({ timeout: 10000 });
      await expect(inputField).toBeDisabled({ timeout: 10000 });
      await expect(enableButton).toBeVisible({ timeout: 10000 });
    }

    async function expectInputBarEnabledState() {
      await expect(inputField).toBeEnabled({ timeout: 10000 });
      await expect(disableButton).toBeVisible({ timeout: 10000 });
      await expect(enableButton).toBeHidden({ timeout: 10000 });
    }

    await expectInputBarDisabledState();

    await enableButton.click();

    await expectInputBarEnabledState();
    await expect(message).toContainText("It's enabled!");

    await disableButton.click();

    await expectInputBarDisabledState();
    await expect(message).toContainText("It's disabled!");
  });

  // Improved tests with class DynamicControlsPage

  test("Remove/add with page class", async ({ page }) => {
    const dynamicControlsPage = new DynamicControlsPage(page);

    dynamicControlsPage.goto();

    await dynamicControlsPage.expectBoxVisibleState();

    await dynamicControlsPage.clickRemoveButton();

    await dynamicControlsPage.expectBoxRemovedState();

    await dynamicControlsPage.expectGoneMessage();

    await dynamicControlsPage.clickAddButton();

    await dynamicControlsPage.expectBoxVisibleState();

    await dynamicControlsPage.expectBackMessage();
  });
});
