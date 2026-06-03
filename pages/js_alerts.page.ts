import { expect, Page, Locator } from "@playwright/test";

// DISCLAIMER: it is not such a good idea to use fixtures and classes for this test

export class JavaScriptAlertsPage {
  readonly page: Page;
  readonly result: Locator;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.result = page.locator("#result");
    this.alertButton = page.getByRole("button", { name: "Click for JS Alert" });
    this.confirmButton = page.getByRole("button", {
      name: "Click for JS Confirm",
    });
    this.promptButton = page.getByRole("button", {
      name: "Click for JS Prompt",
    });
  }

  async goto() {
    await this.page.goto(
      "https://the-internet.herokuapp.com/javascript_alerts",
    );
  }

  private async handleDialog(
    expectedMessage: string,
    action: "accept" | "dismiss",
    button: Locator,
    expectedResult: string,
    promptText?: string,
  ) {
    this.page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe(expectedMessage);

      if (action === "accept") {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });

    await button.click();
    await expect(this.result).toContainText(expectedResult);
  }

  async acceptAlert() {
    await this.handleDialog(
      "I am a JS Alert",
      "accept",
      this.alertButton,
      "You successfully clicked an alert",
    );
  }

  async acceptConfirm() {
    await this.handleDialog(
      "I am a JS Confirm",
      "accept",
      this.confirmButton,
      "You clicked: Ok",
    );
  }

  async dismissConfirm() {
    await this.handleDialog(
      "I am a JS Confirm",
      "dismiss",
      this.confirmButton,
      "You clicked: Cancel",
    );
  }

  async dismissPrompt() {
    await this.handleDialog(
      "I am a JS prompt",
      "dismiss",
      this.promptButton,
      "You entered: null",
    );
  }

  async acceptEmptyPrompt() {
    await this.handleDialog(
      "I am a JS prompt",
      "accept",
      this.promptButton,
      "You entered: ",
    );
  }

  async submitPrompt(text: string) {
    await this.handleDialog(
      "I am a JS prompt",
      "accept",
      this.promptButton,
      `You entered: ${text}`,
      text,
    );
  }
}
