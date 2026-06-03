import { expect, Locator, Page } from "@playwright/test";

export class DynamicControlsPage {
  readonly page: Page;
  readonly checkboxExample: Locator;
  readonly checkBox: Locator;
  readonly removeButton: Locator;
  readonly addButton: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkboxExample = page.locator("#checkbox-example");
    this.checkBox = this.checkboxExample.locator("#checkbox");
    this.removeButton = this.checkboxExample.getByRole("button", {
      name: "Remove",
    });
    this.addButton = this.checkboxExample.getByRole("button", { name: "Add" });
    this.message = this.checkboxExample.locator("#message");
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/dynamic_controls");
  }

  async expectBoxVisibleState() {
    await expect(this.addButton).toBeHidden({ timeout: 10000 });
    await expect(this.checkBox).toBeVisible({ timeout: 10000 });
    await expect(this.removeButton).toBeVisible({ timeout: 10000 });
  }

  async expectBoxRemovedState() {
    await expect(this.checkBox).toBeHidden({ timeout: 10000 });
    await expect(this.addButton).toBeVisible({ timeout: 10000 });
    await expect(this.removeButton).toBeHidden({ timeout: 10000 });
  }

  async clickRemoveButton() {
    await this.removeButton.click();
  }

  async clickAddButton() {
    await this.addButton.click();
  }
  async expectGoneMessage() {
    await expect(this.message).toContainText("It's gone!");
  }

  async expectBackMessage() {
    await expect(this.message).toContainText("It's back!");
  }
}
